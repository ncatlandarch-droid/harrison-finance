import React, { useRef } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Bot, Sparkles, Printer, Download, ShieldCheck, AlertTriangle, TrendingUp, DollarSign, CheckCircle2, X, Heart, Trophy, Target, ArrowRight } from 'lucide-react';

export const FinancialStrategyReportModal = ({ isOpen, onClose }) => {
  const { 
    totalBaseIncome, 
    barbaraTotalExpenses, 
    erinTotalExpenses, 
    chrisTotalExpenses, 
    totalExternalExpenses,
    totalCombinedSurplus,
    totalCheckingCash,
    totalBoACash,
    barbaraCheckingAccount,
    papiChecking,
    spendingMoney,
    advPlusBanking,
    advantageSavings,
    bankAmericardCreditCard
  } = useFinance();

  const reportRef = useRef();

  if (!isOpen) return null;

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="animate-scale-up" style={{
        width: '100%',
        maxWidth: '920px',
        maxHeight: '92vh',
        background: '#0f172a',
        borderRadius: '16px',
        border: '1px solid #334155',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'linear-gradient(135deg, #004684, #4f46e5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FDB927', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(253, 185, 39, 0.4)' }}>
              <Bot size={28} color="#004684" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>Harrison Family Wealth & Strategy Report</span>
                <Heart size={16} color="#ec4899" fill="#ec4899" />
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Formal Real-Talk Assessment: Wins, Leaks & Maximizer Directive • Always With Love ❤️
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn" onClick={handlePrint} style={{ background: '#FDB927', color: '#004684', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'cursor', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Report Body */}
        <div ref={reportRef} style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#e2e8f0' }}>
          
          {/* Executive Summary */}
          <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h4 style={{ fontWeight: 800, color: '#FDB927', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} />
              <span>Executive Financial Assessment</span>
            </h4>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: '#cbd5e1' }}>
              The Harrison household operates from a position of tremendous fundamental strength: <strong>{fmt(totalBaseIncome)}/month in net family income</strong> versus <strong>{fmt(totalExternalExpenses)}/month in real bills</strong>, generating an impressive <strong>+{fmt(totalCombinedSurplus)}/month in net liquid surplus</strong>. 
              Mom's PenFed reserve ({fmt(barbaraCheckingAccount.balance)}) protects the family foundation. Below is our direct, honest real-talk report on what we are doing well with, where money is leaking, and how to maximize every dollar.
            </p>
          </div>

          {/* Section 1: What We Are Doing Well With (Wins) */}
          <div>
            <h4 style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} color="#10b981" />
              <span>1. WHAT WE ARE DOING WELL WITH (Wins & Strengths 🏆)</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.3rem' }}>💪 High Earning Power & Income Diversity</div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  $14,455.20/mo income from 3 distinct sources (Barbara OPM Pension $5.6k, Chris NC A&T $6.3k, Erin UNCG $2.5k) provides exceptional economic resilience.
                </p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.3rem' }}>🛑 Stopped $2.3k/mo Google API Leak</div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Auditing and deleting old paid Google API keys stopped a massive $2,285.72/month drain, preserving +$27,400/year in cash!
                </p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.3rem' }}>🛡️ Mom's Liquid Capital Shield</div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Barbara's $76,155.00 PenFed liquid reserve provides complete emergency backup and protects the household against unexpected events.
                </p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.3rem' }}>🎯 Erin's Budget Discipline</div>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Erin maintains a tight $1,569/mo total outflow against $2,500/mo income, generating a consistent +$931/mo net surplus.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: What We Are F***ing Up On (Always With Love ❤️) */}
          <div>
            <h4 style={{ fontWeight: 800, color: '#ef4444', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" />
              <span>2. WHAT WE ARE F***ING UP ON (Real Talk, Always With Love ❤️)</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
                  🚨 DoorDash & Fast Dining Leak ($1,248.53/month)
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Over 3 months, $3,745.58 was spent on DoorDash, McDonald's, Boxcar, and takeout across 64 separate orders. Capping takeout at $500/mo puts <strong>+$748.53/mo ($8,982/yr)</strong> straight back into your pocket!
                </p>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
                  🚨 Figure Room Addition Loan Rate Reset (9.75% → 15.30% in Aug 2029)
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Barbara's Figure HELOC currently costs $1,000/mo. If left unaddressed until August 2029, the interest rate jumps to 15.30%, causing total interest to balloon by <strong>+$87,000</strong>!
                </p>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
                  🚨 Uncoordinated Checking Account Transfers (Causes -$36.00 Low Balance Alert)
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Because transfers happen randomly instead of on the 1st of the month, Papi Checking hit -$36.00 while other accounts had cash. Automating 1st-of-month Zelle transfers permanently solves low balance alerts!
                </p>
              </div>

            </div>
          </div>

          {/* Section 3: Where Money Should Be Allocated (Wealth Maximizer Plan) */}
          <div>
            <h4 style={{ fontWeight: 800, color: '#FDB927', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={20} color="#FDB927" />
              <span>3. WEALTH MAXIMIZER ALLOCATION DIRECTIVE (Where Every Dollar Goes)</span>
            </h4>

            <div style={{ background: 'rgba(253, 185, 39, 0.1)', border: '1px solid rgba(253, 185, 39, 0.3)', padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span className="badge" style={{ background: '#FDB927', color: '#004684', fontWeight: 800, fontSize: '0.85rem' }}>STEP 1</span>
                <div>
                  <strong style={{ color: '#fff' }}>Automate 1st-of-the-Month Zelle Transfers:</strong> Barbara transfers $3,000 and Erin transfers $780 into Chris's BoA operating account on the 1st of each month.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span className="badge" style={{ background: '#FDB927', color: '#004684', fontWeight: 800, fontSize: '0.85rem' }}>STEP 2</span>
                <div>
                  <strong style={{ color: '#fff' }}>Pay Extra $1,000/mo Towards Figure HELOC:</strong> Use $1,000/mo from your +$5,078 monthly net surplus to pay down principal on Barbara's 9.75% Figure HELOC. This eliminates the loan before 2029 and saves $87,000 in interest!
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span className="badge" style={{ background: '#FDB927', color: '#004684', fontWeight: 800, fontSize: '0.85rem' }}>STEP 3</span>
                <div>
                  <strong style={{ color: '#fff' }}>Allocate $1,500/mo to High-Yield Family Investment Account:</strong> Put $1,500/mo into a 5.0% High-Yield Savings or Index Fund to build $100,000+ in family wealth over 5 years.
                </div>
              </div>

            </div>
          </div>

          {/* Signature Footer */}
          <div style={{ marginTop: '1rem', paddingTop: '1.25rem', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: '#94a3b8' }}>
            <div>Approved by: <strong>Coach Perry AI Financial Advisor</strong></div>
            <div>Harrison Family Platform v3.5 • Prepared With Love ❤️</div>
          </div>

        </div>

      </div>
    </div>
  );
};
