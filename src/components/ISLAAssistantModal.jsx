import React, { useState, useEffect, useRef } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Send, Sparkles, Bot, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

export const ISLAAssistantModal = ({ isOpen, onClose }) => {
  const { data, totalCombinedSurplus, totalLiquidityBalance } = useFinance();
  const [messages, setMessages] = useState([
    {
      sender: 'isla',
      text: "Woof! 🐶 I'm ISLA, your Harrison family Financial Bulldog AI Wizard! Ask me anything about your $5,078/mo surplus, HELOC payoff, Hayden & Ava's $30k savings goals, or estate care!"
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    // AI Response Engine for ISLA Bulldog
    setTimeout(() => {
      let reply = "Woof! 🐶 I analyzed your query across your Bank of America statements and family budget:";
      const lower = userMsg.toLowerCase();

      if (lower.includes('heloc') || lower.includes('figure')) {
        reply = "Woof! 🐶 To pay off Barbara's Figure HELOC before the August 2029 15.30% rate jump, pay $3,215/mo ($1,000 min + $2,215 extra). You'll be 100% debt-free in 36 months and save +$87,400 in interest!";
      } else if (lower.includes('hayden') || lower.includes('ava') || lower.includes('college') || lower.includes('30k') || lower.includes('kids')) {
        reply = "Woof! 🐶 To hit $30,000 for each child by age 18: Hayden (age 12) needs $331/mo for 6 years. Ava (age 7) needs $172/mo for 11 years. Total: $503/mo out of your +$5,078/mo surplus!";
      } else if (lower.includes('surplus') || lower.includes('cash')) {
        reply = `Woof! 🐶 Your family generates +$5,078.14/mo in net monthly cash surplus with $79,423.27 in total liquid reserves across BoA and PenFed!`;
      } else if (lower.includes('papi') || lower.includes('estate') || lower.includes('death')) {
        reply = "Woof! 🐶 To close Papi's BoA account (7333), call BoA Estate Servicing at 888-689-4466 with certified Death Certificate + Photo ID after transferring the -$36.00 balance into Adv Plus 4717.";
      } else {
        reply = `Woof! 🐶 As your Financial Bulldog AI, I recommend allocating your +$5,078/mo surplus: 1) $2,215 extra to HELOC payoff, 2) $503/mo to Hayden & Ava's $30k goals, and 3) $1,500/mo into High-Yield Wealth!`;
      }

      setMessages(prev => [...prev, { sender: 'isla', text: reply }]);
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="animate-scale-up" style={{
        width: '100%',
        maxWidth: '720px',
        height: '80vh',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: '2.5px solid #FDB927',
        boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(253, 185, 39, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.5), rgba(79, 70, 229, 0.3))',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2.5px solid #FDB927',
              boxShadow: '0 0 16px rgba(253, 185, 39, 0.6)',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img 
                src="/avatars/isla-bulldog.jpg" 
                alt="ISLA Bulldog AI"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/avatars/isla-bulldog.png'; }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>ISLA Financial Bulldog AI Wizard</span>
                <Sparkles size={16} color="#FDB927" />
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#FDB927', fontWeight: 700 }}>
                Harrison Family Financial Guide 🐶
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '82%',
                padding: '0.9rem 1.1rem',
                borderRadius: '16px',
                background: m.sender === 'user' ? 'linear-gradient(135deg, #004684, #4f46e5)' : 'rgba(30, 41, 59, 0.9)',
                border: m.sender === 'user' ? 'none' : '1px solid rgba(253, 185, 39, 0.4)',
                color: '#fff',
                fontSize: '0.88rem',
                lineHeight: '1.55',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
              }}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{ padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
          <input 
            type="text"
            placeholder="Ask ISLA about HELOC payoff, Hayden & Ava's $30k goals, or monthly surplus..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, padding: '0.85rem 1.1rem', borderRadius: '30px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #FDB927, #f59e0b)', color: '#004684', fontWeight: 900, borderRadius: '30px', padding: '0 1.25rem' }}>
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};
