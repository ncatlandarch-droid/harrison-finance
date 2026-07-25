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
  Plus
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

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Get custom user-added accounts from data.accounts
  const allAccounts = data?.accounts || [];
  const customAccounts = allAccounts.filter(a => a.id.startsWith('acc_custom_'));

  // If a player is selected, render their Dedicated Full-Page Workspace!
  if (selectedPlayer) {
    return <PlayerProfilePage player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />;
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
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
                  
                  {/* GIANT PHOTO AVATAR FRAME (145px) */}
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

      {/* 💳 REAL LIVE BANK ACCOUNTS & BALANCES WIDGET WITH + ADD ACCOUNT BUTTON */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))' }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={22} color="var(--primary-light)" />
              <span>Real Live Bank & Financial Accounts</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Bank of America, PenFed, Capital One, Novo, Wells Fargo • Last Synced: Live
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

        {/* 6 Accounts Grid */}
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

          {/* Capital One High-Yield Savings */}
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Capital One High-Yield</span>
              <span className="badge badge-success">4.25% HYSA</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#3b82f6' }}>
              {fmt(capitalOneSavings.balance)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>High-Yield Cash Reserve</div>
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

          {/* Render Any Custom Added Accounts */}
          {customAccounts.map(acc => (
            <div key={acc.id} style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{acc.name}</span>
                <span className="badge badge-success">{acc.type}</span>
              </div>
              <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>
                {fmt(acc.balance)}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{acc.institution}</div>
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

      {/* Modals */}
      <FinancialStrategyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      <FamilyProfilePortalModal isOpen={isFamilyPortalOpen} onClose={() => setIsFamilyPortalOpen(false)} />
      <AddAccountModal isOpen={isAddAccountOpen} onClose={() => setIsAddAccountOpen(false)} />

    </div>
  );
};
