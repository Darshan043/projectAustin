import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithEmailOnly } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (password.trim()) {
        await signIn(email, password);
      } else {
        await signInWithEmailOnly(email);
      }
      navigate('/dashboard');
    } catch (err) {
      try {
        await signInWithEmailOnly(email);
        navigate('/dashboard');
      } catch (fallbackErr) {
        setError('Please enter a valid email address');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden flex relative h-[600px] md:h-[700px] border border-zinc-800">

        {/* Yellow Decoration Background Element */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-yellow-400 transform skew-x-[-12deg] translate-x-20 z-0 hidden md:block" />

        {/* Left Side (Content/Space) - Mobile Hidden, Desktop Visible */}
        <div className="hidden md:flex flex-col justify-center w-1/2 relative z-10 p-12">
          {/* Geometric aesthetics could go here or just negative space */}
          <div className="absolute bottom-10 left-10">
            <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">
              MIND<span className="text-yellow-400">FIT</span>
            </h1>
            <div className="h-2 w-24 bg-yellow-400 mt-4" />
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 bg-zinc-900/90 backdrop-blur-sm relative z-20 flex flex-col justify-center px-12 md:bg-transparent">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 text-3xl font-bold mb-2">
              <span className="text-white">LOGIN</span>
              <span className="text-zinc-600 text-xl font-medium">/</span>
              <Link to="/signup" className="text-zinc-600 text-xl font-medium hover:text-white transition-colors">Sign up</Link>
            </div>
            <div className="h-1 w-12 bg-yellow-400 rounded-full" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border-l-4 border-red-500 text-red-500 px-4 py-3 mb-6 text-sm font-bold">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 block group-focus-within:text-yellow-400 transition-colors">Email or Username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-zinc-700 py-2 text-white font-medium focus:border-yellow-400 outline-none transition-colors placeholder-zinc-700"
                placeholder="habib.nassiry@gmail.com"
              />
            </div>

            <div className="relative group">
              <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 block group-focus-within:text-yellow-400 transition-colors">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-zinc-700 py-2 text-white font-medium focus:border-yellow-400 outline-none transition-colors placeholder-zinc-700"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex justify-end">
              <Link to="#" className="text-yellow-400 text-xs font-bold hover:underline">Forget pass</Link>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={loading}
                className="relative w-16 h-16"
              >
                {/* Hexagon Shape Button */}
                <div className="absolute inset-0 bg-yellow-400 hover:bg-yellow-300 transition-colors flex items-center justify-center [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] cursor-pointer shadow-lg shadow-yellow-400/20">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-6 h-6 text-black" />
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
