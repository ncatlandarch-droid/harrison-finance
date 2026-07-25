import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  Lock, 
  Sparkles, 
  CreditCard,
  Target,
  RefreshCw,
  ExternalLink,
  Info,
  Heart,
  UserCheck,
  Mail,
  Shield,
  CheckSquare
} from 'lucide-react';

export const RetirementWealthHub = () => {
  const { 
    totalLiquidReserves, 
    totalRetirementAssets, 
    totalCDAssets, 
    totalCompleteNetWorth,
    chrisNC401k,
    erinNC401k,
    erinCD,
    novoBusinessChecking
  } = useFinance();

  const [showNovoGuide, setShowNovoGuide] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      
      {/* 🌟 360-DEGREE COMPLETE FAMILY NET WORTH HERO GAUGE */}
      <div className="card card-glow" style={{
        background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.4), rgba(15, 23, 42, 0.98))',
        border: '2.5px solid #FDB927',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 15px 45px rgba(253, 185, 39, 0.25)'
      }}>
        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: '#004684', color: '#FDB927', fontWeight: 800, padding: '4px 10px' }}>
              360° TOTAL WEALTH PORTFOLIO
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem' }}>
              The Harrison Family Complete Net Worth
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Combines Liquid Cash + NC Pension ($1.8k/mo) + Social Security ($3.0k/mo) + NC 401(k) + CDs
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL NET WORTH</div>
            <div className="font-mono" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FDB927' }}>
              {fmt(totalCompleteNetWorth)}
            </div>
          </div>
        </div>

        {/* 4 Asset Tier Metrics */}
        <div className="grid-4" style={{ gap: '1.25rem' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>1. LIQUID CASH & RESERVES</div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>
              {fmt(totalLiquidReserves)}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>BoA + PenFed + Capital One + Novo</div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>2. NC PENSION (TSERS AGE 60)</div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FDB927', marginTop: '0.2rem' }}>
              $1,803.55 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: '#FDB927', marginTop: '0.3rem', fontWeight: 700 }}>$1,682.89/mo 100% Option 2 to Erin</div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>3. SOCIAL SECURITY (FULL AGE 67)</div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6', marginTop: '0.2rem' }}>
              $3,058.00 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: '#3b82f6', marginTop: '0.3rem', fontWeight: 700 }}>Fully Vested (40 Work Credits)</div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>4. ERIN'S CDs (5.15% APY)</div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c084fc', marginTop: '0.2rem' }}>
              {fmt(totalCDAssets)}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#c084fc', marginTop: '0.3rem', fontWeight: 700 }}>Fixed High-Yield CD</div>
          </div>

        </div>
      </div>

      {/* 🇺🇸 VERIFIED FEDERAL SOCIAL SECURITY ADMINISTRATION (SSA) STATEMENT CARD */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(15, 23, 42, 0.98))', border: '2.5px solid #3b82f6' }}>
        <div className="flex-between" style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.3)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-success" style={{ padding: '4px 12px', fontWeight: 900 }}>
              VERIFIED SSA STATEMENT • 40 WORK CREDITS FULLY VESTED
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={26} color="#3b82f6" />
              <span>William C. Harrison — Social Security Benefit Statement</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              2025 Reported Earnings: <strong>$92,996.00</strong> • Work Credits: <strong>40 / 40 (Fully Qualified for Life)</strong>
            </p>
          </div>

          <a 
            href="https://www.ssa.gov" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem' }}
          >
            <span>SSA.gov Portal</span>
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="grid-3" style={{ gap: '1.25rem' }}>
          
          {/* Full Retirement Age 67 Benefit */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1.5px solid #3b82f6' }}>
            <div style={{ fontSize: '0.76rem', color: '#3b82f6', fontWeight: 800 }}>FULL RETIREMENT BENEFIT (AGE 67)</div>
            <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              $3,058.00 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--success)', marginTop: '0.3rem', fontWeight: 700 }}>
              ✓ Full Retirement Age (FRA) Monthly Payment
            </div>
          </div>

          {/* Disability Protection */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 800 }}>DISABILITY BENEFIT (IF NEEDED NOW)</div>
            <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--primary-light)', marginTop: '0.2rem' }}>
              $2,543.00 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Immediate Monthly Disability Coverage
            </div>
          </div>

          {/* Combined Pension + SSA Inflow */}
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '1.25rem', borderRadius: '16px', border: '1.5px solid #10b981' }}>
            <div style={{ fontSize: '0.76rem', color: '#10b981', fontWeight: 900 }}>COMBINED PENSION + SSA TOTAL</div>
            <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              $4,861.55 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: '#10b981', marginTop: '0.3rem', fontWeight: 800 }}>
              🎓 TSERS Pension ($1.8k) + SSA ($3.0k)
            </div>
          </div>

        </div>
      </div>

      {/* 🏛️ CHRIS'S OFFICIAL MAY 2040 (AGE 60) TSERS CUSTOM BENEFIT ESTIMATE */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.4), rgba(79, 70, 229, 0.25))', border: '2.5px solid #FDB927' }}>
        <div className="flex-between" style={{ borderBottom: '1px solid rgba(253, 185, 39, 0.3)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: '#004684', color: '#FDB927', fontWeight: 900, padding: '4px 12px' }}>
              OFFICIAL NC ORBIT ESTIMATE • MAY 1, 2040 (AGE 60)
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Award size={26} color="#FDB927" />
              <span>William (Chris) Harrison — TSERS Custom Retirement Estimate</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Member ID: <strong>1875708</strong> • Average Final Compensation (AFC): <strong>$63,591.24</strong> • Estimated Service: <strong>22.00 Years</strong>
            </p>
          </div>

          <a 
            href="https://orbit.nc-retire.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ background: 'linear-gradient(135deg, #FDB927, #f59e0b)', color: '#004684', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
          >
            <span>Open ORBIT Portal</span>
            <ExternalLink size={16} />
          </a>
        </div>

        {/* 5 Pension Option Cards */}
        <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
          
          {/* Maximum Allowance */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1.5px solid #FDB927' }}>
            <div style={{ fontSize: '0.76rem', color: '#FDB927', fontWeight: 800 }}>MAXIMUM ALLOWANCE</div>
            <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              $1,803.55 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Member Lifetime Benefit ($0.00 to Beneficiary)
            </div>
          </div>

          {/* Option 2 - 100% Survivorship (RECOMMENDED FOR ERIN!) */}
          <div style={{ background: 'rgba(236, 72, 153, 0.15)', padding: '1.25rem', borderRadius: '16px', border: '2px solid #ec4899' }}>
            <div style={{ fontSize: '0.76rem', color: '#f472b6', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Heart size={14} fill="#ec4899" />
              <span>OPTION 2 • 100% SURVIVORSHIP (RECOMMENDED!)</span>
            </div>
            <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              $1,682.89 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: '#f472b6', marginTop: '0.3rem', fontWeight: 800 }}>
              ✓ Pays Erin $1,682.89/mo for LIFE if Chris passes
            </div>
          </div>

          {/* Option 3 - 50% Survivorship */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 800 }}>OPTION 3 • 50% SURVIVORSHIP</div>
            <div className="font-mono" style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--primary-light)', marginTop: '0.2rem' }}>
              $1,741.15 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Pays Erin $870.57/mo after member death
            </div>
          </div>

        </div>

        {/* Option 6-2 & 6-3 Summary Box */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#cbd5e1' }}>
          <div>
            • <strong>Option 6-2 (Modified 100% Survivorship):</strong> Member gets <strong>$1,658.91/mo</strong> • Erin gets <strong>$1,658.91/mo</strong>
          </div>
          <div>
            • <strong>Option 6-3 (Modified 50% Survivorship):</strong> Member gets <strong>$1,728.16/mo</strong> • Erin gets <strong>$864.08/mo</strong>
          </div>
        </div>

      </div>

      {/* 📜 HISTORICAL SALARY & SERVICE BREAKDOWN TABLE */}
      <div className="card">
        <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', marginBottom: '0.85rem' }}>
          📜 NC A&T Annual Salary & Contribution History (2018–2026)
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.82rem', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px' }}>Year</th>
                <th style={{ padding: '8px' }}>Employer</th>
                <th style={{ padding: '8px' }}>Annual Salary</th>
                <th style={{ padding: '8px' }}>6% Pre-Tax Contrib</th>
                <th style={{ padding: '8px' }}>Interest Earned</th>
                <th style={{ padding: '8px' }}>Total Year Balance</th>
                <th style={{ padding: '8px' }}>Service Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2026</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$47,307.92</td>
                <td style={{ padding: '8px' }} className="font-mono">$2,838.46</td>
                <td style={{ padding: '8px' }} className="font-mono">$0.00</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$2,838.46</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>0.5 Yrs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2025</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$94,615.96</td>
                <td style={{ padding: '8px' }} className="font-mono">$5,676.90</td>
                <td style={{ padding: '8px' }} className="font-mono">$1,231.77</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$6,908.67</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>1.0 Yrs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2024</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$76,285.50</td>
                <td style={{ padding: '8px' }} className="font-mono">$4,577.10</td>
                <td style={{ padding: '8px' }} className="font-mono">$1,008.35</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$5,585.45</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>1.0 Yrs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2023</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$81,742.43</td>
                <td style={{ padding: '8px' }} className="font-mono">$4,904.59</td>
                <td style={{ padding: '8px' }} className="font-mono">$780.93</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$5,685.52</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>1.0 Yrs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2022</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$77,086.32</td>
                <td style={{ padding: '8px' }} className="font-mono">$4,625.17</td>
                <td style={{ padding: '8px' }} className="font-mono">$573.01</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$5,198.18</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>1.0 Yrs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2021</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$68,120.04</td>
                <td style={{ padding: '8px' }} className="font-mono">$4,087.20</td>
                <td style={{ padding: '8px' }} className="font-mono">$393.77</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$4,480.97</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>1.0 Yrs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2020</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$66,060.04</td>
                <td style={{ padding: '8px' }} className="font-mono">$3,963.60</td>
                <td style={{ padding: '8px' }} className="font-mono">$226.18</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$4,189.78</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>1.0 Yrs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2019</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$62,000.04</td>
                <td style={{ padding: '8px' }} className="font-mono">$3,720.00</td>
                <td style={{ padding: '8px' }} className="font-mono">$74.40</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$3,794.40</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>1.0 Yrs</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>2018</td>
                <td style={{ padding: '8px' }}>NC A&T UNIVERSITY</td>
                <td style={{ padding: '8px' }} className="font-mono">$31,000.02</td>
                <td style={{ padding: '8px' }} className="font-mono">$1,860.00</td>
                <td style={{ padding: '8px' }} className="font-mono">$0.00</td>
                <td style={{ padding: '8px', color: 'var(--success)' }} className="font-mono">$1,860.00</td>
                <td style={{ padding: '8px', color: '#FDB927', fontWeight: 800 }}>0.5 Yrs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 🏛️ NOVO BANK CONNECTION GUIDE (CHRIS'S BUSINESS BANKING) */}
      <div className="card" style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.4)', padding: '1.75rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Building2 size={28} color="#3b82f6" />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                Novo Bank Connection Guide (Think! Design & Planning LLC)
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                How to connect your Novo business checking via Plaid Link
              </p>
            </div>
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => setShowNovoGuide(!showNovoGuide)}
            style={{ fontSize: '0.84rem' }}
          >
            {showNovoGuide ? 'Hide Connection Steps' : 'How To Connect Novo 🏦'}
          </button>
        </div>

        {showNovoGuide && (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '12px', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.65', marginTop: '1rem' }}>
            <div style={{ fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>👉 3 Simple Steps to Connect Novo Bank via Plaid:</div>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Click the top-right <strong>`Connect Bank Account`</strong> button in the header.</li>
              <li>In the Plaid Search popup, type <strong>"Novo"</strong> or <strong>"Novo Bank"</strong>.</li>
              <li>Log in with your Novo business credentials via Plaid's secure bank portal. Plaid will automatically feed your Novo checking balance into your dashboard!</li>
            </ol>
          </div>
        )}
      </div>

      {/* 🏛️ NC STATE EMPLOYEE 401(K) MATRIX */}
      <div className="card card-glow">
        <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Award size={24} color="#FDB927" />
              <span>NC Supplemental 401(k) & 403(b) Retirement Plans</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Empower NC 401(k) / 403(b) Account Balances
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1.5rem' }}>
          
          {/* Chris NC A&T 401k Card */}
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.85rem' }}>
              <span className="badge badge-primary">Chris • NC A&T State University</span>
              <span className="badge badge-success">Vested</span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Chris NC 401(k) / ORP Retirement Plan</h4>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary-light)', margin: '0.5rem 0' }}>
              {fmt(chrisNC401k.balance)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              • Institution: Empower / NC State Retirement System<br />
              • Monthly Contribution: 6.00% State Match<br />
              • Email on Record: wcharris@ncat.edu
            </div>
          </div>

          {/* Erin NC Educator 401k Card */}
          <div style={{ background: 'rgba(236, 72, 153, 0.1)', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.85rem' }}>
              <span className="badge" style={{ background: '#ec4899', color: '#fff' }}>Erin • NC Educator</span>
              <span className="badge badge-success">Vested</span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Erin NC Educator 401(k) / 403(b) Plan</h4>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f472b6', margin: '0.5rem 0' }}>
              {fmt(erinNC401k.balance)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              • Institution: Empower / NC State Educator Plan<br />
              • Monthly Contribution: State Educator Match<br />
              • TSERS Pension Orbit Credits: Active
            </div>
          </div>

        </div>
      </div>

      {/* 📈 ERIN'S CERTIFICATES OF DEPOSIT (CDs) MATURITY TRACKER */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Lock size={22} color="#c084fc" />
              <span>Erin's Certificates of Deposit (CDs) Yield Tracker</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              High-Yield Fixed Income CD Investments
            </p>
          </div>
          <span className="badge badge-success" style={{ fontSize: '0.8rem' }}>
            5.15% APY Guaranteed Yield
          </span>
        </div>

        <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '16px', padding: '1.5rem' }}>
          <div className="flex-between">
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>CD PRINCIPAL BALANCE</div>
              <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c084fc', marginTop: '0.2rem' }}>
                {fmt(erinCD.balance)}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ANNUAL INTEREST YIELD</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>
                +$1,287.50 / year
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Maturity Date: November 2026</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
