import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  TrendingUp, 
  Receipt, 
  PiggyBank, 
  AlertTriangle, 
  Building,
  ShieldCheck,
  Zap,
  ArrowDownCircle,
  ArrowUpCircle,
  Calculator,
  CreditCard,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    totalBaseIncome, 
    barbaraTotalExpenses, 
    erinTotalExpenses,
    chrisTotalExpenses,
    totalExternalExpenses,
    totalScrapedBankSpending,
    barbaraNetRemaining,
    erinNetRemaining,
    chrisNetRemaining,
    totalCombinedSurplus,
    totalLiquidityBalance,
    data 
  } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const isPlaidConnected = data.transactions.some(t => t.id.startsWith('pt_') || t.source === 'Plaid');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* 🚨 EXPLICIT REASON WHY BANK ACCOUNTS ARE LOW RIGHT NOW */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.15))',
        border: '1px solid rgba(239, 68, 68, 0.6)',
        boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ background: 'var(--danger-glow)', padding: '12px', borderRadius: '14px', flexShrink: 0 }}>
            <AlertCircle size={32} color="var(--danger)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Why Accounts Are Low Right Now (July Cash Drain Uncovered)
              </h3>
              <span className="badge badge-danger">July Net Deficit: -$5,615.29</span>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#fff', marginTop: '0.5rem', lineHeight: '1.5' }}>
              In July 2026, total cash outflows were <strong>$10,419.61</strong>, while cash inflows were only <strong>$4,804.32</strong> (because the June NC A&T paycheck posted on June 30th instead of July 1st). 
              Three major expenses wiped out <strong>$5,615.29 of cash in 30 days</strong>:
            </p>

            <div className="grid-3" style={{ marginTop: '0.85rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>1. Google Cloud API (June/July)</div>
                <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--danger)' }}>$4,695.49 Total</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.2rem' }}>✓ Now Stopped ($0.00)</div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>2. BoA Credit Card #6343 Paydown</div>
                <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--warning)' }}>$2,000.00 Paid</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>July 1st Lump Paydown</div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>3. DoorDash & Dining Out (3 Mos)</div>
                <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--danger)' }}>$3,745.58 Total</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>64 Separate Orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 3-MONTH SIDE-BY-SIDE TREND COMPARISON (MAY vs JUNE vs JULY 2026) */}
      <div className="card card-glow">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={22} color="var(--primary-light)" />
              <span>3-Month Bank Statement Cash Flow Trends (May • June • July 2026)</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Empirical month-by-month cash flow parsed directly from your Bank of America checking & credit card statements.
            </p>
          </div>
          <span className="badge badge-primary">3-Month Statement Audit</span>
        </div>

        <div className="grid-3">
          
          {/* May 2026 */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>May 2026</span>
              <span className="badge badge-success">+$2,133.08 Net</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>Bank Inflow:</span><span className="font-mono" style={{ color: 'var(--success)' }}>+$11,449.52</span></div>
              <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>Bank Outflow:</span><span className="font-mono" style={{ color: 'var(--danger)' }}>-$9,316.44</span></div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>• Google Cloud: $409.20</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>• BoA Card #6343 Pay: $1,500.00</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>• DoorDash & Dining: $392.43</div>
              </div>
            </div>
          </div>

          {/* June 2026 */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>June 2026</span>
              <span className="badge badge-success">+$1,784.02 Net</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>Bank Inflow:</span><span className="font-mono" style={{ color: 'var(--success)' }}>+$12,443.62</span></div>
              <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>Bank Outflow:</span><span className="font-mono" style={{ color: 'var(--danger)' }}>-$10,659.60</span></div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--danger)', fontWeight: 700 }}>• Google Cloud: $2,962.61</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>• BoA Card #6343 Pay: $0.00</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>• DoorDash & Dining: $648.28</div>
              </div>
            </div>
          </div>

          {/* July 2026 */}
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>July 2026</span>
              <span className="badge badge-danger">-$5,615.29 Net</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>Bank Inflow:</span><span className="font-mono" style={{ color: 'var(--warning)' }}>+$4,804.32*</span></div>
              <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>Bank Outflow:</span><span className="font-mono" style={{ color: 'var(--danger)' }}>-$10,419.61</span></div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--danger)' }}>• Google Cloud: $1,732.88</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--warning)', fontWeight: 700 }}>• BoA Card #6343 Pay: $2,000.00</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>• DoorDash & Dining: $190.34</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 💳 BOA CREDIT CARD #6343 TRACKING & LIVE BALANCES */}
      <div className="grid-4">
        
        {/* Stat 1: Live Bank Liquidity */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--primary-light)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live Checking Liquidity</span>
            <div style={{ background: 'var(--primary-glow)', padding: '6px', borderRadius: '8px' }}>
              <Building size={20} color="var(--primary-light)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff' }}>
            {fmt(totalLiquidityBalance)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--success)' }}>
            <ShieldCheck size={14} />
            <span>{isPlaidConnected ? 'Plaid Live Sync Active' : 'Checking & Savings Balances'}</span>
        {/* Stat 2: BoA Credit Card #6343 Balance */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--warning)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>BoA Credit Card #6343</span>
            <div style={{ background: 'var(--warning-glow)', padding: '6px', borderRadius: '8px' }}>
              <CreditCard size={20} color="var(--warning)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--warning)' }}>
            $4,000.00
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            $3,500 Paid Off in May & July ($1.3k/mo avg)
          </div>
        </div>

        {/* Stat 3: Real Household Expenses */}
        <div className="card card-glow" style={{ borderTop: '4px solid var(--danger)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Real BoA Outflow</span>
            <div style={{ background: 'var(--danger-glow)', padding: '6px', borderRadius: '8px' }}>
              <Receipt size={20} color="var(--danger)" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--danger)' }}>
            {fmt(totalExternalExpenses)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            3-Month Real BoA Outflow Average
          </div>
        </div>

        {/* Stat 4: Real Household Income */}
        <div className="card card-glow" style={{ borderTop: '4px solid #a855f7' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Real Family Income</span>
            <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '6px', borderRadius: '8px' }}>
              <TrendingUp size={20} color="#a855f7" />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff' }}>
            {fmt(totalBaseIncome)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Chris ($6.3k BoA) + Barbara ($5.6k) + Erin ($2.5k)
          </div>
        </div>)
          </div>
        </div>

      </div>

      {/* 4. REAL LIVE SCRAPED BANK TRANSACTIONS FEED */}
      <div className="card card-glow">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={22} color="var(--success)" />
              <span>Real Live Scraped Bank Activity ({data.transactions.length} items)</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Auto-scraped from your connected Bank of America checking & credit card accounts.
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

    </div>
  );
};
