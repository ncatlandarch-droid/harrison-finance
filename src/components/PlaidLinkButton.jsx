import React, { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Building2, ShieldCheck, Loader2 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export const PlaidLinkButton = () => {
  const { mergePlaidData } = useFinance();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectedBanks, setConnectedBanks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('harrison_plaid_banks') || '[]');
    } catch {
      return [];
    }
  });

  const createLinkToken = async () => {
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/create-link-token');
      const data = await response.json();
      if (data.link_token) {
        setToken(data.link_token);
        return data.link_token;
      }
    } catch (err) {
      console.error('Plaid Link Token fetch error:', err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  useEffect(() => {
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token, metadata) => {
    try {
      const res = await fetch('/.netlify/functions/exchange-public-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token }),
      });
      const result = await res.json();
      
      const bankName = metadata.institution ? metadata.institution.name : 'Bank Account';

      if (result.accounts || result.transactions) {
        mergePlaidData(result.accounts || [], result.transactions || []);
      }

      setConnectedBanks(prev => {
        const updated = [...prev, bankName];
        localStorage.setItem('harrison_plaid_banks', JSON.stringify(updated));
        return updated;
      });

      alert(`Successfully connected ${bankName}! Live balances updated.`);
    } catch (e) {
      console.error('Failed to exchange Plaid token:', e);
    }
  }, [mergePlaidData]);

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const handleClick = async () => {
    if (ready && token) {
      open();
    } else {
      const newToken = await createLinkToken();
      if (newToken && ready) {
        open();
      } else {
        alert("Initializing Plaid secure link... Please try clicking once more in 2 seconds.");
      }
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
      <button 
        className="btn btn-primary"
        onClick={handleClick}
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.85rem 1.25rem',
          fontSize: '0.95rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          borderRadius: '12px'
        }}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <Building2 size={18} />
        )}
        <span>{connectedBanks.length > 0 ? `Connected Banks (${connectedBanks.length}) — Click to Add Bank` : '🚀 Connect Bank Account via Plaid'}</span>
      </button>

      {connectedBanks.length > 0 && (
        <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '6px 12px' }}>
          <ShieldCheck size={14} />
          <span>Plaid Active</span>
        </span>
      )}
    </div>
  );
};
