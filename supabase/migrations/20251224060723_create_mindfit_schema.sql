/*
  # MindFit Database Schema

  ## Overview
  Complete database schema for MindFit - a mental health and wellness application
  combining fitness, nutrition, and mental peace tracking.

  ## New Tables
  
  ### 1. user_profiles
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. user_onboarding
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `goals` (text array) - Mental Peace, Fitness, Confidence, Stress Relief
  - `daily_time` (text) - Time availability preference
  - `stress_frequency` (text) - Rarely, Sometimes, Often
  - `completed_at` (timestamptz)
  - `created_at` (timestamptz)
  
  ### 3. mood_entries
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `mood` (text) - happy, calm, neutral, sad, stressed
  - `note` (text, optional)
  - `created_at` (timestamptz)
  
  ### 4. user_activities
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `activity_type` (text) - exercise, meditation, breathing, diet
  - `activity_name` (text)
  - `duration_minutes` (integer)
  - `completed` (boolean)
  - `created_at` (timestamptz)
  
  ### 5. daily_challenges
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `challenge_text` (text)
  - `challenge_type` (text)
  - `completed` (boolean)
  - `challenge_date` (date)
  - `created_at` (timestamptz)
  
  ### 6. user_progress
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `date` (date)
  - `mood_score` (integer) - 1-5 scale
  - `activities_completed` (integer)
  - `streak_days` (integer)
  - `created_at` (timestamptz)
  
  ### 7. chat_messages
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `message` (text)
  - `sender` (text) - user or ai
  - `created_at` (timestamptz)
  
  ### 8. user_preferences
  - `id` (uuid, primary key)
  - `user_id` (uuid, references user_profiles)
  - `reminder_time` (time)
  - `dark_mode` (boolean)
  - `content_preferences` (text array)
  - `updated_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to access only their own data
  
  ## Important Notes
  1. All tables use UUID primary keys for security
  2. Foreign keys ensure data integrity
  3. Timestamps track data creation and updates
  4. RLS policies enforce user data isolation
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create user_onboarding table
CREATE TABLE IF NOT EXISTS user_onboarding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  goals text[] DEFAULT '{}',
  daily_time text DEFAULT '',
  stress_frequency text DEFAULT '',
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own onboarding"
  ON user_onboarding FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding"
  ON user_onboarding FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding"
  ON user_onboarding FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  mood text NOT NULL,
  note text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mood entries"
  ON mood_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries"
  ON mood_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create user_activities table
CREATE TABLE IF NOT EXISTS user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  activity_name text NOT NULL,
  duration_minutes integer DEFAULT 0,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activities"
  ON user_activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON user_activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities"
  ON user_activities FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create daily_challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_text text NOT NULL,
  challenge_type text DEFAULT '',
  completed boolean DEFAULT false,
  challenge_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own challenges"
  ON daily_challenges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenges"
  ON daily_challenges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenges"
  ON daily_challenges FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  date date DEFAULT CURRENT_DATE,
  mood_score integer DEFAULT 0,
  activities_completed integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  sender text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  reminder_time time DEFAULT '09:00:00',
  dark_mode boolean DEFAULT false,
  content_preferences text[] DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_entries_created_at ON mood_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_challenges_user_date ON daily_challenges(user_id, challenge_date);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_date ON user_progress(user_id, date);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id, created_at DESC);