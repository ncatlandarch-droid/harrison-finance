import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_finance_v2');
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
  const [activeMemberFilter, setActiveMemberFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem('harrison_finance_v2', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [data]);

  // Helper Calculations for Dashboard Insights
  const members = data.family.members.filter(m => m.role !== 'Child');
  const totalIncome = members.reduce((sum, m) => sum + (m.income || 0), 0);

  const totalBills = data.bills.reduce((sum, b) => sum + b.amount, 0);
  const totalBudgeted = data.budgets.reduce((sum, b) => sum + b.limit, 0);

  // Core 4th Insight: Proportional Bill Allocation Engine
  // Each member pays a share proportional to their income share
  const billAllocations = members.map(m => {
    const incomeSharePct = totalIncome > 0 ? (m.income / totalIncome) : 0;
    const jointBillsTotal = data.bills.filter(b => b.paidBy === 'joint').reduce((sum, b) => sum + b.amount, 0);
    const proportionalJointBillShare = jointBillsTotal * incomeSharePct;
    
    // Direct personal bills assigned to this individual
    const personalBillsTotal = data.bills.filter(b => b.paidBy === m.id).reduce((sum, b) => sum + b.amount, 0);
    
    const totalCommitment = proportionalJointBillShare + personalBillsTotal;
    const extraMoney = m.income - totalCommitment;

    return {
      memberId: m.id,
      name: m.name,
      color: m.color,
      income: m.income,
      incomeSharePct: incomeSharePct * 100,
      proportionalJointBillShare,
      personalBillsTotal,
      totalCommitment,
      extraMoney
    };
  });

  const totalExtraMoney = totalIncome - totalBills;

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
      activeMemberFilter,
      setActiveMemberFilter,
      members,
      totalIncome,
      totalBills,
      totalBudgeted,
      totalExtraMoney,
      billAllocations,
      addTransaction,
      updateBillStatus
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
