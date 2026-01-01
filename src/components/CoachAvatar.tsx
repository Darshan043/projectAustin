import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoachAvatarProps {
  message?: string;
  isSpeaking?: boolean;
  size?: 'small' | 'medium' | 'large';
  pulseColor?: string;
}

export default function CoachAvatar({
  message,
  isSpeaking = false,
  size = 'medium',
  pulseColor = '#ccff00', // Volt default
}: CoachAvatarProps) {

  const sizeMap = {
    small: 80,
    medium: 160,
    large: 240,
  };

  const dimension = sizeMap[size];

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Abstract AI Orb */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: dimension, height: dimension }}
      >
        {/* Core Glow */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.2, 1] : [1, 1.05, 1],
            opacity: isSpeaking ? [0.8, 1, 0.8] : [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: isSpeaking ? 0.4 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ backgroundColor: pulseColor, opacity: 0.5 }}
        />

        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-white/20 rounded-full border-t-white/80 border-r-transparent border-b-transparent border-l-transparent"
        />

        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-white/10 rounded-full border-b-white/50 border-t-transparent"
        />

        {/* Central Core */}
        <div className="relative w-1/2 h-1/2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
        </div>

        {/* Speaking Waves */}
        {isSpeaking && (
          <div className="absolute inset-0 z-0">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-white/30"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Message Label */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 max-w-sm text-center"
          >
            <div className="inline-block relative">
              <div className="glass px-6 py-4 rounded-2xl border border-white/10 text-white font-medium leading-relaxed shadow-xl">
                {message}
              </div>
              {/* Triangle */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface border-l border-t border-white/10 transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
