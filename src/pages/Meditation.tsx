import { useState } from 'react';
import { useMood } from '../contexts/MoodContext';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Play, Wind, Clock, AudioLines, X, CheckCircle } from 'lucide-react';

const meditationDB = [
  // STRESSED / ANXIOUS -> Calm & Grounding
  {
    id: 'calm-1',
    title: 'Instant Calm',
    duration: 5,
    category: 'Breathing',
    moods: ['stressed', 'anxious', 'energetic'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    color: 'from-blue-500 to-cyan-500',
    description: 'A quick 5-minute breathing exercise to reset your nervous system.',
  },
  {
    id: 'ground-1',
    title: 'Deep Grounding',
    duration: 15,
    category: 'Guided',
    moods: ['anxious', 'stressed'],
    image: 'https://images.unsplash.com/photo-1447452001602-7090c7784012?q=80&w=600&auto=format&fit=crop',
    color: 'from-emerald-500 to-teal-600',
    description: 'Reconnect with the earth and find stability in chaos.',
  },
  // SAD / TIRED -> Uplifting & Gentle
  {
    id: 'uplift-1',
    title: 'Loving Kindness',
    duration: 20,
    category: 'Guided',
    moods: ['sad', 'tired', 'neutral'],
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop',
    color: 'from-rose-400 to-pink-500',
    description: 'Cultivate feelings of love and compassion for yourself.',
  },
  // HAPPY / NEUTRAL -> Focus & Awareness
  {
    id: 'focus-1',
    title: 'Laser Focus',
    duration: 10,
    category: 'Focus',
    moods: ['happy', 'energetic', 'neutral'],
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop',
    color: 'from-violet-500 to-purple-600',
    description: 'Sharpen your mind and improve concentration.',
  },
  {
    id: 'sleep-1',
    title: 'Deep Sleep Story',
    duration: 30,
    category: 'Sleep',
    moods: ['tired', 'calm'],
    image: 'https://images.unsplash.com/photo-1511296192432-8622157d0397?q=80&w=600&auto=format&fit=crop',
    color: 'from-indigo-900 to-slate-900',
    description: 'Drift off into a peaceful slumber with this narrative.',
  },
];

export default function Meditation() {
  const { currentMood } = useMood();
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const recommendedSessions = meditationDB.filter(m =>
    currentMood ? m.moods.includes(currentMood) : true
  );

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
          <div className="absolute top-0 right-0 w-64 h-full bg-yellow-400 transform skew-x-[-20deg] translate-x-32 opacity-10 md:opacity-100 md:w-48 md:bg-yellow-400" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-zinc-800 rounded-2xl border border-white/5">
                <Brain className="w-8 h-8 text-yellow-400" />
              </div>
              <span className="text-zinc-400 font-bold tracking-wider uppercase">Mindfulness</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 italic uppercase tracking-tighter">
              {currentMood === 'stressed' ? 'Find Your Calm' :
                currentMood === 'sad' ? 'Heal From Within' :
                  'Expand Your Mind'}
            </h1>
            <p className="text-zinc-400 max-w-xl text-lg relative z-20">
              {currentMood ? `Sessions curated for your ${currentMood} state.` : 'Explore our library of guided meditations.'}
            </p>
          </div>
        </motion.div>

        {/* Breathing Visualizer */}
        {currentMood !== 'energetic' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 justify-center border-l-4 border-yellow-400 shadow-xl"
          >
            <div className="relative flex items-center justify-center w-32 h-32">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 bg-yellow-400 rounded-full shadow-[0_0_30px_rgba(253,224,71,0.3)]"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2 uppercase italic">Quick Breather</h3>
              <p className="text-zinc-400 max-w-md">Sync your breath with the pulsing light. Inhale as it expands, exhale as it contracts.</p>
            </div>
          </motion.div>
        )}

        {/* Sessions Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-white italic uppercase">Recommended Sessions</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedSessions.map((session, idx) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 hover:border-yellow-400/50 transition-all shadow-lg"
                onClick={() => setSelectedSession(session)}
              >
                <div className="absolute inset-0">
                  <img src={session.image} alt={session.title} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-yellow-400 text-black rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1 clip-path-polygon-[10%_0,100%_0,90%_100%,0%_100%]">
                      <Wind className="w-3 h-3" /> {session.category}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 uppercase italic group-hover:text-yellow-400 transition-colors">{session.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-300">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-yellow-400" /> {session.duration} MIN</span>
                      <span className="flex items-center gap-1 bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 border border-white/5">AUDIO</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Audio Player Modal */}
        <AnimatePresence>
          {selectedSession && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-md bg-zinc-900 rounded-[32px] border border-white/10 overflow-hidden shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedSession(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-72">
                  <img src={selectedSession.image} alt={selectedSession.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                </div>

                <div className="px-8 pb-10 text-center -mt-12 relative z-10">
                  <h2 className="text-3xl font-black text-white mb-2 uppercase italic">{selectedSession.title}</h2>
                  <p className="text-zinc-500 mb-8 font-medium">{selectedSession.category} • {selectedSession.duration} Minutes</p>

                  <div className="w-full bg-zinc-800 h-1.5 rounded-full mb-8 overflow-hidden">
                    <div className="bg-yellow-400 w-1/3 h-full rounded-full" />
                  </div>

                  <div className="flex items-center justify-center gap-8">
                    <button className="text-zinc-500 hover:text-white transition-colors">
                      <AudioLines className="w-6 h-6" />
                    </button>
                    <button className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_40px_rgba(253,224,71,0.4)]">
                      <Play className="w-8 h-8 text-black fill-black ml-1" />
                    </button>
                    <button className="text-zinc-500 hover:text-white transition-colors">
                      <CheckCircle className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
