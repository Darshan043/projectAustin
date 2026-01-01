import { useState } from 'react';
import { useMood } from '../contexts/MoodContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const playlistDB = [
  {
    id: 'lofi-1',
    title: 'Rainy Day Lo-Fi',
    artist: 'MindFit Beats',
    moods: ['stressed', 'sad', 'neutral', 'calm'],
    image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=600&auto=format&fit=crop',
    color: 'from-indigo-900 to-slate-800',
    intensity: 'Low',
  },
  {
    id: 'upbeat-1',
    title: 'Neon Energy',
    artist: 'Future Pulse',
    moods: ['energetic', 'happy'],
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop',
    color: 'from-fuchsia-600 to-purple-600',
    intensity: 'High',
  },
  {
    id: 'nature-1',
    title: 'Forest Sounds',
    artist: 'Earth Tones',
    moods: ['anxious', 'stressed', 'calm'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop',
    color: 'from-emerald-800 to-green-900',
    intensity: 'Low',
  },
  {
    id: 'piano-1',
    title: 'Melancholy Piano',
    artist: 'Solo Keys',
    moods: ['sad', 'tired'],
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
    color: 'from-gray-700 to-zinc-800',
    intensity: 'Low',
  },
];

export default function Music() {
  const { currentMood } = useMood();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(playlistDB[0]);

  const recommendedPlaylists = playlistDB.filter(p =>
    currentMood ? p.moods.includes(currentMood) : true
  );

  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-96 rounded-[40px] overflow-hidden bg-black group"
        >
          {/* Background Blurs */}
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${currentTrack.color} opacity-60 transition-colors duration-1000`} />
          <div className="absolute inset-0 backdrop-blur-3xl" />

          {/* Vinyl/Album Art */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden relative"
            >
              <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-zinc-900 rounded-full border border-white/20" />
              </div>
            </motion.div>
          </div>

          {/* Player Controls */}
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-white mb-1">{currentTrack.title}</h2>
                <p className="text-zinc-400 font-medium">{currentTrack.artist}</p>
              </div>

              <div className="flex items-center gap-6">
                <button className="text-zinc-400 hover:text-white transition-colors"><SkipBack className="w-8 h-8" /></button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/20"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors"><SkipForward className="w-8 h-8" /></button>
              </div>

              <div className="w-full md:w-48 bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/3 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playlist Grid */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Sonic Moodscapes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedPlaylists.map((track) => (
              <div
                key={track.id}
                onClick={() => { setCurrentTrack(track); setIsPlaying(true); }}
                className="group bg-zinc-900 p-4 rounded-3xl border border-white/5 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                  <img src={track.image} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
                <h4 className="font-bold text-white mb-1 truncate">{track.title}</h4>
                <p className="text-xs text-zinc-500">{track.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
