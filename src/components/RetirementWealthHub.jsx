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
  Mail
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
              Combines Liquid Cash + NC Pension ($3.1k/mo) + NC 401(k) + CDs + Business Assets
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
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>2. NC PENSION (TSERS)</div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FDB927', marginTop: '0.2rem' }}>
              $3,117.50 / mo
            </div>
            <div style={{ fontSize: '0.74rem', color: '#FDB927', marginTop: '0.3rem', fontWeight: 700 }}>Guaranteed Lifetime Benefit</div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>3. NC 401(K) RETIREMENT</div>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.2rem' }}>
              {fmt(totalRetirementAssets)}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Empower NC State & Educator</div>
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

      {/* 🏛️ CHRIS'S OFFICIAL NC MARS PENSION STATEMENT SUMMARY */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.35), rgba(79, 70, 229, 0.2))', border: '2px solid #FDB927' }}>
        <div className="flex-between" style={{ borderBottom: '1px solid rgba(253, 185, 39, 0.3)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: '#004684', color: '#FDB927', fontWeight: 900, padding: '4px 12px' }}>
              OFFICIAL NC MARS STATEMENT • VERIFIED 07/25/2026
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Award size={26} color="#FDB927" />
              <span>William (Chris) Harrison — NC TSERS State Pension Record</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              NC A&T State University • Member ID: <strong>1875708</strong> • 4306 Goldenrod Dr, Greensboro NC 27455
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

        <div className="grid-3" style={{ gap: '1.25rem' }}>
          
          {/* Lifetime Pension Card */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1.5px solid #FDB927' }}>
            <div style={{ fontSize: '0.76rem', color: '#FDB927', fontWeight: 800 }}>PROJECTED MONTHLY PENSION</div>
            <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              $3,117.50 / mo
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--success)', marginTop: '0.4rem', fontWeight: 700 }}>
              ✓ Guaranteed Monthly Lifetime Income
            </div>
          </div>

          {/* Contribution Rate */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 800 }}>MONTHLY CONTRIBUTION RATE</div>
            <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-light)', marginTop: '0.2rem' }}>
              6.00% Salary
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Matched by NC State Employer Contribution
            </div>
          </div>

          {/* Designated Beneficiary */}
          <div style={{ background: 'rgba(236, 72, 153, 0.15)', padding: '1.25rem', borderRadius: '16px', border: '1.5px solid #ec4899' }}>
            <div style={{ fontSize: '0.76rem', color: '#f472b6', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Heart size={14} fill="#ec4899" />
              <span>PRINCIPAL BENEFICIARY</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              ERIN HARRISON
            </div>
            <div style={{ fontSize: '0.76rem', color: '#f472b6', marginTop: '0.4rem', fontWeight: 700 }}>
              ✓ 100% Beneficiary for Death & Contributions
            </div>
          </div>

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
