import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, CheckCircle2, ShieldCheck, FileText, Lock, Heart, Phone, Award, Upload, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export const PlayerProfileModal = ({ player, onClose }) => {
  const { data } = useFinance();
  const [showSensitive, setShowSensitive] = useState(false);

  if (!player) return null;

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Get itemized bills for this player
  let playerBills = [];
  if (player.id === 'barbara') playerBills = data.barbaraExpenses;
  else if (player.id === 'erin') playerBills = data.erinExpenses;
  else if (player.id === 'chris') playerBills = data.chrisExpenses;

  // Estate Preparedness Items Checklist
  const estateChecklist = [
    { title: "Last Will & Testament", status: "Uploaded", points: 25, icon: "📜", desc: "Attorney executed legal will" },
    { title: "Power of Attorney & Healthcare Directive", status: "Active", points: 25, icon: "📄", desc: "Designated medical & legal agent" },
    { title: "Life Insurance Policy", status: player.id === 'barbara' ? "$144k Active" : "Covered", points: 25, icon: "🛡️", desc: "Americo, Lumico & Primerica policies" },
    { title: "Encrypted SSN & Emergency Identifiers", status: "Encrypted", points: 25, icon: "🔐", desc: "Client-side encrypted lockbox" }
  ];

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
        maxWidth: '860px',
        maxHeight: '90vh',
        background: 'var(--bg-surface)',
        borderRadius: '20px',
        border: `2px solid ${player.color}`,
        boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 30px ${player.color}40`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Profile Banner Header */}
        <div style={{
          padding: '1.75rem 2rem',
          background: `linear-gradient(135deg, ${player.color}40, rgba(15, 23, 42, 0.95))`,
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Giant Photo Avatar Frame */}
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              border: `4px solid ${player.color}`,
              boxShadow: `0 0 25px ${player.color}70`,
              overflow: 'hidden',
              flexShrink: 0,
              background: '#1e1b4b'
            }}>
              <img 
                src={player.image} 
                alt={player.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{player.name}</h3>
                <span className="badge" style={{ background: `${player.color}30`, color: player.color, border: `1px solid ${player.color}`, fontWeight: 800 }}>
                  {player.badge}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{player.title}</p>
              <div style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 700, marginTop: '0.25rem' }}>
                ⭐ Estate Preparedness Score: 100 / 100 PTS (Fully Prepared)
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Profile Content Body */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Income & Expense Breakdown Box */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', marginBottom: '0.85rem' }}>
              📊 Financial Cash Flow Breakdown
            </h4>

            <div className="grid-3" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>GROSS MONTHLY INFLOW</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.1rem' }}>
                  {fmt(player.income)}
                </div>
                {player.id === 'chris' && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Salary ($6,309.36) + Transfer ($3,000)
                  </div>
                )}
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ASSIGNED MONTHLY EXPENSES</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--danger)', marginTop: '0.1rem' }}>
                  {fmt(player.expenses)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {playerBills.length} Itemized Commitments
                </div>
              </div>

              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>NET SURPLUS GENERATED</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.1rem' }}>
                  +{fmt(player.surplus)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--success)', marginTop: '0.2rem', fontWeight: 700 }}>
                  {player.ratio}% Spending Ratio
                </div>
              </div>
            </div>
          </div>

          {/* 📜 ESTATE PREPAREDNESS & LEGACY LOCKBOX CHECKLIST */}
          <div>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} color="var(--success)" />
                <span>Estate Preparedness & Legacy Lockbox Checklist (+100 PTS)</span>
              </h4>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowSensitive(!showSensitive)}
                style={{ fontSize: '0.78rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                {showSensitive ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{showSensitive ? 'Hide Vitals' : 'Show Encrypted Vitals'}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {estateChecklist.map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  </div>

                  <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                    +{item.points} PTS ✓
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 🕊️ IN CASE OF PASSING DIRECTIVE & CONTACT PROCEDURES */}
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ fontWeight: 800, color: '#818cf8', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🕊️ In Case of Passing Family Directive</span>
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              • <strong>Bank Account Procedures:</strong> Contact Bank of America Estate Care Team at <strong>888-689-4466</strong> with certified death certificate & photo ID.<br />
              • <strong>Legal Document Location:</strong> Attorney sealed estate planning PDF stored in Encrypted Family Vault tab.<br />
              • <strong>Insurance Claims:</strong> Americo ($90k) & Lumico policy claims assigned to Chris Harrison.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
