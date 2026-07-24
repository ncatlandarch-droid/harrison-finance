import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_finance_v2.7');
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
      localStorage.setItem('harrison_finance_v2.7', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [data]);

  const members = data.family.members.filter(m => m.role !== 'Child');
  const totalIncome = members.reduce((sum, m) => sum + (m.income || 0), 0);

  // Barbara's Exact Expenses ($4,837.24)
  const barbaraTotalExpenses = data.barbaraExpenses.reduce((sum, b) => sum + b.amount, 0);

  // Erin's Exact Expenses ($1,569.00)
  const erinTotalExpenses = data.erinExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Joint & Personal Bills
  const jointBillsTotal = data.bills.filter(b => b.paidBy === 'joint').reduce((sum, b) => sum + b.amount, 0);
  const chrisPersonalBills = data.bills.filter(b => b.paidBy === 'chris').reduce((sum, b) => sum + b.amount, 0);

  // Member Surpluses
  const barbaraNetRemaining = 5645.84 - barbaraTotalExpenses; // $808.60
  const erinNetRemaining = 2500.00 - erinTotalExpenses; // $931.00
  const chrisNetRemaining = 4546.27 + 3000.00 - jointBillsTotal - chrisPersonalBills; // $4,524.47

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
      erinTotalExpenses,
      jointBillsTotal,
      barbaraNetRemaining,
      erinNetRemaining,
      chrisNetRemaining,
      addTransaction,
      updateBillStatus
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
