import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { PartyPopper } from 'lucide-react';

export default function Finish() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saveOnboarding = async () => {
      if (!user) return;

      const goals = JSON.parse(localStorage.getItem('onboarding_goals') || '[]');
      const time = localStorage.getItem('onboarding_time') || '';
      const stress = localStorage.getItem('onboarding_stress') || '';

      try {
        const { error } = await supabase
          .from('user_onboarding')
          .insert([
            {
              user_id: user.id,
              goals,
              daily_time: time,
              stress_frequency: stress,
            }
          ]);

        if (error) throw error;

        localStorage.removeItem('onboarding_goals');
        localStorage.removeItem('onboarding_time');
        localStorage.removeItem('onboarding_stress');

        setLoading(false);
      } catch (error) {
        console.error('Error saving onboarding:', error);
        setLoading(false);
      }
    };

    saveOnboarding();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <PartyPopper className="w-20 h-20 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">You're all set!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personalized wellness journey starts now
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          disabled={loading}
          className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Setting up...' : 'Go to Dashboard'}
        </button>

        <div className="mt-4 text-sm text-gray-500">
          Step 4 of 4
        </div>
      </div>
    </div>
  );
}
