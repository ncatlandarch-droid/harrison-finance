import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CoachHarrisonModal } from './CoachHarrisonModal';
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
  ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, totalBoACash } = useFinance();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Streamlined 7 Core Non-Redundant Navigation Items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Roster', icon: LayoutDashboard },
    { id: 'familyvault', label: 'Encrypted Family Vault', icon: Lock },
    { id: 'thinkeco', label: 'Think! Ecosystem Hub', icon: Building2 },
    { id: 'strategy', label: 'Debt & HELOC Payoff', icon: Flame },
    { id: 'recurring', label: 'Subscriptions & Bills', icon: RefreshCw },
    { id: 'localres', label: 'Local NC Resources', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <aside style={{
        width: isCollapsed ? '78px' : '260px',
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

        {/* 🐶 ISLA BULLDOG FINANCIAL WIZARD ASSISTANT WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          
          <button
            onClick={() => setIsAiModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.45), rgba(79, 70, 229, 0.35))',
              border: '1.5px solid rgba(253, 185, 39, 0.5)',
              borderRadius: 'var(--radius-md)',
              padding: isCollapsed ? '0.6rem' : '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '0.75rem',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(0, 70, 132, 0.35)'
            }}
            title={isCollapsed ? "ISLA Bulldog Financial Wizard AI" : ""}
          >
            {/* ISLA BULLDOG PHOTO AVATAR FROM USER'S FOLDER */}
            <div style={{
              position: 'relative',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #FDB927',
              boxShadow: '0 0 14px rgba(253, 185, 39, 0.6)',
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
                bottom: 0,
                right: 0,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid var(--bg-surface)'
              }} />
            </div>

            {!isCollapsed && (
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.86rem' }}>ISLA Bulldog AI</span>
                  <Sparkles size={12} color="#FDB927" />
                </div>
                <p style={{ fontSize: '0.72rem', color: '#FDB927', marginTop: '0.1rem', fontWeight: 700 }}>
                  Financial Wizard 🐶
                </p>
              </div>
            )}
          </button>

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
      <CoachHarrisonModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
};
