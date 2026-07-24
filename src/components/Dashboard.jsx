import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  TrendingUp, 
  Receipt, 
  PiggyBank, 
  AlertTriangle, 
  Building,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowDownCircle,
  ArrowUpCircle
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    totalBaseIncome, 
    barbaraTotalExpenses, 
    erinTotalExpenses,
    chrisTotalExpenses,
    totalScrapedBankSpending,
    barbaraNetRemaining,
    erinNetRemaining,
    chrisNetRemaining,
    totalCombinedExpenses,
    totalCombinedSurplus,
    totalLiquidityBalance,
    data 
  } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const isPlaidConnected = data.transactions.some(t => t.id.startsWith('pt_') || t.source === 'Plaid') || data.accounts.some(a => a.id.startsWith('plaid_'));
  const plaidAccounts = data.accounts.filter(a => a.id.startsWith('plaid_'));

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
            </div>
          </div>
        </div>
      </div>

      {/* 1. DYNAMIC DASHBOARD HERO STAT CARDS (UPDATES WITH LIVE PLAID DATA) */}
      <div className="grid-4">
        
        {/* Stat 1: Live Bank Liquidity */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--primary-light)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live Bank Liquidity</span>
            <div style={{ background: 'var(--primary-glow)', padding: '6px', borderRadius: '8px' }}>
              <Building size={20} color="var(--primary-light)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff' }}>
            {fmt(totalLiquidityBalance)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--success)' }}>
            <ShieldCheck size={14} />
            <span>{isPlaidConnected ? 'Plaid Live Bank Sync Active' : 'Combined Liquidity & Savings'}</span>
          </div>
        </div>

        {/* Stat 2: Scraped Bank Spending / Fixed Bills */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--danger)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {totalScrapedBankSpending > 0 ? 'Scraped Bank Spending' : 'Fixed Monthly Bills'}
            </span>
            <div style={{ background: 'var(--danger-glow)', padding: '6px', borderRadius: '8px' }}>
              <Receipt size={20} color="var(--danger)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--danger)' }}>
            {fmt(totalScrapedBankSpending > 0 ? totalScrapedBankSpending : totalCombinedExpenses)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            {totalScrapedBankSpending > 0 ? 'Auto-scraped from connected bank' : '34 Itemized Family Commitments'}
          </div>
        </div>

        {/* Stat 3: Real Net Monthly Surplus */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--success)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Real Net Surplus</span>
            <div style={{ background: 'var(--success-glow)', padding: '6px', borderRadius: '8px' }}>
              <PiggyBank size={20} color="var(--success)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--success)' }}>
            {fmt(totalCombinedSurplus)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '0.5rem' }}>
            Actual Surplus after all expenses
          </div>
        </div>

        {/* Stat 4: Combined Base Income */}
        <div className="card card-glow" style={{ borderTop: '4px solid #a855f7' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Combined Income</span>
            <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '6px', borderRadius: '8px' }}>
              <TrendingUp size={20} color="#a855f7" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff' }}>
            {fmt(totalBaseIncome)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Barbara ($5.6k) + Chris ($4.5k) + Erin ($2.5k)
          </div>
        </div>

      </div>

      {/* 2. REAL AUTO-SCRAPED BANK TRANSACTIONS FEED */}
      <div className="card card-glow">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={22} color="var(--success)" />
              <span>Real Live Scraped Bank Activity ({data.transactions.length} items)</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Auto-scraped from your connected bank accounts and auto-categorized into your spending plan.
            </p>
          </div>
          <span className="badge badge-success">
            {isPlaidConnected ? 'Plaid Live Stream Active' : 'Bank Feed Ready'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {data.transactions.slice(0, 8).map(txn => {
            const isIncome = txn.type === 'income' || txn.amount > 0;
            return (
              <div key={txn.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(0,0,0,0.25)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  {isIncome ? (
                    <ArrowUpCircle size={22} color="var(--success)" />
                  ) : (
                    <ArrowDownCircle size={22} color="var(--text-muted)" />
                  )}
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{txn.description}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{txn.date} • {txn.category}</div>
                  </div>
                </div>

                <div className="font-mono" style={{ fontWeight: 800, fontSize: '1.05rem', color: isIncome ? 'var(--success)' : '#fff' }}>
                  {isIncome ? '+' : '-'}{fmt(txn.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. INDIVIDUAL FAMILY EARNER CARDS */}
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

    </div>
  );
};
