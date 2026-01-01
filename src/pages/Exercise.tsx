import { useState, useEffect } from 'react';
import { useMood } from '../contexts/MoodContext';
import Layout from '../components/Layout';
import ExerciseSession from '../components/ExerciseSession'; // Keeping the existing session component for now, will polish later if needed
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Zap, Play, Filter, Flame, Info } from 'lucide-react';

// Extended Exercise Database
const exerciseDB = [
  // ENERGY / ANGER -> HIIT & Cardio
  {
    id: 'hiit-1',
    name: 'Explosive HIIT',
    duration: 20,
    intensity: 'High',
    moods: ['energetic', 'stressed', 'anxious'],
    category: 'Cardio',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=600&auto=format&fit=crop',
    color: 'from-orange-500 to-red-600',
    description: 'Burn off excess energy and stress with high-intensity intervals.',
    steps: [
      { id: 1, name: 'High Knees', duration: 45, description: 'Drive knees up to chest height.', instruction: 'Get those knees up! Faster!' },
      { id: 2, name: 'Rest', duration: 15, description: 'Catch your breath.', instruction: 'Breathe deep. Prepare for the next round.' },
      { id: 3, name: 'Burpees', duration: 45, description: 'Chest to floor, jump up.', instruction: 'Explode up! Give it everything.' },
      { id: 4, name: 'Rest', duration: 15, description: 'Recover.', instruction: 'Stay moving, dont stop completely.' },
      { id: 5, name: 'Mountain Climbers', duration: 45, description: 'Drive knees to elbows.', instruction: 'Keep your core tight and drive!' },
    ]
  },
  {
    id: 'box-1',
    name: 'Shadow Boxing',
    duration: 15,
    intensity: 'High',
    moods: ['stressed', 'energetic'],
    category: 'Combat',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=600&auto=format&fit=crop',
    color: 'from-red-600 to-rose-600',
    description: 'Punch out the stress. Focus on form and speed.',
    steps: [
      { id: 1, name: 'Stance & Bounce', duration: 60, description: 'Find your rhythm.', instruction: 'Hands up, chin down. Stay light on your toes.' },
      { id: 2, name: 'Jab - Cross', duration: 60, description: 'Basic 1-2 combo.', instruction: 'Snap user hip on the cross. Exhale on impact.' },
      { id: 3, name: 'Freestyle Shadow', duration: 60, description: 'Mix it up.', instruction: 'Visualize the opponent. Move your head!' },
    ]
  },
  // SAD / TIRED -> Yoga & Light Movement
  {
    id: 'yoga-1',
    name: 'Gentle Flow',
    duration: 25,
    intensity: 'Low',
    moods: ['sad', 'tired', 'neutral'],
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=600&auto=format&fit=crop',
    color: 'from-indigo-400 to-purple-500',
    description: 'Slow movements to reconnect with your body.',
    steps: [
      { id: 1, name: 'Childs Pose', duration: 60, description: 'Hips to heels, forehead down.', instruction: 'Sink into the mat. Let go of tension.' },
      { id: 2, name: 'Cat - Cow', duration: 60, description: 'Arch and round the spine.', instruction: 'Inhale to look up, exhale to round.' },
      { id: 3, name: 'Downward Dog', duration: 60, description: 'Hips high, heels down.', instruction: 'Press through your hands. Lengthen your spine.' },
    ]
  },
  {
    id: 'stretch-1',
    name: 'Full Body Stretch',
    duration: 10,
    intensity: 'Low',
    moods: ['tired', 'calm'],
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
    color: 'from-blue-400 to-cyan-500',
    description: 'Wake up your muscles gently without strain.',
    steps: [
      { id: 1, name: 'Neck Rolls', duration: 30, description: 'Gently roll head side to side.', instruction: 'Release tension in your neck.' },
      { id: 2, name: 'Shoulder Rolls', duration: 30, description: 'Roll shoulders back and down.', instruction: 'Open up your chest.' },
      { id: 3, name: 'Forward Fold', duration: 45, description: 'Hinge at hips, reach for toes.', instruction: 'Let gravity do the work.' },
    ]
  },
  // HAPPY / CALM -> Strength & Pilates
  {
    id: 'strength-1',
    name: 'Core Power',
    duration: 30,
    intensity: 'Medium',
    moods: ['happy', 'energetic', 'neutral'],
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
    color: 'from-emerald-500 to-teal-600',
    description: 'Build stability and strength when you feel balanced.',
    steps: [
      { id: 1, name: 'Plank Hold', duration: 45, description: 'Straight line from head to heels.', instruction: 'Engage your core. Don\'t let hips sag.' },
      { id: 2, name: 'Crunches', duration: 45, description: 'Lift shoulder blades off mat.', instruction: 'Squeeze at the top. Control the way down.' },
      { id: 3, name: 'Russian Twists', duration: 45, description: 'Rotate torso side to side.', instruction: 'Follow your hands with your eyes.' },
    ]
  },
  {
    id: 'pilates-1',
    name: 'Mat Pilates',
    duration: 45,
    intensity: 'Medium',
    moods: ['calm', 'happy'],
    category: 'Pilates',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop',
    color: 'from-pink-500 to-rose-500',
    description: 'Controlled movements for tone and flexibility.',
    steps: [
      { id: 1, name: 'The Hundred', duration: 60, description: 'Pump arms, legs extended.', instruction: 'Inhale for 5, exhale for 5.' },
      { id: 2, name: 'Single Leg Stretch', duration: 45, description: 'Hug one knee, extend other.', instruction: 'Keep your lower back pressed down.' },
      { id: 3, name: 'Roll Up', duration: 60, description: 'Articulate spine up and down.', instruction: 'One vertebra at a time.' },
    ]
  },
];

