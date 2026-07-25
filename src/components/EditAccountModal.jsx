import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, DollarSign, Building2, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export const EditAccountModal = ({ isOpen, onClose, account }) => {
  const { updateAccountBalance } = useFinance();
  const [balance, setBalance] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (account) {
      setBalance(account.balance ? account.balance.toString() : '0');
      setSuccess(false);
    }
  }, [account]);

  if (!isOpen || !account) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAccountBalance(account.id, balance);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 800);
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
        maxWidth: '480px',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: '2px solid var(--primary-light)',
        padding: '2rem'
      }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Building2 size={24} color="var(--primary-light)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              Update {account.name} Balance
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
              Exact Live Balance ($)
            </label>
            <div style={{ position: 'relative' }}>
              <DollarSign size={18} color="#FDB927" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="number" 
                step="0.01"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1.5px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 900
                }}
                required
              />
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
              Enter exact live balance from your Novo / Bank portal.
            </span>
          </div>

          {success && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', padding: '0.75rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.84rem', fontWeight: 800 }}>
              <CheckCircle2 size={18} color="var(--success)" />
              <span>Balance Updated Successfully!</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #004684, #4f46e5)', color: '#fff', fontWeight: 800 }}>
              Save Live Balance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
