import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { ShoppingCart, Home, Utensils, ShoppingBag, Car, Shield } from 'lucide-react';

export const BudgetSection = () => {
  const { data } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const iconMap = {
    Home: Home,
    ShoppingCart: ShoppingCart,
    Utensils: Utensils,
    ShoppingBag: ShoppingBag,
    Car: Car,
    Shield: Shield
  };

  const totalLimit = data.budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = data.budgets.reduce((s, b) => s + b.spent, 0);
  const totalRemaining = totalLimit - totalSpent;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Summary Cards */}
      <div className="grid-3">
        <div className="card text-center" style={{ borderBottom: '4px solid var(--primary)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Budget Limit</span>
          <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.4rem' }}>
            {fmt(totalLimit)}
          </div>
        </div>
        <div className="card text-center" style={{ borderBottom: '4px solid var(--warning)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Spent This Month</span>
          <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--warning)', marginTop: '0.4rem' }}>
            {fmt(totalSpent)}
          </div>
        </div>
        <div className="card text-center" style={{ borderBottom: '4px solid var(--success)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Remaining Pool</span>
          <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.4rem' }}>
            {fmt(totalRemaining)}
          </div>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid-3">
        {data.budgets.map(b => {
          const Icon = iconMap[b.icon] || ShoppingBag;
          const pct = Math.min(100, (b.spent / b.limit) * 100);
          const isOver = b.spent > b.limit;

          return (
            <div key={b.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={22} color="var(--primary-light)" />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>{b.category}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Family Budget</span>
                    </div>
                  </div>
                </div>

                <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Spent: <strong className="font-mono" style={{ color: isOver ? 'var(--danger)' : '#fff' }}>{fmt(b.spent)}</strong></span>
                  <span style={{ color: 'var(--text-muted)' }}>Limit: <strong className="font-mono" style={{ color: '#fff' }}>{fmt(b.limit)}</strong></span>
                </div>

                {/* Progress Bar */}
                <div style={{
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: isOver ? 'var(--danger)' : pct > 80 ? 'var(--warning)' : 'var(--success)',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                <span style={{ color: isOver ? 'var(--danger)' : 'var(--text-muted)' }}>
                  {isOver ? 'Over budget by ' + fmt(b.spent - b.limit) : fmt(b.limit - b.spent) + ' remaining'}
                </span>
                <span className="font-mono" style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{pct.toFixed(0)}%</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
