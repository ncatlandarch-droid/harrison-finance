import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { RefreshCw, AlertTriangle, ShieldCheck, CheckCircle2, Calendar, DollarSign, Zap, Check, Trash2, Plus } from 'lucide-react';

export const RecurringTrackerSection = () => {
  const { data } = useFinance();

  const defaultBills = [
    { id: "b1", name: "Mortgage (New American Funding)", member: "Chris", amount: 1200.00, category: "Housing", dueDay: "1st of month", icon: "🏠", status: "Active" },
    { id: "b2", name: "Figure Room Addition HELOC", member: "Barbara", amount: 1000.00, category: "Debt Payoff", dueDay: "15th of month", icon: "⚠️", status: "Active" },
    { id: "b3", name: "Groceries (Food Pool)", member: "Erin & Chris", amount: 1100.00, category: "Groceries", dueDay: "Weekly", icon: "🛒", status: "Active" },
    { id: "b4", name: "Car Payment", member: "Erin", amount: 500.00, category: "Transportation", dueDay: "10th of month", icon: "🚗", status: "Active" },
    { id: "b5", name: "PenFed Credit Card Refinance", member: "Barbara", amount: 389.16, category: "Debt Payoff", dueDay: "20th of month", icon: "💳", status: "Active" },
    { id: "b6", name: "Walgreens & Pharmacy Health", member: "Chris", amount: 426.43, category: "Health", dueDay: "Monthly", icon: "💊", status: "Active" },
    { id: "b7", name: "Duke Energy Electricity", member: "Chris", amount: 234.33, category: "Utilities", dueDay: "18th of month", icon: "⚡", status: "Active" },
    { id: "b8", name: "Primerica Life & Investment", member: "Chris", amount: 206.45, category: "Insurance", dueDay: "12th of month", icon: "🛡️", status: "Active" },
    { id: "b9", name: "Progressive Auto Insurance", member: "Chris", amount: 199.93, category: "Insurance", dueDay: "8th of month", icon: "🚗", status: "Active" },
    { id: "b10", name: "Hayden School Transportation", member: "Erin", amount: 200.00, category: "Family Care", dueDay: "Monthly", icon: "🚌", status: "Active" },
    { id: "b11", name: "Capital One Savings Contribution", member: "Chris", amount: 150.00, category: "Savings", dueDay: "1st of month", icon: "💰", status: "Active" },
    { id: "s1", name: "Adobe Creative Cloud", member: "Chris", amount: 37.35, category: "Subscriptions", dueDay: "14th", icon: "🎨", status: "Active" },
    { id: "s2", name: "Planet Fitness Gym", member: "Chris", amount: 24.99, category: "Fitness", dueDay: "17th", icon: "🏋️", status: "Active" },
    { id: "s3", name: "Spectrum Cell Phone", member: "Barbara", amount: 20.00, category: "Cell & Tech", dueDay: "22nd", icon: "📱", status: "Active" },
    { id: "s4", name: "ChatGPT Plus", member: "Chris", amount: 20.00, category: "Software", dueDay: "25th", icon: "🤖", status: "Active" },
    { id: "s5", name: "Max (HBO)", member: "Chris", amount: 16.99, category: "Entertainment", dueDay: "5th", icon: "🎬", status: "Active" },
    { id: "s6", name: "Amazon Prime", member: "Chris", amount: 14.99, category: "Shopping", dueDay: "11th", icon: "📦", status: "Active" },
    { id: "s7", name: "Showtime", member: "Chris", amount: 12.99, category: "Entertainment", dueDay: "9th", icon: "📺", status: "Active" },
    { id: "s8", name: "Pandora Music", member: "Chris", amount: 12.78, category: "Entertainment", dueDay: "3rd", icon: "🎵", status: "Active" },
    { id: "s9", name: "Netflix", member: "Erin", amount: 10.00, category: "Entertainment", dueDay: "28th", icon: "🍿", status: "Active" },
    { id: "s10", name: "Rocket Money (Mom's Account)", member: "Barbara", amount: 10.00, category: "Subscriptions", dueDay: "15th", icon: "📱", status: "Cancelled" }
  ];

  const [billsList, setBillsList] = useState(() => {
    const saved = localStorage.getItem('harrison_recurring_bills');
    return saved ? JSON.parse(saved) : defaultBills;
  });

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const toggleStatus = (id) => {
    const updated = billsList.map(b => {
      if (b.id === id) {
        const newStatus = b.status === 'Cancelled' ? 'Active' : 'Cancelled';
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBillsList(updated);
    localStorage.setItem('harrison_recurring_bills', JSON.stringify(updated));
  };

  const activeBills = billsList.filter(b => b.status !== 'Cancelled');
  const cancelledBills = billsList.filter(b => b.status === 'Cancelled');
  const totalActiveRecurring = activeBills.reduce((s, b) => s + b.amount, 0);
  const totalMonthlySavings = cancelledBills.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Header Banner */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={24} color="var(--primary-light)" />
              <span>Automated Recurring Payment & Subscription Control Hub</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Directly track, cancel, or reactivate household subscriptions. (Erin just cancelled Mom's Rocket Money!)
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Active Monthly Commitments</div>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--danger)' }}>
              {fmt(totalActiveRecurring)} / mo
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--success)', fontWeight: 800 }}>
              🎉 Monthly Savings From Cancellations: +{fmt(totalMonthlySavings)}/mo
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 ERIN'S ROCKET MONEY CANCELLATION VICTORY BANNER */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(0, 70, 132, 0.25))', border: '1.5px solid #10b981' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 size={24} color="#fff" />
            </div>
            <div>
              <h4 style={{ fontWeight: 900, color: '#fff', fontSize: '1.05rem' }}>
                🎉 Success: Rocket Money Subscription Cancelled for Mom!
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
                Erin successfully cancelled Mom's <strong>Rocket Money ($10.00/mo)</strong> subscription. Saving the family <strong>+$120.00/year</strong> in recurring fees!
              </p>
            </div>
          </div>

          <span className="badge badge-success" style={{ padding: '6px 14px', fontSize: '0.82rem', fontWeight: 900 }}>
            +$120/YR SAVED
          </span>
        </div>
      </div>

      {/* Active Recurring Bills List */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>Active Recurring Commitments ({activeBills.length})</h4>
          <span className="badge badge-primary">Click Any Item to Toggle Status</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activeBills.map((b) => (
            <div key={b.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.85rem 1.15rem',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{b.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{b.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Owner: <strong style={{ color: '#FDB927' }}>{b.member}</strong> • {b.category} • Due: {b.dueDay}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div className="font-mono" style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--danger)' }}>
                  {fmt(b.amount)} / mo
                </div>

                <button 
                  onClick={() => toggleStatus(b.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: 'var(--danger)',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                  className="card-hover"
                >
                  <Trash2 size={14} />
                  <span>Cancel ✂️</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancelled Subscriptions Log */}
      {cancelledBills.length > 0 && (
        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <h4 style={{ fontWeight: 800, color: 'var(--success)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} />
              <span>Cancelled Subscriptions & Saved Cash ({cancelledBills.length})</span>
            </h4>
            <span className="badge badge-success">Total Annual Savings: +{fmt(totalMonthlySavings * 12)}/yr</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {cancelledBills.map((b) => (
              <div key={b.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(16, 185, 129, 0.08)',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                opacity: 0.95
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem', textDecoration: 'line-through', textDecorationColor: '#ef4444' }}>
                      {b.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Owner: {b.member} • Cancelled & Saved
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontWeight: 800, color: 'var(--success)', fontSize: '0.9rem' }}>
                    Saved +{fmt(b.amount)}/mo
                  </div>

                  <button 
                    onClick={() => toggleStatus(b.id)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Reactivate ⚡
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
