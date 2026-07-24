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
  const totalBaseIncome = members.reduce((sum, m) => sum + (m.income || 0), 0);

  // Itemized Expense Totals
  const barbaraTotalExpenses = data.barbaraExpenses.reduce((sum, b) => sum + b.amount, 0);
  const erinTotalExpenses = data.erinExpenses.reduce((sum, e) => sum + e.amount, 0);
  const chrisTotalExpenses = data.chrisExpenses.reduce((sum, c) => sum + c.amount, 0);

  // Member Surpluses
  const barbaraNetRemaining = 5645.84 - barbaraTotalExpenses;
  const erinNetRemaining = 2500.00 - erinTotalExpenses;
  const chrisNetRemaining = (4546.27 + 3000.00) - chrisTotalExpenses;

  // Combined Household Surplus
  const totalCombinedExpenses = barbaraTotalExpenses + erinTotalExpenses + chrisTotalExpenses;
  const totalCombinedSurplus = (totalBaseIncome + 3000.00) - totalCombinedExpenses;

  // Merge Real Plaid Bank Accounts & Auto-Scraped Transactions
  const mergePlaidData = (plaidAccounts = [], plaidTxns = []) => {
    setData(prev => {
      // 1. Update Accounts with Real Live Balances
      const updatedAccounts = [...prev.accounts];
      plaidAccounts.forEach(pa => {
        const existingIdx = updatedAccounts.findIndex(a => a.name.toLowerCase().includes(pa.name.toLowerCase()) || a.institution.toLowerCase().includes(pa.name.toLowerCase()));
        if (existingIdx >= 0) {
          updatedAccounts[existingIdx] = {
            ...updatedAccounts[existingIdx],
            balance: pa.balances.current || pa.balances.available || updatedAccounts[existingIdx].balance
          };
        } else {
          updatedAccounts.push({
            id: 'plaid_' + pa.account_id,
            name: pa.official_name || pa.name,
            type: pa.type === 'depository' ? 'Checking' : pa.type,
            memberId: 'chris',
            institution: pa.subtype || 'Connected Bank',
            balance: pa.balances.current || pa.balances.available || 0
          });
        }
      });

      // 2. Map and Auto-Categorize Real Plaid Transactions
      const mappedTxns = plaidTxns.map((pt, idx) => {
        const name = pt.merchant_name || pt.name || 'Transaction';
        const amount = -Math.abs(pt.amount);
        let category = 'Shopping & Entertainment';
        const upper = name.toUpperCase();

        if (upper.includes('DOORDASH') || upper.includes('CHICK') || upper.includes('CHIPOTLE') || upper.includes('PANERA') || upper.includes('MCDONALD') || upper.includes('STARBUCKS') || upper.includes('RESTAURANT') || upper.includes('COOKOUT') || upper.includes('OLIVE GARDEN')) {
          category = 'Restaurants & Dining';
        } else if (upper.includes('HARRIS TEETER') || upper.includes('COSTCO') || upper.includes('ALDI') || upper.includes('WALMART') || upper.includes('FOOD LION')) {
          category = 'Groceries';
        } else if (upper.includes('DUKE') || upper.includes('SPECTRUM') || upper.includes('WATER') || upper.includes('MORTGAGE') || upper.includes('POWER')) {
          category = 'Home & Utilities';
        } else if (upper.includes('GEICO') || upper.includes('PROGRESSIVE') || upper.includes('PRIMERICA') || upper.includes('INSURANCE')) {
          category = 'Insurance';
        }

        return {
          id: 'pt_' + (pt.transaction_id || idx),
          memberId: 'chris',
          date: pt.date || new Date().toISOString().split('T')[0],
          description: name,
          amount: amount,
          category: category,
          type: amount > 0 ? 'income' : 'debit'
        };
      });

      const combinedTxns = [...mappedTxns, ...prev.transactions];

      return {
        ...prev,
        accounts: updatedAccounts,
        transactions: combinedTxns
      };
    });
  };

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
      mergePlaidData,
      addTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
