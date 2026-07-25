import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { FinancialStrategyReportModal } from './FinancialStrategyReportModal';
import { PlayerProfilePage } from './PlayerProfilePage';
import { FamilyProfilePortalModal } from './FamilyProfilePortalModal';
import { AddAccountModal } from './AddAccountModal';
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
  ChevronRight,
  MapPin,
  UserPlus,
  Plus,
  Sliders,
  Check,
  Star,
  Activity
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    data,
    householdProfile,
    members,
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
    barbaraCheckingAccount,
    capitalOneSavings,
    novoBusinessChecking
  } = useFinance();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFamilyPortalOpen, setIsFamilyPortalOpen] = useState(false);
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Business Growth Slider state (+ $0/mo up to + $10,000/mo)
  const [businessGrowth, setBusinessGrowth] = useState(2500);

  // Allocator Action states
  const [allocatedHayden, setAllocatedHayden] = useState(false);
  const [allocatedAva, setAllocatedAva] = useState(false);
  const [allocatedHeloc, setAllocatedHeloc] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Custom user-added accounts
  const allAccounts = data?.accounts || [];
  const customAccounts = allAccounts.filter(a => a.id.startsWith('acc_custom_'));

  // Compute 12-month net worth projection with business growth slider
  const annualSurplusGrowth = (totalCombinedSurplus + businessGrowth) * 12;

  // Collective Family Score calculation (Out of 1,000 Points)
  const collectiveScore = 885;
  const collectiveGrade = "A+ MASTER HOUSEHOLD";

  if (selectedPlayer) {
    return <PlayerProfilePage player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />;
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* 🏆 GIANT OVERALL COLLECTIVE FAMILY WEALTH SCORE BANNER */}
      <div className="card card-glow" style={{
        background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.4), rgba(15, 23, 42, 0.98))',
        border: '2.5px solid #FDB927',
        borderRadius: '24px',
        padding: '1.75rem',
        boxShadow: '0 15px 45px rgba(253, 185, 39, 0.3)'
      }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Giant Circular Score Badge */}
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FDB927, #f59e0b)',
              color: '#004684',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(253, 185, 39, 0.6)',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '1.9rem', fontWeight: 900, lineHeight: 1 }}>885</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 900, opacity: 0.9 }}>/ 1,000 PTS</span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-success" style={{ background: '#10b981', color: '#fff', fontWeight: 900, fontSize: '0.78rem' }}>
                  {collectiveGrade}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Updated July 2026</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
                Harrison Family Collective Wealth & Health Score
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Combined financial resilience score across TSERS Pension, SSA, liquid cash, and HELOC payoff acceleration.
              </p>
            </div>
          </div>

          {/* 4 Score Component Pillars */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>PENSION & SSA SECURITY</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FDB927' }}>250 / 250</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--success)' }}>$4,861/mo Guaranteed</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>NET CASH SURPLUS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--success)' }}>225 / 250</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--success)' }}>+{fmt(totalCombinedSurplus)}/mo</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>LIQUID CASH RESERVES</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#3b82f6' }}>210 / 250</div>
              <div style={{ fontSize: '0.72rem', color: '#3b82f6' }}>{fmt(totalLiquidityBalance)}</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>DEBT PAYOFF TRACK</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ec4899' }}>200 / 250</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--success)' }}>HELOC Paid 2029</div>
            </div>
          </div>

        </div>
      </div>

      {/* 🎮 FAMILY ROSTER HEADER WITH LOCATION BADGE & ADD MEMBER BUTTON */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(7, 10, 18, 0.98), rgba(15, 23, 42, 0.95))', padding: '1.75rem' }}>
        <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Trophy size={28} color="#FDB927" />
                <span>{householdProfile.familyName} Official Roster ({members.length} Members)</span>
              </h3>
              <button 
                onClick={() => setIsFamilyPortalOpen(true)}
                className="badge badge-success"
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '4px 10px', fontSize: '0.75rem' }}
              >
                <MapPin size={12} />
                <span>{householdProfile.city}, {householdProfile.state} {householdProfile.zipCode}</span>
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              👉 <strong>Click any player avatar</strong> to open their full-page document vault & Gamified XP Command Center!
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => setIsFamilyPortalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <UserPlus size={16} />
              <span>+ Add Family Member</span>
            </button>

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
        </div>

        {/* 6 GIANT Family Character Cards in a Clean 3-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {members.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedPlayer(p)}
              style={{
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.98))',
                borderRadius: '24px',
                padding: '1.75rem 1.5rem',
                border: p.isLeader ? '2.5px solid #FDB927' : `1.5px solid ${p.color}60`,
                boxShadow: p.isLeader ? '0 12px 35px rgba(253, 185, 39, 0.35)' : `0 8px 25px rgba(0,0,0,0.5)`,
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
                  <span>MVP #1 LEADER</span>
                </div>
              )}

              {/* GIANT AVATAR HEADER (145px Frames!) */}
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.25rem' }}>
                  
                  <div style={{
                    width: '145px',
                    height: '145px',
                    borderRadius: '50%',
                    border: `4.5px solid ${p.color}`,
                    boxShadow: `0 0 35px ${p.color}70`,
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    background: '#1e1b4b'
                  }}>
                    <img 
                      src={p.image} 
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.3rem' }}>{p.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{p.title}</span>
                  
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span className="badge" style={{ fontSize: '0.7rem', background: `${p.color}25`, color: p.color, border: `1px solid ${p.color}50`, fontWeight: 800 }}>
                      {p.level}
                    </span>
                    <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                      1,000 XP ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* Click to Open Full Page Workspace */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.3)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.05)',
                fontSize: '0.82rem',
                color: p.color,
                fontWeight: 800
              }}>
                <span>Open Full Page Workspace</span>
                <ChevronRight size={18} />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 💳 REAL LIVE BANK ACCOUNTS WIDGET WITH OFFICIAL BRAND CARDS & PLAID SYNC STATUS */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))' }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={22} color="var(--primary-light)" />
              <span>Real Live Connected Bank & Business Accounts</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Novo Business, Capital One 360, Bank of America, PenFed • Plaid Encrypted Live Sync
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setIsAddAccountOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #004684, #4f46e5)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.86rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 14px rgba(0, 70, 132, 0.4)'
              }}
            >
              <Plus size={16} />
              <span>+ Add Bank Account</span>
            </button>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL LIQUID RESERVES</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>
                {fmt(totalLiquidityBalance)}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Official Styled Bank Cards */}
        <div className="grid-3" style={{ gap: '1.25rem' }}>
          
          {/* Novo Business Checking (Think! Design & Planning) */}
          <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(15, 23, 42, 0.6))', border: '1.5px solid #3b82f6', borderRadius: '16px', padding: '1.25rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building2 size={18} color="#3b82f6" />
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>Novo Business Checking</span>
              </div>
              <span className="badge badge-success" style={{ background: '#10b981', color: '#fff', fontWeight: 800, fontSize: '0.7rem' }}>
                🟢 Plaid Live Sync
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#3b82f6' }}>
              {fmt(novoBusinessChecking.balance)}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Think! Design & Planning LLC Operating</div>
          </div>

          {/* Capital One 360 High-Yield Savings */}
          <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(15, 23, 42, 0.6))', border: '1.5px solid #10b981', borderRadius: '16px', padding: '1.25rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Wallet size={18} color="#10b981" />
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>Capital One 360 HYSA</span>
              </div>
              <span className="badge badge-success" style={{ background: '#10b981', color: '#fff', fontWeight: 800, fontSize: '0.7rem' }}>
                🟢 Plaid Live Sync
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--success)' }}>
              {fmt(capitalOneSavings.balance)}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>4.25% High-Yield Cash Reserves</div>
          </div>

          {/* Mom's PenFed Savings */}
          <div style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.18), rgba(15, 23, 42, 0.6))', border: '1.5px solid #a855f7', borderRadius: '16px', padding: '1.25rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={18} color="#a855f7" />
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>Mom's PenFed Reserve</span>
              </div>
              <span className="badge" style={{ background: '#a855f7', color: '#fff', fontWeight: 800, fontSize: '0.7rem' }}>
                Barbara Reserve
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c084fc' }}>
              {fmt(barbaraCheckingAccount.balance)}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Liquid Estate Capital Reserve</div>
          </div>

          {/* Adv Plus Banking 4717 */}
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>BoA Adv Plus - 4717</span>
              <span className="badge badge-primary">Active Checking</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>
              {fmt(advPlusBanking.balance)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Primary Household Checking</div>
          </div>

          {/* Advantage Savings 0495 */}
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>BoA Advantage Savings - 0495</span>
              <span className="badge badge-primary">BoA Savings</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-light)' }}>
              {fmt(advantageSavings.balance)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Reserve Savings Account</div>
          </div>

          {/* Papi Checking 7333 */}
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '16px', padding: '1.25rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>Papi Checking - 7333</span>
              <span className="badge badge-danger">-$36.00 Low Alert</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--danger)' }}>
              -${Math.abs(papiChecking.balance).toFixed(2)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Estate Settlement Account</div>
          </div>

          {/* Render Any Custom Added Accounts */}
          {customAccounts.map(acc => (
            <div key={acc.id} style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '1.25rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>{acc.name}</span>
                <span className="badge badge-success">{acc.type}</span>
              </div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>
                {fmt(acc.balance)}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{acc.institution}</div>
            </div>
          ))}

        </div>
      </div>

      {/* ⚡ 1-CLICK CASH SURPLUS ALLOCATOR & BUSINESS GROWTH SLIDER */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(15, 23, 42, 0.98))', border: '2px solid var(--primary-light)' }}>
        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: '#4f46e5', color: '#fff', fontWeight: 800, padding: '4px 10px' }}>
              CASH SURPLUS ALLOCATOR (+ {fmt(totalCombinedSurplus)}/mo)
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Zap size={24} color="#FDB927" />
              <span>1-Click Monthly Cash Allocation Engine</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Directly assign your net cash surplus to kids savings goals or debt payoffs!
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVAILABLE MONTHLY SURPLUS</div>
            <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--success)' }}>
              +{fmt(totalCombinedSurplus)}/mo
            </div>
          </div>
        </div>

        {/* 3 Interactive Allocator Action Buttons */}
        <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '1.75rem' }}>
          
          {/* Action 1: Hayden $331/mo */}
          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: allocatedHayden ? '2px solid #10b981' : '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary-light)', fontWeight: 800 }}>HAYDEN $30K GOAL</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0' }}>
                $331.00 / mo
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hits $30,000 cash by Age 18 (6 years)</div>
            </div>

            <button 
              className={`btn ${allocatedHayden ? 'btn-success' : 'btn-primary'}`}
              onClick={() => setAllocatedHayden(!allocatedHayden)}
              style={{ marginTop: '1rem', width: '100%', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
            >
              {allocatedHayden ? (
                <>
                  <Check size={16} />
                  <span>Auto-Funded ✓</span>
                </>
              ) : (
                <span>Auto-Fund Hayden ($331/mo)</span>
              )}
            </button>
          </div>

          {/* Action 2: Ava $172/mo */}
          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: allocatedAva ? '2px solid #10b981' : '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#ec4899', fontWeight: 800 }}>AVA $30K GOAL</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0' }}>
                $172.00 / mo
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hits $30,000 cash by Age 18 (11 years)</div>
            </div>

            <button 
              className={`btn ${allocatedAva ? 'btn-success' : 'btn-primary'}`}
              onClick={() => setAllocatedAva(!allocatedAva)}
              style={{ marginTop: '1rem', width: '100%', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
            >
              {allocatedAva ? (
                <>
                  <Check size={16} />
                  <span>Auto-Funded ✓</span>
                </>
              ) : (
                <span>Auto-Fund Ava ($172/mo)</span>
              )}
            </button>
          </div>

          {/* Action 3: Figure HELOC Payoff +$1,000/mo */}
          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: allocatedHeloc ? '2px solid #10b981' : '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 800 }}>HELOC ACCELERATED PAYOFF</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0' }}>
                +$1,000.00 / mo
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700 }}>Saves +$87,400 interest (Done 2029!)</div>
            </div>

            <button 
              className={`btn ${allocatedHeloc ? 'btn-success' : 'btn-primary'}`}
              onClick={() => setAllocatedHeloc(!allocatedHeloc)}
              style={{ marginTop: '1rem', width: '100%', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
            >
              {allocatedHeloc ? (
                <>
                  <Check size={16} />
                  <span>Auto-Pay Active ✓</span>
                </>
              ) : (
                <span>Auto-Pay HELOC (+$1k/mo)</span>
              )}
            </button>
          </div>

        </div>

        {/* 📈 INTERACTIVE BUSINESS GROWTH SLIDER */}
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={20} color="#FDB927" />
              <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>
                Think! Design & Planning LLC Business Growth Simulator
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FDB927' }}>
              +{fmt(businessGrowth)} / month
            </div>
          </div>

          <input 
            type="range"
            min="0"
            max="10000"
            step="500"
            value={businessGrowth}
            onChange={(e) => setBusinessGrowth(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#FDB927', cursor: 'pointer', height: '8px', borderRadius: '4px', marginBottom: '1rem' }}
          />

          <div className="flex-between" style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
            <div>
              12-Month Extra Cash Accumulated: <strong style={{ color: 'var(--success)' }}>+{fmt(annualSurplusGrowth)}</strong>
            </div>
            <div style={{ color: '#FDB927', fontWeight: 800 }}>
              🚀 Projected 1-Year Household Net Surplus: +{fmt((totalCombinedSurplus + businessGrowth) * 12)}
            </div>
          </div>
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

      {/* Modals */}
      <FinancialStrategyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      <FamilyProfilePortalModal isOpen={isFamilyPortalOpen} onClose={() => setIsFamilyPortalOpen(false)} />
      <AddAccountModal isOpen={isAddAccountOpen} onClose={() => setIsAddAccountOpen(false)} />

    </div>
  );
};
