import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { ISLAAssistantModal } from './ISLAAssistantModal';
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
  Award
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, totalBoACash } = useFinance();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Streamlined Core Navigation Items
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
    <>
      <aside style={{
        width: isCollapsed ? '90px' : '290px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
        padding: isCollapsed ? '1.25rem 0.5rem' : '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'all 0.25s ease'
      }}>
        <div>
          {/* Brand Logo & Collapse Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', marginBottom: '1.5rem', padding: '0 0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
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
                  <h1 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Harrison Finance
                  </h1>
                  <span className="badge badge-primary" style={{ fontSize: '0.66rem', padding: '2px 6px', background: '#004684', color: '#FDB927' }}>PLATFORM v4.0</span>
                </div>
              )}
            </div>

            {/* Collapse Toggle Button */}
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
                    transition: 'all 0.2s ease',
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

        {/* 🐶 2X LARGER ISLA BULLDOG FINANCIAL WIZARD ASSISTANT CARD (150px) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          
          <div
            onClick={() => setIsAiModalOpen(true)}
            style={{
              background: 'linear-gradient(180deg, rgba(0, 70, 132, 0.5), rgba(15, 23, 42, 0.98))',
              border: '3px solid #FDB927',
              borderRadius: '24px',
              padding: isCollapsed ? '0.75rem 0.4rem' : '1.35rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.75rem',
              transition: 'all 0.25s ease',
              boxShadow: '0 12px 35px rgba(253, 185, 39, 0.35)'
            }}
            className="card-hover"
            title={isCollapsed ? "ISLA Bulldog Financial Wizard AI" : ""}
          >
            {/* Speech Bubble Header */}
            {!isCollapsed && (
              <div style={{
                background: 'rgba(253, 185, 39, 0.2)',
                border: '1px solid #FDB927',
                padding: '4px 14px',
                borderRadius: '16px',
                fontSize: '0.76rem',
                color: '#FDB927',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Sparkles size={12} color="#FDB927" />
                <span>"Woof! Ask ISLA AI!"</span>
              </div>
            )}

            {/* 2X LARGER ISLA PHOTO AVATAR FRAME (150px) */}
            <div style={{
              position: 'relative',
              width: isCollapsed ? '58px' : '150px',
              height: isCollapsed ? '58px' : '150px',
              borderRadius: '50%',
              border: '4.5px solid #FDB927',
              boxShadow: '0 0 35px rgba(253, 185, 39, 0.8)',
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
              <div>
                <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <span>ISLA Bulldog AI</span>
                  <Sparkles size={14} color="#FDB927" />
                </h4>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  Financial Wizard & Mascot 🐶
                </p>
                <button 
                  className="btn btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #FDB927, #f59e0b)',
                    color: '#004684',
                    fontSize: '0.82rem',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontWeight: 900,
                    marginTop: '0.6rem',
                    width: '100%',
                    boxShadow: '0 4px 14px rgba(253, 185, 39, 0.4)'
                  }}
                >
                  Ask ISLA AI 💬
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Footer Account Balance */}
          {!isCollapsed && (
            <div style={{
              padding: '0.75rem 0.85rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>BOA LIQUID CASH</div>
              <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.1rem' }}>
                {fmt(totalBoACash)}
              </div>
            </div>
          )}

        </div>
      </aside>

      {/* AI Assistant Modal */}
      <ISLAAssistantModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
};
