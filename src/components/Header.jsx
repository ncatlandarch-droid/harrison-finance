import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { ISLAAssistantModal } from './ISLAAssistantModal';
import { FinancialStrategyReportModal } from './FinancialStrategyReportModal';
import { Plus, Bot, FileText, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export const Header = ({ onOpenAddModal }) => {
  const { totalCombinedSurplus, activeTab } = useFinance();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <header style={{
        height: '70px',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Left Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', textTransform: 'capitalize' }}>
            {activeTab.replace('_', ' ')}
          </h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Net Cash Surplus:</span>
            <span className="font-mono" style={{ fontWeight: 800, color: 'var(--success)' }}>
              +{fmt(totalCombinedSurplus)}/mo
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Real Talk Strategy Report PDF Modal Button */}
          <button 
            className="btn btn-secondary"
            onClick={() => setIsReportOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(253, 185, 39, 0.4)', color: '#FDB927', fontWeight: 700 }}
          >
            <FileText size={16} />
            <span>Strategy Report</span>
          </button>

          {/* ISLA Bulldog AI Assistant Button */}
          <button 
            className="btn btn-primary"
            onClick={() => setIsAiModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #004684, #4f46e5)',
              border: '1px solid rgba(253, 185, 39, 0.4)',
              color: '#fff',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(0, 70, 132, 0.4)'
            }}
          >
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #FDB927' }}>
              <img src="/avatars/isla-bulldog.jpg" alt="ISLA AI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span>ISLA Bulldog AI</span>
            <Sparkles size={14} color="#FDB927" />
          </button>

          {/* Plaid Connection Status Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--success)', fontSize: '0.78rem', fontWeight: 700 }}>
            <CheckCircle2 size={15} />
            <span>Bank Sync Active</span>
          </div>

          {/* Add Transaction Button */}
          <button 
            className="btn btn-secondary"
            onClick={onOpenAddModal}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Plus size={16} />
            <span>Add Transaction</span>
          </button>
        </div>
      </header>

      {/* Modals */}
      <ISLAAssistantModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
      <FinancialStrategyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </>
  );
};
