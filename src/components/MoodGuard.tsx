import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMood } from '../contexts/MoodContext';

interface MoodGuardProps {
    children: ReactNode;
}

export default function MoodGuard({ children }: MoodGuardProps) {
    const { currentMood, isLoading } = useMood();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && !currentMood) {
            // Allow access to these paths without mood
            const publicPaths = ['/', '/login', '/signup', '/mood-checkin', '/onboarding'];
            const isPublic = publicPaths.some(path => location.pathname.startsWith(path));

            if (!isPublic) {
                navigate('/mood-checkin', { replace: true });
            }
        }
    }, [currentMood, isLoading, navigate, location]);

    if (isLoading) return null; // Or a spinner

    return <>{children}</>;
}
