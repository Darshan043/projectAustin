export interface UserProfile {
  id: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserOnboarding {
  id: string;
  user_id: string;
  goals: string[];
  daily_time: string;
  stress_frequency: string;
  completed_at: string;
  created_at: string;
}

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: 'happy' | 'calm' | 'neutral' | 'sad' | 'stressed';
  note: string;
  created_at: string;
}

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: 'exercise' | 'meditation' | 'breathing' | 'diet';
  activity_name: string;
  duration_minutes: number;
  completed: boolean;
  created_at: string;
}

export interface DailyChallenge {
  id: string;
  user_id: string;
  challenge_text: string;
  challenge_type: string;
  completed: boolean;
  challenge_date: string;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  date: string;
  mood_score: number;
  activities_completed: number;
  streak_days: number;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  sender: 'user' | 'ai';
  created_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  reminder_time: string;
  dark_mode: boolean;
  content_preferences: string[];
  updated_at: string;
}
