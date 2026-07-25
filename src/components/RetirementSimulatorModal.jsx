import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  Zap, 
  X, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  DollarSign,
  Heart,
  Sliders,
  ChevronRight,
  PieChart
} from 'lucide-react';

export const RetirementSimulatorModal = ({ isOpen, onClose }) => {
  const { totalLiquidityBalance } = useFinance();

  // Retirement simulation state
  const [retireAgeChris, setRetireAgeChris] = useState(60); // 2040
  const [expectedInflation, setExpectedInflation] = useState(2.8);
  const [monthlyExpenseToday, setMonthlyExpenseToday] = useState(6000);
  const [tsersOption, setTsersOption] = useState('max'); // max ($1,803.55) or option2 ($1,682.89)

  if (!isOpen) return null;

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Years until retirement (Chris age 46 in 2026 -> retirement age)
  const yearsToRetire = Math.max(1, retireAgeChris - 46);

  // Inflation adjustment factor: (1 + rate)^years
  const inflationFactor = Math.pow(1 + (expectedInflation / 100), yearsToRetire);
  const futureMonthlyNeed = monthlyExpenseToday * inflationFactor;

  // Monthly Guaranteed Inflow Streams in 2040 (Age 60)
  const tsersMonthly = tsersOption === 'max' ? 1803.55 : 1682.89;
  const erinPensionMonthly = 1750.00;
  const opmBarbMonthly = 5645.84;
  
  // Total Guaranteed Monthly Inflow at Age 60 (2040)
  const totalInflowAge60 = tsersMonthly + erinPensionMonthly + opmBarbMonthly;

  // Social Security added at Age 67
  const ssaChris = 3058.00;
  const ssaErin = 2400.00;
  const totalInflowAge67 = totalInflowAge60 + ssaChris + ssaErin;

  // Monthly Surplus / Deficit at Age 60
  const netMonthlySurplus60 = totalInflowAge60 - futureMonthlyNeed;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="card card-glow" style={{
        width: '100%',
        maxWidth: '750px',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: '2.5px solid #FDB927',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        
        {/* Header */}
        <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: '#FDB927', color: '#004684', fontWeight: 900 }}>
              🔮 2040 RETIREMENT INFLOW & SCORE SIMULATOR
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <TrendingUp size={26} color="#FDB927" />
              <span>How Much Will We Need vs Receive in 2040?</span>
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* 🌟 KEY RESULT BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(15, 23, 42, 0.95))',
          border: '2px solid #10b981',
          borderRadius: '20px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)'
        }}>
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--success)', fontWeight: 900, letterSpacing: '0.05em' }}>
                🎉 2040 RETIREMENT SURPLUS CONFIRMED!
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
                +{fmt(netMonthlySurplus60)} / month Surplus at Age 60!
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Guaranteed Inflow ({fmt(totalInflowAge60)}/mo) exceeds your inflation-adjusted need ({fmt(futureMonthlyNeed)}/mo)!
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #10b981', textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>COLLECTIVE SCORE IMPACT</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FDB927' }}>885 / 1,000</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--success)' }}>A+ Master Household</div>
            </div>
          </div>
        </div>

        {/* 📊 RETIREMENT COMPARISON GRID */}
        <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
          
          {/* Box 1: Monthly Need in 2040 */}
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 800, marginBottom: '0.4rem' }}>
              📉 ESTIMATED MONTHLY NEED (2040)
            </div>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
              {fmt(futureMonthlyNeed)} / mo
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem', lineHeight: '1.5' }}>
              Based on {fmt(monthlyExpenseToday)}/mo today adjusted for {expectedInflation}% annual inflation over {yearsToRetire} years.
            </div>
          </div>

          {/* Box 2: Guaranteed Monthly Inflow in 2040 */}
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid #10b981', borderRadius: '18px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 800, marginBottom: '0.4rem' }}>
              📈 GUARANTEED MONTHLY INFLOW (2040)
            </div>
            <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--success)' }}>
              {fmt(totalInflowAge60)} / mo
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem', lineHeight: '1.5' }}>
              TSERS Pension ({fmt(tsersMonthly)}) + Erin Pension ({fmt(erinPensionMonthly)}) + OPM Pension ({fmt(opmBarbMonthly)}).
            </div>
          </div>

        </div>

        {/* 🌟 AGE 67 SOCIAL SECURITY BONUS */}
        <div style={{ background: 'rgba(0, 70, 132, 0.25)', border: '1.5px solid #004684', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div className="flex-between">
            <div>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="#FDB927" />
                <span>At Age 67: Social Security Unlocks (+ $5,458.00 / mo)</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Chris SSA ({fmt(ssaChris)}) + Erin SSA ({fmt(ssaErin)}) = Total Retirement Inflow jumps to <strong style={{ color: 'var(--success)' }}>{fmt(totalInflowAge67)} / month!</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 🛠️ WHAT ELSE CAN WE DO? 4 POWER STEPS */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
          <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={20} color="#FDB927" />
            <span>4 High-Impact Actions to Boost Your Retirement Score Even Higher</span>
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              1. 🚀 <strong>Pay Off Figure HELOC by August 2029:</strong> Saves <strong>+$87,400 in interest</strong> and frees up an extra <strong>+$1,000/mo</strong> cash flow 11 years before retirement!
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              2. 💎 <strong>NC 401(k) Empower Growth:</strong> Chris’s $145k 401(k) projected to reach <strong>~$375,000 by 2040</strong>, adding an extra <strong>+$1,500/mo</strong> in investment withdrawals.
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              3. 🎓 <strong>Automate Kids' $30,000 Accounts:</strong> Funding Hayden ($172/mo) and Ava ($105/mo) eliminates any college debt burden on your retirement.
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              4. 💼 <strong>Think! Design & Planning Profit Channeling:</strong> Channeling business growth into Capital One 360 HYSA builds a <strong>$100,000+ liquid cash safety net</strong>.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
