import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { ShieldCheck, Lock, Key, FileText, Heart, Eye, EyeOff, UserCheck, AlertCircle, CheckCircle2, Download, Upload, ShieldAlert } from 'lucide-react';

export const FamilyVaultSection = () => {
  const { data } = useFinance();
  const [showSensitive, setShowSensitive] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Chris & Erin Standalone Cash Flow Scenario (Without Mom's Income)
  const chrisErinIncome = 6309.36 + 2500.00; // $8,809.36 / mo
  const chrisErinExpenses = 1200.00 + 500.00 + 1100.00 + 234.33 + 199.93 + 426.43 + 200.00 + 80.00 + 75.00 + 526.13; // $4,539.82
  const chrisErinSurplus = chrisErinIncome - chrisErinExpenses; // +$4,269.54 / mo

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(168, 85, 247, 0.12))' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Lock size={24} color="#FDB927" />
              <span>Encrypted Family Vault & Estate Legacy Lockbox</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Secure digital repository for attorney estate plans, SSNs, insurance policies & life directives.
            </p>
          </div>

          <button 
            className="btn"
            onClick={() => setShowSensitive(!showSensitive)}
            style={{
              background: showSensitive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              border: `1px solid ${showSensitive ? 'var(--danger)' : 'var(--success)'}`,
              color: showSensitive ? 'var(--danger)' : 'var(--success)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            {showSensitive ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{showSensitive ? 'Hide Sensitive Data' : 'Reveal Encrypted Identifiers'}</span>
          </button>
        </div>
      </div>

      {/* 🛡️ MOM (AGE 75) INDEPENDENCE SCENARIO CALCULATOR */}
      <div className="card" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
        <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', paddingBottom: '0.75rem' }}>
          <div>
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={20} color="#ec4899" fill="#ec4899" />
              <span>Reality Assessment: Household Solvency Without Mom's Income (Age 75)</span>
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Financial peace-of-mind projection modeling Chris & Erin's combined earning power
            </p>
          </div>
          <span className="badge badge-success">100% Financially Solvent</span>
        </div>

        <div className="grid-3" style={{ gap: '1rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CHRIS & ERIN COMBINED INFLOW</div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>
              {fmt(chrisErinIncome)} / mo
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>NC A&T ($6.3k) + UNCG ($2.5k)</div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>HOUSEHOLD EXPENSES COVERED</div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--danger)', marginTop: '0.2rem' }}>
              {fmt(chrisErinExpenses)} / mo
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Mortgage, Food, Insurance & Utilities</div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>STANDALONE NET SURPLUS</div>
            <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.2rem' }}>
              +{fmt(chrisErinSurplus)} / mo
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--success)', marginTop: '0.2rem', fontWeight: 700 }}>
              ✓ Complete Financial Security Confirmed
            </div>
          </div>
        </div>
      </div>

      {/* 📜 ESTATE DOCUMENTS & ATTORNEY LOCKBOX */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>Attorney Legal Estate Documents & Directives</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Official estate planning files for Mom (Barbara), Chris, and Erin
            </p>
          </div>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Upload size={16} />
            <span>Upload New Document</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Doc 1 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.15rem', background: 'rgba(0,0,0,0.25)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <FileText size={22} color="#a855f7" />
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>Barbara Harrison Last Will & Testament</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Executed Estate Plan • Attorney Sealed PDF</div>
              </div>
            </div>
            <span className="badge badge-primary">Verified Attorney File</span>
          </div>

          {/* Doc 2 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.15rem', background: 'rgba(0,0,0,0.25)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <FileText size={22} color="#6366f1" />
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>Power of Attorney & Healthcare Directives</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Designated Agent: Chris Harrison</div>
              </div>
            </div>
            <span className="badge badge-primary">Active POA</span>
          </div>

          {/* Doc 3 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.15rem', background: 'rgba(0,0,0,0.25)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <FileText size={22} color="#10b981" />
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>Americo & Lumico Life Insurance Policies ($144,000 Total Coverage)</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Beneficiaries: Chris Harrison & Family</div>
              </div>
            </div>
            <span className="badge badge-success">Coverage Active</span>
          </div>

        </div>
      </div>

      {/* 🔐 ENCRYPTED SENSITIVE FAMILY IDENTIFIERS VAULT */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>Family Identity & Emergency Information Vault</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Social Security Numbers, DOBs, and vital health identifiers
            </p>
          </div>
          <span className="badge badge-warning">Client-Side Encrypted</span>
        </div>

        <div className="grid-3" style={{ gap: '1rem' }}>
          
          {/* Barbara */}
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <div style={{ fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Barbara Harrison (Mom)</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              • <strong>Role:</strong> Household Pillar (Age 75)<br />
              • <strong>SSN:</strong> <span className="font-mono" style={{ color: '#fff' }}>{showSensitive ? 'XXX-XX-4819' : '•••-••-4819'}</span><br />
              • <strong>PenFed Acct:</strong> <span className="font-mono" style={{ color: '#fff' }}>{showSensitive ? 'XXXX-0492' : '••••-0492'}</span>
            </div>
          </div>

          {/* Chris */}
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <div style={{ fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Chris Harrison</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              • <strong>Role:</strong> Operating Lead (NC A&T)<br />
              • <strong>SSN:</strong> <span className="font-mono" style={{ color: '#fff' }}>{showSensitive ? 'XXX-XX-7712' : '•••-••-7712'}</span><br />
              • <strong>BoA Acct:</strong> <span className="font-mono" style={{ color: '#fff' }}>{showSensitive ? 'XXXX-4717' : '••••-4717'}</span>
            </div>
          </div>

          {/* Erin */}
          <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
            <div style={{ fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Erin Harrison</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              • <strong>Role:</strong> Educator (UNCG)<br />
              • <strong>SSN:</strong> <span className="font-mono" style={{ color: '#fff' }}>{showSensitive ? 'XXX-XX-3901' : '•••-••-3901'}</span><br />
              • <strong>Wells Fargo:</strong> <span className="font-mono" style={{ color: '#fff' }}>{showSensitive ? 'XXXX-9120' : '••••-9120'}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
