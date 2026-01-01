import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';

import CoachAvatar from '../components/CoachAvatar';
import { Send, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  created_at: string;
}

export default function AIChat() {
  const { user } = useAuth();
  const { currentMood } = useMood();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(50);
      if (data) setMessages(data);
    };
    fetchMessages();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // 1. Mood-Specific Overrides
    if (currentMood === 'stressed' || currentMood === 'anxious') {
      if (lowerMessage.includes('help') || lowerMessage.includes('hard')) {
        return "I hear you. Let's take it slow. Have you tried the 'Instant Calm' breathing exercise in the Meditation tab? It might help ground you right now.";
      }
      return "It's okay to feel this way. I'm here to support you. We can either talk it out or try some gentle movement. What feels right?";
    }

    if (currentMood === 'energetic') {
      if (lowerMessage.includes('workout') || lowerMessage.includes('ready')) {
        return "That's the spirit! I recommend the 'Explosive HIIT' session today. Let's burn that energy!";
      }
      return "Love the energy! Let's channel it into something productive. Ready to crush a workout or set a new record?";
    }

    if (currentMood === 'sad' || currentMood === 'tired') {
      return "I'm sorry you're feeling down. Remember, rest is productive too. Maybe a gentle yoga flow or just some quiet time would be best today.";
    }

    // 2. Geneirc Heuristics
    if (lowerMessage.includes('motivation')) {
      return "Focus on the feeling of completion. You are stronger than your hesitation.";
    }

    return "I'm listening. Tell me more about how you're feeling knowing that you checked in as " + currentMood + " today.";
  };

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    const userMessage = { user_id: user.id, message: input, sender: 'user' as const };

    setLoading(true);
    setInput('');
    try {
      // Optimistic update
      const tempId = Date.now().toString();
      setMessages(prev => [...prev, { ...userMessage, id: tempId, created_at: new Date().toISOString() }]);

      const { error: userError } = await supabase.from('chat_messages').insert([userMessage]).select().single();
      if (userError) throw userError;

      // Simulate AI thinking delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const aiResponse = getAIResponse(input);
      const aiMessage = { user_id: user.id, message: aiResponse, sender: 'ai' as const };
      const { data: aiMsg, error: aiError } = await supabase.from('chat_messages').insert([aiMessage]).select().single();

      if (aiError) throw aiError;
      if (aiMsg) setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto">
        {/* Header Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative rounded-[40px] bg-zinc-900 border border-white/5 shadow-2xl">

          {/* Top Bar */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-zinc-900/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <CoachAvatar size="small" isSpeaking={loading} message="" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-none">Aarav</h2>
                <p className="text-sm text-zinc-500 font-medium">AI Performance Coach</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              <Zap className={`w-4 h-4 ${currentMood === 'energetic' ? 'text-yellow-400' : 'text-zinc-500'}`} />
              <span className="text-xs font-bold text-zinc-400 uppercase">
                Context: {currentMood || 'Neutral'}
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center opacity-50">
                <CoachAvatar size="large" isSpeaking={false} message="I am ready when you are." />
                <p className="mt-8 text-zinc-400 max-w-sm">
                  I'm aware you're feeling <strong>{currentMood}</strong>. How can I support your goal today?
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-8 opacity-30">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Session Started</span>
                </div>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] px-6 py-4 rounded-3xl text-lg leading-relaxed shadow-sm ${msg.sender === 'user'
                      ? 'bg-white text-black rounded-br-none'
                      : 'bg-zinc-800 text-white border border-white/5 rounded-bl-none'
                      }`}>
                      <p>{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 px-6 py-4 rounded-3xl rounded-bl-none border border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-zinc-900/90 border-t border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-3 bg-zinc-800/50 rounded-full px-2 py-2 border border-white/5 focus-within:border-primary/50 transition-colors shadow-lg">
              <button className="p-3 rounded-full hover:bg-white/10 text-zinc-400 transition-colors">
                <Sparkles className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask Aarav about your ${currentMood} mood...`}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-zinc-500 px-2 h-full"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 rounded-full bg-white text-black hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
