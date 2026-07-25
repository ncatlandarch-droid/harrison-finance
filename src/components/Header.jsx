import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { ISLAAssistantModal } from './ISLAAssistantModal';
import { FinancialStrategyReportModal } from './FinancialStrategyReportModal';
import { AnnualStatementRefreshQuestModal } from './AnnualStatementRefreshQuestModal';
import { Plus, Bot, FileText, Sparkles, RefreshCw, CheckCircle2, Calendar } from 'lucide-react';

export const Header = ({ onOpenAddModal }) => {
  const { totalCombinedSurplus, activeTab } = useFinance();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAnnualQuestOpen, setIsAnnualQuestOpen] = useState(false);

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
          
          {/* Annual Checkup Quest Button */}
          <button 
            className="btn btn-secondary"
            onClick={() => setIsAnnualQuestOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(253, 185, 39, 0.4)', color: '#FDB927', fontWeight: 700 }}
          >
            <Calendar size={16} />
            <span>Annual Checkup 🗓️</span>
          </button>

          {/* Real Talk Strategy Report PDF Modal Button */}
          <button 
            className="btn btn-secondary"
            onClick={() => setIsReportOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(99, 102, 241, 0.4)', color: 'var(--primary-light)', fontWeight: 700 }}
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
              color: '#fff',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(0, 70, 132, 0.4)'
            }}
          >
            <Bot size={18} color="#FDB927" />
            <span>Ask ISLA AI 🐶</span>
          </button>

          {/* Connect Bank Account Plaid Button */}
          <button 
            className="btn"
            onClick={onOpenAddModal}
            style={{
              background: 'linear-gradient(135deg, #FDB927, #f59e0b)',
              color: '#004684',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 14px rgba(253, 185, 39, 0.3)'
            }}
          >
            <Plus size={16} />
            <span>Connect Bank Account</span>
          </button>

        </div>
      </header>

      {/* Modals */}
      <ISLAAssistantModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
      <FinancialStrategyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      <AnnualStatementRefreshQuestModal isOpen={isAnnualQuestOpen} onClose={() => setIsAnnualQuestOpen(false)} />
    </>
  );
};
