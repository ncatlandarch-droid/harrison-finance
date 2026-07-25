import React, { useState } from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DebtStrategySection } from './components/DebtStrategySection';
import { RecurringTrackerSection } from './components/RecurringTrackerSection';
import { BillsSection } from './components/BillsSection';
import { BudgetSection } from './components/BudgetSection';
import { TransactionsSection } from './components/TransactionsSection';
import { NetWorthSection } from './components/NetWorthSection';
import { SettingsSection } from './components/SettingsSection';
import { AddTransactionModal } from './components/AddTransactionModal';

const AppContent = () => {
  const { activeTab } = useFinance();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'strategy':
        return <DebtStrategySection />;
      case 'recurring':
        return <RecurringTrackerSection />;
      case 'bills':
        return <BillsSection />;
      case 'budget':
        return <BudgetSection />;
      case 'transactions':
        return <TransactionsSection />;
      case 'networth':
        return <NetWorthSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header onOpenAddModal={() => setIsAddModalOpen(true)} />
        <main className="page-content">
          {renderActiveSection()}
        </main>
      </div>
      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
