import { useEffect, useState } from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  gradient?: string;
  label: string;
  icon?: React.ReactNode;
  unit?: string;
}

export default function CircularProgress({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = '#8B5CF6',
  gradient,
  label,
  icon,
  unit = '',
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [gradientId] = useState(() => `gradient-${Math.random().toString(36).substr(2, 9)}`);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((animatedValue / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={gradient ? `url(#${gradientId})` : color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          {gradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={gradient.split(' ')[0]} />
                <stop offset="100%" stopColor={gradient.split(' ')[1]} />
              </linearGradient>
            </defs>
          )}
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && <div className="mb-1">{icon}</div>}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {animatedValue.toLocaleString()}
              {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-gray-700">{label}</div>
    </div>
  );
}

