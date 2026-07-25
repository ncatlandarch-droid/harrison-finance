import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  LayoutDashboard, 
  Settings, 
  Building2, 
  Flame, 
  RefreshCw, 
  Sparkles, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Bot
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useFinance();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Roster', icon: LayoutDashboard },
    { id: 'thinkeco', label: 'Think! Ecosystem Hub', icon: Building2 },
    { id: 'strategy', label: 'Debt & HELOC Payoff', icon: Flame },
    { id: 'recurring', label: 'Subscriptions & Bills', icon: RefreshCw },
    { id: 'localres', label: 'Local NC Resources', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside style={{
      width: isCollapsed ? '90px' : '280px',
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
      transition: 'all 0.25s ease'
    }}>
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', marginBottom: '1.75rem', padding: '0 0.25rem' }}>
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
                  padding: isCollapsed ? '0.75rem' : '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'linear-gradient(135deg, #004684, #4f46e5)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.22s ease',
                  boxShadow: isActive ? '0 4px 14px var(--primary-glow)' : 'none'
                }}
              >
                <Icon size={19} color={isActive ? '#FDB927' : 'var(--text-muted)'} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      {!isCollapsed && (
        <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={12} color="#FDB927" />
            <span>Harrison Wealth Hub 2026</span>
          </div>
        </div>
      )}

    </aside>
  );
};
