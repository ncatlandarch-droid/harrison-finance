import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  Users, 
  Building2, 
  Phone, 
  FileText, 
  Lock, 
  Award, 
  Heart, 
  CheckCircle2, 
  AlertTriangle,
  Calendar,
  DollarSign
} from 'lucide-react';

export const PrintableRedFolderModal = ({ isOpen, onClose }) => {
  const { members, householdProfile, data, totalLiquidityBalance, totalCombinedSurplus } = useFinance();
  const [showFullSsn, setShowFullSsn] = useState(false);

  if (!isOpen) return null;

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="red-folder-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(12px)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      
      {/* Modal Container */}
      <div className="red-folder-modal-container card card-glow" style={{
        width: '100%',
        maxWidth: '920px',
        background: '#0f172a',
        borderRadius: '24px',
        border: '3px solid #dc2626',
        padding: '2rem',
        maxHeight: '92vh',
        overflowY: 'auto',
        color: '#f8fafc',
        boxShadow: '0 25px 60px rgba(220, 38, 38, 0.35)'
      }}>

        {/* Modal Action Controls (Hidden on Print) */}
        <div className="no-print flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={22} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff' }}>
                Emergency Household "Red Folder" Master Dossier
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Official Printable Family Vault • All Passports, Pensions, Insurance, Accounts & Directives
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setShowFullSsn(!showFullSsn)}
              style={{
                background: showFullSsn ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-color)',
                color: showFullSsn ? '#ef4444' : '#fff',
                padding: '0.5rem 0.85rem',
                borderRadius: '10px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Lock size={14} />
              <span>{showFullSsn ? 'Mask SSNs 🔒' : 'Unmask SSNs for Print 👁️'}</span>
            </button>

            <button 
              onClick={handlePrint}
              style={{
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                color: '#fff',
                border: 'none',
                padding: '0.55rem 1.25rem',
                borderRadius: '30px',
                fontSize: '0.88rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.5)'
              }}
            >
              <Printer size={18} />
              <span>Print / Save as PDF 📄</span>
            </button>

            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ========================================================
            PRINTABLE DOSSIER BODY (Cleanly Styled for Paper/PDF)
           ======================================================== */}
        <div id="printable-red-folder-content" className="printable-document" style={{ background: '#0b0f19', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          
          {/* Document Title Header */}
          <div style={{ borderBottom: '3px solid #dc2626', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div className="flex-between" style={{ alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '2px', fontWeight: 900, color: '#dc2626', textTransform: 'uppercase' }}>
                  CONFIDENTIAL • EMERGENCY HOUSEHOLD VAULT
                </span>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '0.2rem 0' }}>
                  {householdProfile.familyName} Master Financial & Legal Dossier
                </h1>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                  Primary Residence: {householdProfile.city}, {householdProfile.state} {householdProfile.zipCode} • Last Audited: July 2026
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>EMERGENCY CONTACT PHONE</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FDB927' }}>Chris & Erin Harrison</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--success)', fontWeight: 800 }}>Net Cash Surplus: +{fmt(totalCombinedSurplus)}/mo</div>
              </div>
            </div>
          </div>

          {/* SECTION 1: FAMILY ROSTER & IDENTIFIERS */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FDB927', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={18} />
              <span>1. FAMILY MEMBERS & ENCRYPTED IDENTIFIERS</span>
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', color: '#fff' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                  <th style={{ padding: '8px 10px' }}>Name</th>
                  <th style={{ padding: '8px 10px' }}>Role</th>
                  <th style={{ padding: '8px 10px' }}>Age / Birthday</th>
                  <th style={{ padding: '8px 10px' }}>Social Security # (SSN)</th>
                  <th style={{ padding: '8px 10px' }}>Employer / Institution</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  const savedSsn = localStorage.getItem(`harrison_ssn_${m.id}`) || '999-00-1234';
                  const maskedSsn = `***-**-${savedSsn.slice(-4)}`;

                  return (
                    <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '10px', fontWeight: 800, color: m.color }}>{m.name}</td>
                      <td style={{ padding: '10px' }}>{m.title}</td>
                      <td style={{ padding: '10px' }}>{m.birthday || 'N/A'}</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 700, color: showFullSsn ? '#FDB927' : '#cbd5e1' }}>
                        {showFullSsn ? savedSsn : maskedSsn}
                      </td>
                      <td style={{ padding: '10px' }}>{m.employer || 'Harrison Household'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* SECTION 2: INSURANCE POLICIES & BENEFICIARY ALLOCATIONS */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} />
              <span>2. LIFE & HEALTH INSURANCE POLICIES & BENEFICIARIES</span>
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: '#fff' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                  <th style={{ padding: '8px 10px' }}>Policy Name / Type</th>
                  <th style={{ padding: '8px 10px' }}>Owner</th>
                  <th style={{ padding: '8px 10px' }}>Coverage Amount</th>
                  <th style={{ padding: '8px 10px' }}>Primary Beneficiary</th>
                  <th style={{ padding: '8px 10px' }}>Contingent Beneficiary</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>Primerica Term Life ($250k)</td>
                  <td style={{ padding: '8px 10px' }}>Chris Harrison</td>
                  <td style={{ padding: '8px 10px', color: '#10b981', fontWeight: 800 }}>$250,000.00</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>Erin Harrison (100%)</td>
                  <td style={{ padding: '8px 10px' }}>Hayden & Ava Harrison (50/50)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>Americo Life Insurance ($90k)</td>
                  <td style={{ padding: '8px 10px' }}>Barbara Harrison (Mom)</td>
                  <td style={{ padding: '8px 10px', color: '#10b981', fontWeight: 800 }}>$90,000.00</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>Chris Harrison (100%)</td>
                  <td style={{ padding: '8px 10px' }}>Erin Harrison</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>Lumico Whole Life Policy</td>
                  <td style={{ padding: '8px 10px' }}>Barbara Harrison (Mom)</td>
                  <td style={{ padding: '8px 10px', color: '#10b981', fontWeight: 800 }}>Guaranteed Death Benefit</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>Chris Harrison (100%)</td>
                  <td style={{ padding: '8px 10px' }}>Erin Harrison</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>NC State Health Plan (BCBS)</td>
                  <td style={{ padding: '8px 10px' }}>Chris & Erin Harrison</td>
                  <td style={{ padding: '8px 10px', color: '#3b82f6', fontWeight: 800 }}>Comprehensive Family Medical</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>Family Coverage</td>
                  <td style={{ padding: '8px 10px' }}>Cone Health System Preferred</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>Progressive Auto & Home Policy</td>
                  <td style={{ padding: '8px 10px' }}>Chris Harrison</td>
                  <td style={{ padding: '8px 10px', color: '#3b82f6', fontWeight: 800 }}>Full Auto & Property Liability</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>Chris & Erin Harrison</td>
                  <td style={{ padding: '8px 10px' }}>Guilford County NC Property</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECTION 3: GUARANTEED PENSIONS & RETIREMENT INFLOWS */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#3b82f6', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Building2 size={18} />
              <span>3. GUARANTEED STATE & FEDERAL PENSIONS & RETIREMENT</span>
            </h3>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontWeight: 900, color: '#FDB927', fontSize: '0.95rem' }}>NC TSERS State Pension (Chris)</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '0.2rem' }}>Member ID: #1875708 • Retirement Target: May 1, 2040</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 800, marginTop: '0.4rem' }}>
                  • Max Allowance: <strong>$1,803.55 / month</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 800 }}>
                  • Option 2 (100% Survivorship): <strong>$1,682.89 / month</strong> for life to Erin!
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontWeight: 900, color: '#3b82f6', fontSize: '0.95rem' }}>OPM Federal Civil Service Pension (Mom)</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '0.2rem' }}>Federal Civil Service Annuitant • Office of Personnel Management</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 800, marginTop: '0.4rem' }}>
                  • Monthly Guaranteed Pension: <strong>$5,645.84 / month</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 800 }}>
                  • PenFed Reserve Account: <strong>$76,155.00</strong> Cash Buffer
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: BANK ACCOUNTS & LIQUIDITY INVENTORY */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#a855f7', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <DollarSign size={18} />
              <span>4. HOUSEHOLD BANK ACCOUNTS & LIQUID CASH POOLS</span>
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: '#fff' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                  <th style={{ padding: '8px 10px' }}>Institution & Account Name</th>
                  <th style={{ padding: '8px 10px' }}>Account Type</th>
                  <th style={{ padding: '8px 10px' }}>Assigned Owner</th>
                  <th style={{ padding: '8px 10px' }}>Current Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>Bank of America Business 360 (Family Checking)</td>
                  <td style={{ padding: '8px 10px' }}>Checking</td>
                  <td style={{ padding: '8px 10px' }}>Chris Harrison</td>
                  <td style={{ padding: '8px 10px', color: '#10b981', fontWeight: 800 }}>$13,546.00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>PenFed Credit Union Reserve Account</td>
                  <td style={{ padding: '8px 10px' }}>Savings / Reserve</td>
                  <td style={{ padding: '8px 10px' }}>Barbara Harrison (Mom)</td>
                  <td style={{ padding: '8px 10px', color: '#10b981', fontWeight: 800 }}>$76,155.00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>Novo Business Checking (Think! Design & Planning)</td>
                  <td style={{ padding: '8px 10px' }}>Business Checking</td>
                  <td style={{ padding: '8px 10px' }}>Chris Harrison</td>
                  <td style={{ padding: '8px 10px', color: '#10b981', fontWeight: 800 }}>$350.00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 800 }}>Capital One 360 High-Yield Savings</td>
                  <td style={{ padding: '8px 10px' }}>Savings</td>
                  <td style={{ padding: '8px 10px' }}>Chris & Erin Harrison</td>
                  <td style={{ padding: '8px 10px', color: '#10b981', fontWeight: 800 }}>$4,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECTION 5: EMERGENCY CONTACT DIRECTORY */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ef4444', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.4rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={18} />
              <span>5. CRITICAL INSTITUTIONAL & LEGAL EMERGENCY PHONE DIRECTORY</span>
            </h3>

            <div className="grid-3" style={{ gap: '1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>NC TSERS Retirement System</strong>
                <div>Phone: <strong>1-877-627-2884</strong></div>
                <div>Portal: orbit.myretirement.gov</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>OPM Federal Retirement (Mom)</strong>
                <div>Phone: <strong>1-888-767-6738</strong></div>
                <div>Portal: opm.gov/retire</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>Bank of America Estate Care Team</strong>
                <div>Phone: <strong>1-888-689-4466</strong></div>
                <div>Case Portal: bankofamerica.com/estateservices</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Embedded CSS Print Overrides */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .red-folder-modal-overlay,
          .red-folder-modal-container,
          #printable-red-folder-content,
          #printable-red-folder-content * {
            visibility: visible !important;
          }
          .red-folder-modal-overlay {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: #fff !important;
            backdrop-filter: none !important;
            padding: 0 !important;
          }
          .red-folder-modal-container {
            border: none !important;
            background: #fff !important;
            color: #000 !important;
            max-width: 100% !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          #printable-red-folder-content {
            background: #fff !important;
            color: #000 !important;
            border: none !important;
            padding: 0 !important;
          }
          #printable-red-folder-content h1,
          #printable-red-folder-content h3,
          #printable-red-folder-content td,
          #printable-red-folder-content th,
          #printable-red-folder-content strong {
            color: #000 !important;
          }
          #printable-red-folder-content table {
            border: 1px solid #000 !important;
          }
          #printable-red-folder-content th,
          #printable-red-folder-content td {
            border: 1px solid #ddd !important;
          }
        }
      `}</style>

    </div>
  );
};
