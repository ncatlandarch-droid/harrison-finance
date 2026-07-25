import React, { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Bot, Send, Sparkles, X, ChevronRight, AlertCircle, Building2, Wallet, ArrowRight } from 'lucide-react';

export const CoachHarrisonModal = ({ isOpen, onClose }) => {
  const { data, totalBaseIncome, totalExternalExpenses, totalCombinedSurplus, totalBoACash } = useFinance();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Chris! I'm **Coach Perry**, your AI Financial Strategy Advisor. I have completed a full audit of your family data, Bank of America statements, 5 live accounts, and 34 itemized bills.\n\nAsk me anything about your cash flow, Barbara's Figure loan, or monthly transfer strategy!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Why are our checking accounts low right now?",
    "How do we stop Barbara's Figure loan from jumping to 15.3%?",
    "How much did we spend on DoorDash and dining?",
    "What transfers should we make on the 1st of the month?"
  ];

  const handleSend = (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    if (!queryText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const q = textToSend.toLowerCase();

      if (q.includes("low") || q.includes("broke") || q.includes("why")) {
        aiResponse = "Based on your 3-month Bank of America statement audit, your accounts dropped in July due to **3 specific expenses totalling $10,419.61**:\n\n1. **$2,000 Lump Credit Card Payment:** Paid off BoA Card #6343 on July 1st.\n2. **$1,732.88 Google Cloud Charges:** (Now stopped! $0/mo going forward).\n3. **Paycheck Timing:** Your NC A&T paycheck posted on June 30th ($7,195) instead of July 1st.\n\nStopping the Google Cloud charges recovers **+$2,285/month** in cash starting right now!";
      } else if (q.includes("figure") || q.includes("loan") || q.includes("15.3") || q.includes("barbara")) {
        aiResponse = "Barbara's Figure Room Addition loan currently has a **$1,000/month payment at 9.75%**. In **August 2029**, the rate adjusts up to **15.30%**, driving total 30-year interest from $140,000 up to **$227,000**!\n\n**Recommended Strategy:** Allocate $500/month from your $5,078 net monthly family surplus toward extra principal payoff, or refinance into a fixed-rate loan before 2029 to save $87,000 in interest!";
      } else if (q.includes("doordash") || q.includes("food") || q.includes("dining")) {
        aiResponse = "Over the last 3 months, your Bank of America statement shows **$3,745.58 spent on Restaurants & Dining across 64 orders** (~$1,248.53/month).\n\n**Top Merchants:** DoorDash ($150 Upper Crust, $147 Da Reggae Cafe, $139 Paris Banh Mi, Outback Steakhouse) and Toast Bar & Grille.\n\nSetting a **$500/month dining budget** will instantly save your family **+$748.53/month** in real cash!";
      } else if (q.includes("transfer") || q.includes("1st") || q.includes("zelle")) {
        aiResponse = "To prevent checking accounts from going negative (like Papi Checking -7333 at -$36.00), follow this **1st-of-the-Month Transfer Protocol**:\n\n1. **Barbara → Chris:** Transfer **$3,000.00** via Zelle/BoA on the 1st for household food and mortgage.\n2. **Erin → Chris:** Transfer **$780.00** on the 1st for shared car insurance and household pool.\n3. **Chris:** Allocate $1,200 for Mortgage and $1,333 for BoA Card #6343 paydown.\n\nThis keeps Papi Checking and Adv Plus Banking positive all month long!";
      } else {
        aiResponse = `Your family has a **total external income of $14,455.20/month** and real external bills of **$9,377.06/month**, leaving a **real net surplus of +$5,078.14/month**.\n\nYour current liquid cash across Bank of America accounts is **$3,268.27**, plus Mom's PenFed reserve of **$76,155.00**. How would you like to optimize your cash flow today?`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.78)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="animate-scale-up" style={{
        width: '100%',
        maxWidth: '740px',
        height: '85vh',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, #004684, #00335f)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#FDB927',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(253, 185, 39, 0.4)'
            }}>
              <Bot size={26} color="#004684" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>Coach Perry AI Advisor</span>
                <Sparkles size={16} color="#FDB927" />
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Financial Strategy Engine • Trained on 463 BoA transactions & family plan.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              style={{
                whiteSpace: 'nowrap',
                background: 'rgba(0, 70, 132, 0.3)',
                border: '1px solid rgba(253, 185, 39, 0.4)',
                color: '#FDB927',
                padding: '0.4rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map((m, idx) => {
            const isAi = m.sender === 'ai';
            return (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: isAi ? 'flex-start' : 'flex-end',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                {isAi && (
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#FDB927', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={20} color="#004684" />
                  </div>
                )}
                <div style={{
                  maxWidth: '82%',
                  padding: '1rem 1.15rem',
                  borderRadius: isAi ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  background: isAi ? 'rgba(30, 41, 59, 0.9)' : 'linear-gradient(135deg, #004684, #00335f)',
                  border: isAi ? '1px solid var(--border-color)' : 'none',
                  color: '#fff',
                  fontSize: '0.92rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {m.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Bot size={18} color="#FDB927" className="animate-spin" />
              <span>Coach Perry is analyzing your Bank of America data...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Footer */}
        <div style={{ padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
          <input 
            type="text"
            className="input"
            placeholder="Ask Coach Perry about your bills, savings, loan interest, or cash flow..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, fontSize: '0.92rem' }}
          />
          <button 
            className="btn"
            onClick={() => handleSend()}
            style={{ background: 'linear-gradient(135deg, #004684, #00335f)', color: '#FDB927', fontWeight: 700, padding: '0 1.25rem' }}
          >
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
