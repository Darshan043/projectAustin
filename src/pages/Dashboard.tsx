import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import CoachAvatar from '../components/CoachAvatar';
import { useCoach } from '../contexts/CoachContext';
import CircularProgress from '../components/CircularProgress';
import { motion } from 'framer-motion';
import {
  Search,
  Activity,
  Brain,
  Apple,
  Music,
  Footprints,
  Moon,
  Heart,
  Flame,
  Grid3x3,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [userName, setUserName] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const { isSpeaking, getGreeting, currentMessage } = useCoach(); // Removed speak as we just show message here

  // Mock data
  const stats = {
    steps: 2285,
    stepsGoal: 10000,
    sleep: 8,
    sleepGoal: 8,
    heartRate: 72,
    calories: 357,
    caloriesGoal: 2000,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const { data: profile } = await supabase.from('user_profiles').select('full_name').eq('id', user.id).maybeSingle();
      if (profile) setUserName(profile.full_name.split(' ')[0]);
    };
    fetchUserData();
  }, [user]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Hello, {userName || 'Athlete'}
            </h1>
            <p className="text-zinc-400 mt-1">Ready to crush your goals today?</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 w-full md:w-64">
              <Search className="w-4 h-4 text-zinc-500" />
              <input type="text" placeholder="Search activities..." className="bg-transparent border-none focus:ring-0 text-sm w-full text-white placeholder-zinc-600" />
            </div>
            <button className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Grid3x3 className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Coach Insight Card */}
        <motion.div variants={item} className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-white/10 p-8 flex items-center gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

            <div className="flex-shrink-0 relative z-10">
              <CoachAvatar
                message={currentMessage || getGreeting(userName)}
                isSpeaking={isSpeaking}
                size="small"
                pulseColor="#818cf8"
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 text-white">Coach Insight</h3>
              <p className="text-zinc-300 leading-relaxed max-w-lg">
                {currentMessage || "Your recovery score is high today. It's a perfect day to push your limits with high-intensity interval training."}
              </p>
              <button className="mt-4 text-primary text-sm font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all">
                View Plan <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stats / Streak */}
          <div className="glass rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Weekly Streak</p>
                <h3 className="text-4xl font-black text-white mt-1">5 Days</h3>
              </div>
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-6 flex items-end gap-1 h-24">
              {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-t-sm hover:bg-primary transition-colors relative group/bar" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {h}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Metrics Grid */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Performance Metrics</h2>
            <div className="flex bg-white/5 p-1 rounded-lg">
              {['Daily', 'Weekly', 'Monthly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period as any)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${selectedPeriod === period ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Steps', value: stats.steps, max: stats.stepsGoal, icon: Footprints, color: '#f59e0b' },
              { label: 'Sleep', value: stats.sleep, max: stats.sleepGoal, icon: Moon, color: '#818cf8', unit: 'hrs' },
              { label: 'BPM', value: stats.heartRate, max: 200, icon: Heart, color: '#ef4444', unit: 'avg' },
              { label: 'Calories', value: stats.calories, max: stats.caloriesGoal, icon: Flame, color: '#ec4899' },
            ].map((stat, idx) => (
              <div key={idx} className="glass rounded-3xl p-6 hover:bg-white/5 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <span className="text-zinc-500 text-xs font-bold uppercase">{stat.unit || 'Total'}</span>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                  <span className="text-sm text-zinc-500 mb-1">/ {stat.max}</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(100, (stat.value / stat.max) * 100)}%`, backgroundColor: stat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions & Meals */}
        <motion.div variants={item} className="grid lg:grid-cols-2 gap-6 pb-8">
          {/* Quick Actions */}
          <div className="glass rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { to: '/exercise', icon: Activity, label: 'Workout', color: 'from-orange-500 to-red-600' },
                { to: '/meditation', icon: Brain, label: 'Mindfulness', color: 'from-blue-500 to-indigo-600' },
                { to: '/diet', icon: Apple, label: 'Nutrition', color: 'from-emerald-500 to-green-600' },
                { to: '/music', icon: Music, label: 'Focus Audio', color: 'from-pink-500 to-rose-600' },
              ].map((action, i) => (
                <Link key={i} to={action.to} className="group relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-zinc-900 border border-white/5 hover:border-white/20 transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <action.icon className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="font-medium text-zinc-400 group-hover:text-white transition-colors">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity / Meals */}
          <div className="glass rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Daily Fuel</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-4">
              {[
                { time: '08:00 AM', meal: 'Oatmeal & Berries', cal: 320, color: 'bg-orange-500' },
                { time: '01:30 PM', meal: 'Grilled Salmon Bowl', cal: 450, color: 'bg-emerald-500' },
                { time: '07:00 PM', meal: 'Quinoa Salad', cal: 280, color: 'bg-teal-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className={`w-2 h-12 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <div className="text-xs text-zinc-500 font-medium mb-1">{item.time}</div>
                    <div className="text-white font-semibold">{item.meal}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{item.cal}</div>
                    <div className="text-xs text-zinc-500">kcal</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
