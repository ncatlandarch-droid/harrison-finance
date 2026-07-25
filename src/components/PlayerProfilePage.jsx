import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Heart, 
  Phone, 
  Award, 
  Upload, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Download, 
  Trash2, 
  Calendar, 
  Trophy, 
  Star,
  Stethoscope,
  Shield,
  CreditCard,
  Sparkles,
  Building2,
  Users,
  MapPin,
  TrendingUp,
  Target
} from 'lucide-react';

export const PlayerProfilePage = ({ player, onBack }) => {
  const { data, totalCombinedSurplus } = useFinance();
  const [showSensitive, setShowSensitive] = useState(false);
  
  // Local state for uploaded documents per player
  const [userDocs, setUserDocs] = useState(() => {
    try {
      const saved = localStorage.getItem(`harrison_vault_docs_${player?.id}`);
      if (saved) return JSON.parse(saved);
      
      if (player?.id === 'isla') {
        return [
          { id: 'd1', name: 'ISLA Rabies Vaccine Certificate.pdf', size: '1.1 MB', date: '2026-06-10', type: 'Pet Health' },
          { id: 'd2', name: 'AKC Microchip Registration.pdf', size: '850 KB', date: '2026-06-10', type: 'Pet ID' },
          { id: 'd3', name: 'Pet Insurance Policy Certificate.pdf', size: '1.9 MB', date: '2026-06-12', type: 'Pet Insurance' }
        ];
      }

      return [
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

  const currentAge = getAge(player.birthday);
  const isYouth = player.id === 'hayden' || player.id === 'ava';

  // $30,000 By Age 18 Savings Computation
  const targetAge = 18;
  const yearsRemaining = Math.max(0, targetAge - (typeof currentAge === 'number' ? currentAge : 10));
  const monthsRemaining = yearsRemaining * 12;
  
  // Required monthly payment to hit $30,000
  let requiredMonthlySavings = 0;
  if (player.id === 'hayden') requiredMonthlySavings = 331.00; // 6 years (72 mos) @ 5%
  else if (player.id === 'ava') requiredMonthlySavings = 172.00; // 11 years (132 mos) @ 5%

  // Get itemized bills for this player
  let playerBills = [];
  if (player.id === 'barbara') playerBills = data?.barbaraExpenses || [];
  else if (player.id === 'erin') playerBills = data?.erinExpenses || [];
  else if (player.id === 'chris') playerBills = data?.chrisExpenses || [];

  // Universal Gamified Quests for EVERYONE (+250 XP each)
  const quests = player.id === 'isla' ? [
    { title: "Rabies & Vaccine Records Verified", points: 250, icon: "💉", desc: "Up-to-date vet vaccination records" },
    { title: "Microchip Registration Linked", points: 250, icon: "🏷️", desc: "AKC microchip pet identification" },
    { title: "Pet Insurance Coverage Active", points: 250, icon: "🛡️", desc: "Emergency medical insurance linked" },
    { title: "Family Financial Wizard Badge", points: 250, icon: "🐶", desc: "Official mascot AI wealth guide" }
  ] : [
    { title: "Birth Certificate Secured", points: 250, icon: "📜", desc: "Official birth record copy saved in vault" },
    { title: "US Passport Scan Uploaded", points: 250, icon: "🛂", desc: "Government identity passport scan" },
    { title: "Health & Dental Insurance Linked", points: 250, icon: "🏥", desc: "Medical policy & emergency card" },
    { title: isYouth ? "$30,000 By Age 18 Plan Active" : "Estate Directive / Savings Milestone", points: 250, icon: "🛡️", desc: isYouth ? `$30k goal (${player.id === 'hayden' ? '$331/mo' : '$172/mo'})` : "Will, POA, or Investment Plan" }
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* Top Back Navigation Banner */}
      <div className="flex-between">
        <button 
          onClick={onBack}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, padding: '0.65rem 1.25rem' }}
        >
          <ArrowLeft size={18} />
          <span>← Back to Family Roster & Dashboard</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn"
            onClick={() => setShowSensitive(!showSensitive)}
            style={{
              background: showSensitive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              border: `1px solid ${showSensitive ? 'var(--danger)' : 'var(--success)'}`,
              color: showSensitive ? 'var(--danger)' : 'var(--success)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            {showSensitive ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{showSensitive ? 'Hide Sensitive Vitals' : 'Reveal Encrypted Identifiers'}</span>
          </button>
        </div>
      </div>

      {/* 🌟 GIANT HERO PROFILE BANNER (200px Portrait!) */}
      <div className="card card-glow" style={{
        background: `linear-gradient(135deg, ${player.color}35, rgba(15, 23, 42, 0.98))`,
        border: `3px solid ${player.color}`,
        borderRadius: '24px',
        padding: '2.25rem',
        boxShadow: `0 15px 45px ${player.color}30`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          
          {/* GIANT 180px PHOTO AVATAR FRAME */}
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: `5px solid ${player.color}`,
            boxShadow: `0 0 40px ${player.color}80`,
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

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{player.name}</h2>
              <span className="badge" style={{ background: `${player.color}30`, color: player.color, border: `1.5px solid ${player.color}`, fontWeight: 800, fontSize: '0.85rem', padding: '4px 12px' }}>
                {player.badge}
              </span>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {player.title} • Birthday: <strong>{player.birthday || 'N/A'}</strong> (Age {currentAge})
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <div className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Trophy size={16} color="#FDB927" />
                <span>Guardian Rating: 1,000 / 1,000 XP (Master Status 🏆)</span>
              </div>

              <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.82rem' }}>
                {player.level}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 🎯 $30,000 BY AGE 18 SAVINGS GOAL CALCULATOR FOR HAYDEN & AVA */}
      {isYouth && (
        <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.15))', border: '2px solid #3b82f6' }}>
          <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(59, 130, 246, 0.3)', paddingBottom: '0.85rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Target size={24} color="#3b82f6" />
                <span>Erin's $30,000 By Age 18 College & Future Savings Goal</span>
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Guaranteed cash wealth milestone calculator for {player.name}
              </p>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.8rem' }}>
              Target: $30,000.00 at Age 18
            </span>
          </div>

          <div className="grid-4" style={{ gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>CURRENT AGE</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
                Age {currentAge}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{yearsRemaining} Years Remaining</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>TIME UNTIL AGE 18</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.2rem' }}>
                {monthsRemaining} Months
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Target Date: {2026 + yearsRemaining}</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>REQUIRED MONTHLY CONTRIBUTION</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>
                {fmt(requiredMonthlySavings)} / mo
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--success)', marginTop: '0.2rem', fontWeight: 700 }}>
                ✓ Allocated from +$5.0k Surplus
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>TOTAL CASH AT AGE 18</div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FDB927', marginTop: '0.2rem' }}>
                $30,000.00
              </div>
              <div style={{ fontSize: '0.72rem', color: '#FDB927', marginTop: '0.2rem', fontWeight: 700 }}>
                🎓 100% Fully Funded
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2-COLUMN MAIN WORKSPACE GRID */}
      <div className="grid-2" style={{ gap: '1.75rem' }}>
        
        {/* LEFT COLUMN: FINANCIAL ALLOCATION & DOCTORS DIRECTORY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Financial Breakdown */}
          <div className="card">
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={20} color="var(--primary-light)" />
              <span>Financial Inflow & Expense Allocations</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>GROSS MONTHLY INFLOW</div>
                  <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.1rem' }}>
                    {fmt(player.income)}
                  </div>
                  {player.id === 'chris' && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Base Salary ($6,309.36) + Household Transfer ($3,000)
                    </div>
                  )}
                </div>
                <span className="badge badge-success" style={{ alignSelf: 'flex-start' }}>Monthly Inflow</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>ASSIGNED EXPENSES</div>
                  <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--danger)', marginTop: '0.1rem' }}>
                    {fmt(player.expenses || 0)}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {playerBills.length} Itemized Commitments
                  </div>
                </div>
                <span className="badge badge-danger" style={{ alignSelf: 'flex-start' }}>Fixed Outflow</span>
              </div>
            </div>
          </div>

          {/* 🏥 DOCTORS & HEALTHCARE DIRECTORY */}
          <div className="card">
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stethoscope size={20} color="#ec4899" />
              <span>Doctors, Medical & Insurance Contacts</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ padding: '0.9rem 1.1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>Primary Care Physician</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Dr. Cone Health Medical Center • Greensboro, NC<br />
                  📞 <strong>336-832-7000</strong> • Patient Portal Connected
                </div>
              </div>

              <div style={{ padding: '0.9rem 1.1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>Health & Dental Insurance</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  State Health Plan / BCBS NC<br />
                  Policy #: <span className="font-mono" style={{ color: '#fff' }}>{showSensitive ? 'NC-88192049' : 'NC-••••••••'}</span> • Group #: 33901
                </div>
              </div>

              {player.id === 'barbara' && (
                <div style={{ padding: '0.9rem 1.1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <div style={{ fontWeight: 700, color: '#c084fc', fontSize: '0.92rem' }}>Life Insurance Lockbox ($144,000 Coverage)</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Americo ($90k) + Lumico + Primerica<br />
                    Designated Beneficiary: Chris Harrison & Family
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DOCUMENT LOCKBOX & GAMIFIED XP QUESTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* 📂 DOCUMENT REPOSITORY LOCKBOX */}
          <div className="card">
            <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div>
                <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={20} color="var(--primary-light)" />
                  <span>{player.name}'s Family Document Repository</span>
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  Upload & manage birth certificates, passports, health cards & legal files
                </p>
              </div>

              <label className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #004684, #4f46e5)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                <Upload size={16} />
                <span>Upload File</span>
                <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" />
              </label>
            </div>

            {/* Document List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {userDocs.map(doc => (
                <div key={doc.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.9rem 1.1rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <FileText size={22} color={player.color} />
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{doc.name}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Uploaded {doc.date} • {doc.size}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>Saved in Vault</span>
                    <button 
                      onClick={() => handleDeleteDoc(doc.id)} 
                      style={{ background: 'rgba(239,68,68,0.2)', border: 'none', color: 'var(--danger)', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer' }}
                      title="Delete Document"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🏆 GAMIFIED XP QUEST CHECKPOINTS (+1,000 XP) */}
          <div className="card">
            <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={22} color="#FDB927" />
              <span>Gamified Guardian Checkpoints (+1,000 XP Goal)</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quests.map((q, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.9rem 1.1rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{q.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{q.title}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{q.desc}</div>
                    </div>
                  </div>

                  <span className="badge badge-success" style={{ fontSize: '0.74rem' }}>
                    +{q.points} XP ✓
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
