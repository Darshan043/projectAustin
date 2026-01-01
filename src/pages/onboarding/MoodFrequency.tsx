import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const moodOptions = [
  { id: 'never', label: 'Never', emoji: '😄' },
  { id: 'rarely', label: 'Rarely', emoji: '🙂' },
  { id: 'sometimes', label: 'Sometimes', emoji: '😐' },
  { id: 'often', label: 'Often', emoji: '😞' },
  { id: 'always', label: 'Always', emoji: '😫' },
];

export default function MoodFrequency() {
  const [selectedMood, setSelectedMood] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedMood) {
      localStorage.setItem('onboarding_stress', selectedMood);
      navigate('/onboarding/finish');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-display">Stress Check</h2>
          <p className="text-lg text-gray-600">How often do you feel overwhelmed or stressed?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {moodOptions.map(({ id, label, emoji }) => (
            <button
              key={id}
              onClick={() => setSelectedMood(id)}
              className={`relative p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 h-40 ${selectedMood === id
                  ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105 z-10'
                  : 'border-white bg-white hover:border-indigo-200 hover:shadow-md'
                }`}
            >
              <div className="text-5xl filter drop-shadow-sm">{emoji}</div>
              <div className={`font-semibold ${selectedMood === id ? 'text-indigo-900' : 'text-gray-600'}`}>
                {label}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedMood}
          className="w-full py-4 text-lg bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-indigo-200"
        >
          Continue
        </button>

        <div className="mt-8 text-center">
          <div className="inline-flex gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-200" />
            <div className="w-2 h-2 rounded-full bg-indigo-200" />
            <div className="w-8 h-2 rounded-full bg-indigo-600" />
            <div className="w-2 h-2 rounded-full bg-indigo-200" />
          </div>
          <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-widest">Step 3 of 4</p>
        </div>
      </div>
    </div>
  );
}
