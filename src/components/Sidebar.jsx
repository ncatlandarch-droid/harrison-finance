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

  // Embedded ISLA Chat State directly inside the sidebar
  const [messages, setMessages] = useState([
    {
      sender: 'isla',
      text: "Woof! 🐶 Ask me anything about your TSERS pension, HELOC payoff, or bank accounts!"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const chatBottomRef = useRef(null);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    const newMsg = { sender: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setInputQuery('');

    // Generate ISLA Financial Mascot Response
    setTimeout(() => {
      let responseText = "Woof! 🐶 ";
      const q = userText.toLowerCase();

      if (q.includes('pension') || q.includes('orbit') || q.includes('retirement')) {
        responseText += `Your NC TSERS pension is 8.0 years vested! In May 2040 at Age 60, Option 2 guarantees Erin $1,682.89/mo for life!`;
      } else if (q.includes('heloc') || q.includes('figure') || q.includes('debt')) {
        responseText += `By paying +$1,000/mo extra towards your Figure HELOC, you'll be 100% debt-free in August 2029 and save +$87,400 in interest!`;
      } else if (q.includes('kids') || q.includes('hayden') || q.includes('ava') || q.includes('30k')) {
        responseText += `Hayden (Age 7) needs $172/mo (11 yrs) & Ava (Age 2) needs $105/mo (16 yrs) to hit $30,000 by Age 18!`;
      } else if (q.includes('cash') || q.includes('saving') || q.includes('reserve') || q.includes('novo')) {
        responseText += `You currently have ${fmt(totalLiquidityBalance)} in total liquid reserves across BoA, PenFed, Capital One (4.25%), and Novo!`;
      } else {
        responseText += `Your household generates +${fmt(totalCombinedSurplus)}/mo net surplus! Your collective family wealth score is 885 / 1,000 pts (Grade A+)!`;
      }

      setMessages(prev => [...prev, { sender: 'isla', text: responseText }]);
    }, 500);
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
    <aside style={{
      width: isCollapsed ? '90px' : '310px',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-color)',
      padding: isCollapsed ? '1.25rem 0.5rem' : '1.25rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'all 0.25s ease',
      overflowY: 'auto'
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
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
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

      {/* 🐶 ISLA BULLDOG AI WITH EMBEDDED CONVERSATION DIRECTLY UNDERNEATH HER! */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(0, 70, 132, 0.45), rgba(15, 23, 42, 0.98))',
        border: '2.5px solid #FDB927',
        borderRadius: '20px',
        padding: isCollapsed ? '0.75rem 0.4rem' : '1.1rem 0.85rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.65rem',
        boxShadow: '0 8px 25px rgba(253, 185, 39, 0.25)'
      }}>
        {/* ISLA 175px Portrait Frame */}
        <div style={{
          position: 'relative',
          width: isCollapsed ? '58px' : '150px',
          height: isCollapsed ? '58px' : '150px',
          borderRadius: '50%',
          border: '4px solid #FDB927',
          boxShadow: '0 0 30px rgba(253, 185, 39, 0.75)',
          overflow: 'hidden',
          flexShrink: 0,
          background: '#004684'
        }}>
          <img 
            src="/avatars/isla-bulldog.jpg" 
            alt="ISLA Financial Bulldog Wizard"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/avatars/isla-bulldog.png'; }}
          />
          <span style={{
            position: 'absolute',
            bottom: '6px',
            right: '6px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#10b981',
            border: '2px solid var(--bg-surface)'
          }} />
        </div>

        {!isCollapsed && (
          <div style={{ width: '100%' }}>
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              <span>ISLA Bulldog AI</span>
              <Sparkles size={14} color="#FDB927" />
            </h4>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
              Ask me anything about your finances! 🐶
            </p>

            {/* Embedded Live Chat Messages List directly in Sidebar */}
            <div style={{
              maxHeight: '140px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              textAlign: 'left',
              marginBottom: '0.65rem',
              padding: '0.5rem',
              background: 'rgba(0,0,0,0.35)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: '10px',
                  background: m.sender === 'user' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  fontSize: '0.76rem',
                  lineHeight: '1.4'
                }}>
                  <strong style={{ color: m.sender === 'user' ? '#a5b4fc' : '#FDB927' }}>
                    {m.sender === 'user' ? 'You' : 'ISLA'}:
                  </strong> {m.text}
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Embedded Chat Input Form directly in Sidebar */}
            <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '0.35rem' }}>
              <input 
                type="text" 
                placeholder="Ask ISLA a question..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.65rem',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.76rem'
                }}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg, #FDB927, #f59e0b)', color: '#004684', fontWeight: 900, padding: '0.45rem 0.65rem', borderRadius: '8px' }}
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        )}
      </div>

    </aside>
  );
};
