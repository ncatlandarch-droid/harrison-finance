import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { PlaidLinkButton } from './PlaidLinkButton';
import { CoachHarrisonModal } from './CoachHarrisonModal';
import { FinancialStrategyReportModal } from './FinancialStrategyReportModal';
import { Plus, Bot, Sparkles, FileText } from 'lucide-react';

export const Header = ({ onOpenAddModal }) => {
  const { totalLiquidityBalance, totalCombinedSurplus, chrisCheckingAccount, barbaraCheckingAccount } = useFinance();
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <header style={{
        padding: '1.25rem 2rem',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Left Header Title */}
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>Primary Household Dashboard</h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.1rem' }}>
            <span>📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>Net Cash Surplus: +$5,078.14/mo</span>
          </div>
        </div>

        {/* Right Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Strategy Report PDF Button */}
          <button 
            className="btn btn-secondary"
            onClick={() => setIsReportOpen(true)}
            style={{
              background: 'rgba(253, 185, 39, 0.15)',
              border: '1px solid rgba(253, 185, 39, 0.4)',
              color: '#FDB927',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <FileText size={16} color="#FDB927" />
            <span>Strategy Report</span>
          </button>

          {/* Coach Perry AI Button */}
          <button 
            className="btn"
            onClick={() => setIsCoachOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #004684, #4f46e5)',
              color: '#fff',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(0, 70, 132, 0.4)'
            }}
          >
            <Bot size={18} color="#FDB927" />
            <span>Coach Perry AI</span>
            <Sparkles size={14} color="var(--warning)" />
          </button>

          {/* Connect Bank Button */}
          <PlaidLinkButton />

          {/* Add Manual Transaction Button */}
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

      {/* AI Assistant Modal & Strategy Report Modal */}
      <CoachHarrisonModal isOpen={isCoachOpen} onClose={() => setIsCoachOpen(false)} />
      <FinancialStrategyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </>
  );
};
