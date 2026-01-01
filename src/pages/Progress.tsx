import { useMood } from '../contexts/MoodContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Activity, ArrowUp, Zap, Clock, Trophy } from 'lucide-react';

const mockWeeklyData = [
  { day: 'Mon', mood: 8, activity: 60 },
  { day: 'Tue', mood: 6, activity: 45 },
  { day: 'Wed', mood: 9, activity: 90 },
  { day: 'Thu', mood: 7, activity: 60 },
  { day: 'Fri', mood: 5, activity: 30 },
  { day: 'Sat', mood: 8, activity: 120 },
  { day: 'Sun', mood: 9, activity: 45 },
];

const stats = [
  { label: 'Total Workouts', value: '12', change: '+2', icon: Activity },
  { label: 'Mood Score', value: '8.4', change: '+12%', icon: Zap },
  { label: 'Active Minutes', value: '450', change: '+45m', icon: Clock },
];

export default function Progress() {
  const { currentMood } = useMood();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass bg-zinc-900/50 p-6 rounded-3xl border border-white/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="flex items-center text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded-lg">
                  <ArrowUp className="w-3 h-3 mr-1" /> {stat.change}
                </span>
              </div>
              <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-zinc-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Mood vs Activity Chart (Custom CSS Bar Chart) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 rounded-[40px] p-8 md:p-12 border border-white/5 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Weekly Flow</h2>
              <p className="text-zinc-400">Mood vs Activity correlation</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold">
              <div className="flex items-center gap-2 text-zinc-400"><div className="w-3 h-3 rounded-full bg-primary" /> Mood</div>
              <div className="flex items-center gap-2 text-zinc-400"><div className="w-3 h-3 rounded-full bg-zinc-700" /> Activity</div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 h-64">
            {mockWeeklyData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col justify-end gap-2 group cursor-pointer">
                {/* Bars Container */}
                <div className="relative h-full flex items-end justify-center w-full">
                  {/* Activity Bar (Background) */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.activity / 120) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-zinc-800 rounded-2xl absolute bottom-0 opacity-50 group-hover:opacity-80 transition-opacity"
                  />
                  {/* Mood Bar (Foreground) */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.mood / 10) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                    className="w-2/3 bg-primary rounded-xl z-10 shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                  />
                </div>
                {/* Label */}
                <div className="text-center">
                  <div className="text-xs font-bold text-zinc-500 uppercase">{d.day}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Consistency Heatmap */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900 rounded-3xl p-8 border border-white/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold text-white">Consistency Streak</h3>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg ${Math.random() > 0.3 ? 'bg-primary/20 border border-primary/20' : 'bg-white/5'}`}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-zinc-500 font-medium">Current Streak</span>
              <span className="text-2xl font-black text-white">12 Days</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-2">Weekly Champion</h3>
                <p className="text-indigo-200">You're in the top 5% of users this week!</p>
              </div>
              <button className="w-full py-4 bg-white text-indigo-900 font-bold rounded-xl mt-8 hover:scale-105 transition-transform">
                View Leaderboard
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
