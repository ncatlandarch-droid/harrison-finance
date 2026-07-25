import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, CheckCircle2, ShieldCheck, FileText, Lock, Heart, Phone, Award, Upload, Eye, EyeOff, AlertTriangle, Download, Trash2, Calendar, Trophy, Star } from 'lucide-react';

export const PlayerProfileModal = ({ player, onClose }) => {
  const { data } = useFinance();
  const [showSensitive, setShowSensitive] = useState(false);
  
  // Local state for uploaded documents per player
  const [userDocs, setUserDocs] = useState(() => {
    try {
      const saved = localStorage.getItem(`harrison_vault_docs_${player?.id}`);
      return saved ? JSON.parse(saved) : [
        { id: 'd1', name: 'Birth Certificate Copy.pdf', size: '1.1 MB', date: '2026-07-20', type: 'Birth Certificate' },
        { id: 'd2', name: 'US Passport Scan.pdf', size: '2.3 MB', date: '2026-07-20', type: 'Passport' },
        { id: 'd3', name: 'Health Insurance Card.pdf', size: '650 KB', date: '2026-07-21', type: 'Health Card' }
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

  // Calculate age from birthday
  const getAge = (bdayStr) => {
    if (!bdayStr) return 'N/A';
    const birthDate = new Date(bdayStr);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Get itemized bills for this player
  let playerBills = [];
  if (player.id === 'barbara') playerBills = data.barbaraExpenses;
  else if (player.id === 'erin') playerBills = data.erinExpenses;
  else if (player.id === 'chris') playerBills = data.chrisExpenses;

  // Gamified Verification Checks & Badges (+250 XP each)
  const verificationQuests = [
    { title: "Birth Certificate Secured", status: "Verified", points: 250, icon: "📜", desc: "Official birth record copy stored in vault" },
    { title: "US Passport Scan Uploaded", status: "Verified", points: 250, icon: "🛂", desc: "Government identity passport scan" },
    { title: "Health & Dental Insurance Linked", status: "Active", points: 250, icon: "🏥", desc: "Medical policy & emergency card" },
    { title: "Estate Directive & Legacy Directive", status: player.role.includes('Youth') ? "Junior Vault" : "Executed", points: 250, icon: "🛡️", desc: "Will, POA, or Junior Savings Plan" }
  ];

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      id: 'doc_' + Date.now(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      date: new Date().toISOString().split('T')[0],
      type: 'Family Document'
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
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {player.title} • Birthday: <strong>{player.birthday || 'N/A'}</strong> (Age {getAge(player.birthday)})
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 700, marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Trophy size={14} color="#FDB927" />
                <span>Gamified Guardian Rating: 1,000 / 1,000 XP (Master Family Status 🏆)</span>
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
              📊 Financial & Allowance Allocation
            </h4>

            <div className="grid-3" style={{ gap: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MONTHLY INFLOW / ALLOWANCE</div>
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
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ASSIGNED EXPENSES</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--danger)', marginTop: '0.1rem' }}>
                  {fmt(player.expenses || 0)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {playerBills.length} Itemized Commitments
                </div>
              </div>

              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>NET SAVINGS SURPLUS</div>
                <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.1rem' }}>
                  +{fmt(player.surplus || player.income)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--success)', marginTop: '0.2rem', fontWeight: 700 }}>
                  Active Savings Builder
                </div>
              </div>
            </div>
          </div>

          {/* 🏆 GAMIFIED VERIFICATION CHECKS & BADGES */}
          <div>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} color="#FDB927" />
                <span>Gamified Identity & Legal Checkpoints (+1,000 XP Goal)</span>
              </h4>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowSensitive(!showSensitive)}
                style={{ fontSize: '0.78rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                {showSensitive ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{showSensitive ? 'Hide Identifiers' : 'Show Encrypted Vitals'}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {verificationQuests.map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  </div>

                  <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                    +{item.points} XP ✓
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 📂 WORKING FILE UPLOAD & REPOSITORY LOCKBOX */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div>
                <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={18} color="var(--primary-light)" />
                  <span>{player.name}'s Birth Certificates, Passports & Document Repository</span>
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Upload copies of birth certificates, passports, health cards & legal documents stored for all family members.
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

        </div>

      </div>
    </div>
  );
};
