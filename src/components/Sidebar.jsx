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
  Trophy
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, totalBoACash } = useFinance();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & MVP', icon: LayoutDashboard },
    { id: 'familyvault', label: 'Encrypted Family Vault', icon: Lock },
    { id: 'thinkeco', label: 'Think! Ecosystem Hub', icon: Building2 },
    { id: 'strategy', label: 'Debt & HELOC Payoff', icon: Flame },
    { id: 'recurring', label: 'Recurring Subscriptions', icon: RefreshCw },
    { id: 'bills', label: 'Bills & Transfer Guide', icon: Receipt },
    { id: 'budget', label: 'Budget Tracker', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'localres', label: 'Local NC Resources', icon: MapPin },
    { id: 'networth', label: 'Net Worth & Freedom', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <aside style={{
        width: '260px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
        padding: '1.25rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        position: 'sticky',
        top: 0
      }}>
        <div>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #004684, #4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px var(--primary-glow)'
            }}>
              <Building2 size={22} color="#FDB927" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Harrison Finance
              </h1>
              <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '2px 6px', background: '#004684', color: '#FDB927' }}>PLATFORM v4.0</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.65rem 0.85rem',
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
                  <Icon size={17} color={isActive ? '#FDB927' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 🤖 COACH PERRY AI ASSISTANT WIDGET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          
          <button
            onClick={() => setIsAiModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.4), rgba(79, 70, 229, 0.3))',
              border: '1px solid rgba(253, 185, 39, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(0, 70, 132, 0.3)'
            }}
          >
            <div style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#FDB927',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(253, 185, 39, 0.5)'
            }}>
              <Bot size={22} color="#004684" />
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

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.84rem' }}>Coach Perry AI</span>
                <Sparkles size={12} color="#FDB927" />
              </div>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.1rem' }}>
                Financial Strategy Engine
              </p>
            </div>
          </button>

          {/* Sidebar Footer Account Balance */}
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

        </div>
      </aside>

      {/* AI Assistant Modal */}
      <CoachHarrisonModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
};
