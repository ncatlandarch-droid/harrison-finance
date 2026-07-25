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
  Dog
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, totalBoACash } = useFinance();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'strategy', label: 'Debt & Spending Strategy', icon: Flame },
    { id: 'recurring', label: 'Recurring & Subscriptions', icon: RefreshCw },
    { id: 'bills', label: 'Bills & Allocation', icon: Receipt },
    { id: 'budget', label: 'Budget Tracker', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'networth', label: 'Net Worth & Savings', icon: Target },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', padding: '0 0.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px var(--primary-glow)'
            }}>
              <Building2 size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Harrison Finance
              </h1>
              <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>FAMILY PLATFORM v3.4</span>
            </div>
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'linear-gradient(135deg, var(--primary), #4f46e5)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 14px var(--primary-glow)' : 'none'
                  }}
                >
                  <Icon size={18} color={isActive ? '#fff' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 🐶 ISLA DOG AVATAR FINANCIAL ASSISTANT WIDGET (LEFT SIDEBAR) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          
          <button
            onClick={() => setIsAiModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.15))',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.2)'
            }}
          >
            <div style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(245, 158, 11, 0.5)'
            }}>
              <Dog size={24} color="#fff" />
              <span style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid var(--bg-surface)'
              }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.88rem' }}>ISLA AI Helper</span>
                <Sparkles size={12} color="var(--warning)" />
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                Click to ask about cash, loans & bills
              </p>
            </div>
          </button>

          {/* Sidebar Footer Account Balance */}
          <div style={{
            padding: '0.85rem 1rem',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>BOA LIQUID CASH</div>
            <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.1rem' }}>
              {fmt(totalBoACash)}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ShieldCheck size={12} color="var(--success)" />
              <span>Chris & Mom BoA Sync</span>
            </div>
          </div>

        </div>
      </aside>

      {/* AI Assistant Modal */}
      <CoachHarrisonModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
};
