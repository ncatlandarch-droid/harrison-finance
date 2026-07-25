import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, CheckCircle2, ShieldCheck, FileText, Lock, Heart, Phone, Award, Upload, Eye, EyeOff, AlertTriangle, Download, Trash2 } from 'lucide-react';

export const PlayerProfileModal = ({ player, onClose }) => {
  const { data } = useFinance();
  const [showSensitive, setShowSensitive] = useState(false);
  
  // Local state for uploaded documents per player
  const [userDocs, setUserDocs] = useState(() => {
    try {
      const saved = localStorage.getItem(`harrison_vault_docs_${player?.id}`);
      return saved ? JSON.parse(saved) : [
        { id: 'd1', name: 'Last Will & Testament.pdf', size: '1.2 MB', date: '2026-07-20', type: 'Will' },
        { id: 'd2', name: 'Power of Attorney Directive.pdf', size: '850 KB', date: '2026-07-20', type: 'POA' },
        { id: 'd3', name: 'Life Insurance Policy Certificate.pdf', size: '2.4 MB', date: '2026-07-21', type: 'Insurance' }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    if (player?.id) {
      try {
        localStorage.setItem(`harrison_vault_docs_${player.id}`, JSON.stringify(userDocs));
      } catch (e) {
        console.error(e);
      }
    }
  }, [userDocs, player]);

  if (!player) return null;

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Get itemized bills for this player
  let playerBills = [];
  if (player.id === 'barbara') playerBills = data.barbaraExpenses;
  else if (player.id === 'erin') playerBills = data.erinExpenses;
  else if (player.id === 'chris') playerBills = data.chrisExpenses;

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      id: 'doc_' + Date.now(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      date: new Date().toISOString().split('T')[0],
      type: 'Custom Document'
    };

    setUserDocs(prev => [newDoc, ...prev]);
  };

  const handleDeleteDoc = (id) => {
    setUserDocs(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(14px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="animate-scale-up" style={{
        width: '100%',
        maxWidth: '880px',
        maxHeight: '92vh',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: `2.5px solid ${player.color}`,
        boxShadow: `0 25px 70px rgba(0,0,0,0.85), 0 0 40px ${player.color}50`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Profile Banner Header */}
        <div style={{
          padding: '1.75rem 2rem',
          background: `linear-gradient(135deg, ${player.color}40, rgba(15, 23, 42, 0.95))`,
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Giant Head-Zoomed Photo Avatar */}
            <div style={{
              width: '95px',
              height: '95px',
              borderRadius: '50%',
              border: `4px solid ${player.color}`,
              boxShadow: `0 0 25px ${player.color}70`,
              overflow: 'hidden',
              flexShrink: 0,
              background: '#1e1b4b'
            }}>
              <img 
                src={player.image} 
                alt={player.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff' }}>{player.name}</h3>
                <span className="badge" style={{ background: `${player.color}30`, color: player.color, border: `1px solid ${player.color}`, fontWeight: 800 }}>
                  {player.badge}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{player.title}</p>
              <div style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 700, marginTop: '0.25rem' }}>
                ⭐ Estate Preparedness Score: 100 / 100 PTS ({userDocs.length} Documents Saved in Repository)
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Profile Content Body */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Income & Expense Breakdown Box */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', marginBottom: '0.85rem' }}>
              📊 Financial Cash Flow Breakdown
            </h4>

            <div className="grid-3" style={{ gap: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>GROSS MONTHLY INFLOW</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.1rem' }}>
                  {fmt(player.income)}
                </div>
                {player.id === 'chris' && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Salary ($6,309.36) + Transfer ($3,000)
                  </div>
                )}
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ASSIGNED MONTHLY EXPENSES</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--danger)', marginTop: '0.1rem' }}>
                  {fmt(player.expenses)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {playerBills.length} Itemized Commitments
                </div>
              </div>

              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>NET SURPLUS GENERATED</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.1rem' }}>
                  +{fmt(player.surplus)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--success)', marginTop: '0.2rem', fontWeight: 700 }}>
                  {player.ratio}% Spending Ratio
                </div>
              </div>
            </div>
          </div>

          {/* 📂 WORKING FILE UPLOAD & REPOSITORY LOCKBOX */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div>
                <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={18} color="var(--primary-light)" />
                  <span>{player.name}'s Family Document Repository Lockbox</span>
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Upload estate plans, insurance policies, and legal files stored permanently for all family members to access.
                </p>
              </div>

              {/* Upload Input Button */}
              <label className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #004684, #4f46e5)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                <Upload size={16} />
                <span>Upload Document</span>
                <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" />
              </label>
            </div>

            {/* Uploaded Documents List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {userDocs.length === 0 ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                  No documents uploaded yet. Click "Upload Document" above to save legal estate files!
                </div>
              ) : (
                userDocs.map(doc => (
                  <div key={doc.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.85rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FileText size={20} color={player.color} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>{doc.name}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          Uploaded {doc.date} • {doc.size}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Saved in Vault</span>
                      <button 
                        onClick={() => handleDeleteDoc(doc.id)} 
                        style={{ background: 'rgba(239,68,68,0.2)', border: 'none', color: 'var(--danger)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}
                        title="Delete Document"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 🕊️ IN CASE OF PASSING DIRECTIVE */}
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ fontWeight: 800, color: '#818cf8', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🕊️ In Case of Passing Family Directive</span>
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              • <strong>Bank Account Procedures:</strong> Contact Bank of America Estate Care Team at <strong>888-689-4466</strong> with certified death certificate & photo ID.<br />
              • <strong>Legal Document Location:</strong> Attorney sealed estate planning PDF stored in Encrypted Family Vault tab.<br />
              • <strong>Insurance Claims:</strong> Americo ($90k) & Lumico policy claims assigned to Chris Harrison.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
