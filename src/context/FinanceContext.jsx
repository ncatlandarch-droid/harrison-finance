import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_finance_v3.1');
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
      localStorage.setItem('harrison_finance_v3.1', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [data]);

  const members = data.family.members.filter(m => m.role !== 'Child');
  
  // External Base Incomes
  const totalBaseIncome = 5645.84 + 6309.36 + 2500.00; // $14,455.20 / mo

  // Itemized Expenses
  const barbaraTotalExpenses = data.barbaraExpenses.reduce((sum, b) => sum + b.amount, 0); // $4,837.24
  const erinTotalExpenses = data.erinExpenses.reduce((sum, e) => sum + e.amount, 0);       // $1,569.00
  const chrisTotalExpenses = data.chrisExpenses.reduce((sum, c) => sum + c.amount, 0);     // $5,970.82

  const totalExternalExpenses = (barbaraTotalExpenses - 3000.00) + erinTotalExpenses + chrisTotalExpenses;

  // Surpluses
  const barbaraNetRemaining = 5645.84 - barbaraTotalExpenses; 
  const erinNetRemaining = 2500.00 - erinTotalExpenses;       
  const chrisNetRemaining = (6309.36 + 3000.00) - chrisTotalExpenses; 

  const totalCombinedSurplus = totalBaseIncome - totalExternalExpenses; 

  // Plaid Live Bank Scraped Spending & Active Checking Balances
  const scrapedPlaidTxns = data.transactions.filter(t => t.id.startsWith('pt_') || t.source === 'Plaid');
  const totalScrapedBankSpending = scrapedPlaidTxns.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalLiquidityBalance = data.accounts.reduce((sum, a) => sum + (a.balance || 0), 0);

  // Active Checking Accounts for Chris & Mom (Barbara)
  const chrisCheckingAccount = data.accounts.find(a => a.memberId === 'chris' && (a.type === 'Checking' || a.name.toLowerCase().includes('checking'))) || data.accounts[0];
  const barbaraCheckingAccount = data.accounts.find(a => a.memberId === 'barbara' || a.institution.toLowerCase().includes('penfed')) || data.accounts[3] || { name: "Barbara's Checking", balance: 76155.00, institution: "PenFed / BoA" };

  // Derived Combined Bills Array for BillsSection
  const combinedBills = [
    ...data.barbaraExpenses.map(b => ({ ...b, member: 'Barbara', status: 'due' })),
    ...data.erinExpenses.map(e => ({ ...e, member: 'Erin', status: 'due' })),
    ...data.chrisExpenses.map(c => ({ ...c, member: 'Chris', status: 'due' }))
  ];

  // Derived Budget Categories for BudgetSection
  const budgetCategories = [
    { id: 'b_mortgage', category: 'Home & Mortgage', limit: 2200.00, spent: 1200.00, icon: '🏠' },
    { id: 'b_groceries', category: 'Groceries & Dining', limit: 2500.00, spent: 1470.64, icon: '🛒' },
    { id: 'b_utilities', category: 'Utilities & Tech', limit: 800.00, spent: 344.33, icon: '⚡' },
    { id: 'b_insurance', category: 'Insurance & Health', limit: 900.00, spent: 780.30, icon: '🛡️' },
    { id: 'b_debt', category: 'Debt & Loans', limit: 2722.49, spent: 2722.49, icon: '💳' },
    { id: 'b_personal', category: 'Personal & Misc', limit: 1000.00, spent: 687.55, icon: '🎯' }
  ];

  const billAllocations = [
    { memberId: 'barbara', name: 'Barbara', color: '#a855f7', proportionalJointBillShare: barbaraTotalExpenses },
    { memberId: 'erin', name: 'Erin', color: '#ec4899', proportionalJointBillShare: erinTotalExpenses },
    { memberId: 'chris', name: 'Chris', color: '#6366f1', proportionalJointBillShare: chrisTotalExpenses }
  ];

  const updateBillStatus = (billId, status) => {
    console.log('Update bill status:', billId, status);
  };

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
      data: {
        ...data,
        bills: combinedBills,
        budgets: budgetCategories
      },
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
      chrisCheckingAccount,
      barbaraCheckingAccount,
      billAllocations,
      updateBillStatus,
      mergePlaidData,
      addTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
