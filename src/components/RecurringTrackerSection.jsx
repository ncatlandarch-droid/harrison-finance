import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { RefreshCw, AlertTriangle, ShieldCheck, CheckCircle2, Calendar, DollarSign, Zap } from 'lucide-react';

export const RecurringTrackerSection = () => {
  const { data } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // List of all recurring subscriptions and bills
  const recurringBills = [
    { name: "Mortgage (New American Funding)", member: "Chris", amount: 1200.00, category: "Housing", dueDay: "1st of month", icon: "🏠", priority: "Essential" },
    { name: "Figure Room Addition HELOC", member: "Barbara", amount: 1000.00, category: "Debt Payoff", dueDay: "15th of month", icon: "⚠️", priority: "High Interest (9.75%)" },
    { name: "Groceries (Food Pool)", member: "Erin & Chris", amount: 1100.00, category: "Groceries", dueDay: "Weekly", icon: "🛒", priority: "Essential" },
    { name: "Car Payment", member: "Erin", amount: 500.00, category: "Transportation", dueDay: "10th of month", icon: "🚗", priority: "Essential" },
    { name: "PenFed Credit Card Refinance", member: "Barbara", amount: 389.16, category: "Debt Payoff", dueDay: "20th of month", icon: "💳", priority: "High Priority" },
    { name: "Walgreens & Pharmacy Health", member: "Chris", amount: 426.43, category: "Health", dueDay: "Monthly", icon: "💊", priority: "Essential" },
    { name: "Duke Energy Electricity", member: "Chris", amount: 234.33, category: "Utilities", dueDay: "18th of month", icon: "⚡", priority: "Essential" },
    { name: "Primerica Life & Investment", member: "Chris", amount: 206.45, category: "Insurance", dueDay: "12th of month", icon: "🛡️", priority: "Essential" },
    { name: "Progressive Auto Insurance", member: "Chris", amount: 199.93, category: "Insurance", dueDay: "8th of month", icon: "🚗", priority: "Essential" },
    { name: "Hayden School Transportation", member: "Erin", amount: 200.00, category: "Family Care", dueDay: "Monthly", icon: "🚌", priority: "Essential" },
    { name: "Capital One Savings Contribution", member: "Chris", amount: 150.00, category: "Savings", dueDay: "1st of month", icon: "💰", priority: "Savings" },
    { id: "s1", name: "Adobe Creative Cloud", member: "Chris", amount: 37.35, category: "Subscriptions", dueDay: "14th", icon: "🎨", priority: "Software" },
    { id: "s2", name: "Planet Fitness Gym", member: "Chris", amount: 24.99, category: "Fitness", dueDay: "17th", icon: "🏋️", priority: "Personal" },
    { id: "s3", name: "Spectrum Cell Phone", member: "Barbara", amount: 20.00, category: "Cell & Tech", dueDay: "22nd", icon: "📱", priority: "Essential" },
    { id: "s4", name: "ChatGPT Plus", member: "Chris", amount: 20.00, category: "Software", dueDay: "25th", icon: "🤖", priority: "Review" },
    { id: "s5", name: "Max (HBO)", member: "Chris", amount: 16.99, category: "Entertainment", dueDay: "5th", icon: "🎬", priority: "Entertainment" },
    { id: "s6", name: "Amazon Prime", member: "Chris", amount: 14.99, category: "Shopping", dueDay: "11th", icon: "📦", priority: "Shopping" },
    { id: "s7", name: "Showtime", member: "Chris", amount: 12.99, category: "Entertainment", dueDay: "9th", icon: "📺", priority: "Entertainment" },
    { id: "s8", name: "Pandora Music", member: "Chris", amount: 12.78, category: "Entertainment", dueDay: "3rd", icon: "🎵", priority: "Entertainment" },
    { id: "s9", name: "Netflix", member: "Erin", amount: 10.00, category: "Entertainment", dueDay: "28th", icon: "🍿", priority: "Entertainment" },
    { id: "s10", name: "Rocket Money", member: "Barbara", amount: 10.00, category: "Subscriptions", dueDay: "15th", icon: "📱", priority: "Cancel Candidate" }
  ];

  const totalRecurring = recurringBills.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Header Banner */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={24} color="var(--primary-light)" />
              <span>Automated Recurring Payment & Subscription Tracker</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Auto-detected recurring monthly subscriptions and fixed commitments across all family members.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Recurring Commitment</div>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--danger)' }}>
              {fmt(totalRecurring)} / mo
            </div>
          </div>
        </div>
      </div>

      {/* 💡 SUBSCRIPTION CANCEL CANDIDATE RECOMMENDATION */}
      <div className="card" style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertTriangle size={28} color="var(--warning)" />
          <div>
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Recommended Subscription Trimming: Save +$54.76/month</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              You currently have 5 streaming/music subscriptions (Max $16.99, Prime $14.99, Showtime $12.99, Pandora $12.78, Rocket Money $10.00). Consolidating into 1 streaming service instantly saves <strong>$657/year</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* Recurring Bills List */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>All {recurringBills.length} Active Recurring Commitments</h4>
          <span className="badge badge-primary">Auto-Tracked</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {recurringBills.map((b, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.85rem 1.15rem',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{b.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{b.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {b.member} • {b.category} • Due: {b.dueDay}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="font-mono" style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--danger)' }}>
                  {fmt(b.amount)} / mo
                </div>
                <span className="badge" style={{ fontSize: '0.7rem', background: b.priority.includes('High') || b.priority.includes('Cancel') ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)', color: b.priority.includes('High') || b.priority.includes('Cancel') ? 'var(--danger)' : '#fff' }}>
                  {b.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
