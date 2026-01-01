import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome{user ? `, ${user.email?.split('@')[0]}` : ''}
          </h1>
          <p className="text-xl text-gray-600">
            Let's build your wellness journey
          </p>
        </div>

        <button
          onClick={() => navigate('/onboarding/goals')}
          className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
