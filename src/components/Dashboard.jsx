import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  TrendingUp, 
  Receipt, 
  PiggyBank, 
  AlertTriangle, 
  HeartHandshake,
  Building,
  UserCheck,
  Zap,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    totalBaseIncome, 
    barbaraTotalExpenses, 
    erinTotalExpenses,
    chrisTotalExpenses,
    barbaraNetRemaining,
    erinNetRemaining,
    chrisNetRemaining,
    totalCombinedExpenses,
    totalCombinedSurplus,
    data 
  } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* ⚠️ HIGH PRIORITY FINANCIAL ALERT: FIGURE LOAN INTEREST JUMP */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.1))',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 0 25px rgba(239, 68, 68, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ background: 'var(--danger-glow)', padding: '10px', borderRadius: '12px', flexShrink: 0 }}>
            <AlertTriangle size={28} color="var(--danger)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Urgent Financial Warning: Barbara's Figure Room Addition Loan</span>
              </h3>
              <span className="badge badge-danger">Interest Rate Reset: August 2029</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '0.4rem', lineHeight: '1.5' }}>
              Barbara is currently paying <strong>$1,000.00/month</strong> at a <strong>9.75% interest rate</strong> ($140,000 total 30-year interest). 
              In <strong>August 2029</strong>, the rate adjusts up to <strong style={{ color: 'var(--danger)' }}>15.30%</strong> — driving interest costs to <strong style={{ color: 'var(--danger)' }}>$227,000</strong> over 30 years!
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}>
                Current Rate: <strong style={{ color: 'var(--warning)' }}>9.75%</strong> • 30-Yr Interest: <strong>$140,000</strong>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.82rem' }}>
                Aug 2029 Reset Rate: <strong style={{ color: 'var(--danger)' }}>15.30%</strong> • 30-Yr Interest: <strong>$227,000</strong>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--primary-light)' }}>
                Target Strategy: Refinance or Payoff before Aug 2029
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. OVERALL FAMILY HOUSEHOLD SUMMARY ROW */}
      <div className="grid-3">
        <div className="card card-glow" style={{ borderTop: '4px solid var(--success)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Combined Family Income</span>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff', marginTop: '0.4rem' }}>
            {fmt(totalBaseIncome)}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Barbara ($5.6k) + Chris ($4.5k) + Erin ($2.5k)</span>
        </div>

        <div className="card card-glow" style={{ borderTop: '4px solid var(--danger)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Combined Family Expenses</span>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--danger)', marginTop: '0.4rem' }}>
            {fmt(totalCombinedExpenses)}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Barbara ($4.8k) + Erin ($1.5k) + Chris ($4.3k)</span>
        </div>

        <div className="card card-glow" style={{ borderTop: '4px solid var(--primary-light)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Real Net Family Surplus</span>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.4rem' }}>
            {fmt(totalCombinedSurplus)}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--success)' }}>Actual Net Surplus after ALL 34 Itemized Bills</span>
        </div>
      </div>

      {/* 2. INDIVIDUAL FAMILY EARNER CARDS */}
      <div className="grid-3">
        
        {/* Barbara Card */}
        <div className="card card-glow" style={{ borderTop: '4px solid #a855f7' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#a855f7', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>B</div>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>Barbara</span>
            </div>
            <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>OPM Pension</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.75rem' }}>
            <div className="flex-between" style={{ fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Income:</span>
              <span className="font-mono" style={{ fontWeight: 700, color: '#fff' }}>$5,645.84</span>
            </div>
            <div className="flex-between" style={{ fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>11 Itemized Bills:</span>
              <span className="font-mono" style={{ fontWeight: 700, color: 'var(--danger)' }}>{fmt(barbaraTotalExpenses)}</span>
            </div>
            <div className="flex-between" style={{ fontSize: '0.95rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>Net Surplus:</span>
              <span className="font-mono" style={{ fontWeight: 800, color: 'var(--success)' }}>{fmt(barbaraNetRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Erin Card */}
        <div className="card card-glow" style={{ borderTop: '4px solid #ec4899' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#ec4899', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>E</div>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>Erin</span>
            </div>
            <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>UNCG Salary</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.75rem' }}>
            <div className="flex-between" style={{ fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Income:</span>
              <span className="font-mono" style={{ fontWeight: 700, color: '#fff' }}>$2,500.00</span>
            </div>
            <div className="flex-between" style={{ fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>9 Itemized Bills:</span>
              <span className="font-mono" style={{ fontWeight: 700, color: 'var(--danger)' }}>{fmt(erinTotalExpenses)}</span>
            </div>
            <div className="flex-between" style={{ fontSize: '0.95rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>Net Surplus:</span>
              <span className="font-mono" style={{ fontWeight: 800, color: 'var(--success)' }}>{fmt(erinNetRemaining)}</span>
            </div>
          </div>
        </div>

        {/* Chris Card */}
        <div className="card card-glow" style={{ borderTop: '4px solid #6366f1' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#6366f1', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>C</div>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>Chris</span>
            </div>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>NC A&T State</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.75rem' }}>
            <div className="flex-between" style={{ fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Salary + Transfer:</span>
              <span className="font-mono" style={{ fontWeight: 700, color: '#fff' }}>$7,546.27</span>
            </div>
            <div className="flex-between" style={{ fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>14 Itemized Bills:</span>
              <span className="font-mono" style={{ fontWeight: 700, color: 'var(--danger)' }}>{fmt(chrisTotalExpenses)}</span>
            </div>
            <div className="flex-between" style={{ fontSize: '0.95rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>Net Surplus:</span>
              <span className="font-mono" style={{ fontWeight: 800, color: 'var(--success)' }}>{fmt(chrisNetRemaining)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. ITEMIZED EXPENSE TABLES FOR ALL THREE MEMBERS */}
      <div className="grid-3">
        
        {/* Barbara's Expenses Table */}
        <div className="card">
          <div className="flex-between" style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Barbara's Bills</h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>11 Items • $4,837.24 / mo</span>
            </div>
            <span className="badge badge-danger">OPM</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.barbaraExpenses.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.55rem 0.75rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem'
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{item.description}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.name}</div>
                </div>
                <div className="font-mono" style={{ fontWeight: 700, color: item.name === 'Figure' ? 'var(--danger)' : '#fff' }}>
                  {fmt(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Erin's Expenses Table */}
        <div className="card">
          <div className="flex-between" style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Erin's Bills</h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>9 Items • $1,569.00 / mo</span>
            </div>
            <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>UNCG</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.erinExpenses.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.55rem 0.75rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem'
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{item.description}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.name}</div>
                </div>
                <div className="font-mono" style={{ fontWeight: 700, color: '#fff' }}>
                  {fmt(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chris's Expenses Table */}
        <div className="card">
          <div className="flex-between" style={{ marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Chris's Bills</h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>14 Items • $4,311.62 / mo</span>
            </div>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>NC A&T</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.chrisExpenses.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.55rem 0.75rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem'
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{item.description}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.name}</div>
                </div>
                <div className="font-mono" style={{ fontWeight: 700, color: item.amount >= 1000 ? 'var(--warning)' : '#fff' }}>
                  {fmt(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
