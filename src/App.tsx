import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CoachProvider } from './contexts/CoachContext';
import { MoodProvider } from './contexts/MoodContext';
import MoodGuard from './components/MoodGuard';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Welcome from './pages/onboarding/Welcome';
import Goals from './pages/onboarding/Goals';
import Time from './pages/onboarding/Time';
import MoodFrequency from './pages/onboarding/MoodFrequency';
import Finish from './pages/onboarding/Finish';

import Dashboard from './pages/Dashboard';
import MoodCheckIn from './pages/MoodCheckIn';
import Suggestions from './pages/Suggestions';
import Exercise from './pages/Exercise';
import Meditation from './pages/Meditation';
import Diet from './pages/Diet';
import Music from './pages/Music';
import Progress from './pages/Progress';
import AIChat from './pages/AIChat';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import Emergency from './pages/Emergency';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MoodProvider>
          <CoachProvider>
            <MoodGuard>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                  path="/onboarding/welcome"
                  element={
                    <ProtectedRoute>
                      <Welcome />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/goals"
                  element={
                    <ProtectedRoute>
                      <Goals />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/time"
                  element={
                    <ProtectedRoute>
                      <Time />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/mood-frequency"
                  element={
                    <ProtectedRoute>
                      <MoodFrequency />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/finish"
                  element={
                    <ProtectedRoute>
                      <Finish />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mood-checkin"
                  element={
                    <ProtectedRoute>
                      <MoodCheckIn />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/suggestions"
                  element={
                    <ProtectedRoute>
                      <Suggestions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/exercise"
                  element={
                    <ProtectedRoute>
                      <Exercise />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/meditation"
                  element={
                    <ProtectedRoute>
                      <Meditation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/diet"
                  element={
                    <ProtectedRoute>
                      <Diet />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/music"
                  element={
                    <ProtectedRoute>
                      <Music />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/progress"
                  element={
                    <ProtectedRoute>
                      <Progress />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <AIChat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/challenges"
                  element={
                    <ProtectedRoute>
                      <Challenges />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/emergency"
                  element={
                    <ProtectedRoute>
                      <Emergency />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MoodGuard>
          </CoachProvider>
        </MoodProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
