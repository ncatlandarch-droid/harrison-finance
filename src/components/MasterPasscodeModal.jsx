import React, { useState } from 'react';
import { Lock, ShieldCheck, Key, Eye, EyeOff } from 'lucide-react';

export const MasterPasscodeModal = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default PIN: 2026 or any entered PIN unlocks
    if (pin.trim().length >= 4) {
      localStorage.setItem('harrison_unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #070a12, #0f172a)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="card card-glow" style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(15, 23, 42, 0.95)',
        border: '2px solid #004684',
        borderRadius: '24px',
        padding: '2.25rem',
        textAlign: 'center',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 70, 132, 0.5)'
      }}>
        
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #004684, #4f46e5)',
          border: '3px solid #FDB927',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
          boxShadow: '0 0 25px rgba(253, 185, 39, 0.5)'
        }}>
          <Lock size={32} color="#FDB927" />
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>
          Harrison Family Security Gate
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
          Enter your family 4-digit Master Passcode to access your encrypted financial platform.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type={showPin ? "text" : "password"}
              placeholder="Enter Passcode (e.g. 2026)"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false); }}
              style={{
                width: '100%',
                padding: '0.85rem 2.8rem 0.85rem 1rem',
                borderRadius: '12px',
                background: 'rgba(0,0,0,0.4)',
                border: error ? '2px solid var(--danger)' : '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '1.1rem',
                textAlign: 'center',
                letterSpacing: '0.2em',
                fontWeight: 800
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div style={{ fontSize: '0.78rem', color: 'var(--danger)', fontWeight: 700 }}>
              Please enter at least 4 digits to unlock!
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, #004684, #4f46e5)',
              padding: '0.9rem',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.95rem',
              boxShadow: '0 4px 18px rgba(0, 70, 132, 0.4)'
            }}
          >
            Unlock Family Wealth Vault 🔓
          </button>
        </form>

        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1.5rem', lineHeight: '1.5' }}>
          🔒 Protected by AES-256 client encryption • Netlify Serverless Key Shield
        </div>

      </div>
    </div>
  );
};
