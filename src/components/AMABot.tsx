import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_BANNER, PROJECTS, SKILLS, TIMELINE, AWARDS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AMABot({ isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm Sainadh's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const context = `
        You are Sainadh's personal AI Assistant. 
        Your goal is to answer questions about Sainadh's career, projects, and skills based on the provided data.
        
        Sainadh's Profile:
        - Headline: ${PROFILE_BANNER.headline}
        - Summary: ${PROFILE_BANNER.profile_summary}
        
        Experience:
        ${TIMELINE.map(t => `- ${t.title} at ${t.name} (${t.date_range}): ${t.summary_points.join(', ')}`).join('\n')}
        
        Projects:
        ${PROJECTS.map(p => `- ${p.title}: ${p.description} (Stack: ${p.tech_stack.join(', ')})`).join('\n')}
        
        Skills:
        ${SKILLS.map(s => `- ${s.name} (${s.category}): ${s.description}`).join('\n')}
        
        Awards:
        ${AWARDS.map(a => `- ${a.title} from ${a.organization} (${a.date})`).join('\n')}

        Be professional, helpful, and concise. Use a friendly tone.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: context,
        },
      });

      setMessages(prev => [...prev, { role: 'bot', content: response.text || "Sorry, I couldn't understand that." }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Error: Could not connect to AI. Please check API key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-4 right-4 w-full max-w-md h-[500px] bg-netflix-dark rounded-xl border border-gray-800 shadow-2xl z-[60] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-netflix-black p-4 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-white uppercase text-xs tracking-widest">Ask Me Anything</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg flex gap-3 ${msg.role === 'user' ? 'bg-netflix-red text-white' : 'bg-gray-800 text-gray-200'}`}>
                   {msg.role === 'bot' && <Bot className="w-5 h-5 shrink-0 mt-1" />}
                   <div className="prose prose-invert prose-sm">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                   </div>
                   {msg.role === 'user' && <User className="w-5 h-5 shrink-0 mt-1" />}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-200 p-3 rounded-lg flex gap-2 items-center">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-800">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sainadh's experience..."
                className="w-full bg-netflix-black border border-gray-700 rounded-full py-2 px-4 pr-12 text-white focus:outline-none focus:border-netflix-red transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-1.5 bg-netflix-red rounded-full text-white disabled:opacity-50 disabled:bg-gray-700 transition-all font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
