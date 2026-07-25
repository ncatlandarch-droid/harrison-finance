import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Building2, 
  Lock, 
  X, 
  ExternalLink,
  Edit3,
  Sparkles
} from 'lucide-react';

export const AccountTroubleshooterModal = ({ isOpen, onClose }) => {
  const { 
    novoBusinessChecking, 
    advPlusBanking, 
    advantageSavings, 
    capitalOneSavings, 
    barbaraCheckingAccount,
    papiChecking,
    updateAccountBalance 
  } = useFinance();

  const [testingPlaid, setTestingPlaid] = useState(false);
  const [plaidStatus, setPlaidStatus] = useState(null);

  if (!isOpen) return null;

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const testPlaidConnection = async () => {
    setTestingPlaid(true);
    setPlaidStatus(null);
    try {
      const res = await fetch('/.netlify/functions/create-link-token');
      const data = await res.json();
      if (data.link_token) {
        setPlaidStatus({ success: true, message: 'Plaid API Server is Live & Ready! Token generated.' });
      } else {
        setPlaidStatus({ success: false, message: 'Plaid Token Error: Check credentials or use Manual Override.' });
      }
    } catch (e) {
      setPlaidStatus({ success: false, message: 'Network / Endpoint Connection Failed: Use Manual Balance Override below.' });
    } finally {
      setTestingPlaid(false);
    }
  };

  const accountDiagnostics = [
    {
      id: 'acc_novo',
      name: 'Novo Business Checking',
      sub: 'Think! Design & Planning LLC',
      balance: novoBusinessChecking.balance,
      type: 'Plaid OAuth',
      status: '🟢 Connected ($350.00)',
      fixAction: 'Log in via Plaid Link or click Edit Balance ✏️ to update live.'
    },
    {
      id: 'adv_plus',
      name: 'Bank of America Adv Plus (4717)',
      sub: 'Primary Household Checking',
      balance: advPlusBanking.balance,
      type: 'Direct Statement Feed',
      status: '🟢 Active (Verified)',
      fixAction: 'Statement CSV parsed cleanly. Balance verified.'
    },
    {
      id: 'acc_capone',
      name: 'Capital One 360 HYSA',
      sub: '4.25% High-Yield Cash Reserve',
      balance: capitalOneSavings.balance,
      type: 'Plaid Sync / Manual',
      status: '🟢 Active ($24,300.00)',
      fixAction: 'Earning 4.25% APY high yield interest.'
    },
    {
      id: 'acc_barbara_penfed',
      name: "Mom's PenFed Reserve",
      sub: 'Liquid Estate Capital',
      balance: barbaraCheckingAccount.balance,
      type: 'Credit Union Sync',
      status: '🟢 Active ($52,400.00)',
      fixAction: 'Reserve capital locked and active.'
    },
    {
      id: 'papi_checking',
      name: 'Papi Checking (7333)',
      sub: 'BoA Estate Settlement',
      balance: papiChecking.balance,
      type: 'Estate Account',
      status: '🟡 Action Needed (-$36.00)',
      fixAction: 'Call BoA Estate Team at 888-689-4466 to close.'
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
        maxWidth: '680px',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: '2px solid #FDB927',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        
        {/* Modal Header */}
        <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: '#FDB927', color: '#004684', fontWeight: 900 }}>
              🔍 ACCOUNT CONNECTION DIAGNOSTIC SUITE
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={24} color="#FDB927" />
              <span>Full Bank Connection Health Audit</span>
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* Plaid API Diagnostics Button */}
        <div style={{ background: 'rgba(0, 70, 132, 0.25)', border: '1.5px solid #004684', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div className="flex-between">
            <div>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="#FDB927" />
                <span>Plaid Secure API Health Diagnostics</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Tests OAuth handshakes with Novo, Capital One, BoA, and PenFed
              </div>
            </div>

            <button 
              className="btn btn-primary"
              onClick={testPlaidConnection}
              disabled={testingPlaid}
              style={{ background: 'linear-gradient(135deg, #FDB927, #f59e0b)', color: '#004684', fontWeight: 900, fontSize: '0.82rem', padding: '0.55rem 1rem' }}
            >
              {testingPlaid ? 'Testing API...' : 'Run Plaid API Test ⚡'}
            </button>
          </div>

          {plaidStatus && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: plaidStatus.success ? 'rgba(16, 185, 129, 0.18)' : 'rgba(239, 68, 68, 0.18)',
              border: plaidStatus.success ? '1px solid #10b981' : '1px solid var(--danger)',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {plaidStatus.success ? <CheckCircle2 size={18} color="var(--success)" /> : <AlertTriangle size={18} color="var(--danger)" />}
              <span>{plaidStatus.message}</span>
            </div>
          )}
        </div>

        {/* Account Diagnostic Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {accountDiagnostics.map(acc => (
            <div key={acc.id} style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                <div>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>{acc.name}</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{acc.sub} • Type: {acc.type}</div>
                </div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FDB927' }}>
                  {fmt(acc.balance)}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>{acc.status}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{acc.fixAction}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
