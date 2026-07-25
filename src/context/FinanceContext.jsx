import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_finance_v4_data');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
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

  // Dynamic Family Roster (Includes Hayden & Ava with custom photos)
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('harrison_members_list');
      return saved ? JSON.parse(saved) : [
        {
          id: 'erin',
          name: 'Erin Harrison',
          title: 'Efficiency Specialist & Educator',
          image: '/avatars/erin.png',
          color: '#ec4899',
          role: 'Adult Earner',
          birthday: '1988-04-12',
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
          role: 'Adult Earner',
          birthday: '1984-08-24',
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
          role: 'Senior Pillar (Age 75)',
          birthday: '1951-03-15',
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
          role: 'Youth Dependent',
          birthday: '2014-06-18',
          income: 50.00, // Allowance / Savings
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
          role: 'Youth Dependent',
          birthday: '2018-09-05',
          income: 30.00, // Allowance / Savings
          badge: '🎨 CREATIVE INVESTOR',
          level: 'LVL 10 SAVINGS STAR',
          isLeader: false
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('harrison_finance_v4_data', JSON.stringify(data));
      localStorage.setItem('harrison_household_profile', JSON.stringify(householdProfile));
      localStorage.setItem('harrison_members_list', JSON.stringify(members));
    } catch (e) {
      console.error(e);
    }
  }, [data, householdProfile, members]);

  // Add New Member
  const addFamilyMember = (newMember) => {
    setMembers(prev => [...prev, {
      id: 'mem_' + Date.now(),
      image: '/avatars/isla-bulldog.jpg',
      color: '#f59e0b',
      badge: '✨ NEW MEMBER',
      level: 'LVL 1 ROOKIE',
      isLeader: false,
      ...newMember
    }]);
  };

  // Financial Computations
  const totalBaseIncome = 5645.84 + 6309.36 + 2500.00; // $14,455.20 / mo
  const barbaraTotalExpenses = data.barbaraExpenses.reduce((sum, item) => sum + item.amount, 0);
  const erinTotalExpenses = data.erinExpenses.reduce((sum, item) => sum + item.amount, 0);
  const chrisTotalExpenses = data.chrisExpenses.reduce((sum, item) => sum + item.amount, 0);
  const totalExternalExpenses = barbaraTotalExpenses + erinTotalExpenses + chrisTotalExpenses;
  const totalCombinedSurplus = totalBaseIncome - totalExternalExpenses;

  const papiChecking = data.boaAccounts.find(a => a.mask === '7333') || { balance: -36.00 };
  const spendingMoney = data.boaAccounts.find(a => a.mask === '4866') || { balance: 468.24 };
  const advPlusBanking = data.boaAccounts.find(a => a.mask === '4717') || { balance: 443.12 };
  const advantageSavings = data.boaAccounts.find(a => a.mask === '0495') || { balance: 2392.91 };
  const bankAmericardCreditCard = data.boaAccounts.find(a => a.mask === '6343') || { balance: 4500.00 };
  const barbaraCheckingAccount = data.accounts.find(a => a.id === 'acc_barbara_checking') || { balance: 76155.00 };

  const totalCheckingCash = (papiChecking.balance || 0) + (spendingMoney.balance || 0) + (advPlusBanking.balance || 0);
  const totalBoACash = totalCheckingCash + (advantageSavings.balance || 0);
  const totalLiquidityBalance = totalBoACash + (barbaraCheckingAccount.balance || 0);

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
      addFamilyMember,
      totalBaseIncome,
      barbaraTotalExpenses,
      erinTotalExpenses,
      chrisTotalExpenses,
      totalExternalExpenses,
      totalCombinedSurplus,
      totalCheckingCash,
      totalBoACash,
      totalLiquidityBalance,
      papiChecking,
      spendingMoney,
      advPlusBanking,
      advantageSavings,
      bankAmericardCreditCard,
      barbaraCheckingAccount
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
