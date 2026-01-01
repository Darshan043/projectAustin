import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Activity, Brain, Apple, Sparkles } from 'lucide-react';

export default function Suggestions() {
  const [searchParams] = useSearchParams();
  const mood = searchParams.get('mood') || 'neutral';
  const [suggestions, setSuggestions] = useState<any>(null);

  useEffect(() => {
    const moodSuggestions: any = {
      happy: {
        exercise: { title: 'High Energy Dance', duration: '15 min', desc: 'Keep that energy flowing' },
        relax: { title: 'Gratitude Meditation', duration: '5 min', desc: 'Amplify your positive vibes' },
        diet: { title: 'Fresh Fruit Smoothie', desc: 'Maintain your vibrant energy' },
        quote: 'Your joy is your power. Keep shining!',
      },
      calm: {
        exercise: { title: 'Gentle Yoga Flow', duration: '10 min', desc: 'Maintain your peaceful state' },
        relax: { title: 'Mindful Breathing', duration: '5 min', desc: 'Deepen your tranquility' },
        diet: { title: 'Green Tea & Almonds', desc: 'Sustain your calm energy' },
        quote: 'Peace is not absence of conflict, it is the ability to handle conflict by peaceful means.',
      },
      neutral: {
        exercise: { title: 'Light Stretching', duration: '10 min', desc: 'Energize your body' },
        relax: { title: 'Body Scan Meditation', duration: '7 min', desc: 'Connect with yourself' },
        diet: { title: 'Balanced Snack', desc: 'Nuts and dark chocolate' },
        quote: 'Every moment is a fresh beginning.',
      },
      sad: {
        exercise: { title: 'Mood-Lifting Walk', duration: '10 min', desc: 'Fresh air can help' },
        relax: { title: 'Compassion Meditation', duration: '10 min', desc: 'Be gentle with yourself' },
        diet: { title: 'Comfort Foods', desc: 'Warm soup or herbal tea' },
        quote: 'This too shall pass. You are stronger than you know.',
      },
      stressed: {
        exercise: { title: '4-7-8 Breathing', duration: '5 min', desc: 'Quick stress relief' },
        relax: { title: 'Progressive Relaxation', duration: '8 min', desc: 'Release physical tension' },
        diet: { title: 'Stress-Relief Foods', desc: 'Chamomile tea, berries, walnuts' },
        quote: 'You are not your thoughts. You are the observer of your thoughts.',
      },
    };

    setSuggestions(moodSuggestions[mood] || moodSuggestions.neutral);
  }, [mood]);

  if (!suggestions) return null;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white mb-6">
          <h1 className="text-3xl font-bold mb-2">Based on your mood</h1>
          <p className="text-blue-100">Here are personalized activities just for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Link
            to="/exercise"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Exercise</h3>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{suggestions.exercise.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{suggestions.exercise.duration}</p>
            <p className="text-gray-700">{suggestions.exercise.desc}</p>
          </Link>

          <Link
            to="/meditation"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Relax</h3>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{suggestions.relax.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{suggestions.relax.duration}</p>
            <p className="text-gray-700">{suggestions.relax.desc}</p>
          </Link>

          <Link
            to="/diet"
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Apple className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Diet</h3>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{suggestions.diet.title}</h4>
            <p className="text-gray-700">{suggestions.diet.desc}</p>
          </Link>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 flex flex-col justify-center">
            <Sparkles className="w-8 h-8 text-pink-600 mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Motivation</h3>
            <p className="text-gray-700 italic">{suggestions.quote}</p>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="block w-full py-4 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </Layout>
  );
}
