import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { PlusCircle, Calendar } from 'lucide-react';
import { PlaidLinkButton } from './PlaidLinkButton';

export const Header = ({ onOpenAddModal }) => {
  const { activeTab } = useFinance();

  const titleMap = {
    dashboard: 'Primary Household Dashboard',
    strategy: 'Debt & Spending Strategy',
    bills: 'Bills & Smart Bill Allocation',
    budget: 'Category Spending & Budgets',
    transactions: 'Bank & Cash Transactions',
    networth: 'Net Worth & Savings Accounts',
    settings: 'Harrison Finance Settings'
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 2rem',
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(11, 15, 25, 0.8)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }}>
      <div>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
          {titleMap[activeTab] || 'Harrison Finance'}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
          <Calendar size={14} />
          <span>{todayStr}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <PlaidLinkButton />

        <button 
          className="btn btn-secondary"
          onClick={onOpenAddModal}
        >
          <PlusCircle size={16} />
          <span>Add Transaction</span>
        </button>
      </div>
    </header>
  );
};
