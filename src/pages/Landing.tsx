import { Link } from 'react-router-dom';
import { Heart, Brain, Target, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/10 glass">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Heart className="w-8 h-8 text-primary group-hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)] transition-all duration-300" />
            <span className="text-2xl font-bold tracking-tight">MindFit</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider hidden sm:block">
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-primary text-black font-bold text-sm rounded-full hover:bg-white transition-all transform hover:scale-105 uppercase tracking-wide"
            >
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
              UNLEASH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                YOUR POTENTIAL
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            The elite platform for mental resilience and physical peak performance. Powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Training <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border border-zinc-700 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all w-full sm:w-auto"
            >
              Member Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface/50 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Mood Tracking", desc: "Scientific emotional analysis." },
              { icon: Brain, title: "Mental Facilty", desc: "Cognitive enhancements." },
              { icon: Target, title: "Precision Plans", desc: "AI-tailored goals." },
              { icon: Sparkles, title: "AI Coach", desc: "24/7 Elite mentorship." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                  <feature.icon className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 border-y border-white/5 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { number: "10k+", label: "Elite Members" },
              { number: "98%", label: "Goal Achievement" },
              { number: "4.9", label: "App Rating" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">{stat.number}</div>
                <div className="text-primary font-bold uppercase tracking-widest text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-zinc-600" />
            <span className="text-xl font-bold text-zinc-600">MindFit</span>
          </div>
          <div className="flex gap-8 text-zinc-500 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="text-zinc-700 text-sm">
            &copy; 2024 MindFit Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
