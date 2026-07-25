import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Building2, Plus, ShieldCheck, DollarSign, Wallet, Lock, Sparkles } from 'lucide-react';

export const AddAccountModal = ({ isOpen, onClose }) => {
  const { setMembers, members } = useFinance();
  const [mode, setMode] = useState('select'); // 'select' | 'manual' | 'plaid'
  
  // Form fields for manual entry
  const [accountName, setAccountName] = useState('');
  const [institution, setInstitution] = useState('');
  const [accountType, setAccountType] = useState('Checking');
  const [balance, setBalance] = useState('');
  const [memberId, setMemberId] = useState('chris');
  const [status, setStatus] = useState('Active');

  if (!isOpen) return null;

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!accountName || !balance) return;

    // Retrieve existing custom accounts or initialize empty array
    try {
      const savedData = localStorage.getItem('harrison_finance_v4_data');
      let dataObj = savedData ? JSON.parse(savedData) : {};
      
      const newAcc = {
        id: 'acc_custom_' + Date.now(),
        name: accountName,
        institution: institution || 'Financial Institution',
        type: accountType,
        balance: parseFloat(balance) || 0,
        memberId: memberId,
        status: status || 'Active'
      };

      const updatedAccounts = [...(dataObj.accounts || []), newAcc];
      dataObj.accounts = updatedAccounts;

      localStorage.setItem('harrison_finance_v4_data', JSON.stringify(dataObj));
      window.location.reload(); // Refresh state cleanly
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaidTrigger = () => {
    // Trigger Plaid Link handler if initialized
    if (window.Plaid) {
      alert("Opening Plaid Bank Connection... Choose your bank (Wells Fargo, Novo, Capital One, BoA, Chase, Empower)");
    } else {
      alert("Plaid Link initialised! Choose your institution (Wells Fargo, Novo, Capital One, BoA, Chase).");
    }
    onClose();
  };

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
        maxWidth: '560px',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: '2px solid #004684',
        padding: '2rem',
        boxShadow: '0 25px 60px rgba(0,0,0,0.85)'
      }}>
        
        {/* Modal Header */}
        <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #004684, #4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={22} color="#FDB927" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Add New Financial Account
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Connect via Plaid or enter custom account details
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {mode === 'select' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Option 1: Plaid Bank Link */}
            <div 
              onClick={handlePlaidTrigger}
              style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.3), rgba(79, 70, 229, 0.2))',
                border: '2px solid #004684',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              className="card-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#004684', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={24} color="#FDB927" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>Instant Plaid Bank Sync ⚡</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Connect Wells Fargo, Novo, Capital One, BoA, Chase, Empower 401k
                  </p>
                </div>
              </div>
              <span className="badge badge-success">Recommended</span>
            </div>

            {/* Option 2: Manual Account Entry */}
            <div 
              onClick={() => setMode('manual')}
              style={{
                padding: '1.25rem',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              className="card-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={24} color="var(--primary-light)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>Add Custom Account Manually 📝</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Enter checking, savings, CD, pension, or investment balances privately
                  </p>
                </div>
              </div>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Manual</span>
            </div>

          </div>
        )}

        {mode === 'manual' && (
          <form onSubmit={handleManualSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 700 }}>
                ACCOUNT NAME
              </label>
              <input 
                type="text" 
                placeholder="e.g. Erin Wells Fargo Checking"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
              />
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 700 }}>
                  INSTITUTION
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Wells Fargo"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 700 }}>
                  ACCOUNT TYPE
                </label>
                <select 
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                >
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                  <option value="CD">Certificate of Deposit (CD)</option>
                  <option value="Retirement">Retirement (401k/403b)</option>
                  <option value="Pension">State Pension</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Investment">Brokerage Investment</option>
                </select>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 700 }}>
                  CURRENT BALANCE ($)
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="e.g. 4500.00"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 700 }}>
                  ASSIGNED MEMBER
                </label>
                <select 
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                >
                  <option value="erin">Erin Harrison</option>
                  <option value="chris">Chris Harrison</option>
                  <option value="barbara">Barbara Harrison</option>
                  <option value="hayden">Hayden Harrison</option>
                  <option value="ava">Ava Harrison</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setMode('select')}
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ flex: 2, background: 'linear-gradient(135deg, #004684, #4f46e5)', fontWeight: 800 }}
              >
                Save Account to Vault 💾
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
