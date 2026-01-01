import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, CheckCircle2, RotateCcw } from 'lucide-react';
import CoachAvatar from './CoachAvatar';
import { useCoach } from '../contexts/CoachContext';

interface ExerciseStep {
  id: number;
  name: string;
  duration: number; // in seconds
  description: string;
  instruction: string;
  image?: string;
}

interface ExerciseSessionProps {
  exercise: {
    id: number;
    name: string;
    duration: number;
    difficulty: string; // Changed from 'intensity' to match usage if needed, or map it
    category: string;
    benefits?: string;
    steps?: ExerciseStep[]; // Make optional or ensure mapped
  };
  onClose: () => void;
}

// Fallback steps if none provided
const defaultSteps: ExerciseStep[] = [
  { id: 1, name: 'Warm Up', duration: 60, description: 'Get your blood flowing.', instruction: 'Start with a light jog in place.' },
  { id: 2, name: 'Main Workout', duration: 120, description: 'Focus on form.', instruction: 'Begin the main movement.' },
  { id: 3, name: 'Cool Down', duration: 60, description: 'Stretch it out.', instruction: 'Slow down and breathe.' },
];

export default function ExerciseSession({ exercise, onClose }: ExerciseSessionProps) {
  const steps = exercise.steps || defaultSteps;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(steps[0]?.duration || 30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { speak, isSpeaking, getExerciseInstruction, getFeedback } = useCoach();

  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;
  // Calculate progress safely
  const progress = ((currentStepIndex) / totalSteps) * 100 +
    ((currentStep.duration - timeRemaining) / currentStep.duration) * (100 / totalSteps);

  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (currentStepIndex < totalSteps - 1) {
              const nextIndex = currentStepIndex + 1;
              setCurrentStepIndex(nextIndex);
              const nextStep = steps[nextIndex];
              setTimeRemaining(nextStep.duration);
              const instruction = getExerciseInstruction(exercise.name, nextStep.name);
              speak(instruction, 'instruction');
            } else {
              setIsCompleted(true);
              setIsPlaying(false);
              const feedback = getFeedback(true, exercise.name);
              speak(feedback, 'feedback');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, timeRemaining, currentStepIndex, totalSteps, steps, exercise.name, getExerciseInstruction, speak, getFeedback]);

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setTimeRemaining(steps[nextIndex].duration);
    } else {
      setIsCompleted(true);
      setIsPlaying(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setTimeRemaining(steps[currentStepIndex - 1].duration);
    }
  };

  const togglePlayPause = () => {
    if (!isPlaying) {
      const instruction = getExerciseInstruction(exercise.name, currentStep.name);
      speak(instruction, 'instruction');
    }
    setIsPlaying(!isPlaying);
  };

  const resetStep = () => {
    setTimeRemaining(currentStep.duration);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCompleted) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-yellow-400/20 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 italic uppercase">Workout Complete!</h2>
          <p className="text-zinc-400 mb-6 font-medium">Great job completing {exercise.name}</p>
          <button
            onClick={onClose}
            className="w-full py-4 bg-yellow-400 text-black rounded-xl font-bold uppercase tracking-wider hover:bg-yellow-300 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white uppercase italic">{exercise.name}</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-wider">
              <span>{exercise.category}</span>
              <span>•</span>
              <span>{exercise.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col items-center">
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 h-full">

          {/* Visual Area */}
          <div className="flex flex-col gap-6">
            {/* Main Visual */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square bg-zinc-900 rounded-[2rem] border border-white/5 overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 to-transparent opacity-50" />

              {/* Placeholder Animation */}
              <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
                {/* Simple pulsing circle for now */}
                <div className={`w-48 h-48 rounded-full border-4 border-yellow-400 flex items-center justify-center transition-all duration-1000 ${isPlaying ? 'scale-110 shadow-[0_0_50px_rgba(250,204,21,0.3)]' : 'scale-100'}`}>
                  <div className={`w-36 h-36 bg-yellow-400 rounded-full transition-all duration-1000 ${isPlaying ? 'scale-90 opacity-80' : 'scale-100 opacity-20'}`} />
                </div>
              </div>

              {/* Coach Overlay */}
              <div className="absolute bottom-6 right-6">
                <div className="bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-xl">
                  <CoachAvatar
                    message={currentStep.instruction}
                    isSpeaking={isSpeaking}
                    size="small"
                    variant="default" // simplified variant
                  />
                </div>
              </div>
            </div>

            {/* Step Progress Bar */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Total Progress</span>
                <span className="text-yellow-400 font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {/* Controls Area */}
          <div className="flex flex-col justify-center">
            <div className="bg-zinc-900/50 rounded-[2.5rem] p-8 border border-white/5 space-y-8">

              {/* Timer Display */}
              <div className="text-center">
                <div className="text-[6rem] leading-none font-black text-white font-mono tracking-tighter tabular-nums">
                  {formatTime(timeRemaining)}
                </div>
                <h3 className="text-xl text-yellow-400 font-bold uppercase italic mt-2">{currentStep.name}</h3>
                <p className="text-zinc-500 mt-2 font-medium">{currentStep.description}</p>
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center gap-2">
                {steps.map((s, i) => (
                  <div key={s.id} className={`h-1.5 w-8 rounded-full transition-colors ${i === currentStepIndex ? 'bg-yellow-400' : i < currentStepIndex ? 'bg-zinc-600' : 'bg-zinc-800'}`} />
                ))}
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStepIndex === 0}
                  className="p-4 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <SkipBack className="w-6 h-6" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="w-24 h-24 rounded-[2rem] bg-yellow-400 hover:bg-yellow-300 text-black flex items-center justify-center shadow-[0_10px_30px_rgba(250,204,21,0.2)] hover:shadow-[0_10px_40px_rgba(250,204,21,0.4)] transition-all transform hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-10 h-10 fill-black" /> : <Play className="w-10 h-10 fill-black ml-1" />}
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex === totalSteps - 1}
                  className="p-4 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>

              <button onClick={resetStep} className="flex items-center justify-center gap-2 w-full text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                <RotateCcw className="w-4 h-4" /> Reset Step
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
