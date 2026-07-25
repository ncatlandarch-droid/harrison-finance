import React from 'react';
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
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, totalBoACash, barbaraCheckingAccount } = useFinance();

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
    <aside style={{
      width: '260px',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-color)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      <div>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
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
            <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>FAMILY PLATFORM v3.3</span>
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

      {/* Sidebar Footer Account Widget */}
      <div style={{
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>BOA LIQUID CASH</div>
        <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>
          {fmt(totalBoACash)}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <ShieldCheck size={12} color="var(--success)" />
          <span>4 BoA Accounts Connected</span>
        </div>
      </div>
    </aside>
  );
};
