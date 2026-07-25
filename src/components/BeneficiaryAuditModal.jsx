import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  X, 
  FileText, 
  Heart, 
  Sparkles,
  Lock,
  Edit3
} from 'lucide-react';

export const BeneficiaryAuditModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const masterBeneficiaries = [
    {
      id: 'b1',
      accountOrPolicy: 'NC TSERS State Pension (Member #1875708)',
      owner: 'Chris Harrison',
      institution: 'NC Retirement Systems (ORBIT)',
      primaryBeneficiary: 'Erin Harrison (100% Option 2 Lifetime Survivorship)',
      contingentBeneficiary: 'Hayden & Ava Harrison (Equal Shares)',
      benefitValue: '$1,682.89 / month for life to Erin',
      status: '🟢 Verified Vested'
    },
    {
      id: 'b2',
      accountOrPolicy: 'Primerica Term Life Insurance ($250k)',
      owner: 'Chris Harrison',
      institution: 'Primerica',
      primaryBeneficiary: 'Erin Harrison (100% Primary)',
      contingentBeneficiary: 'Hayden & Ava Harrison (50/50 Trust)',
      benefitValue: '$250,000.00 Lump Sum',
      status: '🟢 Active Policy'
    },
    {
      id: 'b3',
      accountOrPolicy: 'Chris NC A&T 401(k) / ORP Retirement Plan',
      owner: 'Chris Harrison',
      institution: 'Empower / NC State',
      primaryBeneficiary: 'Erin Harrison (100% Primary)',
      contingentBeneficiary: 'Hayden & Ava Harrison (50/50)',
      benefitValue: '$145,000.00 Current Balance',
      status: '🟢 Active'
    },
    {
      id: 'b4',
      accountOrPolicy: 'Americo Life Insurance Policy ($90k)',
      owner: 'Barbara Harrison (Mom)',
      institution: 'Americo',
      primaryBeneficiary: 'Chris Harrison (100% Primary)',
      contingentBeneficiary: 'Erin Harrison',
      benefitValue: '$90,000.00 Lump Sum',
      status: '🟢 Active Policy'
    },
    {
      id: 'b5',
      accountOrPolicy: 'Lumico Life Insurance Policy',
      owner: 'Barbara Harrison (Mom)',
      institution: 'Lumico',
      primaryBeneficiary: 'Chris Harrison (100% Primary)',
      contingentBeneficiary: 'Erin Harrison',
      benefitValue: 'Guaranteed Death Benefit',
      status: '🟢 Active Policy'
    },
    {
      id: 'b6',
      accountOrPolicy: 'OPM Federal Civil Service Pension',
      owner: 'Barbara Harrison (Mom)',
      institution: 'OPM Federal Retirement',
      primaryBeneficiary: 'Chris Harrison (Designated Representative)',
      contingentBeneficiary: 'Estate of Barbara Harrison',
      benefitValue: '$5,645.84 / month',
      status: '🟢 Active'
    },
    {
      id: 'b7',
      accountOrPolicy: 'NC Educator TSERS Pension',
      owner: 'Erin Harrison',
      institution: 'NC Educator ORBIT Portal',
      primaryBeneficiary: 'Chris Harrison (100% Primary)',
      contingentBeneficiary: 'Hayden & Ava Harrison (Equal Shares)',
      benefitValue: 'Vested Educator Lifetime Benefit',
      status: '🟢 Verified Vested'
    },
    {
      id: 'b8',
      accountOrPolicy: 'Erin NC Educator 401(k) / 403(b) Plan',
      owner: 'Erin Harrison',
      institution: 'Empower / NC State',
      primaryBeneficiary: 'Chris Harrison (100% Primary)',
      contingentBeneficiary: 'Hayden & Ava Harrison (50/50)',
      benefitValue: '$110,000.00 Current Balance',
      status: '🟢 Active'
    }
  ];

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
        maxWidth: '850px',
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
              👥 HOUSEHOLD MASTER BENEFICIARY AUDIT DIRECTORY
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Users size={26} color="#FDB927" />
              <span>Who Receives What? Complete Beneficiary Allocation</span>
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* Master Beneficiary List Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {masterBeneficiaries.map((item) => (
            <div key={item.id} style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ fontWeight: 900, color: '#fff', fontSize: '1.1rem' }}>{item.accountOrPolicy}</span>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Account Owner: <strong style={{ color: '#FDB927' }}>{item.owner}</strong> • {item.institution}</div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>{item.status}</span>
              </div>

              <div className="grid-2" style={{ gap: '1rem', marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>PRIMARY BENEFICIARY</div>
                  <div style={{ fontWeight: 800, color: 'var(--success)', fontSize: '0.92rem', marginTop: '0.15rem' }}>
                    {item.primaryBeneficiary}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>CONTINGENT BENEFICIARY</div>
                  <div style={{ fontWeight: 800, color: '#cbd5e1', fontSize: '0.92rem', marginTop: '0.15rem' }}>
                    {item.contingentBeneficiary}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.65rem', fontSize: '0.8rem', color: '#FDB927', fontWeight: 800 }}>
                💡 Benefit Allocation: {item.benefitValue}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
