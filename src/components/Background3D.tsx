export default function Background3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Deep Indigo Orb */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-indigo-600/30 blur-[100px] animate-float-slow mix-blend-screen" />

            {/* Cyan/Teal Accent */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] rounded-full bg-cyan-500/20 blur-[120px] animate-float-delayed mix-blend-screen" />

            {/* Purple Depth */}
            <div className="absolute top-[40%] left-[60%] w-[40vh] h-[40vh] rounded-full bg-purple-600/20 blur-[90px] animate-pulse-slow mix-blend-screen" />

            {/* Grid Overlay for Tech Feel */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

            <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
        .animate-float-slow {
          animation: float-slow 20s infinite ease-in-out;
        }
        .animate-float-delayed {
          animation: float-delayed 25s infinite ease-in-out reverse;
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
}
