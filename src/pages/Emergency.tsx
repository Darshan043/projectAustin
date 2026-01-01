import { useState } from 'react';
import Layout from '../components/Layout';
import { AlertCircle, Phone, Wind, Heart } from 'lucide-react';

export default function Emergency() {
  const [breathing, setBreathing] = useState(false);

  const helplines = [
    { country: 'United States', number: '988', service: 'Suicide & Crisis Lifeline' },
    { country: 'United Kingdom', number: '116 123', service: 'Samaritans' },
    { country: 'India', number: '9152987821', service: 'AASRA' },
    { country: 'Canada', number: '1-833-456-4566', service: 'Crisis Services Canada' },
    { country: 'Australia', number: '13 11 14', service: 'Lifeline' },
  ];

  const groundingSteps = [
    'Take a deep breath and acknowledge 5 things you can see',
    'Name 4 things you can touch',
    'Identify 3 things you can hear',
    'Notice 2 things you can smell',
    'Focus on 1 thing you can taste',
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white">
          <AlertCircle className="w-12 h-12 mb-3" />
          <h1 className="text-3xl font-bold mb-2">Emergency Support</h1>
          <p className="text-red-100">You're not alone. Help is available 24/7</p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <Heart className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Not Alone</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                If you're experiencing a mental health crisis, please reach out. These feelings are temporary,
                and there are people who want to help you through this difficult time.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Calm</h2>
          <div className="text-center">
            <button
              onClick={() => setBreathing(!breathing)}
              className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all mb-6"
            >
              <div className={breathing ? 'animate-pulse' : ''}>
                <Wind className="w-16 h-16 mb-2" />
                <p className="text-xl font-bold">{breathing ? 'Breathe' : 'Start Breathing'}</p>
              </div>
            </button>
            <p className="text-gray-600 max-w-md mx-auto">
              {breathing
                ? 'Breathe in slowly for 4 counts, hold for 4, then exhale for 4. Repeat.'
                : 'Click the circle to start a guided breathing exercise'
              }
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Phone className="w-7 h-7 text-blue-600" />
            Crisis Helpline Numbers
          </h2>
          <div className="space-y-4">
            {helplines.map(helpline => (
              <div key={helpline.country} className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{helpline.country}</h3>
                    <p className="text-gray-600">{helpline.service}</p>
                  </div>
                  <a
                    href={`tel:${helpline.number}`}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{helpline.number}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-900">
              <strong>Note:</strong> If you're in immediate danger, please call your local emergency services (911, 112, etc.)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Grounding Exercise</h2>
          <p className="text-gray-700 mb-6">
            Try this 5-4-3-2-1 technique to help calm anxiety and bring yourself back to the present moment:
          </p>
          <div className="space-y-4">
            {groundingSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Remember</h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            This is temporary. You are strong. You matter. There are people who care about you and want to help.
          </p>
        </div>
      </div>
    </Layout>
  );
}
