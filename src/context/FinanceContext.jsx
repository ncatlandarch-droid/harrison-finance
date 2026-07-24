import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_finance_v2.8');
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
      localStorage.setItem('harrison_finance_v2.8', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [data]);

  const members = data.family.members.filter(m => m.role !== 'Child');
  const totalBaseIncome = members.reduce((sum, m) => sum + (m.income || 0), 0); // $12,692.11

  // Itemized Expense Totals
  const barbaraTotalExpenses = data.barbaraExpenses.reduce((sum, b) => sum + b.amount, 0); // $4,837.24
  const erinTotalExpenses = data.erinExpenses.reduce((sum, e) => sum + e.amount, 0);       // $1,569.00
  const chrisTotalExpenses = data.chrisExpenses.reduce((sum, c) => sum + c.amount, 0);     // $4,311.62

  // Individual Earner Net Surpluses
  const barbaraNetRemaining = 5645.84 - barbaraTotalExpenses; // $808.60
  const erinNetRemaining = 2500.00 - erinTotalExpenses;       // $931.00
  const chrisNetRemaining = (4546.27 + 3000.00) - chrisTotalExpenses; // $3,234.65

  // Combined Household Surplus
  const totalCombinedExpenses = barbaraTotalExpenses + erinTotalExpenses + chrisTotalExpenses; // $10,717.86
  const totalCombinedSurplus = (totalBaseIncome + 3000.00) - totalCombinedExpenses; // $4,974.25 (or $1,974.25 net outside internal transfer)

  const addTransaction = (newTxn) => {
    setData(prev => ({
      ...prev,
      transactions: [
        { id: 't_' + Date.now(), ...newTxn },
        ...prev.transactions
      ]
    }));
  };

  return (
    <FinanceContext.Provider value={{
      data,
      setData,
      activeTab,
      setActiveTab,
      members,
      totalBaseIncome,
      barbaraTotalExpenses,
      erinTotalExpenses,
      chrisTotalExpenses,
      barbaraNetRemaining,
      erinNetRemaining,
      chrisNetRemaining,
      totalCombinedExpenses,
      totalCombinedSurplus,
      addTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
