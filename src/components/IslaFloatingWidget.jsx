import React, { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Sparkles, Send, X, MessageSquare, Bot } from 'lucide-react';

export const IslaFloatingWidget = () => {
  const { totalLiquidityBalance, totalCombinedSurplus } = useFinance();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'isla',
      text: "Woof! 🐶 I'm ISLA, your family's AI Financial Guardian! Ask me anything about your pensions, bank accounts, or HELOC payoff!"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const chatBottomRef = useRef(null);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputQuery('');

    // Generate ISLA Financial Mascot Response
    setTimeout(() => {
      let responseText = "Woof! 🐶 ";
      const q = userText.toLowerCase();

      if (q.includes('pension') || q.includes('orbit') || q.includes('retirement')) {
        responseText += `Chris's NC TSERS pension is 8.0 years vested! At Age 60 (May 2040), Option 2 guarantees Erin $1,682.89/mo for life! Mom's OPM pension provides $5,645.84/mo!`;
      } else if (q.includes('heloc') || q.includes('figure') || q.includes('debt')) {
        responseText += `By paying +$1,000/mo extra towards your Figure HELOC, you'll be 100% debt-free in August 2029 and save +$87,400 in interest!`;
      } else if (q.includes('kids') || q.includes('hayden') || q.includes('ava') || q.includes('30k')) {
        responseText += `Hayden (Age 7) needs $172/mo (11 yrs) & Ava (Age 2) needs $105/mo (16 yrs) to hit $30,000 by Age 18!`;
      } else if (q.includes('cash') || q.includes('saving') || q.includes('reserve') || q.includes('novo')) {
        responseText += `You currently have ${fmt(totalLiquidityBalance)} in total liquid reserves across BoA, PenFed, Capital One (4.25%), and Novo ($350)!`;
      } else {
        responseText += `Your household generates +${fmt(totalCombinedSurplus)}/mo net cash surplus! Your collective family score is 885 / 1,000 pts (Grade A+)!`;
      }

      setMessages(prev => [...prev, { sender: 'isla', text: responseText }]);
    }, 500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999 }}>
      
      {/* Expanded Chat Box */}
      {isOpen && (
        <div style={{
          width: '360px',
          maxHeight: '480px',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          borderRadius: '20px',
          border: '2.5px solid #FDB927',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(253, 185, 39, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginBottom: '12px',
          animation: 'fadeIn 0.25s ease'
        }}>
          
          {/* Chat Header */}
          <div className="flex-between" style={{ padding: '0.85rem 1.1rem', background: 'linear-gradient(135deg, #004684, #4f46e5)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #FDB927', overflow: 'hidden', background: '#004684', flexShrink: 0 }}>
                <img 
                  src="/avatars/isla-bulldog.jpg" 
                  alt="ISLA" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/avatars/isla-bulldog.png'; }}
                />
              </div>
              <div>
                <h4 style={{ fontWeight: 900, color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>ISLA Bulldog AI</span>
                  <Sparkles size={13} color="#FDB927" />
                </h4>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 800 }}>Online • Family Financial Guardian</span>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            padding: '0.85rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            maxHeight: '340px',
            background: 'rgba(0,0,0,0.3)'
          }}>
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #004684, #4f46e5)' : 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  lineHeight: '1.45',
                  border: m.sender === 'isla' ? '1px solid rgba(253, 185, 39, 0.3)' : 'none'
                }}
              >
                {m.sender === 'isla' && (
                  <div style={{ fontSize: '0.7rem', color: '#FDB927', fontWeight: 900, marginBottom: '0.15rem' }}>ISLA AI:</div>
                )}
                {m.text}
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChat} style={{ padding: '0.65rem 0.85rem', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '0.4rem' }}>
            <input 
              type="text" 
              placeholder="Ask ISLA about TSERS, HELOC, accounts..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '0.55rem 0.85rem',
                borderRadius: '20px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.8rem'
              }}
            />
            <button 
              type="submit" 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FDB927, #f59e0b)',
                color: '#004684',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}

      {/* Floating Badge Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          border: '3px solid #FDB927',
          background: 'linear-gradient(135deg, #004684, #4f46e5)',
          boxShadow: '0 8px 30px rgba(253, 185, 39, 0.65)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.25s ease'
        }}
        className="card-hover"
        title="Ask ISLA AI Financial Assistant"
      >
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
          <img 
            src="/avatars/isla-bulldog.jpg" 
            alt="ISLA Mascot" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/avatars/isla-bulldog.png'; }}
          />
        </div>

        {/* Online Indicator Green Dot */}
        <span style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#10b981',
          border: '2px solid #0f172a'
        }} />
      </button>

    </div>
  );
};
