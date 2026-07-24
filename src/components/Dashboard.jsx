import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  TrendingUp, 
  Receipt, 
  PiggyBank, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  PieChart as PieChartIcon,
  CheckCircle2,
  AlertCircle
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
    totalBills, 
    totalExtraMoney, 
    billAllocations, 
    data 
  } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Data for Income vs Bills Chart
  const incomeChartData = members.map(m => ({
    name: m.name,
    Income: m.income,
    color: m.color
  }));

  // Data for Expense Breakdown Donut
  const categorySpending = data.budgets.map(b => ({
    name: b.category,
    value: b.spent
  })).filter(c => c.value > 0);

  const PIE_COLORS = ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* 1. HERO INSIGHTS ROW (THE 4 CORE STAT CARDS) */}
      <div className="grid-4">
        
        {/* Stat 1: Total Monthly Income */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--success)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Household Income</span>
            <div style={{ background: 'var(--success-glow)', padding: '6px', borderRadius: '8px' }}>
              <TrendingUp size={20} color="var(--success)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff' }}>
            {fmt(totalIncome)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--success)' }}>
            <ArrowUpRight size={14} />
            <span>Combined across 3 adult earners</span>
          </div>
        </div>

        {/* Stat 2: Total Monthly Bills */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--danger)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Fixed Bills</span>
            <div style={{ background: 'var(--danger-glow)', padding: '6px', borderRadius: '8px' }}>
              <Receipt size={20} color="var(--danger)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff' }}>
            {fmt(totalBills)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
            <span>Mortgage, Utilities, Insurance</span>
          </div>
        </div>

        {/* Stat 3: Total Extra Money */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--primary-light)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Extra Money</span>
            <div style={{ background: 'var(--primary-glow)', padding: '6px', borderRadius: '8px' }}>
              <PiggyBank size={20} color="var(--primary-light)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--success)' }}>
            {fmt(totalExtraMoney)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--primary-light)' }}>
            <Sparkles size={14} />
            <span>Discretionary surplus / savings</span>
          </div>
        </div>

        {/* Stat 4: Active Family Members */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--accent-purple)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Family Members</span>
            <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '6px', borderRadius: '8px' }}>
              <Users size={20} color="var(--accent-purple)" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '-0.5rem', marginTop: '0.2rem' }}>
            {members.map(m => (
              <div key={m.id} style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: m.color,
                color: '#fff',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-surface)',
                marginLeft: '-8px'
              }} title={m.name}>
                {m.name.charAt(0)}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
            3 Adult Earners + 2 Dependents
          </div>
        </div>

      </div>

      {/* 2. CORE INSIGHT 4: SMART PROPORTIONAL BILL ALLOCATION ENGINE */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(21, 28, 44, 0.9), rgba(30, 41, 64, 0.6))' }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="var(--primary-light)" />
              <span>Smart Bill Allocation Engine (Fair Proportional Share)</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Each adult family member contributes to joint bills in exact proportion to their monthly income share.
            </p>
          </div>
          <div className="badge badge-primary">
            Joint Bills: {fmt(data.bills.filter(b => b.paidBy === 'joint').reduce((s, b) => s + b.amount, 0))}
          </div>
        </div>

        <div className="grid-3">
          {billAllocations.map(alloc => (
            <div key={alloc.memberId} style={{
              background: 'rgba(0, 0, 0, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: `1px solid ${alloc.color}40`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: alloc.color }} />
              
              <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: alloc.color, color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                    {alloc.name.charAt(0)}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{alloc.name}</span>
                </div>
                <span className="badge" style={{ background: `${alloc.color}25`, color: alloc.color, border: `1px solid ${alloc.color}50` }}>
                  {alloc.incomeSharePct.toFixed(1)}% Income Share
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Monthly Income:</span>
                  <span className="font-mono" style={{ fontWeight: 600, color: '#fff' }}>{fmt(alloc.income)}</span>
                </div>
                <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Joint Bill Share ({alloc.incomeSharePct.toFixed(0)}%):</span>
                  <span className="font-mono" style={{ fontWeight: 700, color: 'var(--warning)' }}>{fmt(alloc.proportionalJointBillShare)}</span>
                </div>
                {alloc.personalBillsTotal > 0 && (
                  <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Direct Personal Bills:</span>
                    <span className="font-mono" style={{ fontWeight: 600, color: 'var(--danger)' }}>{fmt(alloc.personalBillsTotal)}</span>
                  </div>
                )}
                <div className="flex-between" style={{ fontSize: '0.9rem', paddingTop: '0.5rem', borderTop: '1px stroke var(--border-color)' }}>
                  <span style={{ color: '#fff', fontWeight: 700 }}>Total Bill Commitment:</span>
                  <span className="font-mono" style={{ fontWeight: 800, color: 'var(--danger)' }}>{fmt(alloc.totalCommitment)}</span>
                </div>
              </div>

              {/* Personal Extra Surplus */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.6rem 0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.75rem',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>Personal Extra Money</span>
                <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--success)' }}>
                  {fmt(alloc.extraMoney)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. VISUAL CHARTS ROW */}
      <div className="grid-2">
        
        {/* Income Comparison Bar Chart */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#fff' }}>
            Income Contribution Comparison
          </h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeChartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Monthly Income']}
                  contentStyle={{ background: '#1e293b', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="Income" radius={[6, 6, 0, 0]}>
                  {incomeChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Spending Donut Chart */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#fff' }}>
            Monthly Expense Distribution
          </h3>
          <div style={{ width: '100%', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Spent']}
                  contentStyle={{ background: '#1e293b', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. RECENT TRANSACTIONS PREVIEW */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Recent Bank Activity</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bank of America Sync</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.transactions.slice(0, 5).map(txn => {
            const isIncome = txn.type === 'income' || txn.amount > 0;
            return (
              <div key={txn.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{txn.description}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{txn.date} • {txn.category}</div>
                </div>
                <div className="font-mono" style={{ 
                  fontWeight: 700, 
                  fontSize: '1.05rem', 
                  color: isIncome ? 'var(--success)' : 'var(--text-main)' 
                }}>
                  {isIncome ? '+' : '-'}{fmt(txn.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
