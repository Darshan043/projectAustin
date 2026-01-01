import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle, Target, Zap, Crown, Flame, Star, Shield } from 'lucide-react';
import type { DailyChallenge } from '../types';

const CHALLENGE_POOOL = [
  // Physical
  { text: 'Walk for 10 minutes', type: 'physical', xp: 50 },
  { text: 'Do 20 jumping jacks', type: 'physical', xp: 30 },
  { text: 'Stretch for 5 minutes', type: 'physical', xp: 20 },
  // Mental
  { text: 'Meditate for 5 minutes', type: 'mental', xp: 50 },
  { text: 'Write down 3 things you are grateful for', type: 'mental', xp: 40 },
  { text: 'Deep breathing for 2 minutes', type: 'mental', xp: 20 },
  // Health
  { text: 'Drink 8 glasses of water', type: 'health', xp: 30 },
  { text: 'Eat a healthy breakfast', type: 'health', xp: 40 },
  { text: 'No screens for 1 hour before bed', type: 'health', xp: 50 },
];

export default function Challenges() {
  const { user } = useAuth();
  const { currentMood } = useMood();
  const [todayChallenge, setTodayChallenge] = useState<DailyChallenge | null>(null);
  const [pastChallenges, setPastChallenges] = useState<DailyChallenge[]>([]);
  const [userLevel, setUserLevel] = useState(1);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];

      // 1. Get Today's Challenge
      const { data: existing } = await supabase
        .from('daily_challenges')
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_date', today)
        .maybeSingle();

      if (existing) {
        setTodayChallenge(existing);
      } else {
        // Generate new random challenge
        const randomChallenge = CHALLENGE_POOOL[Math.floor(Math.random() * CHALLENGE_POOOL.length)];

        const { data: newChallenge, error } = await supabase
          .from('daily_challenges')
          .insert([
            {
              user_id: user.id,
              challenge_text: randomChallenge.text,
              challenge_type: randomChallenge.type,
              challenge_date: today,
            }
          ])
          .select()
          .single();

        if (!error && newChallenge) {
          setTodayChallenge(newChallenge);
        }
      }

      // 2. Get Past Challenges
      const { data: past } = await supabase
        .from('daily_challenges')
        .select('*')
        .eq('user_id', user.id)
        .neq('challenge_date', today)
        .order('challenge_date', { ascending: false })
        .limit(5);

      if (past) setPastChallenges(past);

      // 3. Simple Mock Level System (Based on completed count)
      const { count } = await supabase
        .from('daily_challenges')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('completed', true);

      if (count) {
        setUserLevel(Math.floor(count / 5) + 1);
        setXp((count % 5) * 20); // 100 XP per level
      }
    };

    fetchChallenges();
  }, [user]);

  const handleCompleteDescription = async () => {
    if (!todayChallenge || !user) return;

    const { error } = await supabase
      .from('daily_challenges')
      .update({ completed: true })
      .eq('id', todayChallenge.id);

    if (!error) {
      setTodayChallenge({ ...todayChallenge, completed: true });
      setXp(prev => Math.min(prev + 20, 100));
      // In a real app, level up logic would go here
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Gamification Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[40px] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 rotate-3">
                  <Crown className="w-12 h-12 text-yellow-300" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  Lvl {userLevel}
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black italic tracking-tighter mb-2">CHAMPION'S ARENA</h1>
                <p className="text-orange-100 font-medium">Complete quests to level up your mind & body.</p>
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="flex justify-between text-xs font-bold uppercase mb-2">
                <span>XP Progress</span>
                <span>{xp}/100</span>
              </div>
              <div className="h-4 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xp}%` }}
                  className="h-full bg-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.5)]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Challenge Card */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" /> Daily Quest
            </h2>

            {todayChallenge ? (
              <motion.div
                layout
                className="group relative bg-zinc-900 rounded-[32px] p-8 border border-white/5 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 p-32 bg-gradient-to-br ${todayChallenge.completed ? 'from-green-500/20' : 'from-primary/10'} to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {todayChallenge.challenge_type}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white italic">+50 XP</div>
                      <div className="text-xs text-zinc-500 font-bold uppercase">Reward</div>
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">
                    {todayChallenge.challenge_text}
                  </h3>

                  {todayChallenge.completed ? (
                    <div className="w-full py-6 bg-green-500/20 border border-green-500/50 rounded-2xl flex items-center justify-center gap-3 text-green-400 font-bold text-lg animate-pulse">
                      <CheckCircle className="w-6 h-6" /> QUEST COMPLETED
                    </div>
                  ) : (
                    <button
                      onClick={handleCompleteDescription}
                      className="w-full py-6 bg-gradient-to-r from-primary to-lime-400 text-black font-black text-xl uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-3"
                    >
                      <Shield className="w-6 h-6 fill-black" /> Mark Complete
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 text-center text-zinc-500">
                Loading quest details...
              </div>
            )}
          </div>

          {/* Side Panel: Past & Mood Bonuses */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" /> Recent Victories
              </h3>
              <div className="space-y-3">
                {pastChallenges.length > 0 ? pastChallenges.map(challenge => (
                  <div key={challenge.id} className="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-2xl border border-white/5 flex items-center gap-4 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${challenge.completed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {challenge.completed ? <CheckCircle className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{challenge.challenge_text}</p>
                      <p className="text-xs text-zinc-500">
                        {new Date(challenge.challenge_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="text-zinc-500 text-sm">No past challenges found.</div>
                )}
              </div>
            </div>

            {currentMood && (
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-3xl border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-2">Mood Bonus</h3>
                  <p className="text-indigo-200 text-sm mb-4">
                    You're feeling <strong>{currentMood}</strong> today!
                    {currentMood === 'energetic' && ' Double XP for physical challenges!'}
                    {currentMood === 'stressed' && ' Bonus XP for meditation!'}
                  </p>
                  <div className="flex items-center gap-1 text-yellow-300 font-bold text-xs uppercase tracking-wider">
                    <Star className="w-4 h-4 fill-yellow-300" /> Active Boost
                  </div>
                </div>
                <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-500/20 rotate-12" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
