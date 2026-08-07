import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Check, Building2 } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: 'Welcome to Amit Traders Corporate B2B Assistant! How can I assist you with custom leather specifications, MOQ guidelines, foil stamping, or client case studies (e.g. BASF, SKF, NSDL)?'
    }
  ]);

  const quickQueries = [
    'What is the MOQ for custom debossed leather padfolios?',
    'How do you customize gift sets for corporate clients like BASF & SKF?',
    'What is the difference between full-grain leather and bonded leather?',
    'Can I request a physical sample kit delivered to our office?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputPrompt;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    if (!queryText) setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply || 'Thank you for your inquiry. Please reach out to our team at corporate@amittraders.in.' }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Amit Traders has over 18 years of experience supplying full-grain leather goods to top multinationals with MOQs starting from 25-50 units. Please request a physical sample kit via our form!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#1D1916] text-[#FDFBF7] border border-[#D4AF37]/40 rounded-2xl max-w-2xl w-full h-[600px] max-h-[90vh] shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#171412] border-b border-[#332A23] flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#8B4513]/40 border border-[#8B4513] text-[#D4AF37] flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-white flex items-center gap-2">
                Amit Traders AI B2B Advisor
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#8B4513] text-white rounded">Gemini Powered</span>
              </h3>
              <p className="text-[10px] text-[#A89887]">Ask about leather grades, embossing, MOQs, & turnaround times</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#2A231D] hover:bg-[#382E26] text-[#A89887] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-[#2B231D] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-3 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#8B4513] text-white rounded-tr-none'
                    : 'bg-[#241E1A] text-[#E2D5C5] border border-[#382E26] rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#382E26] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] p-2 italic">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing leather crafting specifications...</span>
            </div>
          )}
        </div>

        {/* Quick Query Pills */}
        <div className="px-4 py-2 border-t border-[#2D251F] bg-[#171412] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-[#241E1A] hover:bg-[#332922] text-[#C5B4A1] hover:text-white text-[10px] whitespace-nowrap border border-[#382E26] transition shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#171412] border-t border-[#332A23] rounded-b-2xl flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about custom orders, leather types, MOQs..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#241E1A] text-xs text-white placeholder-[#78695C] px-3.5 py-2.5 rounded-xl border border-[#382E26] focus:border-[#D4AF37] focus:outline-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={loading || !inputPrompt.trim()}
            className="p-2.5 rounded-xl bg-[#8B4513] hover:bg-[#A0522D] text-white transition disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

      </div>
    </div>
  );
};
