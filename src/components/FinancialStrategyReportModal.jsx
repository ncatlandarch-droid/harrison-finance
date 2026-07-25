import React, { useRef } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Bot, Sparkles, Printer, Download, ShieldCheck, AlertTriangle, TrendingUp, DollarSign, CheckCircle2, X } from 'lucide-react';

export const FinancialStrategyReportModal = ({ isOpen, onClose }) => {
  const { 
    totalBaseIncome, 
    barbaraTotalExpenses, 
    erinTotalExpenses, 
    chrisTotalExpenses, 
    totalExternalExpenses,
    totalCombinedSurplus,
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
      background: 'rgba(0, 0, 0, 0.82)',
      backdropFilter: 'blur(10px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="animate-scale-up" style={{
        width: '100%',
        maxWidth: '860px',
        maxHeight: '90vh',
        background: '#0f172a',
        borderRadius: '16px',
        border: '1px solid #334155',
        boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'linear-gradient(135deg, #004684, #4f46e5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#FDB927', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(253, 185, 39, 0.4)' }}>
              <Bot size={26} color="#004684" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Coach Perry's Family Financial Strategy Report
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Official Monthly Financial Directive for the Harrison Family • Generated {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#FDB927', color: '#004684', fontWeight: 700 }}>
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Report Body */}
        <div ref={reportRef} style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#e2e8f0' }}>
          
          {/* Executive Summary Card */}
          <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '1.25rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h4 style={{ fontWeight: 800, color: '#FDB927', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} />
              <span>Executive Financial Health Summary</span>
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#cbd5e1' }}>
              The Harrison household generates <strong>{fmt(totalBaseIncome)}/month in real external income</strong> against <strong>{fmt(totalExternalExpenses)}/month in real bills</strong>, yielding an overall <strong>real net monthly surplus of +{fmt(totalCombinedSurplus)}/month</strong>. 
              Liquid cash across your 4 Bank of America accounts stands at <strong>{fmt(totalBoACash)}</strong>, plus Mom's PenFed reserve of <strong>{fmt(barbaraCheckingAccount.balance)}</strong>.
            </p>
          </div>

          {/* Coach Perry's 4 Strategic Directives */}
          <div>
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', marginBottom: '1rem' }}>
              🤖 Coach Perry's 4 Strategic Financial Directives
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Directive 1 */}
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#10b981', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
                  1. Cash Flow Recovery (Google API Leak Stopped)
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Deleting old paid Google API keys eliminates <strong>$2,285.72/month in historical cloud expenses</strong>. This money stays directly in Chris's Bank of America checking account starting immediately.
                </p>
              </div>

              {/* Directive 2 */}
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
                  2. Figure Room Addition Loan Mitigation (August 2029 Reset)
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Barbara's Figure loan carries a 9.75% rate ($1,000/mo) resetting to 15.30% in August 2029. 
                  <strong>Action Plan:</strong> Allocate $500/month from your $5,078 monthly net surplus toward extra principal payments or refinance before 2029 to save $87,000 in interest.
                </p>
              </div>

              {/* Directive 3 */}
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#f59e0b', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
                  3. 1st-of-the-Month Transfer Protocol
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  To maintain positive balances on Papi Checking (-7333) and Adv Plus Banking (-4717), Barbara transfers <strong>$3,000.00/mo</strong> and Erin transfers <strong>$780.00/mo</strong> on the 1st of each month via Zelle into Chris's BoA operating account.
                </p>
              </div>

              {/* Directive 4 */}
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '1.1rem', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#818cf8', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
                  4. Subscription & Dining Optimization
                </div>
                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  Trimming DoorDash orders down to $500/mo and consolidating streaming services saves an additional <strong>+$803.29/month</strong> in real cash.
                </p>
              </div>

            </div>
          </div>

          {/* Signature Footer */}
          <div style={{ marginTop: '1rem', paddingTop: '1.25rem', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: '#94a3b8' }}>
            <div>Approved by: <strong>Coach Perry AI Financial Advisor</strong></div>
            <div>Harrison Finance Platform v3.4 • Confidential</div>
          </div>

        </div>

      </div>
    </div>
  );
};
