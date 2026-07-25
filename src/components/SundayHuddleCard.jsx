import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  Users, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  Flame, 
  Award, 
  Zap, 
  ShieldCheck, 
  Printer, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

export const SundayHuddleCard = ({ onOpenRedFolder }) => {
  const { totalCombinedSurplus, totalLiquidityBalance } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="card card-glow" style={{
      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.25), rgba(15, 23, 42, 0.98))',
      border: '2px solid #6366f1',
      borderRadius: '24px',
      padding: '1.75rem',
      boxShadow: '0 12px 35px rgba(99, 102, 241, 0.25)'
    }}>
      
      {/* Header */}
      <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', gap: '0', justifyContent: 'center' }}>
            <Users size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-success" style={{ background: '#10b981', color: '#fff', fontWeight: 900 }}>
                WEEKLY RITUAL ACTIVE
              </span>
              <span style={{ fontSize: '0.78rem', color: '#FDB927', fontWeight: 800 }}>
                ⚡ 5 MINUTES • EVERY SUNDAY
              </span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              Sunday 5-Minute Family Huddle & Red Folder Command 🤝
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button 
            onClick={onOpenRedFolder}
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid #FDB927', color: '#FDB927' }}
          >
            <Printer size={15} />
            <span>Open Emergency Red Folder 📁</span>
          </button>
        </div>
      </div>

      {/* 3 Family Huddle Quick Wins */}
      <div className="grid-3" style={{ gap: '1.25rem' }}>
        
        {/* Win 1: Cash Surplus */}
        <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.15rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={14} /> WIN #1 • CASH SURPLUS
          </div>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0' }}>
            +{fmt(totalCombinedSurplus)} / mo
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            All core bills covered with +$2.07k monthly buffer!
          </div>
        </div>

        {/* Win 2: Liquid Emergency Reserve */}
        <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.15rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={14} /> WIN #2 • LIQUID RESERVES
          </div>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0' }}>
            {fmt(totalLiquidityBalance)}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            BoA + PenFed + Novo cash pools ready for any need.
          </div>
        </div>

        {/* Win 3: HELOC 2029 Freedom Track */}
        <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.15rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: '#FDB927', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Flame size={14} /> WIN #3 • HELOC PAYOFF
          </div>
          <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0' }}>
            August 2029
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--success)', fontWeight: 700 }}>
            +$87,400 interest saved with extra payments!
          </div>
        </div>

      </div>

    </div>
  );
};
