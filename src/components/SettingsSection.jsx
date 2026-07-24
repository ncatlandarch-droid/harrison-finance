import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Key, RotateCcw, ShieldCheck } from 'lucide-react';
import { INITIAL_DATA } from '../data/initialData';

export const SettingsSection = () => {
  const { setData } = useFinance();
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveKey = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all financial data to initial Bank of America defaults?')) {
      setData(INITIAL_DATA);
      localStorage.removeItem('harrison_finance_v2');
      window.location.reload();
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* API Key Configuration Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Key size={22} color="var(--primary-light)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Gemini AI Settings Key</h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Enter your single free-tier Gemini API key to enable AI financial insights without exposing keys in public deployments.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '500px' }}>
          <input 
            type="password"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            style={{ flex: 1, padding: '0.65rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff' }}
          />
          <button onClick={handleSaveKey} className="btn btn-primary">Save Key</button>
        </div>

        {savedMsg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} />
            <span>Key saved locally to browser storage!</span>
          </div>
        )}
      </div>

      {/* Reset Data Card */}
      <div className="card" style={{ border: '1px solid var(--danger-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <RotateCcw size={22} color="var(--danger)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Reset Local Data</h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Restores all accounts, budgets, bills, and real BoA statement transactions to initial baseline defaults.
        </p>

        <button onClick={handleResetData} className="btn btn-secondary" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
          Reset All Data
        </button>
      </div>

    </div>
  );
};
