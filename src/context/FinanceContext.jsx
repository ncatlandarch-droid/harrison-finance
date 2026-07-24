import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_finance_v2.9');
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
      localStorage.setItem('harrison_finance_v2.9', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [data]);

  const members = data.family.members.filter(m => m.role !== 'Child');
  
  // 1. External Base Household Income (New Money Coming In)
  const totalBaseIncome = 12692.11; // Barbara $5,645.84 + Chris $4,546.27 + Erin $2,500.00

  // 2. Individual Itemized Expenses
  const barbaraTotalExpenses = data.barbaraExpenses.reduce((sum, b) => sum + b.amount, 0); // $4,837.24 (includes $3,000 transfer to Chris)
  const erinTotalExpenses = data.erinExpenses.reduce((sum, e) => sum + e.amount, 0);       // $1,569.00
  const chrisTotalExpenses = data.chrisExpenses.reduce((sum, c) => sum + c.amount, 0);     // $4,311.62

  // 3. External Family Outflow (excluding internal $3k transfer between Barbara and Chris)
  const totalExternalExpenses = (barbaraTotalExpenses - 3000.00) + erinTotalExpenses + chrisTotalExpenses; // $7,717.86

  // 4. Earner Net Surpluses
  const barbaraNetRemaining = 5645.84 - barbaraTotalExpenses; // $808.60
  const erinNetRemaining = 2500.00 - erinTotalExpenses;       // $931.00
  const chrisNetRemaining = (4546.27 + 3000.00) - chrisTotalExpenses; // $3,234.65

  // 5. Total Combined Real Household Surplus
  const totalCombinedSurplus = totalBaseIncome - totalExternalExpenses; // $4,974.25

  // 6. Plaid Live Bank Scraped Spending & Balances
  const scrapedPlaidTxns = data.transactions.filter(t => t.id.startsWith('pt_') || t.source === 'Plaid');
  const totalScrapedBankSpending = scrapedPlaidTxns.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalLiquidityBalance = data.accounts.reduce((sum, a) => sum + (a.balance || 0), 0);

  const mergePlaidData = (plaidAccounts = [], plaidTxns = []) => {
    setData(prev => {
      const updatedAccounts = [...prev.accounts];
      plaidAccounts.forEach(pa => {
        const existingIdx = updatedAccounts.findIndex(a => a.name.toLowerCase().includes(pa.name.toLowerCase()) || a.institution.toLowerCase().includes(pa.name.toLowerCase()));
        const liveBal = pa.balances.current ?? pa.balances.available ?? 0;
        if (existingIdx >= 0) {
          updatedAccounts[existingIdx] = {
            ...updatedAccounts[existingIdx],
            balance: liveBal
          };
        } else {
          updatedAccounts.unshift({
            id: 'plaid_' + pa.account_id,
            name: pa.official_name || pa.name,
            type: pa.type === 'depository' ? 'Checking' : pa.type,
            memberId: 'chris',
            institution: pa.subtype || 'Connected Bank',
            balance: liveBal
          });
        }
      });

      const mappedTxns = plaidTxns.map((pt, idx) => {
        const name = pt.merchant_name || pt.name || 'Transaction';
        const amount = -Math.abs(pt.amount);
        let category = 'Shopping & Entertainment';
        const upper = name.toUpperCase();

        if (upper.includes('DOORDASH') || upper.includes('CHICK') || upper.includes('CHIPOTLE') || upper.includes('PANERA') || upper.includes('MCDONALD') || upper.includes('STARBUCKS') || upper.includes('COOKOUT')) {
          category = 'Restaurants & Dining';
        } else if (upper.includes('HARRIS TEETER') || upper.includes('COSTCO') || upper.includes('ALDI') || upper.includes('WALMART') || upper.includes('FOOD LION')) {
          category = 'Groceries';
        } else if (upper.includes('DUKE') || upper.includes('SPECTRUM') || upper.includes('WATER') || upper.includes('MORTGAGE')) {
          category = 'Home & Utilities';
        } else if (upper.includes('GEICO') || upper.includes('PROGRESSIVE') || upper.includes('PRIMERICA')) {
          category = 'Insurance';
        }

        return {
          id: 'pt_' + (pt.transaction_id || idx),
          memberId: 'chris',
          date: pt.date || new Date().toISOString().split('T')[0],
          description: name,
          amount: amount,
          category: category,
          type: amount > 0 ? 'income' : 'debit',
          source: 'Plaid'
        };
      });

      const combinedTxns = [...mappedTxns, ...prev.transactions.filter(t => !t.id.startsWith('pt_'))];

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
      totalExternalExpenses,
      totalScrapedBankSpending,
      barbaraNetRemaining,
      erinNetRemaining,
      chrisNetRemaining,
      totalCombinedSurplus,
      totalLiquidityBalance,
      mergePlaidData,
      addTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
