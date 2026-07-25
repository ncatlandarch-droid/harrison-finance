import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { FinancialStrategyReportModal } from './FinancialStrategyReportModal';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  DollarSign, 
  CreditCard, 
  Receipt, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertTriangle,
  Users,
  ShieldCheck,
  Building2,
  Lock,
  Sparkles,
  RefreshCw,
  Trophy,
  Heart,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  FileText,
  Phone,
  Calendar
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    data, 
    totalBaseIncome, 
    barbaraTotalExpenses, 
    erinTotalExpenses, 
    chrisTotalExpenses, 
    totalExternalExpenses,
    totalCombinedSurplus,
    totalCheckingCash,
    totalBoACash,
    totalLiquidityBalance,
    papiChecking,
    spendingMoney,
    advPlusBanking,
    advantageSavings,
    bankAmericardCreditCard,
    barbaraCheckingAccount
  } = useFinance();

  const [isReportOpen, setIsReportOpen] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Player Metrics for Gamified Scoreboard with Image Avatar Support
  const players = [
    {
      id: 'barbara',
      name: 'Barbara (Mom)',
      role: 'Family Pillar & Reserve Guardian',
      avatarEmoji: '💜',
      imagePath: '/avatars/barbara.jpg',
      color: '#a855f7',
      income: 5645.84,
      expenses: barbaraTotalExpenses,
      surplus: 5645.84 - barbaraTotalExpenses,
      badge: '👑 Wealth Preserver',
      ratio: Math.round((barbaraTotalExpenses / 5645.84) * 100)
    },
    {
      id: 'chris',
      name: 'Chris',
      role: 'Operating Lead & Tech Architect',
      avatarEmoji: '💙',
      imagePath: '/avatars/chris.jpg',
      color: '#6366f1',
      income: 6309.36 + 3000.00,
      expenses: chrisTotalExpenses,
      surplus: (6309.36 + 3000.00) - chrisTotalExpenses,
      badge: '🚀 Revenue Engine',
      ratio: Math.round((chrisTotalExpenses / (6309.36 + 3000.00)) * 100)
    },
    {
      id: 'erin',
      name: 'Erin',
      role: 'Efficiency Specialist & Educator',
      avatarEmoji: '💗',
      imagePath: '/avatars/erin.jpg',
      color: '#ec4899',
      income: 2500.00,
      expenses: erinTotalExpenses,
      surplus: 2500.00 - erinTotalExpenses,
      badge: '🎯 Budget Ninja',
      ratio: Math.round((erinTotalExpenses / 2500.00) * 100)
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 🎮 GAMIFIED FAMILY PLAYER SCOREBOARD & PLAYER AVATARS */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))' }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Trophy size={24} color="#FDB927" />
              <span>Harrison Family Financial Scoreboard & Avatars</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Real-time gamified cash flow performance tracking per family earner
            </p>
          </div>

          <button 
            className="btn"
            onClick={() => setIsReportOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #FDB927, #f59e0b)',
              color: '#004684',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(253, 185, 39, 0.4)'
            }}
          >
            <FileText size={18} />
            <span>Open Real Talk Financial Report ❤️</span>
          </button>
        </div>

        {/* 3 Player Cards */}
        <div className="grid-3">
          {players.map((p) => (
            <div key={p.id} style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: `1px solid ${p.color}40`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Top Row: Avatar & Badge */}
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${p.color}, #1e1b4b)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    boxShadow: `0 4px 14px ${p.color}40`,
                    border: '2px solid rgba(255,255,255,0.2)',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={p.imagePath} 
                      alt={p.name}
                      onError={(e) => { e.target.style.display = 'none'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute' }}>{p.avatarEmoji}</span>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>{p.name}</h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{p.role}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge" style={{ background: `${p.color}25`, color: p.color, border: `1px solid ${p.color}50`, fontWeight: 700 }}>
                    {p.badge}
                  </span>
                </div>
              </div>

              {/* Inflow vs Outflow Progress Bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div className="flex-between" style={{ fontSize: '0.78rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  <span>Spending Ratio ({p.ratio}%)</span>
                  <span style={{ color: p.surplus > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>
                    +{fmt(p.surplus)} Net Surplus
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${Math.min(p.ratio, 100)}%`,
                    height: '100%',
                    background: p.ratio > 85 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #10b981, #6366f1)',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>

              {/* Inflow / Outflow Stat Numbers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>INCOME BROUGHT IN</div>
                  <div className="font-mono" style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--success)' }}>
                    {fmt(p.income)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MONTHLY SPENT</div>
                  <div className="font-mono" style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--danger)' }}>
                    {fmt(p.expenses)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🕊️ PAPI ACCOUNT CLOSURE & HELOC PAYOFF PROJECTION CARDS */}
      <div className="grid-2" style={{ gap: '1.25rem' }}>
        
        {/* Papi Bank of America Closure Guide */}
        <div className="card" style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🕊️</span>
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>Papi Checking - 7333 Closure Checklist</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bank of America Estate Care Team Instructions</p>
            </div>
          </div>

          <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>• <strong>BoA Estate Line:</strong> Call <strong>888-689-4466</strong> (Mon–Fri 9am–8pm ET)</div>
            <div>• <strong>Documents Needed:</strong> Original Death Certificate + Photo ID</div>
            <div>• <strong>Action:</strong> Transfer `-$36.00` balance to Adv Plus 4717 and close cleanly.</div>
          </div>
        </div>

        {/* Figure HELOC +$1,000 Extra Payment Payoff Simulator */}
        <div className="card" style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <TrendingUp size={24} color="#f59e0b" />
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>Figure HELOC +$1,000 Extra Payoff Simulator</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Accelerated Principal Reduction Plan</p>
            </div>
          </div>

          <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>• <strong>Standard Plan ($1k/mo):</strong> 25+ years • Rate jumps to 15.3% in Aug 2029</div>
            <div>• <strong>Accelerated Plan ($2k/mo):</strong> Paid off in <strong>5.2 Years (by late 2031!)</strong></div>
            <div style={{ color: 'var(--success)', fontWeight: 800 }}>• Total Interest Saved: +$98,400 Cash Saved!</div>
          </div>
        </div>

      </div>

      {/* 💳 REAL LIVE BANK OF AMERICA ACCOUNTS & BALANCES WIDGET */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))' }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={22} color="var(--primary-light)" />
              <span>Real Live Bank of America Accounts & Balances</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Direct from your Bank of America online banking portal • Last Synced: Live
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE CHECKING CASH</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--warning)' }}>
                {fmt(totalCheckingCash)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL LIQUID RESERVES</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>
                {fmt(totalLiquidityBalance)}
              </div>
            </div>
          </div>
        </div>

        {/* 5 Accounts Grid */}
        <div className="grid-3" style={{ gap: '1rem' }}>
          
          {/* Papi Checking 7333 */}
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Papi Checking - 7333</span>
              <span className="badge badge-danger">-$36.00 Low Alert</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--danger)' }}>
              -${Math.abs(papiChecking.balance).toFixed(2)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Checking Operating Account</div>
          </div>

          {/* Spending Money 4866 */}
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Spending Money - 4866</span>
              <span className="badge badge-success">Active Checking</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>
              {fmt(spendingMoney.balance)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Checking Operating Account</div>
          </div>

          {/* Adv Plus Banking 4717 */}
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Adv Plus Banking - 4717</span>
              <span className="badge badge-success">Active Checking</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>
              {fmt(advPlusBanking.balance)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Primary Business Checking</div>
          </div>

          {/* Advantage Savings 0495 */}
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Advantage Savings - 0495</span>
              <span className="badge badge-primary">BoA Savings</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-light)' }}>
              {fmt(advantageSavings.balance)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Reserve Savings Account</div>
          </div>

          {/* BankAmericard Visa 6343 */}
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>BankAmericard Visa - 6343</span>
              <span className="badge badge-warning">Credit Card</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--warning)' }}>
              {fmt(bankAmericardCreditCard.balance)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Credit Balance ($3.5k paid May/July)</div>
          </div>

          {/* Mom's PenFed Savings */}
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Mom's PenFed Reserve</span>
              <span className="badge" style={{ background: '#a855f7', color: '#fff' }}>Barbara Savings</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc' }}>
              {fmt(barbaraCheckingAccount.balance)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Liquid Capital Reserve</div>
          </div>

        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid-4">
        
        {/* Total Monthly Income */}
        <div className="card">
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>FAMILY NET INFLOW</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>
              <ArrowUpRight size={18} />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
            {fmt(totalBaseIncome)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Barbara ($5.6k) + Chris ($6.3k) + Erin ($2.5k)
          </div>
        </div>

        {/* Total Monthly Expenses */}
        <div className="card">
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL FIXED OUTFLOW</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--danger)' }}>
              <ArrowDownRight size={18} />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--danger)' }}>
            {fmt(totalExternalExpenses)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            34 Itemized Family Commitments
          </div>
        </div>

        {/* Net Monthly Surplus */}
        <div className="card card-glow">
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>NET MONTHLY SURPLUS</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-light)' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success)' }}>
            +{fmt(totalCombinedSurplus)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Real Net Inflow Minus Fixed Bills
          </div>
        </div>

        {/* Active Checking Cash */}
        <div className="card">
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>CHECKING CASH CASH</span>
            <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
              <Wallet size={18} />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--warning)' }}>
            {fmt(totalCheckingCash)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Across 3 Active BoA Checking Accounts
          </div>
        </div>

      </div>

      {/* Financial Strategy Modal */}
      <FinancialStrategyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />

    </div>
  );
};
