import React, { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  LayoutDashboard, 
  Wallet, 
  Receipt, 
  Target, 
  Settings, 
  ArrowLeftRight,
  ShieldCheck,
  Building2,
  Flame,
  Bot,
  RefreshCw,
  Sparkles,
  Lock,
  MapPin,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Award,
  Send,
  X,
  MessageSquare
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, totalBoACash, totalCombinedSurplus, totalLiquidityBalance } = useFinance();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Inline Chat Messages State
  const [messages, setMessages] = useState([
    {
      sender: 'isla',
      text: "Woof! 🐶 I'm ISLA, your Harrison Family Financial Mascot & AI Assistant! Ask me anything about your NC pension, $30k kids savings goals, HELOC payoff, or cash reserves!"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const chatBottomRef = useRef(null);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    const newMsg = { sender: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setInputQuery('');

    // Generate ISLA Financial Mascot Response
    setTimeout(() => {
      let responseText = "Woof! 🐶 I've analyzed your family ledger! ";
      const q = userText.toLowerCase();

      if (q.includes('pension') || q.includes('orbit') || q.includes('retirement')) {
        responseText += `Your NC TSERS pension is 8.0 years vested! In May 2040 at Age 60, Option 2 guarantees Erin $1,682.89/mo for life!`;
      } else if (q.includes('heloc') || q.includes('figure') || q.includes('debt')) {
        responseText += `By paying +$1,000/mo extra towards your Figure HELOC, you'll be 100% debt-free in August 2029 and save +$87,400 in interest!`;
      } else if (q.includes('kids') || q.includes('hayden') || q.includes('ava') || q.includes('30k')) {
        responseText += `To hit $30,000 by Age 18: Hayden needs $331/mo (6 yrs left) & Ava needs $172/mo (11 yrs left) out of your +$5,078/mo surplus!`;
      } else if (q.includes('cash') || q.includes('saving') || q.includes('reserve')) {
        responseText += `You currently have ${fmt(totalLiquidityBalance)} in liquid reserves across BoA, PenFed, Capital One (4.25%), and Novo!`;
      } else {
        responseText += `Your family generates +${fmt(totalCombinedSurplus)}/mo in net cash surplus! All 6 member profiles are level 5 Vested MVPs!`;
      }

      setMessages(prev => [...prev, { sender: 'isla', text: responseText }]);
    }, 600);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Roster', icon: LayoutDashboard },
    { id: 'wealth', label: 'Retirement & Wealth', icon: Award },
    { id: 'thinkeco', label: 'Think! Ecosystem Hub', icon: Building2 },
    { id: 'strategy', label: 'Debt & HELOC Payoff', icon: Flame },
    { id: 'recurring', label: 'Subscriptions & Bills', icon: RefreshCw },
    { id: 'localres', label: 'Local NC Resources', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', position: 'sticky', top: 0, height: '100vh', zIndex: 100 }}>
      <aside style={{
        width: isCollapsed ? '90px' : '300px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
        padding: isCollapsed ? '1.25rem 0.5rem' : '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        transition: 'all 0.25s ease'
      }}>
        <div>
          {/* Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', marginBottom: '1.25rem', padding: '0 0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #004684, #4f46e5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px var(--primary-glow)',
                flexShrink: 0
              }}>
                <Building2 size={22} color="#FDB927" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Harrison Finance
                  </h1>
                  <span className="badge badge-primary" style={{ fontSize: '0.66rem', padding: '2px 6px', background: '#004684', color: '#FDB927' }}>PLATFORM v4.0</span>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : ''}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    gap: '0.85rem',
                    padding: isCollapsed ? '0.75rem' : '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'linear-gradient(135deg, #004684, #4f46e5)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.22s ease',
                    boxShadow: isActive ? '0 4px 14px var(--primary-glow)' : 'none'
                  }}
                >
                  <Icon size={18} color={isActive ? '#FDB927' : 'var(--text-muted)'} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 🐶 GIANT 175px ISLA BULLDOG FINANCIAL WIZARD CARD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          
          <div
            onClick={() => setIsChatOpen(!isChatOpen)}
            style={{
              background: 'linear-gradient(180deg, rgba(0, 70, 132, 0.55), rgba(15, 23, 42, 0.98))',
              border: isChatOpen ? '3px solid #10b981' : '3px solid #FDB927',
              borderRadius: '24px',
              padding: isCollapsed ? '0.75rem 0.4rem' : '1.25rem 0.85rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.65rem',
              transition: 'all 0.25s ease',
              boxShadow: isChatOpen ? '0 12px 35px rgba(16, 185, 129, 0.4)' : '0 12px 35px rgba(253, 185, 39, 0.35)'
            }}
            className="card-hover"
          >
            {/* Speech Bubble Header */}
            {!isCollapsed && (
              <div style={{
                background: 'rgba(253, 185, 39, 0.2)',
                border: '1px solid #FDB927',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.74rem',
                color: '#FDB927',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Sparkles size={12} color="#FDB927" />
                <span>"Woof! Tap to Chat Below!"</span>
              </div>
            )}

            {/* GIANT 175px ISLA PHOTO AVATAR FRAME */}
            <div style={{
              position: 'relative',
              width: isCollapsed ? '58px' : '175px',
              height: isCollapsed ? '58px' : '175px',
              borderRadius: '50%',
              border: '5px solid #FDB927',
              boxShadow: '0 0 40px rgba(253, 185, 39, 0.85)',
              overflow: 'hidden',
              flexShrink: 0,
              background: '#004684',
              transition: 'all 0.25s ease'
            }}>
              <img 
                src="/avatars/isla-bulldog.jpg" 
                alt="ISLA Financial Bulldog Wizard"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/avatars/isla-bulldog.png'; }}
              />
              <span style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2.5px solid var(--bg-surface)'
              }} />
            </div>

            {!isCollapsed && (
              <div>
                <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <span>ISLA Bulldog AI</span>
                  <Sparkles size={14} color="#FDB927" />
                </h4>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  Financial Mascot & Guide 🐶
                </p>
                <button 
                  className="btn btn-primary"
                  style={{
                    background: isChatOpen ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #FDB927, #f59e0b)',
                    color: isChatOpen ? '#fff' : '#004684',
                    fontSize: '0.82rem',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontWeight: 900,
                    marginTop: '0.5rem',
                    width: '100%',
                    boxShadow: '0 4px 14px rgba(253, 185, 39, 0.4)'
                  }}
                >
                  {isChatOpen ? 'Close Chat Panel ✖' : 'Ask ISLA AI 💬'}
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* 💬 INLINE EMBEDDED ISLA CHAT DRAWER (RIGHT ON THE SAME SCREEN - NO POPUPS!) */}
      {isChatOpen && (
        <div style={{
          width: '370px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
          boxShadow: '10px 0 35px rgba(0,0,0,0.5)',
          animation: 'fade-in 0.2s ease'
        }}>
          {/* Inline Chat Header */}
          <div className="flex-between" style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(0, 70, 132, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid #FDB927', overflow: 'hidden' }}>
                <img src="/avatars/isla-bulldog.jpg" alt="ISLA AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>ISLA AI Mascot</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--success)' }}>🟢 Live Context Connected</div>
              </div>
            </div>

            <button onClick={() => setIsChatOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={16} />
            </button>
          </div>

          {/* Inline Chat Messages List */}
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '0.85rem 1rem',
                  borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #004684, #4f46e5)' : 'rgba(30, 41, 59, 0.85)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.84rem',
                  lineHeight: '1.55'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Inline Chat Input Form */}
          <form onSubmit={handleSendChat} style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)' }}>
            <input 
              type="text" 
              placeholder="Ask ISLA about pension, HELOC, or savings..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              style={{ flex: 1, padding: '0.65rem 0.85rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.84rem' }}
            />
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #FDB927, #f59e0b)', color: '#004684', fontWeight: 800, padding: '0.65rem' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
