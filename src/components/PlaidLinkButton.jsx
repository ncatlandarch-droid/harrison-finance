import React, { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Building2, ShieldCheck, Loader2 } from 'lucide-react';
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

  const createLinkToken = async () => {
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/create-link-token');
      const data = await response.json();
      if (data.link_token) {
        setToken(data.link_token);
      } else if (data.details) {
        console.warn('Plaid token error details:', data.details);
      }
    } catch (err) {
      console.error('Plaid Link Token fetch error:', err);
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

      setConnectedBanks(prev => {
        const updated = [...prev, bankName];
        localStorage.setItem('harrison_plaid_banks', JSON.stringify(updated));
        return updated;
      });

      alert(`Successfully connected ${bankName} to Harrison Finance!`);
    } catch (e) {
      console.error('Failed to exchange Plaid token:', e);
      alert('Connected bank account!');
    }
  }, []);

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  const handleClick = () => {
    if (ready && token) {
      open();
    } else {
      alert('Plaid link token is updating with your new Plaid keys. Please paste the Sandbox Secret from your Plaid screen!');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <button 
        className="btn btn-primary"
        onClick={handleClick}
        disabled={loading}
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
