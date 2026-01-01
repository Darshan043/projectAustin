import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const timeOptions = [
  { id: '5-10', label: '5-10 minutes' },
  { id: '15-30', label: '15-30 minutes' },
  { id: '30+', label: '30+ minutes' },
];

export default function Time() {
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedTime) {
      localStorage.setItem('onboarding_time', selectedTime);
      navigate('/onboarding/mood-frequency');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        <div className="mb-8 text-center">
          <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Time Availability</h2>
          <p className="text-gray-600">How much time can you spend daily?</p>
        </div>

        <div className="space-y-3 mb-8">
          {timeOptions.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedTime(id)}
              className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                selectedTime === id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedTime === id
                    ? 'border-blue-600'
                    : 'border-gray-300'
                }`}>
                  {selectedTime === id && (
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                  )}
                </div>
                <span className="font-semibold text-gray-900">{label}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedTime}
          className="w-full py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          Step 2 of 4
        </div>
      </div>
    </div>
  );
}
