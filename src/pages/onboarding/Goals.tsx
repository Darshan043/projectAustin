import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Dumbbell, Smile, Wind } from 'lucide-react';

const goalOptions = [
  { id: 'mental-peace', label: 'Mental Peace', icon: Brain },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'confidence', label: 'Confidence', icon: Smile },
  { id: 'stress-relief', label: 'Stress Relief', icon: Wind },
];

export default function Goals() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      localStorage.setItem('onboarding_goals', JSON.stringify(selectedGoals));
      navigate('/onboarding/time');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Goals</h2>
          <p className="text-gray-600">What do you want to focus on?</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {goalOptions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => toggleGoal(id)}
              className={`p-6 rounded-2xl border-2 transition-all ${
                selectedGoals.includes(id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-3 ${
                selectedGoals.includes(id) ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <span className="font-semibold text-gray-900">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={selectedGoals.length === 0}
          className="w-full py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          Step 1 of 4
        </div>
      </div>
    </div>
  );
}
