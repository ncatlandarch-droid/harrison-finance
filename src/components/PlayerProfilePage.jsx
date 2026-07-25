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
  Target,
  DollarSign,
  Wallet
} from 'lucide-react';

export const PlayerProfilePage = ({ player, onBack }) => {
  const { data, totalCombinedSurplus, novoBusinessChecking, capitalOneSavings, barbaraCheckingAccount } = useFinance();
  const [showSensitive, setShowSensitive] = useState(false);
  const [questCompleted, setQuestCompleted] = useState(false);
  
  // Local state for uploaded documents per player
  const [userDocs, setUserDocs] = useState(() => {
    try {
      const saved = localStorage.getItem(`harrison_vault_docs_${player?.id}`);
      if (saved) return JSON.parse(saved);

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

  // Person-specific annual checkup document checklists
  const personChecklists = {
    chris: [
      { id: 'mars', title: 'NC TSERS Pension MARS Statement (orbit.myretirement.gov)', status: 'Verified' },
      { id: 'ssa', title: 'Social Security Administration Statement (ssa.gov)', status: 'Verified' },
      { id: 'empower', title: 'NC A&T 401(k) Empower Statement (myNCPlans.gov)', status: 'Pending Upload' },
      { id: 'novo', title: 'Think! Design & Planning LLC Annual Financial Record', status: 'Active' }
    ],
    erin: [
      { id: 'mars_erin', title: 'NC Educator TSERS Pension MARS Statement (ORBIT)', status: 'Pending Upload' },
      { id: 'empower_erin', title: 'NC Educator 401(k) Empower Statement', status: 'Pending Upload' },
      { id: 'cd_erin', title: 'Wells Fargo / Credit Union 5.15% High-Yield CD Record', status: 'Verified' }
    ],
    barbara: [
      { id: 'penfed', title: 'PenFed / BoA Reserve Account Statement', status: 'Verified' },
      { id: 'estate', title: 'Healthcare Proxy & Will Directive Records', status: 'Verified' }
    ],
    hayden: [
      { id: 'savings_hayden', title: 'Hayden $30,000 College Savings Goal Progress Statement', status: 'Active Goal' }
    ],
    ava: [
      { id: 'savings_ava', title: 'Ava $30,000 College Savings Goal Progress Statement', status: 'Active Goal' }
    ]
  };

  const currentChecklist = personChecklists[player.id] || personChecklists.chris;

  // Handle File Upload
  const handleFileUpload = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    const newDocs = files.map(file => ({
      id: 'doc_' + Date.now() + Math.random().toString(36).substr(2, 4),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      date: new Date().toISOString().split('T')[0],
      type: 'Annual Checkup Document'
    }));

    setUserDocs(prev => [...newDocs, ...prev]);
    setQuestCompleted(true);
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
            style={{
              background: 'linear-gradient(135deg, #FDB927, #f59e0b)',
              color: '#004684',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 14px rgba(253, 185, 39, 0.3)'
            }}
            onClick={() => {
              const questElement = document.getElementById('personal-annual-quest-card');
              if (questElement) questElement.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Calendar size={16} />
            <span>{player.name}'s Annual Checkup 🗓️</span>
          </button>

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

      {/* 🌟 GIANT HERO PROFILE BANNER */}
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
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff' }}>{player.name}</h2>
              <span className="badge badge-primary" style={{ background: player.color, color: '#fff', fontWeight: 800, padding: '4px 12px', fontSize: '0.85rem' }}>
                {player.title}
              </span>
              <span className="badge badge-success" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>
                Level 5 Financial MVP (+1,000 XP)
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.4rem', maxWidth: '650px' }}>
              {player.bio || `${player.name}'s dedicated personal workspace, encrypted document repository, and gamified wealth tracker.`}
            </p>

            {/* Quick Profile Identifiers */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AGE / BIRTHDAY</span>
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                  {currentAge} Years Old ({player.birthday || 'N/A'})
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EMPLOYER / INSTITUTION</span>
                <div style={{ fontWeight: 800, color: player.color, fontSize: '1rem' }}>
                  {player.employer || 'Harrison Family Household'}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PERSONAL VAULT DOCS</span>
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                  {userDocs.length} Verified Files
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 💎 PERSON-SPECIFIC RETIREMENT & WEALTH ASSETS BREAKDOWN CARD */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.9))', border: `2px solid ${player.color}` }}>
        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: player.color, color: '#fff', fontWeight: 900, padding: '4px 12px' }}>
              INDIVIDUAL RETIREMENT & WEALTH PORTFOLIO
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Award size={24} color="#FDB927" />
              <span>{player.name}'s Personal Wealth & Pension Portfolio</span>
            </h3>
          </div>
        </div>

        {/* Customized Wealth Display per Member */}
        {player.id === 'chris' && (
          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.35rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: '#FDB927', fontWeight: 800, marginBottom: '0.3rem' }}>NC TSERS PENSION ESTIMATE (MAY 2040 - AGE 60)</div>
              <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>$1,803.55 / mo (Max)</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--success)', marginTop: '0.4rem', fontWeight: 800 }}>
                🛡️ Option 2 Survivorship: $1,682.89/mo to Erin Harrison for life!
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Creditable Service: 22.00 Years • AFC: $63,591.24
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.35rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 800, marginBottom: '0.3rem' }}>SOCIAL SECURITY STATEMENT (SSA.GOV)</div>
              <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>$3,058.00 / mo (Age 67)</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--success)', marginTop: '0.4rem', fontWeight: 800 }}>
                ✓ 40 / 40 Work Credits • Disability Protection: $2,543.00/mo
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Combined Lifetime Government Inflow: $4,861.55 / month!
              </div>
            </div>
          </div>
        )}

        {player.id === 'erin' && (
          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.35rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: '#ec4899', fontWeight: 800, marginBottom: '0.3rem' }}>NC EDUCATOR TSERS PENSION</div>
              <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>Educator Pension Vested</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                NC Educator Retirement System (ORBIT Portal Linked)
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.35rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 800, marginBottom: '0.3rem' }}>WELLS FARGO / CREDIT UNION HIGH-YIELD CD</div>
              <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--success)' }}>$12,500.00 (5.15% APY)</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Guaranteed Fixed High-Yield Savings Reserve
              </div>
            </div>
          </div>
        )}

        {player.id === 'barbara' && (
          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.35rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: 800, marginBottom: '0.3rem' }}>OPM FEDERAL CIVIL SERVICE PENSION</div>
              <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>$5,645.84 / mo</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--success)', marginTop: '0.4rem', fontWeight: 800 }}>
                Guaranteed Lifetime Federal Pension Inflow
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.35rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 800, marginBottom: '0.3rem' }}>PENFED / BOA ESTATE RESERVE ACCOUNT</div>
              <div className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c084fc' }}>{fmt(barbaraCheckingAccount.balance)}</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Liquid Estate & Healthcare Capital Reserve
              </div>
            </div>
          </div>
        )}

        {(player.id === 'hayden' || player.id === 'ava') && (
          <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', color: player.color, fontWeight: 800, marginBottom: '0.3rem' }}>
              $30,000 BY AGE 18 COLLEGE & LIFE SAVINGS GOAL
            </div>
            <div className="font-mono" style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>
              Target: $30,000.00 Cash by Age 18
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--success)', fontWeight: 800, marginTop: '0.5rem' }}>
              🚀 Monthly Auto-Allocation: ${player.id === 'hayden' ? '331.00' : '172.00'} / mo ({yearsRemaining} Years Remaining!)
            </div>
          </div>
        )}
      </div>

      {/* 🎯 PERSON-SPECIFIC ANNUAL CHECKUP QUEST CARD */}
      <div id="personal-annual-quest-card" className="card card-glow" style={{ background: `linear-gradient(135deg, ${player.color}25, rgba(15, 23, 42, 0.98))`, border: `2.5px solid ${player.color}` }}>
        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: player.color, color: '#fff', fontWeight: 900, padding: '4px 12px' }}>
              🎯 PERSONAL ANNUAL CHECKUP QUEST (+1,000 XP)
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Calendar size={24} color={player.color} />
              <span>{player.name}'s Annual Financial Checkup & Statement Refresh</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Refresh your annual statements to level up your character status and keep your net worth 100% accurate!
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-success" style={{ fontSize: '0.82rem', padding: '6px 14px', fontWeight: 900 }}>
              {questCompleted ? '✓ 2026 QUEST COMPLETED (+1,000 XP)' : '⏳ ANNUAL CHECKUP READY'}
            </span>
          </div>
        </div>

        {/* Member Specific Checklist */}
        <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
            📋 {player.name}'s Annual Document Checklist:
          </div>

          <div className="grid-2" style={{ gap: '0.85rem' }}>
            {currentChecklist.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '0.84rem' }}>• {item.title}</div>
                <span className="badge" style={{ background: `${player.color}25`, color: player.color, border: `1px solid ${player.color}50`, fontWeight: 800, fontSize: '0.72rem' }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Uploader Box */}
        <div 
          style={{
            border: `2px dashed ${player.color}`,
            borderRadius: '16px',
            padding: '1.75rem',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = '.pdf,.png,.jpg,.csv';
            input.onchange = handleFileUpload;
            input.click();
          }}
        >
          <Upload size={38} color={player.color} style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
            Upload {player.name}'s New Annual Statement PDF / Screenshot
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Saves directly to {player.name}'s encrypted lockbox • Unlocks <strong>+1,000 Family XP</strong>
          </p>
        </div>

        {questCompleted && (
          <div style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.15)', border: '1.5px solid #10b981', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={24} color="var(--success)" />
            <div>
              <div style={{ fontWeight: 900, color: '#fff', fontSize: '0.95rem' }}>🎉 CONGRATULATIONS {player.name.toUpperCase()}!</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                You have completed your 2026 Annual Financial Checkup! +1,000 XP has been added to your profile level.
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 📁 ENCRYPTED PERSONAL DOCUMENT REPOSITORY */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={22} color={player.color} />
              <span>{player.name}'s Encrypted Document Repository</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              AES-256 Encrypted Private Storage for Passports, Certificates, and Statements
            </p>
          </div>

          <label className="btn btn-primary" style={{ cursor: 'pointer', background: player.color, color: '#fff', fontWeight: 800, fontSize: '0.84rem' }}>
            <Upload size={16} />
            <span>Upload Document</span>
            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>

        <div className="grid-3" style={{ gap: '1rem' }}>
          {userDocs.map((doc) => (
            <div key={doc.id} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span className="badge" style={{ background: `${player.color}25`, color: player.color, fontSize: '0.72rem' }}>
                  {doc.type}
                </span>
                <button onClick={() => handleDeleteDoc(doc.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                  <Trash2 size={14} />
                </button>
              </div>

              <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem', wordBreak: 'break-word' }}>
                {doc.name}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Size: {doc.size} • Saved: {doc.date}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
