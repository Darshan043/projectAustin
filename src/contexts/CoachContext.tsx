import { createContext, useContext, useState, ReactNode } from 'react';

interface CoachMessage {
  id: string;
  text: string;
  type: 'greeting' | 'instruction' | 'motivation' | 'support' | 'feedback';
  timestamp: Date;
}

interface CoachContextType {
  coachName: string;
  isSpeaking: boolean;
  currentMessage: string | null;
  messages: CoachMessage[];
  speak: (text: string, type?: CoachMessage['type']) => void;
  stopSpeaking: () => void;
  getGreeting: (userName?: string) => string;
  getExerciseInstruction: (exerciseName: string, step: string) => string;
  getMotivation: () => string;
  getSupport: (mood: string) => string;
  getFeedback: (completed: boolean, exerciseName: string) => string;
}

const CoachContext = createContext<CoachContextType | undefined>(undefined);

// Coach Personality: Aarav - Calm, motivating, friendly, Nike-style
const COACH_PERSONALITY = {
  name: 'Aarav',
  style: 'Nike-style (short, powerful, encouraging)',
  tone: 'Calm, motivating, friendly',
};

const MOTIVATIONAL_PHRASES = [
  "You've got this. Let's go.",
  "Great work. Keep it up.",
  "You're doing amazing. Stay focused.",
  "One more rep. You can do it.",
  "That's it. Perfect form.",
  "Breathe. You're in control.",
  "Small steps. Big progress.",
  "You showed up today. That's what matters.",
];

const SUPPORT_MESSAGES: Record<string, string[]> = {
  stressed: [
    "I see you're feeling stressed. Let's take a moment together.",
    "Stress is temporary. Let's breathe through this.",
    "You're not alone. Let's do a quick breathing exercise.",
  ],
  low: [
    "I'm here with you. Let's start with something small.",
    "Every step counts, even the small ones.",
    "You're stronger than you feel right now. Let's move together.",
  ],
  anxious: [
    "Anxiety is tough. Let's ground ourselves with movement.",
    "Breathe with me. We'll get through this together.",
    "Let's focus on what we can control right now.",
  ],
  default: [
    "I'm here to support you. What do you need right now?",
    "Let's take this one step at a time.",
    "You've got this. I believe in you.",
  ],
};

export function CoachProvider({ children }: { children: ReactNode }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<CoachMessage[]>([]);

  const speak = (text: string, type: CoachMessage['type'] = 'instruction') => {
    setCurrentMessage(text);
    setIsSpeaking(true);
    
    const newMessage: CoachMessage = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);

    // Simulate speaking duration (for real AI, this would be actual audio duration)
    setTimeout(() => {
      setIsSpeaking(false);
    }, text.length * 50); // Rough estimate: 50ms per character
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    setCurrentMessage(null);
  };

  const getGreeting = (userName?: string): string => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    
    if (hour < 12) {
      timeGreeting = "Good morning";
    } else if (hour < 17) {
      timeGreeting = "Good afternoon";
    } else {
      timeGreeting = "Good evening";
    }

    const name = userName ? `, ${userName}` : '';
    const greetings = [
      `${timeGreeting}${name}. Ready to move today?`,
      `${timeGreeting}${name}. Let's start slow and steady.`,
      `${timeGreeting}${name}. What are we working on today?`,
      `${timeGreeting}${name}. You showed up. That's what matters.`,
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const getExerciseInstruction = (exerciseName: string, step: string): string => {
    const instructions = [
      `Alright, let's do ${step}. ${step === 'Mountain Pose' ? 'Stand tall, feet together. Ground through all four corners.' : 'Follow my lead.'}`,
      `${step}. ${step.includes('Pose') ? 'Find your balance. Breathe.' : 'Nice and steady.'}`,
      `Now ${step}. ${step.includes('Walk') ? 'Pick up the pace. Pump those arms.' : "You've got this."}`,
      `${step}. ${step.includes('Stretch') ? "Feel the stretch. Don't force it." : 'Perfect form.'}`,
    ];

    return instructions[Math.floor(Math.random() * instructions.length)];
  };

  const getMotivation = (): string => {
    return MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
  };

  const getSupport = (mood: string): string => {
    const moodKey = mood.toLowerCase();
    const messages = SUPPORT_MESSAGES[moodKey] || SUPPORT_MESSAGES.default;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getFeedback = (completed: boolean, exerciseName: string): string => {
    if (completed) {
      return `Great job completing ${exerciseName}. You showed up today. That's what matters.`;
    }
    return `You're doing great with ${exerciseName}. Keep going.`;
  };

  return (
    <CoachContext.Provider
      value={{
        coachName: COACH_PERSONALITY.name,
        isSpeaking,
        currentMessage,
        messages,
        speak,
        stopSpeaking,
        getGreeting,
        getExerciseInstruction,
        getMotivation,
        getSupport,
        getFeedback,
      }}
    >
      {children}
    </CoachContext.Provider>
  );
}

export function useCoach() {
  const context = useContext(CoachContext);
  if (context === undefined) {
    throw new Error('useCoach must be used within a CoachProvider');
  }
  return context;
}

