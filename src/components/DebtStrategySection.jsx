import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  Flame, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  PieChart as PieIcon, 
  Zap, 
  ShieldAlert,
  Sliders,
  CreditCard,
  Check,
  Calendar
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

export const DebtStrategySection = () => {
  const { 
    barbaraTotalExpenses, 
    erinTotalExpenses, 
    chrisTotalExpenses, 
    totalCombinedSurplus, 
    data 
  } = useFinance();

  const [extraPayment, setExtraPayment] = useState(500);
  const [boaTargetPlan, setBoaTargetPlan] = useState('full'); // 'full' | '6mo' | '12mo'

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Categorized Spending Summary
  const spendingBreakdown = [
    { category: 'Food & Groceries', amount: 2650.00, color: '#6366f1', items: 'Chris Food Pool ($2,100) + Erin Groceries ($550)' },
    { category: 'Debts & Loans', amount: 1889.16, color: '#ef4444', items: 'Figure Loan ($1,000), PenFed Refi ($389.16), Erin Car Loan ($500)' },
    { category: 'Housing & Utilities', amount: 1675.62, color: '#a855f7', items: 'Chris Mortgage ($1,200), Duke ($285), Water ($175.62), Pest/Sewer ($210)' },
    { category: 'Insurance (Auto/Life/Pet)', amount: 890.74, color: '#f59e0b', items: 'GEICO ($312.19), Progressive ($124.71), Primerica ($96.82), Americo ($73.94), etc.' },
    { category: 'Kids, Family & Personal', amount: 830.00, color: '#ec4899', items: 'Personal ($400), Hayden Transport ($200), Hayden Lunch ($80), Ava ($75)' },
    { category: 'Savings & Investments', amount: 400.00, color: '#10b981', items: 'Capital One ($150), Primerica Inv ($100), PenFed ($50)' },
    { category: 'Subscriptions & Software', amount: 162.08, color: '#06b6d4', items: 'Adobe, Gym, Netflix, Max, Prime, Showtime, Pandora, ChatGPT' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* TOP HEADER */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(16, 185, 129, 0.1))' }}>
        <div className="flex-between">
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Flame size={24} color="var(--primary-light)" />
              <span>Family Spending Breakdown & Smart Debt Pay-Down Strategy</span>
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Detailed breakdown of your biggest monthly expenses and an optimized debt payoff strategy to eliminate high interest.
            </p>
          </div>
          <div className="badge badge-success font-mono" style={{ fontSize: '0.9rem' }}>
            Net Surplus: {fmt(totalCombinedSurplus)} / mo
          </div>
        </div>
      </div>

      {/* 💳 BANKAMERICARD VISA AUTOPAY & PAYOFF TARGET ENGINE */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(15, 23, 42, 0.95))', border: '2px solid var(--danger)' }}>
        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-danger" style={{ fontWeight: 900, padding: '4px 12px' }}>
              💳 BANK OF AMERICA VISA (CARD 6343) AUTOPAY GOAL
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CreditCard size={24} color="var(--danger)" />
              <span>What Should Be Your BankAmericard Monthly AutoPay Goal?</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Stop minimum payment traps! Choose your automated payoff target below:
            </p>
          </div>
        </div>

        {/* 3 AutoPay Plan Options */}
        <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
          
          {/* Plan 1: Full Statement Balance (Gold Standard) */}
          <div 
            onClick={() => setBoaTargetPlan('full')}
            style={{ 
              background: boaTargetPlan === 'full' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.35)', 
              border: boaTargetPlan === 'full' ? '2.5px solid #10b981' : '1px solid var(--border-color)', 
              borderRadius: '16px', 
              padding: '1.25rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 900 }}>🥇 GOLD STANDARD (#1 GOAL)</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fff', margin: '0.3rem 0' }}>
              AutoPay Full Statement
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 800 }}>
              $0.00 Interest Ever Paid!
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Pays full statement balance automatically 5 days before due date.
            </div>
          </div>

          {/* Plan 2: 6-Month Fast Payoff ($760/mo) */}
          <div 
            onClick={() => setBoaTargetPlan('6mo')}
            style={{ 
              background: boaTargetPlan === '6mo' ? 'rgba(253, 185, 39, 0.2)' : 'rgba(0,0,0,0.35)', 
              border: boaTargetPlan === '6mo' ? '2.5px solid #FDB927' : '1px solid var(--border-color)', 
              borderRadius: '16px', 
              padding: '1.25rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: '#FDB927', fontWeight: 900 }}>⚡ 6-MONTH ACCELERATED</div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '0.3rem 0' }}>
              $760.00 / month
            </div>
            <div style={{ fontSize: '0.8rem', color: '#FDB927', fontWeight: 800 }}>
              Saves +$1,100 in Interest!
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Clears $4,560 balance in 6 months flat (Done Jan 2027!).
            </div>
          </div>

          {/* Plan 3: 12-Month Balanced ($380/mo) */}
          <div 
            onClick={() => setBoaTargetPlan('12mo')}
            style={{ 
              background: boaTargetPlan === '12mo' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(0,0,0,0.35)', 
              border: boaTargetPlan === '12mo' ? '2.5px solid #6366f1' : '1px solid var(--border-color)', 
              borderRadius: '16px', 
              padding: '1.25rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: 'var(--primary-light)', fontWeight: 900 }}>📅 12-MONTH BALANCED</div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '0.3rem 0' }}>
              $380.00 / month
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 800 }}>
              Comfortable Monthly Pace
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Clears $4,560 balance in 12 months (Done July 2027!).
            </div>
          </div>

        </div>

        {/* 🤖 Step-by-Step BoA AutoPay Setup Guide */}
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={18} color="var(--success)" />
            <span>How to Set Up Your Automatic Payment in Bank of America (2 Minutes):</span>
          </div>
          <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div>1. Log into <strong>Bank of America Online Banking</strong> (or BoA Mobile App).</div>
            <div>2. Navigate to <strong>Transfers & Pay Bills ➔ AutoPay Setup</strong>.</div>
            <div>3. Select Card: <strong>BankAmericard Visa - 6343</strong> • Pay From: <strong>Adv Plus Checking - 4717</strong>.</div>
            <div>4. Select Payment Amount: <strong>{boaTargetPlan === 'full' ? 'Full Statement Balance (Recommended)' : boaTargetPlan === '6mo' ? 'Fixed Amount: $760.00' : 'Fixed Amount: $380.00'}</strong>.</div>
            <div>5. Set Pay Date: <strong>5 Days Before Due Date</strong> (buffer against late fees).</div>
          </div>
        </div>

      </div>

      {/* SECTION 1: WHAT ARE YOU SPENDING THE MOST MONEY ON? */}
      <div className="card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PieIcon size={20} color="var(--primary-light)" />
          <span>What Is the Family Spending the Most Money On?</span>
        </h3>

        <div className="grid-2" style={{ alignItems: 'center' }}>
          {/* Recharts Pie Chart */}
          <div style={{ height: 280, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="amount"
                >
                  {spendingBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => fmt(val)}
                  contentStyle={{ background: '#1e293b', border: '1px solid var(--border-color)', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* List of Breakdown Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {spendingBreakdown.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: '12px', borderLeft: `4px solid ${item.color}` }}>
                <div className="flex-between">
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{item.category}</span>
                  <span className="font-mono" style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{fmt(item.amount)}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{item.items}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
