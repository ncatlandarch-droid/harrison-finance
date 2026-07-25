import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { FinancialStrategyReportModal } from './FinancialStrategyReportModal';
import { PlayerProfileModal } from './PlayerProfileModal';
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
  Calendar,
  Crown,
  ChevronRight
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
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Player Metrics for Giant Showcase Character Cards
  const players = [
    {
      id: 'erin',
      name: 'Erin Harrison',
      title: 'Efficiency Specialist & Educator',
      image: '/avatars/erin.png',
      color: '#ec4899',
      income: 2500.00,
      expenses: erinTotalExpenses,
      surplus: 2500.00 - erinTotalExpenses,
      badge: '👑 MVP LEADER',
      isLeader: true,
      ratio: Math.round((erinTotalExpenses / 2500.00) * 100),
      level: 'LVL 99 BUDGET NINJA',
      estateScore: 100
    },
    {
      id: 'chris',
      name: 'Chris Harrison',
      title: 'Operating Lead & Tech Architect',
      image: '/avatars/chris.jpg',
      color: '#6366f1',
      income: 6309.36 + 3000.00,
      expenses: chrisTotalExpenses,
      surplus: (6309.36 + 3000.00) - chrisTotalExpenses,
      badge: '🚀 REVENUE ENGINE',
      isLeader: false,
      ratio: Math.round((chrisTotalExpenses / (6309.36 + 3000.00)) * 100),
      level: 'LVL 95 TECH ARCHITECT',
      estateScore: 100
    },
    {
      id: 'barbara',
      name: 'Barbara Harrison',
      title: 'Family Pillar & Reserve Guardian',
      image: '/avatars/barbara.png',
      color: '#a855f7',
      income: 5645.84,
      expenses: barbaraTotalExpenses,
      surplus: 5645.84 - barbaraTotalExpenses,
      badge: '🛡️ CAPITAL SHIELD',
      isLeader: false,
      ratio: Math.round((barbaraTotalExpenses / 5645.84) * 100),
      level: 'LVL 99 WEALTH GUARDIAN',
      estateScore: 100
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* 🎮 GIANT SHOWCASE PLAYER CHARACTER CARDS (CLICK TO OPEN PROFILE & ESTATE VAULT) */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(7, 10, 18, 0.98), rgba(15, 23, 42, 0.95))', padding: '1.75rem' }}>
        <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Trophy size={28} color="#FDB927" />
              <span>Harrison Family Roster & Interactive Player Profiles</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              👉 <strong>Click any player card</strong> to drill into their financial profile, estate planning lockbox, and vital directives!
            </p>
          </div>

          <button 
            className="btn"
            onClick={() => setIsReportOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #FDB927, #f59e0b)',
              color: '#004684',
              fontWeight: 800,
              fontSize: '0.92rem',
              padding: '0.65rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 18px rgba(253, 185, 39, 0.4)',
              borderRadius: '30px'
            }}
          >
            <FileText size={18} />
            <span>Open Real Talk Financial Report ❤️</span>
          </button>
        </div>

        {/* 3 GIANT Interactive Player Character Cards */}
        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {players.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedPlayer(p)}
              style={{
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                borderRadius: '20px',
                padding: '1.75rem',
                border: p.isLeader ? '2px solid #FDB927' : `1.5px solid ${p.color}60`,
                boxShadow: p.isLeader ? '0 12px 35px rgba(253, 185, 39, 0.3)' : `0 8px 25px rgba(0,0,0,0.5)`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              className="card-hover"
            >
              {/* Leader Crown Badge */}
              {p.isLeader && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #FDB927, #f59e0b)',
                  color: '#004684',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontWeight: 900,
                  fontSize: '0.74rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 4px 12px rgba(253, 185, 39, 0.5)'
                }}>
                  <Crown size={14} fill="#004684" />
                  <span>MVP #1 SURPLUS LEADER</span>
                </div>
              )}

              {/* Giant Avatar Header */}
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.25rem' }}>
                  
                  {/* GIANT PHOTO AVATAR FRAME (110px) */}
                  <div style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    border: `4px solid ${p.color}`,
                    boxShadow: `0 0 30px ${p.color}70`,
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    background: '#1e1b4b'
                  }}>
                    <img 
                      src={p.image} 
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.25rem' }}>{p.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{p.title}</span>
                  
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
                    <span className="badge" style={{ fontSize: '0.68rem', background: `${p.color}25`, color: p.color, border: `1px solid ${p.color}50`, fontWeight: 800 }}>
                      {p.level}
                    </span>
                    <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>
                      Estate Readiness: 100%
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Efficiency Ratio */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div className="flex-between" style={{ fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                    <span>Spending Ratio ({p.ratio}%)</span>
                    <span style={{ color: 'var(--success)', fontWeight: 800 }}>
                      +{fmt(p.surplus)} Surplus
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(p.ratio, 100)}%`,
                      height: '100%',
                      background: p.ratio > 80 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #10b981, #6366f1)',
                      borderRadius: '5px'
                    }} />
                  </div>
                </div>
              </div>

              {/* Click to Drill Down Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.3)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.05)',
                fontSize: '0.8rem',
                color: p.color,
                fontWeight: 700
              }}>
                <span>Click for Profile & Estate Lockbox</span>
                <ChevronRight size={16} />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 🕊️ PAPI ACCOUNT CLOSURE & HELOC PAYOFF PROJECTION CARDS */}
      <div className="grid-2" style={{ gap: '1.5rem' }}>
        
        {/* Papi Bank of America Closure Guide */}
        <div className="card" style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.6rem' }}>🕊️</span>
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>Papi Checking - 7333 Closure Checklist</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bank of America Estate Care Team Official Procedure</p>
            </div>
          </div>

          <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div>• <strong>BoA Estate Servicing Phone:</strong> <strong>888-689-4466</strong> (Mon–Fri 9am–8pm ET)</div>
            <div>• <strong>Online Case Portal:</strong> bankofamerica.com/estateservices</div>
            <div>• <strong>Documents Required:</strong> Original Death Certificate + Photo ID (Chris/Barbara)</div>
            <div>• <strong>Action Plan:</strong> Settle `-$36.00` balance into Adv Plus 4717 & close account 7333 cleanly.</div>
          </div>
        </div>

        {/* Figure HELOC +$1,000 Extra Payment Payoff Simulator */}
        <div className="card" style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
            <TrendingUp size={26} color="#f59e0b" />
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>Figure HELOC +$1,000 Extra Payoff Simulator</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accelerated Principal Payoff Plan</p>
            </div>
          </div>

          <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div>• <strong>Min Payment Plan ($1k/mo):</strong> 25+ years • Rate reset to 15.3% in Aug 2029</div>
            <div>• <strong>Accelerated Plan ($3.2k/mo total):</strong> Paid off in <strong>36 Months (August 2029!)</strong></div>
            <div style={{ color: 'var(--success)', fontWeight: 800 }}>• Total Interest Saved: +$87,400 Cash Saved!</div>
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

      {/* Modals */}
      <FinancialStrategyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      <PlayerProfileModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />

    </div>
  );
};
