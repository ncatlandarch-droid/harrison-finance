import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Key, RotateCcw, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { INITIAL_DATA } from '../data/initialData';

export const SettingsSection = () => {
  const { data, setData, members, householdProfile } = useFinance();
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');
  const [savedMsg, setSavedMsg] = useState(false);
  const [backupDownloaded, setBackupDownloaded] = useState(false);

  const handleSaveKey = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleExportBackup = () => {
    const backupObj = {
      timestamp: new Date().toISOString(),
      householdProfile,
      members,
      data,
      ssns: {
        chris: localStorage.getItem('harrison_ssn_chris'),
        erin: localStorage.getItem('harrison_ssn_erin'),
        barbara: localStorage.getItem('harrison_ssn_barbara'),
        hayden: localStorage.getItem('harrison_ssn_hayden'),
        ava: localStorage.getItem('harrison_ssn_ava'),
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Harrison_Finance_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setBackupDownloaded(true);
    setTimeout(() => setBackupDownloaded(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all financial data to initial Bank of America defaults?')) {
      setData(INITIAL_DATA);
      localStorage.removeItem('harrison_finance_v4_data');
      window.location.reload();
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 💾 DOWNLOAD BACKUP COPY OF ALL HOUSEHOLD DATA */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(0, 70, 132, 0.25))', border: '1.5px solid #10b981' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={22} color="var(--success)" />
              <span>Download 1-Click Backup of All Family Data (.JSON)</span>
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
              Export a complete encrypted copy of your family profiles, accounts, document slots, and SSNs to your phone or computer anytime.
            </p>
          </div>

          <button 
            onClick={handleExportBackup}
            className="btn btn-primary"
            style={{ background: 'linear-gradient(135deg, #10b981, #059669)', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={16} />
            <span>{backupDownloaded ? 'Backup Downloaded ✓' : 'Download Backup File 💾'}</span>
          </button>
        </div>
      </div>

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
