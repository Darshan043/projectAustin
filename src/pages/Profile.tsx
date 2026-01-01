import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import { User, Bell, Shield, LogOut, Settings, Camera, Award, ChevronRight, Mail } from 'lucide-react';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [stats] = useState({ level: 5, xp: 340, streak: 12, challenges: 45 });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase.from('user_profiles').select('full_name').eq('id', user.id).maybeSingle();
      if (data) {
        setFullName(data.full_name);
      } else {
        // Fallback for mock user
        const mockName = localStorage.getItem('mock_user_name');
        if (mockName) setFullName(mockName);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Left Column: User Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900 rounded-[40px] p-8 text-center border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-6 group-hover:scale-105 transition-transform">
                <div className="w-32 h-32 rounded-full border-4 border-zinc-800 overflow-hidden bg-zinc-800">
                  {/* Placeholder Avatar */}
                  <div className="w-full h-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-4xl font-bold text-black">
                    {fullName.charAt(0) || 'U'}
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full text-black hover:bg-zinc-200 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-2xl font-black text-white mb-1">{fullName || 'User'}</h2>
              <p className="text-zinc-500 font-medium mb-6">{user?.email}</p>

              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-2xl font-black text-white">{stats.level}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase">Level</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="text-2xl font-black text-white">{stats.streak}</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase">Day Streak</div>
                </div>
              </div>

              <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 text-white border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-yellow-300" />
              <h3 className="font-bold">Achievements</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-white/10 rounded-xl flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors cursor-pointer" title="Achievement Locked">
                  <div className="w-8 h-8 rounded-full bg-black/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Preferences */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-black text-white mb-6">Settings</h2>

          {/* Account Settings */}
          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Account
              </h3>
            </div>
            <div className="p-2">
              <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 rounded-xl transition-colors group">
                <span className="text-zinc-400 group-hover:text-white transition-colors">Personal Information</span>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 rounded-xl transition-colors group">
                <span className="text-zinc-400 group-hover:text-white transition-colors">Login & Security</span>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 rounded-xl transition-colors group">
                <span className="text-zinc-400 group-hover:text-white transition-colors">Connected Apps</span>
                <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* App Preferences */}
          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" /> Preferences
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Bell className="w-5 h-5" /></div>
                  <div>
                    <div className="text-white font-bold">Push Notifications</div>
                    <div className="text-xs text-zinc-500">Updates, tips, and reminders</div>
                  </div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full shadow-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Mail className="w-5 h-5" /></div>
                  <div>
                    <div className="text-white font-bold">Email Digest</div>
                    <div className="text-xs text-zinc-500">Weekly progress summaries</div>
                  </div>
                </div>
                <div className="w-12 h-6 bg-zinc-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><Shield className="w-5 h-5" /></div>
                  <div>
                    <div className="text-white font-bold">Data Privacy</div>
                    <div className="text-xs text-zinc-500">Manage how your data is used</div>
                  </div>
                </div>
                <button className="text-sm font-bold text-white hover:underline">Manage</button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full py-4 bg-red-500/10 text-red-500 font-bold rounded-2xl hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

      </div>
    </Layout>
  );
}
