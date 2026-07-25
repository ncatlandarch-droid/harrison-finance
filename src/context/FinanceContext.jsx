import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_finance_v4_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.boaAccounts && parsed.accounts) {
          return parsed;
        }
      }
      return INITIAL_DATA;
    } catch (e) {
      return INITIAL_DATA;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  // Household Profile & Location Settings
  const [householdProfile, setHouseholdProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_household_profile');
      return saved ? JSON.parse(saved) : {
        familyName: 'The Harrison Family',
        city: 'Greensboro',
        state: 'NC',
        zipCode: '27401',
        country: 'United States'
      };
    } catch (e) {
      return {
        familyName: 'The Harrison Family',
        city: 'Greensboro',
        state: 'NC',
        zipCode: '27401',
        country: 'United States'
      };
    }
  });

  // Dynamic Family Roster with Exact Birthdays
  const [members, setMembers] = useState(() => {
    return [
      {
        id: 'erin',
        name: 'Erin Harrison',
        title: 'Efficiency Specialist & Educator',
        image: '/avatars/erin.png',
        color: '#ec4899',
        role: 'Adult Earner (Age 39)',
        birthday: '1987-05-06',
        income: 2500.00,
        badge: '👑 MVP LEADER',
        level: 'LVL 99 BUDGET NINJA',
        isLeader: true
      },
      {
        id: 'chris',
        name: 'Chris Harrison',
        title: 'Operating Lead & Tech Architect',
        image: '/avatars/chris.jpg',
        color: '#6366f1',
        role: 'Adult Earner (Age 46)',
        birthday: '1980-04-12',
        income: 9309.36,
        badge: '🚀 REVENUE ENGINE',
        level: 'LVL 95 TECH ARCHITECT',
        isLeader: false
      },
      {
        id: 'barbara',
        name: 'Barbara Harrison',
        title: 'Family Pillar & Reserve Guardian',
        image: '/avatars/barbara.png',
        color: '#a855f7',
        role: 'Senior Pillar (Age 74)',
        birthday: '1952-01-17',
        income: 5645.84,
        badge: '🛡️ CAPITAL SHIELD',
        level: 'LVL 99 WEALTH GUARDIAN',
        isLeader: false
      },
      {
        id: 'hayden',
        name: 'Hayden Harrison',
        title: 'Junior Wealth Builder',
        image: '/avatars/hayden.jpg',
        color: '#3b82f6',
        role: 'Youth Dependent (Age 7)',
        birthday: '2019-03-10',
        income: 50.00,
        badge: '🌟 FUTURE INVESTOR',
        level: 'LVL 15 SAVINGS CHAMP',
        isLeader: false
      },
      {
        id: 'ava',
        name: 'Ava Harrison',
        title: 'Junior Innovator & Explorer',
        image: '/avatars/ava.jpg',
        color: '#10b981',
        role: 'Youth Dependent (Age 2)',
        birthday: '2024-01-10',
        income: 30.00,
        badge: '🎨 CREATIVE INVESTOR',
        level: 'LVL 10 SAVINGS STAR',
        isLeader: false
      }
    ];
  });

  // Function to merge Plaid API live response directly into accounts
  const mergePlaidData = (plaidAccounts = [], plaidTransactions = []) => {
    setData(prev => {
      let updatedAccounts = [...(prev.accounts || [])];
      let updatedBoa = [...(prev.boaAccounts || [])];

      plaidAccounts.forEach(pa => {
        const liveBal = pa.balances?.current || pa.balances?.available || 0;
        const lowerName = (pa.name || '').toLowerCase();

        if (lowerName.includes('novo')) {
          updatedAccounts = updatedAccounts.map(a => a.id === 'acc_novo' ? { ...a, balance: liveBal } : a);
        } else if (lowerName.includes('capital one') || lowerName.includes('360')) {
          updatedAccounts = updatedAccounts.map(a => a.id === 'acc_capone' ? { ...a, balance: liveBal } : a);
        } else if (lowerName.includes('penfed')) {
          updatedAccounts = updatedAccounts.map(a => a.id === 'acc_barbara_penfed' ? { ...a, balance: liveBal } : a);
        } else if (lowerName.includes('adv') || lowerName.includes('checking') || lowerName.includes('4717')) {
          updatedBoa = updatedBoa.map(a => a.id === 'adv_plus' ? { ...a, balance: liveBal } : a);
        } else {
          updatedAccounts.push({
            id: 'acc_plaid_' + (pa.account_id || Date.now()),
            name: pa.name,
            institution: pa.official_name || 'Connected Bank',
            balance: liveBal,
            status: '🟢 Plaid Live Sync'
          });
        }
      });

      return {
        ...prev,
        accounts: updatedAccounts,
        boaAccounts: updatedBoa
      };
    });
  };

  // Function to update any account balance (Novo, Capital One, BoA, PenFed)
  const updateAccountBalance = (accountId, newBalance) => {
    setData(prev => {
      if (prev.boaAccounts && prev.boaAccounts.some(a => a.id === accountId)) {
        return {
          ...prev,
          boaAccounts: prev.boaAccounts.map(a => a.id === accountId ? { ...a, balance: Number(newBalance) } : a)
        };
      }

      if (prev.accounts && prev.accounts.some(a => a.id === accountId)) {
        return {
          ...prev,
          accounts: prev.accounts.map(a => a.id === accountId ? { ...a, balance: Number(newBalance) } : a)
        };
      }

      const existing = prev.accounts || [];
      const updated = existing.map(a => a.id === accountId ? { ...a, balance: Number(newBalance) } : a);
      if (!existing.some(a => a.id === accountId)) {
        updated.push({ id: accountId, name: accountId, balance: Number(newBalance) });
      }
      return { ...prev, accounts: updated };
    });
  };

  // Function to remove/unlink an account from user profiles
  const removeAccount = (accountId) => {
    setData(prev => ({
      ...prev,
      accounts: (prev.accounts || []).filter(a => a.id !== accountId),
      boaAccounts: (prev.boaAccounts || []).filter(a => a.id !== accountId)
    }));
  };

  // Function to reassign account ownership (e.g. move joint accounts to Mom)
  const reassignAccountOwner = (accountId, newMemberId) => {
    setData(prev => ({
      ...prev,
      accounts: (prev.accounts || []).map(a => a.id === accountId ? { ...a, memberId: newMemberId } : a),
      boaAccounts: (prev.boaAccounts || []).map(a => a.id === accountId ? { ...a, memberId: newMemberId } : a)
    }));
  };

  // Save data state
  useEffect(() => {
    try {
      localStorage.setItem('harrison_finance_v4_data', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  // Derived financial metrics
  const totalBaseIncome = (data?.family?.members || [])
    .filter(m => m.role === 'Adult')
    .reduce((sum, m) => sum + m.income, 0);

  const barbaraTotalExpenses = (data?.barbaraExpenses || []).reduce((sum, item) => sum + item.amount, 0);
  const erinTotalExpenses = (data?.erinExpenses || []).reduce((sum, item) => sum + item.amount, 0);
  const chrisTotalExpenses = (data?.chrisExpenses || []).reduce((sum, item) => sum + item.amount, 0);

  const totalExternalExpenses = barbaraTotalExpenses + erinTotalExpenses + chrisTotalExpenses;
  const totalCombinedSurplus = totalBaseIncome - totalExternalExpenses;

  // Account Balances
  const advPlusBanking = data?.boaAccounts?.find(a => a.id === 'adv_plus') || { balance: 3268.27 };
  const advantageSavings = data?.boaAccounts?.find(a => a.id === 'adv_savings') || { balance: 25.00 };
  const bankAmericardCreditCard = data?.boaAccounts?.find(a => a.id === 'credit_card') || { balance: -658.00 };
  const papiChecking = data?.boaAccounts?.find(a => a.id === 'papi_checking') || { balance: -36.00 };
  const spendingMoney = data?.boaAccounts?.find(a => a.id === 'spending_money') || { balance: 0.00 };

  // External Bank Balances
  const barbaraCheckingAccount = data?.accounts?.find(a => a.id === 'acc_barbara_penfed' || a.id === 'penfed_savings') || { balance: 76155.00 };
  const capitalOneSavings = data?.accounts?.find(a => a.id === 'acc_capone') || { balance: 24300.00 };
  const novoBusinessChecking = data?.accounts?.find(a => a.id === 'acc_novo' || a.id === 'novo_business') || { balance: 350.00 };

  const totalCheckingCash = advPlusBanking.balance + spendingMoney.balance;
  const totalBoACash = totalCheckingCash + advantageSavings.balance;
  const totalLiquidityBalance = totalBoACash + barbaraCheckingAccount.balance + capitalOneSavings.balance + novoBusinessChecking.balance;

  return (
    <FinanceContext.Provider value={{
      data,
      setData,
      activeTab,
      setActiveTab,
      householdProfile,
      setHouseholdProfile,
      members,
      setMembers,
      updateAccountBalance,
      removeAccount,
      reassignAccountOwner,
      mergePlaidData,
      totalBaseIncome,
      barbaraTotalExpenses,
      erinTotalExpenses,
      chrisTotalExpenses,
      totalExternalExpenses,
      totalCombinedSurplus,
      totalCheckingCash,
      totalBoACash,
      totalLiquidityBalance,
      advPlusBanking,
      advantageSavings,
      bankAmericardCreditCard,
      papiChecking,
      spendingMoney,
      barbaraCheckingAccount,
      capitalOneSavings,
      novoBusinessChecking
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
