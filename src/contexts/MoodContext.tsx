import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

type MoodType = 'happy' | 'calm' | 'neutral' | 'sad' | 'stressed' | 'anxious' | 'tired' | 'energetic';

interface MoodContextType {
    currentMood: MoodType | null;
    moodIntensity: number;
    setMood: (mood: MoodType, intensity?: number) => Promise<void>;
    isLoading: boolean;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
    const [currentMood, setCurrentMood] = useState<MoodType | null>(() => {
        // Try to restore from local storage on init
        const saved = localStorage.getItem('mindfit_mood');
        return saved as MoodType | null;
    });
    const [moodIntensity, setMoodIntensity] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const setMood = async (mood: MoodType, intensity: number = 5) => {
        setIsLoading(true);
        try {
            // 1. Update State
            setCurrentMood(mood);
            setMoodIntensity(intensity);

            // 2. Persist to Local Storage (for session)
            localStorage.setItem('mindfit_mood', mood);
            localStorage.setItem('mindfit_mood_time', Date.now().toString());

            // 3. Persist to Database (if user logged in)
            if (user) {
                const { error } = await supabase
                    .from('mood_entries')
                    .insert([
                        {
                            user_id: user.id,
                            mood: mood,
                            note: `Intensity: ${intensity}`,
                        }
                    ]);

                if (error) console.error('Error saving mood to DB:', error);
            }
        } catch (err) {
            console.error('Error in setMood:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Optional: Clear mood if session is too old (e.g., > 4 hours)
    useEffect(() => {
        const savedTime = localStorage.getItem('mindfit_mood_time');
        if (savedTime) {
            const diff = Date.now() - parseInt(savedTime);
            if (diff > 4 * 60 * 60 * 1000) { // 4 hours
                setCurrentMood(null);
                localStorage.removeItem('mindfit_mood');
                localStorage.removeItem('mindfit_mood_time');
            }
        }
    }, []);

    return (
        <MoodContext.Provider value={{ currentMood, moodIntensity, setMood, isLoading }}>
            {children}
        </MoodContext.Provider>
    );
}

export function useMood() {
    const context = useContext(MoodContext);
    if (context === undefined) {
        throw new Error('useMood must be used within a MoodProvider');
    }
    return context;
}
