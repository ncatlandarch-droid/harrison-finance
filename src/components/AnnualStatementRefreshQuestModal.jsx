import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Calendar, Upload, FileText, CheckCircle2, Sparkles, Shield, RefreshCw } from 'lucide-react';

export const AnnualStatementRefreshQuestModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (files) => {
    const fileList = Array.from(files);
    setUploadedFiles(prev => [...prev, ...fileList]);
    setIsSuccess(true);
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
        maxWidth: '620px',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: '2.5px solid #FDB927',
        padding: '2rem',
        boxShadow: '0 25px 60px rgba(253, 185, 39, 0.25)'
      }}>
        
        {/* Modal Header */}
        <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #004684, #FDB927)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={24} color="#fff" />
            </div>
            <div>
              <span className="badge badge-primary" style={{ background: '#004684', color: '#FDB927', fontWeight: 800, padding: '3px 8px' }}>
                ANNUAL CHECKUP QUEST
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
                Annual Statement Refresh & Document Quest
              </h3>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>

        {/* Quest Info */}
        <div style={{ background: 'rgba(0, 70, 132, 0.25)', border: '1px solid rgba(0, 70, 132, 0.5)', padding: '1.25rem', borderRadius: '16px', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#FDB927" />
            <span>How Your Hybrid Wealth Sync Works:</span>
          </div>
          <ul style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.65', paddingLeft: '1.2rem', margin: 0 }}>
            <li><strong>Bank Accounts & CDs:</strong> Connected live via <strong>Plaid Link API</strong> (Auto-updates balance daily!).</li>
            <li><strong>State Pension (ORBIT) & Social Security (SSA):</strong> Refresh once a year on <strong>July 25th</strong> by uploading your new annual statement PDF or screenshot.</li>
          </ul>
        </div>

        {/* Drag and Drop Uploader */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileUpload(e.dataTransfer.files); }}
          style={{
            border: dragActive ? '2.5px dashed #FDB927' : '2px dashed var(--border-color)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            background: dragActive ? 'rgba(253, 185, 39, 0.1)' : 'rgba(0,0,0,0.3)',
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
          <Upload size={38} color="#FDB927" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
            Drag & Drop Your New Annual MARS or SSA Statement Here
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Supports PDF statements, screenshots, or CSV files • Earn <strong>+1,000 Family XP</strong>
          </p>
        </div>

        {/* Uploaded File Feedback */}
        {isSuccess && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={24} color="var(--success)" />
            <div>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem' }}>Statement Uploaded Successfully! (+1,000 XP Earned)</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {uploadedFiles.map(f => f.name).join(', ')}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onClose} style={{ background: 'linear-gradient(135deg, #004684, #FDB927)', color: '#fff', fontWeight: 800 }}>
            Complete Annual Checkup ✓
          </button>
        </div>

      </div>
    </div>
  );
};
