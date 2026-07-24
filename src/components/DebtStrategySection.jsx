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
  Sliders
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

  // Figure HELOC Projections
  const currentFigureInterest30Yr = 140000;
  const resetFigureInterest30Yr = 227000;
  const interestSavedByRefinancing = resetFigureInterest30Yr - currentFigureInterest30Yr;

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
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Monthly Spend']}
                  contentStyle={{ background: '#1e293b', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Itemized Category Breakdown List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {spendingBreakdown.map(item => (
              <div key={item.category} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.6rem 0.85rem',
                background: 'rgba(0,0,0,0.25)',
                borderRadius: 'var(--radius-md)',
                borderLeft: `4px solid ${item.color}`
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{item.category}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{item.items}</div>
                </div>
                <div className="font-mono" style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                  {fmt(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: HOW BEST TO PAY DOWN BILLS & DEBTS (THE 3-STEP AVALANCHE PLAN) */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(21, 28, 44, 0.95), rgba(30, 41, 64, 0.7))' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={22} color="var(--warning)" />
          <span>Recommended 3-Step Debt Pay-Down Plan (Save Thousands in Interest)</span>
        </h3>

        <div className="grid-3">
          
          {/* Step 1: Figure Loan */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-danger">Priority #1</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 700 }}>Highest Risk</span>
            </div>

            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
              Figure Room Addition Loan
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              Currently <strong>$1,000/mo</strong> at <strong>9.75%</strong>. Resets to <strong style={{ color: 'var(--danger)' }}>15.30% in Aug 2029</strong>!
            </p>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
              💡 <strong>Action:</strong> Apply ${extraPayment}/mo of your net surplus to principal or refi into a fixed mortgage before Aug 2029 to save <strong>$87,000</strong>!
            </div>
          </div>

          {/* Step 2: PenFed Refinance */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-warning">Priority #2</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--warning)', fontWeight: 700 }}>Quick Cash Flow Win</span>
            </div>

            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
              PenFed Credit Card Refinance
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              Currently <strong>$389.16/mo</strong>. High-interest credit card consolidation.
            </p>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
              💡 <strong>Action:</strong> Knock this out second. Eliminating PenFed instantly frees up <strong>$389.16/month</strong> back into Barbara's account!
            </div>
          </div>

          {/* Step 3: DoorDash & Subscriptions */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-success">Priority #3</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 700 }}>Instant Monthly Savings</span>
            </div>

            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
              Trim DoorDash & Subscriptions
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              DoorDash/Dining out is averaging <strong>$488/mo</strong> in extra fees.
            </p>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.65rem', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
              💡 <strong>Action:</strong> Cooking or picking up meals saves ~$330/mo. We already cut $110/mo in unused tech subs today!
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: INTERACTIVE DEBT PAYOFF SIMULATOR */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={20} color="var(--primary-light)" />
              <span>Interactive Extra Principal Payment Simulator</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              See how adding extra money towards the Figure Loan shortens the payoff timeline.
            </p>
          </div>
          <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)' }}>
            +${extraPayment} / month extra
          </div>
        </div>

        <input 
          type="range"
          min="100"
          max="2000"
          step="50"
          value={extraPayment}
          onChange={(e) => setExtraPayment(Number(e.target.value))}
          style={{ width: '100%', cursor: 'pointer', margin: '0.5rem 0 1.25rem' }}
        />

        <div className="grid-3" style={{ textAlign: 'center' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Extra Payment Amount</span>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.2rem' }}>
              ${extraPayment} / mo
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated Interest Saved</span>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>
              ${(extraPayment * 42).toLocaleString()}
            </div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Payoff Accelerated By</span>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--warning)', marginTop: '0.2rem' }}>
              ~{Math.round(extraPayment / 80)} Years Faster
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
