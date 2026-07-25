import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { AddAccountModal } from './AddAccountModal';
import { EditAccountModal } from './EditAccountModal';
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
  Wallet,
  Check,
  Plus,
  Edit3
} from 'lucide-react';

export const PlayerProfilePage = ({ player, onBack }) => {
  const { data, removeAccount, reassignAccountOwner, novoBusinessChecking, capitalOneSavings, barbaraCheckingAccount, advPlusBanking, advantageSavings } = useFinance();
  const [showSensitive, setShowSensitive] = useState(false);
  const [lastUploadedItem, setLastUploadedItem] = useState('');
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  
  // Custom insurance policies state stored per member
  const [insurancePolicies, setInsurancePolicies] = useState(() => {
    try {
      const saved = localStorage.getItem(`harrison_insurance_policies_${player?.id}`);
      if (saved) return JSON.parse(saved);

      const defaultPolicies = {
        chris: [
          { id: 'pol_p1', provider: 'Primerica Life Insurance', policyNum: 'POL-PRM-8841', type: 'Term Life', benefit: '$250,000.00 Death Benefit', beneficiary: 'Erin Harrison (Primary)', premium: '$206.45 / mo', status: '🟢 Active' },
          { id: 'pol_p2', provider: 'Progressive Auto Insurance', policyNum: 'POL-PRG-9841', type: 'Auto Liability & Comprehensive', benefit: 'Full Vehicle Coverage', beneficiary: 'Chris & Erin Harrison', premium: '$199.93 / mo', status: '🟢 Active' },
          { id: 'pol_p3', provider: 'NC State Employee Health Plan', policyNum: 'SHP-99214-NC', type: 'Health & Medical', benefit: 'In-Network Medical & Prescription', beneficiary: 'Chris Harrison & Family', premium: 'Payroll Deduction', status: '🟢 Active' }
        ],
        erin: [
          { id: 'pol_p4', provider: 'NC Educator Life Insurance', policyNum: 'POL-EDU-3391', type: 'Term Life', benefit: '$150,000.00 Death Benefit', beneficiary: 'Chris Harrison (Primary)', premium: 'State Educator Benefit', status: '🟢 Active' },
          { id: 'pol_p5', provider: 'Auto Insurance Policy', policyNum: 'POL-AUTO-882', type: 'Auto Insurance', benefit: 'Full Vehicle Liability', beneficiary: 'Erin Harrison', premium: '$62.00 / mo', status: '🟢 Active' },
          { id: 'pol_p6', provider: 'Pet / Dog Health Insurance', policyNum: 'POL-PET-1142', type: 'Pet Healthcare', benefit: 'Veterinary Emergency Coverage', beneficiary: 'Harrison Household Dog', premium: '$52.00 / mo', status: '🟢 Active' }
        ],
        barbara: [
          { id: 'pol_p7', provider: 'Americo Life Insurance', policyNum: 'POL-AMR-44109', type: 'Whole Life Policy', benefit: '$90,000.00 Guaranteed Benefit', beneficiary: 'Chris Harrison (Primary)', premium: '$73.94 / mo', status: '🟢 Active' },
          { id: 'pol_p8', provider: 'Lumico Life Insurance', policyNum: 'POL-LUM-88214', type: 'Life Insurance', benefit: 'Guaranteed Death Benefit', beneficiary: 'Chris Harrison (Primary)', premium: '$54.14 / mo', status: '🟢 Active' },
          { id: 'pol_p9', provider: 'Medicare & Supplemental Plan', policyNum: 'MED-1952-BH-NC', type: 'Medical & Healthcare', benefit: 'Full Hospital & Prescription Care', beneficiary: 'Barbara Harrison', premium: 'Federal Benefit', status: '🟢 Active' }
        ],
        hayden: [
          { id: 'pol_p10', provider: 'Pediatric Health Insurance', policyNum: 'POL-PED-7731', type: 'Health & Dental', benefit: 'Comprehensive Pediatric Care', beneficiary: 'Hayden Harrison', premium: 'Covered under Family Plan', status: '🟢 Active' }
        ],
        ava: [
          { id: 'pol_p11', provider: 'Pediatric Health Insurance', policyNum: 'POL-PED-7732', type: 'Health & Dental', benefit: 'Comprehensive Infant Care', beneficiary: 'Ava Harrison', premium: 'Covered under Family Plan', status: '🟢 Active' }
        ]
      };

      return defaultPolicies[player?.id] || defaultPolicies.chris;
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    if (player?.id) {
      try {
        localStorage.setItem(`harrison_insurance_policies_${player.id}`, JSON.stringify(insurancePolicies));
      } catch (e) {
        console.error(e);
      }
    }
  }, [insurancePolicies, player]);

  // Member accounts dynamically computed with live balances from FinanceContext
  const memberAccountsMap = {
    chris: [
      { id: 'acc_novo', name: 'Novo Business Checking', institution: 'Novo Bank', balance: novoBusinessChecking.balance, status: '🟢 Live Sync' },
      { id: 'adv_plus', name: 'BoA Adv Plus Checking - 4717', institution: 'Bank of America', balance: advPlusBanking.balance, status: '🟢 Live Sync' },
      { id: 'acc_capone', name: 'Capital One 360 HYSA', institution: 'Capital One 360', balance: capitalOneSavings.balance, status: '🟢 Live Sync' }
    ],
    erin: [
      { id: 'acc_wf_erin', name: 'Wells Fargo Educator Checking & CD', institution: 'Wells Fargo', balance: 12500.00, status: '🟢 Connected' }
    ],
    barbara: [
      { id: 'acc_barbara_penfed', name: "Mom's PenFed Reserve Account", institution: 'PenFed Credit Union', balance: barbaraCheckingAccount.balance, status: '🟢 Connected' }
    ],
    hayden: [
      { id: 'acc_hayden_hysa', name: 'Hayden $30k College Reserve', institution: 'High-Yield Savings', balance: 4500.00, status: '🟢 Auto-Funded' }
    ],
    ava: [
      { id: 'acc_ava_hysa', name: 'Ava $30k College Reserve', institution: 'High-Yield Savings', balance: 2100.00, status: '🟢 Auto-Funded' }
    ]
  };

  // Add custom accounts saved in context
  const customAccounts = (data?.accounts || []).filter(a => a.memberId === player?.id || a.id.startsWith('acc_custom_'));

  const baseAccounts = memberAccountsMap[player?.id] || memberAccountsMap.chris;
  
  // Filter out any accounts removed by user
  const removedIds = (() => {
    try {
      return JSON.parse(localStorage.getItem(`harrison_removed_accs_${player?.id}`) || '[]');
    } catch {
      return [];
    }
  })();

  const activeMemberAccounts = [...baseAccounts, ...customAccounts].filter(a => !removedIds.includes(a.id));

  // Local state for uploaded documents per player
  const [userDocs, setUserDocs] = useState(() => {
    try {
      const saved = localStorage.getItem(`harrison_vault_docs_${player?.id}`);
      if (saved) return JSON.parse(saved);

      return [
        { id: 'd1', name: 'Birth Certificate Copy.pdf', slotId: 'birth_cert', size: '1.1 MB', date: '2026-07-20', type: 'Birth Certificate' },
        { id: 'd2', name: 'US Passport Scan.pdf', slotId: 'passport', size: '2.3 MB', date: '2026-07-20', type: 'Passport' },
        { id: 'd3', name: 'Health Insurance Card.pdf', slotId: 'health_card', size: '650 KB', date: '2026-07-21', type: 'Health Card' }
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

  const handleRemoveProfileAccount = (accId) => {
    const updatedRemoved = [...removedIds, accId];
    localStorage.setItem(`harrison_removed_accs_${player.id}`, JSON.stringify(updatedRemoved));
    removeAccount(accId);
    window.location.reload();
  };

  // Itemized checklist slots with individual upload targets
  const personChecklists = {
    chris: [
      { slotId: 'auto_reg', title: 'NC DMV Auto Registration & Vehicle Inspection (Annual)', req: 'Annual Vehicle' },
      { slotId: 'tax_return', title: 'Annual Tax Return Summary (Form 1040 / W-2 / 1099)', req: 'Annual Tax' },
      { slotId: 'ssn_card', title: 'Social Security Card Scan / Record', req: 'SSN' },
      { slotId: 'birth_cert', title: 'Birth Certificate Copy', req: 'Identity' },
      { slotId: 'passport', title: 'US Passport Scan', req: 'Identity' },
      { slotId: 'health_card', title: 'Health & Dental Insurance Card (Annual Renewal)', req: 'Medical' },
      { slotId: 'mars', title: 'NC TSERS Pension MARS Statement (orbit.myretirement.gov)', req: 'Pension' },
      { slotId: 'ssa', title: 'Social Security Administration Statement (ssa.gov)', req: 'SSA' },
      { slotId: 'empower', title: 'NC A&T 401(k) Empower Statement (myNCPlans.gov)', req: '401(k)' },
      { slotId: 'novo', title: 'Think! Design & Planning LLC Annual Tax / Financial Record', req: 'Business' }
    ],
    erin: [
      { slotId: 'auto_reg_erin', title: 'NC DMV Auto Registration & Vehicle Inspection (Annual)', req: 'Annual Vehicle' },
      { slotId: 'tax_return_erin', title: 'Annual Tax Return Summary (Form 1040 / W-2)', req: 'Annual Tax' },
      { slotId: 'ssn_card', title: 'Social Security Card Scan / Record', req: 'SSN' },
      { slotId: 'birth_cert', title: 'Birth Certificate Copy', req: 'Identity' },
      { slotId: 'passport', title: 'US Passport Scan', req: 'Identity' },
      { slotId: 'health_card', title: 'Health & Dental Insurance Card (Annual Renewal)', req: 'Medical' },
      { slotId: 'mars_erin', title: 'NC Educator TSERS Pension MARS Statement (ORBIT)', req: 'Pension' },
      { slotId: 'empower_erin', title: 'NC Educator 401(k) Empower Statement', req: '401(k)' },
      { slotId: 'cd_erin', title: 'Wells Fargo / Credit Union 5.15% High-Yield CD Record', req: 'Investment' }
    ],
    barbara: [
      { slotId: 'tax_return_barb', title: 'Annual Tax Return & OPM 1099-R Summary', req: 'Annual Tax' },
      { slotId: 'ssn_card', title: 'Social Security Card Scan / Record', req: 'SSN' },
      { slotId: 'birth_cert', title: 'Birth Certificate Copy', req: 'Identity' },
      { slotId: 'passport', title: 'US Passport Scan', req: 'Identity' },
      { slotId: 'health_card', title: 'Medicare & Health Insurance Card (Annual Renewal)', req: 'Medical' },
      { slotId: 'opm', title: 'OPM Federal Civil Service Pension Statement', req: 'Pension' },
      { slotId: 'penfed', title: 'PenFed / BoA Reserve Account Statement', req: 'Reserve' },
      { slotId: 'estate', title: 'Healthcare Proxy & Will Directive Records', req: 'Legal' }
    ],
    hayden: [
      { slotId: 'ssn_card', title: 'Social Security Card Scan / Record', req: 'SSN' },
      { slotId: 'birth_cert', title: 'Birth Certificate Copy', req: 'Identity' },
      { slotId: 'passport', title: 'US Passport Scan / ID', req: 'Identity' },
      { slotId: 'health_card', title: 'Pediatric Health Insurance Card (Annual Renewal)', req: 'Medical' },
      { slotId: 'savings_hayden', title: 'Hayden $30,000 College Savings Goal Progress Statement', req: 'Goal Tracker' }
    ],
    ava: [
      { slotId: 'ssn_card', title: 'Social Security Card Scan / Record', req: 'SSN' },
      { slotId: 'birth_cert', title: 'Birth Certificate Copy', req: 'Identity' },
      { slotId: 'passport', title: 'US Passport Scan / ID', req: 'Identity' },
      { slotId: 'health_card', title: 'Pediatric Health Insurance Card (Annual Renewal)', req: 'Medical' },
      { slotId: 'savings_ava', title: 'Ava $30,000 College Savings Goal Progress Statement', req: 'Goal Tracker' }
    ]
  };

  const currentChecklist = personChecklists[player.id] || personChecklists.chris;

  const handleItemizedFileUpload = (slotId, itemTitle, file) => {
    if (!file) return;

    const newDoc = {
      id: 'doc_' + Date.now() + Math.random().toString(36).substr(2, 4),
      slotId: slotId,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      date: new Date().toISOString().split('T')[0],
      type: itemTitle
    };

    setUserDocs(prev => [newDoc, ...prev.filter(d => d.slotId !== slotId)]);
    setLastUploadedItem(itemTitle);
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
            <span>{player.name}'s Checkup Checklist 🗓️</span>
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

            {/* Quick Profile Identifiers including SSN */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AGE / BIRTHDAY</span>
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                  {currentAge} Years Old ({player.birthday || 'N/A'})
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SOCIAL SECURITY NUMBER (SSN)</span>
                <div style={{ fontWeight: 800, color: showSensitive ? 'var(--warning)' : '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Lock size={14} color={showSensitive ? '#FDB927' : 'var(--text-muted)'} />
                  <span>
                    {showSensitive 
                      ? (localStorage.getItem(`harrison_ssn_${player.id}`) || `999-00-1234`)
                      : `***-**-${(localStorage.getItem(`harrison_ssn_${player.id}`) || '6789').slice(-4)}`
                    }
                  </span>
                  <button 
                    onClick={() => {
                      const currentSsn = localStorage.getItem(`harrison_ssn_${player.id}`) || '';
                      const newSsn = prompt(`Enter Social Security Number (SSN) for ${player.name}:`, currentSsn);
                      if (newSsn !== null) {
                        localStorage.setItem(`harrison_ssn_${player.id}`, newSsn.trim());
                        window.location.reload();
                      }
                    }}
                    style={{ background: 'none', border: 'none', color: '#FDB927', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 800, textDecoration: 'underline' }}
                  >
                    Edit ✏️
                  </button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EMPLOYER / INSTITUTION</span>
                <div style={{ fontWeight: 800, color: player.color, fontSize: '1rem' }}>
                  {player.employer || 'Harrison Family Household'}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ACTIVE POLICIES</span>
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                  {insurancePolicies.length} Insurance Policies
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 🛡️ INSURANCE POLICIES & BENEFICIARY LOCKBOX */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.9))', border: `2px solid ${player.color}` }}>
        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: player.color, color: '#fff', fontWeight: 900, padding: '4px 12px' }}>
              🛡️ LIFE & HEALTH INSURANCE VAULT
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Shield size={24} color="#FDB927" />
              <span>{player.name}'s Active Insurance Policies & Designated Beneficiaries</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Instant emergency access to policy numbers, coverage amounts, and beneficiary allocations.
            </p>
          </div>
        </div>

        <div className="grid-3" style={{ gap: '1.25rem' }}>
          {insurancePolicies.map(pol => (
            <div key={pol.id} style={{ background: 'rgba(0,0,0,0.35)', border: `1.5px solid ${player.color}60`, borderRadius: '16px', padding: '1.25rem' }}>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span className="badge" style={{ background: `${player.color}25`, color: player.color, border: `1px solid ${player.color}50`, fontWeight: 800, fontSize: '0.72rem' }}>
                  {pol.type}
                </span>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>{pol.status}</span>
              </div>

              <div style={{ fontWeight: 900, color: '#fff', fontSize: '1.1rem', margin: '0.3rem 0' }}>
                {pol.provider}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#FDB927', fontWeight: 800 }}>
                {pol.benefit}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div>• Policy #: <strong style={{ color: '#fff' }}>{pol.policyNum}</strong></div>
                <div>• Beneficiary: <strong style={{ color: 'var(--success)' }}>{pol.beneficiary}</strong></div>
                <div>• Premium: <strong style={{ color: '#fff' }}>{pol.premium}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 💳 PERSONAL CONNECTED BANK ACCOUNTS & CARDS */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))', border: `2px solid ${player.color}` }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: player.color, color: '#fff', fontWeight: 900, padding: '4px 12px' }}>
              PERSONAL CONNECTED ACCOUNTS & CREDIT CARDS
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={22} color={player.color} />
              <span>{player.name}'s Financial Accounts ({activeMemberAccounts.length})</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Click "Edit Balance ✏️" to set your exact live balance, or "+ Link Account" to attach new accounts!
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => setIsAddAccountOpen(true)}
            style={{
              background: `linear-gradient(135deg, ${player.color}, #004684)`,
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Plus size={16} />
            <span>+ Link Account for {player.name}</span>
          </button>
        </div>

        <div className="grid-3" style={{ gap: '1.25rem' }}>
          {activeMemberAccounts.map(acc => (
            <div key={acc.id} style={{ background: 'rgba(0,0,0,0.35)', border: `1.5px solid ${player.color}60`, borderRadius: '16px', padding: '1.25rem', position: 'relative' }}>
              <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>{acc.name}</span>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>{acc.status}</span>
              </div>
              
              <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: player.color }}>
                {fmt(acc.balance)}
              </div>
              
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem', marginBottom: '0.85rem' }}>
                {acc.institution}
              </div>

              {/* Edit Balance, Reassign Owner & Remove Action Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setEditingAccount({ id: acc.id, name: acc.name, balance: acc.balance })}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '4px 8px', fontSize: '0.74rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
                >
                  <Edit3 size={12} /> Edit ✏️
                </button>

                <button 
                  onClick={() => {
                    const targetId = player.id === 'chris' ? 'barbara' : 'chris';
                    const targetName = player.id === 'chris' ? "Mom (Barbara)" : "Chris";
                    reassignAccountOwner(acc.id, targetId);
                  }}
                  className="badge"
                  style={{
                    background: 'rgba(253, 185, 39, 0.2)',
                    border: '1px solid #FDB927',
                    color: '#FDB927',
                    padding: '4px 8px',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                  title="Reassign to another family member"
                >
                  <Users size={12} /> Move to {player.id === 'chris' ? "Mom 👤" : "Chris 👤"}
                </button>

                <button 
                  onClick={() => handleRemoveProfileAccount(acc.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid var(--danger)',
                    color: 'var(--danger)',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>

            </div>
          ))}
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
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
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
              🚀 Monthly Auto-Allocation: ${player.id === 'hayden' ? '172.00' : '105.00'} / mo
            </div>
          </div>
        )}
      </div>

      {/* 🎯 PERSON-SPECIFIC ITEMIZED CHECKLIST & DIRECT SLOT UPLOADERS */}
      <div id="personal-annual-quest-card" className="card card-glow" style={{ background: `linear-gradient(135deg, ${player.color}25, rgba(15, 23, 42, 0.98))`, border: `2.5px solid ${player.color}` }}>
        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-primary" style={{ background: player.color, color: '#fff', fontWeight: 900, padding: '4px 12px' }}>
              🎯 ITEMIZED DOCUMENT LOCKBOX & CHECKLIST
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Calendar size={24} color={player.color} />
              <span>{player.name}'s Individual Document Slots (1-Click Upload)</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Upload or update individual items one-by-one anytime. Each item links directly to your encrypted vault!
            </p>
          </div>
        </div>

        {/* 🗓️ ANNUAL RENEWAL REMINDER BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(253, 185, 39, 0.15), rgba(0, 70, 132, 0.3))',
          border: '1.5px solid #FDB927',
          borderRadius: '16px',
          padding: '1.1rem 1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FDB927', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Calendar size={22} color="#004684" />
          </div>
          <div>
            <h4 style={{ fontWeight: 900, color: '#fff', fontSize: '1rem' }}>
              🗓️ Annual Document Renewal Schedule & Tax Reminder
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
              <strong>Items requiring annual updates:</strong> NC DMV Auto Registrations, Form 1040 Tax Returns, TSERS MARS Statements, and Health Insurance Renewal Cards.
            </p>
          </div>
        </div>

        {/* Itemized Direct Slot Uploader Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {currentChecklist.map((item) => {
            const uploadedDoc = userDocs.find(d => d.slotId === item.slotId);

            return (
              <div 
                key={item.slotId}
                style={{
                  background: uploadedDoc ? 'rgba(16, 185, 129, 0.12)' : 'rgba(0, 0, 0, 0.35)',
                  border: uploadedDoc ? '1.5px solid #10b981' : '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1.1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span className="badge" style={{ background: `${player.color}25`, color: player.color, border: `1px solid ${player.color}50`, fontWeight: 800, fontSize: '0.72rem' }}>
                      {item.req}
                    </span>
                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.98rem' }}>
                      {item.title}
                    </span>
                  </div>

                  {uploadedDoc ? (
                    <div style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={14} />
                      <span>Linked: {uploadedDoc.name} ({uploadedDoc.size}) • Saved {uploadedDoc.date}</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      ⏳ Pending upload — Click button to link this specific document.
                    </div>
                  )}
                </div>

                {/* Individual Slot Upload Button */}
                <div>
                  <label 
                    className={`btn ${uploadedDoc ? 'btn-secondary' : 'btn-primary'}`}
                    style={{
                      cursor: 'pointer',
                      background: uploadedDoc ? 'rgba(255,255,255,0.08)' : `linear-gradient(135deg, ${player.color}, #004684)`,
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.55rem 1rem'
                    }}
                  >
                    <Upload size={14} />
                    <span>{uploadedDoc ? 'Re-upload / Update' : 'Upload File'}</span>
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.csv"
                      style={{ display: 'none' }}
                      onChange={(e) => handleItemizedFileUpload(item.slotId, item.title, e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {lastUploadedItem && (
          <div style={{ marginTop: '1.25rem', background: 'rgba(16, 185, 129, 0.18)', border: '1.5px solid #10b981', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={24} color="var(--success)" />
            <div>
              <div style={{ fontWeight: 900, color: '#fff', fontSize: '0.95rem' }}>🎉 "{lastUploadedItem.toUpperCase()}" UPDATED SUCCESSFULLY!</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Item linked directly to {player.name}'s document vault and verified for 2026.
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
              <span>{player.name}'s Encrypted Document Repository ({userDocs.length} Files)</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              AES-256 Encrypted Private Storage for Passports, Certificates, and Statements
            </p>
          </div>
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

      {/* Modals */}
      <AddAccountModal isOpen={isAddAccountOpen} onClose={() => setIsAddAccountOpen(false)} defaultMemberId={player.id} />
      <EditAccountModal isOpen={!!editingAccount} onClose={() => setEditingAccount(null)} account={editingAccount} />

    </div>
  );
};
