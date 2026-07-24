import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Landmark, TrendingUp, Building } from 'lucide-react';

export const NetWorthSection = () => {
  const { data } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const totalAssets = data.accounts.reduce((s, a) => s + (a.balance || 0), 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Net Worth Hero */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(99, 102, 241, 0.1))', borderTop: '4px solid var(--success)' }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Estimated Liquid & Investment Net Worth</span>
        <div className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.5rem' }}>
          {fmt(totalAssets)}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Includes Checking, Savings, Emergency Reserve, TSERS 401(k), and Robinhood Holdings.
        </p>
      </div>

      {/* Accounts List Grid */}
      <div className="grid-2">
        {data.accounts.map(acc => (
          <div key={acc.id} className="card">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Landmark size={20} color="var(--primary-light)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>{acc.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{acc.institution} • {acc.type}</span>
                </div>
              </div>
              <span className="badge badge-primary">{acc.type}</span>
            </div>

            <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              {fmt(acc.balance)}
            </div>

            {acc.apy && (
              <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '0.4rem' }}>
                High Yield APY: {acc.apy}%
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
