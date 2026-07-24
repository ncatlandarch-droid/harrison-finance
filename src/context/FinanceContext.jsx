import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_finance_v2.6');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.version === INITIAL_DATA.version) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load local storage data:', e);
    }
    return INITIAL_DATA;
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    try {
      localStorage.setItem('harrison_finance_v2.6', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [data]);

  const members = data.family.members.filter(m => m.role !== 'Child');
  const totalIncome = members.reduce((sum, m) => sum + (m.income || 0), 0);

  // Barbara's Exact Expenses ($4,837.24)
  const barbaraTotalExpenses = data.barbaraExpenses.reduce((sum, b) => sum + b.amount, 0);

  // Joint & Personal Bills
  const jointBillsTotal = data.bills.filter(b => b.paidBy === 'joint').reduce((sum, b) => sum + b.amount, 0);
  const personalBillsTotal = data.bills.filter(b => b.paidBy !== 'joint').reduce((sum, b) => sum + b.amount, 0);
  
  // Total Fixed Commitments Across All Members
  const totalFixedBills = jointBillsTotal + personalBillsTotal + barbaraTotalExpenses;

  // Variable Monthly Budgets (Groceries, Dining, Utilities, Shopping)
  const totalVariableBudgets = data.budgets.reduce((sum, b) => sum + b.limit, 0);

  // REAL NET EXTRA SURPLUS (After all fixed bills + Barbara's commitments + variable budgets)
  const realNetSurplus = totalIncome - totalFixedBills - totalVariableBudgets + (3000); // adjust for Chris transfer double counting if applicable

  // Individual Member Summaries
  const barbaraNetRemaining = (data.family.members.find(m => m.id === 'barbara')?.income || 5645.84) - barbaraTotalExpenses;
  const chrisNetRemaining = (data.family.members.find(m => m.id === 'chris')?.income || 4546.27) + 3000.00 - 159.00 - (jointBillsTotal * 0.5);
  const erinNetRemaining = (data.family.members.find(m => m.id === 'erin')?.income || 2500.00) - 281.00 - (jointBillsTotal * 0.2);

  const addTransaction = (newTxn) => {
    setData(prev => ({
      ...prev,
      transactions: [
        { id: 't_' + Date.now(), ...newTxn },
        ...prev.transactions
      ]
    }));
  };

  const updateBillStatus = (billId, newStatus) => {
    setData(prev => ({
      ...prev,
      bills: prev.bills.map(b => b.id === billId ? { ...b, status: newStatus } : b)
    }));
  };

  return (
    <FinanceContext.Provider value={{
      data,
      setData,
      activeTab,
      setActiveTab,
      members,
      totalIncome,
      barbaraTotalExpenses,
      jointBillsTotal,
      totalFixedBills,
      totalVariableBudgets,
      realNetSurplus,
      barbaraNetRemaining,
      chrisNetRemaining,
      erinNetRemaining,
      addTransaction,
      updateBillStatus
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
