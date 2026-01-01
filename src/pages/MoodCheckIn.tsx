import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Zap, Coffee, Cloud, AlertCircle, Battery } from 'lucide-react';

const moodOptions = [
  { mood: 'energetic', icon: Zap, label: 'Energetic', color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/50' },
  { mood: 'happy', icon: Smile, label: 'Happy', color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/50' },
  { mood: 'calm', icon: Coffee, label: 'Calm', color: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400/50' },
  { mood: 'neutral', icon: Meh, label: 'Neutral', color: 'text-zinc-400', bg: 'bg-zinc-400/20', border: 'border-zinc-400/50' },
  { mood: 'tired', icon: Battery, label: 'Tired', color: 'text-purple-400', bg: 'bg-purple-400/20', border: 'border-purple-400/50' },
  { mood: 'sad', icon: Frown, label: 'Sad', color: 'text-indigo-400', bg: 'bg-indigo-400/20', border: 'border-indigo-400/50' },
  { mood: 'stressed', icon: AlertCircle, label: 'Stressed', color: 'text-red-400', bg: 'bg-red-400/20', border: 'border-red-400/50' },
  { mood: 'anxious', icon: Cloud, label: 'Anxious', color: 'text-orange-400', bg: 'bg-orange-400/20', border: 'border-orange-400/50' },
] as const;

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(5);
  const { setMood, isLoading } = useMood();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selectedMood) return;

    await setMood(selectedMood as any, intensity);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            How are you feeling?
          </h1>
          <p className="text-zinc-400 text-lg">
            Your workout and suggestions will adapt to your mood.
          </p>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {moodOptions.map(({ mood, icon: Icon, label, color, bg, border }) => {
            const isSelected = selectedMood === mood;
            return (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`
                            relative h-32 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-300 border
                            ${isSelected ? `${bg} ${border} scale-105 shadow-[0_0_30px_rgba(0,0,0,0.3)]` : 'bg-zinc-900/50 border-white/5 hover:border-white/20 hover:bg-zinc-800/50'}
                        `}
              >
                <Icon className={`w-8 h-8 ${isSelected ? color : 'text-zinc-500'}`} />
                <span className={`font-medium ${isSelected ? 'text-white' : 'text-zinc-500'}`}>{label}</span>

                {isSelected && (
                  <motion.div
                    layoutId="mood-ring"
                    className={`absolute inset-0 rounded-3xl border-2 ${border}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Intensity Slider (Only shows when mood selected) */}
        <div className="h-32 mb-8 flex items-center justify-center">
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="w-full max-w-md bg-zinc-900/50 border border-white/5 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <label className="text-zinc-400 font-medium">Intensity</label>
                <span className="text-primary font-bold text-xl">{intensity}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-xs text-zinc-600 uppercase font-bold tracking-wider">
                <span>Low</span>
                <span>High</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedMood || isLoading}
            className="group relative px-12 py-4 bg-white text-black rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
            <span className="relative z-10">Continue to Dashboard</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
