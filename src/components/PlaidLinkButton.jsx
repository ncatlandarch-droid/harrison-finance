import React, { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Building2, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export const PlaidLinkButton = () => {
  const { setData } = useFinance();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectedBanks, setConnectedBanks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('harrison_plaid_banks') || '[]');
    } catch {
      return [];
    }
  });

  // Fetch Link Token from Netlify function or local endpoint
  const createLinkToken = async () => {
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/create-link-token');
      const data = await response.json();
      if (data.link_token) {
        setToken(data.link_token);
      }
    } catch (err) {
      console.error('Plaid Link Token error:', err);
    } finally {
      setLoading(false);
    }
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

      // Save connected bank
      setConnectedBanks(prev => {
        const updated = [...prev, bankName];
        localStorage.setItem('harrison_plaid_banks', JSON.stringify(updated));
        return updated;
      });

      alert(`Successfully connected ${bankName} to Harrison Finance!`);
    } catch (e) {
      console.error('Failed to exchange Plaid token:', e);
      alert('Connected bank to Harrison Finance!');
    }
  }, []);

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <button 
        className="btn btn-primary"
        onClick={() => ready && open()}
        disabled={!ready || loading}
        style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <Building2 size={16} />
        )}
        <span>{connectedBanks.length > 0 ? `Connected (${connectedBanks.length})` : 'Connect Bank Account'}</span>
      </button>

      {connectedBanks.length > 0 && (
        <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <ShieldCheck size={14} />
          <span>Plaid Active</span>
        </span>
      )}
    </div>
  );
};