export default function Exercise() {
  const { currentMood } = useMood();
  const [filter, setFilter] = useState('Recommended');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  // Logic to sort exercises
  const recommendedExercises = exerciseDB.filter(ex =>
    currentMood ? ex.moods.includes(currentMood) : true
  );

  const displayedExercises = filter === 'Recommended' && currentMood ? recommendedExercises : exerciseDB;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header - Yellow/Black Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[40px] overflow-hidden bg-zinc-900 p-8 md:p-12 border border-white/5"
        >
          {/* Yellow Accent */}
          <div className="absolute top-0 right-0 w-64 h-full bg-yellow-400 transform skew-x-[-20deg] translate-x-32 opacity-10 md:opacity-100 md:w-32 md:bg-yellow-400" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded bg-zinc-800 border border-white/5 text-yellow-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  Mood: {currentMood || 'Neutral'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">
                {currentMood === 'energetic' ? 'Burn It Up' :
                  currentMood === 'sad' ? 'Gentle Flow' :
                    currentMood === 'stressed' ? 'Release Tension' :
                      'Train Your Body'}
              </h1>
              <p className="text-zinc-500 font-medium">Curated session based on your energy levels.</p>
            </div>

            {/* Filters */}
            <div className="flex gap-2 bg-zinc-800/50 p-1 rounded-xl border border-white/5">
              {['Recommended', 'All Workouts'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-zinc-500 hover:text-white'
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Workout Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedExercises.map((ex, idx) => (
              <motion.div
                key={ex.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 hover:border-yellow-400/50 transition-all shadow-xl"
                onClick={() => setSelectedExercise(ex)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src={ex.image} alt={ex.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top Tags */}
                  <div className="flex justify-between items-start">
                    <span className={`px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/10`}>
                      {ex.intensity} Intensity
                    </span>
                    {filter === 'Recommended' && currentMood && (
                      <span className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                        <Flame className="w-4 h-4 fill-black" />
                      </span>
                    )}
                  </div>

                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-3xl font-black text-white mb-2 leading-none uppercase italic group-hover:text-yellow-400 transition-colors">{ex.name}</h3>
                    <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{ex.description}</p>

                    <div className="flex items-center gap-6 text-xs font-bold text-zinc-300 mb-6 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        {ex.duration} min
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-yellow-400" />
                        {ex.category}
                      </div>
                    </div>

                    <button className="w-full py-4 bg-white text-black font-black uppercase tracking-wider rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      <Play className="w-5 h-5 fill-black" /> Start Session
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Exercise Session Modal */}
        {selectedExercise && (
          <ExerciseSession
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
          />
        )}
      </div>
    </Layout>
  );
}
