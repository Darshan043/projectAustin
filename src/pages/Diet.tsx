import { useState } from 'react';
import { useMood } from '../contexts/MoodContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Apple, Utensils, Droplets, Flame, Leaf, Fish, Coffee, ChevronRight, Plus } from 'lucide-react';

const dietDB = [
  // STRESSED -> Comfort & Magnesium
  {
    id: 'stress-1',
    name: 'Warm Quinoa Bowl',
    calories: 450,
    macros: { p: 15, c: 60, f: 12 },
    moods: ['stressed', 'anxious'],
    category: 'Comfort',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
    color: 'from-orange-400 to-amber-500',
    description: 'Magnesium-rich ingredients to relax your muscles.',
    tags: ['Magnesium', 'Warm', 'Vegan']
  },
  {
    id: 'stress-2',
    name: 'Dark Choco Delight',
    calories: 200,
    macros: { p: 3, c: 15, f: 12 },
    moods: ['stressed', 'sad'],
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600&auto=format&fit=crop',
    color: 'from-amber-700 to-orange-900',
    description: 'Antioxidants to lower stress hormones.',
    tags: ['Antioxidants', 'Sweet']
  },
  // ENERGETIC -> High Protein
  {
    id: 'energy-1',
    name: 'Power Protein Bowl',
    calories: 600,
    macros: { p: 45, c: 50, f: 20 },
    moods: ['energetic', 'happy', 'neutral'],
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
    color: 'from-emerald-500 to-green-600',
    description: 'Fuel your workout with lean protein.',
    tags: ['High Protein', 'Gluten Free']
  },
  // SAD -> Omega-3 & Vitamin D
  {
    id: 'sad-1',
    name: 'Salmon Perfection',
    calories: 550,
    macros: { p: 35, c: 10, f: 30 },
    moods: ['sad', 'tired'],
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=600&auto=format&fit=crop',
    color: 'from-blue-500 to-indigo-600',
    description: 'Omega-3 fatty acids to boost brain health and mood.',
    tags: ['Omega-3', 'Keto']
  },
];

export default function Diet() {
  const { currentMood } = useMood();
  const [hydration, setHydration] = useState(3);
  const hydrationGoal = 8;

  const recommendedMeals = dietDB.filter(m =>
    currentMood ? m.moods.includes(currentMood) : true
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-800 to-green-900 p-8 md:p-12 text-white"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 items-end">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                  Nutrition
                </span>
                {currentMood && (
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
                    Mood: {currentMood}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                {currentMood === 'energetic' ? 'FUEL YOUR FIRE' :
                  currentMood === 'stressed' ? 'NOURISH & CALM' :
                    'EAT SMART'}
              </h1>
              <p className="text-emerald-100 max-w-lg text-lg">
                {currentMood === 'stressed' ? 'Magnesium and Vitamin C rich foods to help lower cortisol levels.' :
                  currentMood === 'energetic' ? 'High protein and complex carbs to sustain this energy.' :
                    'Personalized meal plans based on your metabolic needs.'}
              </p>
            </div>

            {/* Hydration Tracker Mini-Widget */}
            <div className="glass bg-white/5 p-6 rounded-2xl border border-white/10 min-w-[280px]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <span className="font-bold">Hydration</span>
                </div>
                <span className="text-2xl font-black text-blue-400">{hydration}/{hydrationGoal}</span>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: hydrationGoal }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 flex-1 rounded-sm transition-all duration-300 ${i < hydration ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setHydration(prev => Math.min(prev + 1, hydrationGoal))}
                className="w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-sm font-bold uppercase tracking-wider rounded-lg border border-blue-500/50 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Water
              </button>
            </div>
          </div>
        </motion.div>

        {/* Meal Recommendations */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recommended for You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMeals.map((meal, idx) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90`} />

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{meal.name}</h3>
                      <div className="flex gap-2">
                        {meal.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase font-bold px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-white">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{meal.calories}</div>
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">Kcal</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-zinc-400 text-sm mb-6">{meal.description}</p>

                  {/* Macros */}
                  <div className="flex gap-2 mb-6">
                    {[
                      { label: 'Protein', val: meal.macros.p, total: 100, color: 'bg-red-500' },
                      { label: 'Carbs', val: meal.macros.c, total: 100, color: 'bg-amber-500' },
                      { label: 'Fats', val: meal.macros.f, total: 100, color: 'bg-blue-500' },
                    ].map((macro) => (
                      <div key={macro.label} className="flex-1 bg-white/5 rounded-xl p-2 text-center border border-white/5">
                        <div className="text-xs text-zinc-500 font-bold uppercase mb-1">{macro.label}</div>
                        <div className="text-white font-bold">{macro.val}g</div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                          <div className={`h-full ${macro.color}`} style={{ width: `${(macro.val / 60) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                    View Recipe <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
