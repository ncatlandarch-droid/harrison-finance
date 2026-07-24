import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  TrendingUp, 
  Receipt, 
  PiggyBank, 
  AlertTriangle, 
  ArrowUpRight, 
  Sparkles,
  ShieldAlert,
  HeartHandshake,
  CreditCard,
  Building,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';

export const Dashboard = () => {
  const { 
    members, 
    totalIncome, 
    barbaraTotalExpenses, 
    jointBillsTotal,
    totalFixedBills, 
    totalVariableBudgets,
    realNetSurplus,
    barbaraNetRemaining,
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

      {/* 1. REAL TOP STAT CARDS */}
      <div className="grid-4">
        
        {/* Stat 1: Barbara's Total Monthly Income */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--accent-purple)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Barbara's Monthly Income</span>
            <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '6px', borderRadius: '8px' }}>
              <TrendingUp size={20} color="var(--accent-purple)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff' }}>
            $5,645.84
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            OPM Pension Direct Deposit
          </div>
        </div>

        {/* Stat 2: Barbara's Itemized Monthly Expenses */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--danger)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Barbara's Total Expenses</span>
            <div style={{ background: 'var(--danger-glow)', padding: '6px', borderRadius: '8px' }}>
              <Receipt size={20} color="var(--danger)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--danger)' }}>
            {fmt(barbaraTotalExpenses)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            11 Itemized Bills & Debt Payments
          </div>
        </div>

        {/* Stat 3: Barbara's Net Monthly Remaining */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--success)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Barbara's Net Remaining</span>
            <div style={{ background: 'var(--success-glow)', padding: '6px', borderRadius: '8px' }}>
              <PiggyBank size={20} color="var(--success)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--success)' }}>
            {fmt(barbaraNetRemaining)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '0.5rem' }}>
            Actual Surplus after all $4.8k expenses
          </div>
        </div>

        {/* Stat 4: Total Household Combined Income */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--primary-light)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Combined Household</span>
            <div style={{ background: 'var(--primary-glow)', padding: '6px', borderRadius: '8px' }}>
              <Building size={20} color="var(--primary-light)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff' }}>
            {fmt(totalIncome)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Barbara ($5.6k) + Chris ($4.5k) + Erin ($2.5k)
          </div>
        </div>

      </div>

      {/* 2. BARBARA'S ITEMIZED MONTHLY EXPENSE BREAKDOWN */}
      <div className="card card-glow">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartHandshake size={22} color="var(--accent-purple)" />
              <span>Barbara's Exact Monthly Expense Breakdown</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Itemized monthly liabilities totaling <strong>$4,837.24 / month</strong>.
            </p>
          </div>
          <span className="badge badge-danger font-mono" style={{ fontSize: '0.9rem' }}>
            Total: {fmt(barbaraTotalExpenses)} / mo
          </span>
        </div>

        <div className="grid-2">
          {data.barbaraExpenses.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.9rem 1.15rem',
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: 'var(--radius-md)',
              border: item.name === 'Figure' ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>{item.description}</span>
                  {item.name === 'Figure' && <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>HELOC 9.75%</span>}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Vendor: {item.name} • {item.category}
                </div>
                {item.notes && (
                  <div style={{ fontSize: '0.74rem', color: 'var(--warning)', marginTop: '0.2rem' }}>
                    {item.notes}
                  </div>
                )}
              </div>

              <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: item.name === 'Figure' || item.name === 'PenFed' ? 'var(--danger)' : '#fff' }}>
                {fmt(item.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
