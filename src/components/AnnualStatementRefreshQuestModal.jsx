import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Calendar, Upload, FileText, CheckCircle2, Sparkles, Shield, User, Heart, Award, ShieldCheck } from 'lucide-react';

export const AnnualStatementRefreshQuestModal = ({ isOpen, onClose }) => {
  const { members } = useFinance();
  const [selectedMemberId, setSelectedMemberId] = useState('chris');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const currentMember = members.find(m => m.id === selectedMemberId) || members[0];

  // Specific document checklists per family member
  const memberChecklists = {
    chris: [
      { id: 'mars', title: 'NC TSERS Pension MARS Statement (orbit.myretirement.gov)', req: 'Required Annual' },
      { id: 'ssa', title: 'Social Security Administration Statement (ssa.gov)', req: 'Required Annual' },
      { id: 'empower', title: 'NC A&T 401(k) Empower Statement (myNCPlans.gov)', req: 'Optional' },
      { id: 'novo', title: 'Think! Design & Planning LLC Annual Taxes / Financials', req: 'Business' }
    ],
    erin: [
      { id: 'mars_erin', title: 'NC Educator TSERS Pension MARS Statement (ORBIT)', req: 'Required Annual' },
      { id: 'empower_erin', title: 'NC Educator 401(k) Empower Statement', req: 'Required Annual' },
      { id: 'cd_erin', title: 'Wells Fargo / Credit Union 5.15% High-Yield CD Statement', req: 'Investment' }
    ],
    barbara: [
      { id: 'penfed', title: 'PenFed / BoA Reserve Account Statement', req: 'Required Annual' },
      { id: 'estate', title: 'Estate / Healthcare Proxy Lockbox Documents', req: 'Legal & Care' }
    ],
    hayden: [
      { id: 'savings_hayden', title: 'Hayden $30,000 College Savings Goal Progress Statement', req: 'Goal Tracker' }
    ],
    ava: [
      { id: 'savings_ava', title: 'Ava $30,000 College Savings Goal Progress Statement', req: 'Goal Tracker' }
    ]
  };

  const currentChecklist = memberChecklists[selectedMemberId] || memberChecklists.chris;

  const handleFileUpload = (files) => {
    const fileList = Array.from(files);
    setUploadedFiles(prev => ({
      ...prev,
      [selectedMemberId]: [...(prev[selectedMemberId] || []), ...fileList]
    }));
    setSuccessMessage(`Successfully uploaded ${fileList.length} document(s) for ${currentMember.name}! (+1,000 XP)`);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(12px)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="card card-glow" style={{
        width: '100%',
        maxWidth: '680px',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: `2.5px solid ${currentMember.color || '#FDB927'}`,
        padding: '2rem',
        boxShadow: `0 25px 60px ${currentMember.color || '#FDB927'}30`
      }}>
        
        {/* Modal Header */}
        <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${currentMember.color || '#004684'}, #1e1b4b)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={24} color="#fff" />
            </div>
            <div>
              <span className="badge badge-primary" style={{ background: currentMember.color || '#004684', color: '#fff', fontWeight: 800, padding: '3px 8px' }}>
                PERSON-SPECIFIC ANNUAL CHECKUP
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
                Annual Document Quest for {currentMember.name}
              </h3>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* MEMBER SELECTOR TABS */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {members.map(m => (
            <button
              key={m.id}
              onClick={() => { setSelectedMemberId(m.id); setSuccessMessage(''); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: '20px',
                border: selectedMemberId === m.id ? `2px solid ${m.color}` : '1px solid var(--border-color)',
                background: selectedMemberId === m.id ? `${m.color}25` : 'rgba(255,255,255,0.04)',
                color: selectedMemberId === m.id ? '#fff' : 'var(--text-muted)',
                fontWeight: 800,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', overflow: 'hidden' }}>
                <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span>{m.name}</span>
            </button>
          ))}
        </div>

        {/* Member Personalized Checklist */}
        <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '16px', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={18} color={currentMember.color} />
            <span>Personalized Document Checklist for {currentMember.name}:</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {currentChecklist.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.84rem' }}>
                <div style={{ color: '#cbd5e1', fontWeight: 600 }}>• {item.title}</div>
                <span className="badge" style={{ background: `${currentMember.color}25`, color: currentMember.color, border: `1px solid ${currentMember.color}50`, fontSize: '0.72rem' }}>
                  {item.req}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Drag and Drop Uploader for Selected Member */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileUpload(e.dataTransfer.files); }}
          style={{
            border: dragActive ? `2.5px dashed ${currentMember.color}` : '2px dashed var(--border-color)',
            borderRadius: '16px',
            padding: '1.75rem',
            textAlign: 'center',
            background: dragActive ? `${currentMember.color}15` : 'rgba(0,0,0,0.3)',
            cursor: 'pointer',
            marginBottom: '1.25rem',
            transition: 'all 0.2s ease'
          }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = '.pdf,.png,.jpg,.csv';
            input.onchange = (e) => handleFileUpload(e.target.files);
            input.click();
          }}
        >
          <Upload size={36} color={currentMember.color} style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>
            Upload Annual Statement PDF / Image for {currentMember.name}
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Saves directly to {currentMember.name}'s encrypted personal vault • Earn <strong>+1,000 XP</strong>
          </p>
        </div>

        {/* Upload Feedback */}
        {successMessage && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '0.85rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={22} color="var(--success)" />
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.86rem' }}>{successMessage}</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onClose} style={{ background: `linear-gradient(135deg, ${currentMember.color || '#004684'}, #4f46e5)`, color: '#fff', fontWeight: 800 }}>
            Complete {currentMember.name}'s Annual Checkup ✓
          </button>
        </div>

      </div>
    </div>
  );
};
