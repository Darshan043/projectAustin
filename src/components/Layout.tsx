import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, Activity, Brain, Apple, Music, TrendingUp, MessageCircle, Trophy, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Background3D from './Background3D';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/exercise', icon: Activity, label: 'Exercise' },
    { path: '/meditation', icon: Brain, label: 'Meditate' },
    { path: '/diet', icon: Apple, label: 'Diet' },
    { path: '/music', icon: Music, label: 'Music' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/chat', icon: MessageCircle, label: 'AI Mentor' },
    { path: '/challenges', icon: Trophy, label: 'Challenges' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-primary selection:text-black relative">
      <Background3D />
      {/* Top Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <Heart className="w-8 h-8 text-primary group-hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">MindFit</span>
          </Link>

          <Link
            to="/emergency"
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20 transition-all border border-red-500/20 hover:border-red-500/40"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Emergency</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 pt-24 pb-24 lg:pb-8 flex max-w-7xl mx-auto w-full gap-8 px-6">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-2">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={clsx(
                    "group flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden",
                    isActive ? "bg-white/5 text-primary shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)]" : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-y-0 left-0 w-1 bg-primary rounded-full my-3"
                    />
                  )}
                  <Icon className={clsx("w-6 h-6 transition-transform group-hover:scale-110", isActive ? "text-primary filter drop-shadow-[0_0_5px_rgba(204,255,0,0.3)]" : "")} />
                  <span className="font-medium tracking-wide">{label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1 min-w-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 pb-safe">
        <div className="flex justify-around items-center h-20 px-2">
          {navItems.slice(0, 5).map(({ path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={clsx(
                  "p-4 rounded-2xl relative transition-all duration-300",
                  isActive ? "text-primary" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active"
                    className="absolute inset-0 bg-white/5 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={clsx("w-7 h-7 relative z-10", isActive ? "filter drop-shadow-[0_0_5px_rgba(204,255,0,0.3)]" : "")} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
