export const INITIAL_DATA = {
  version: '2.5-react',
  family: {
    members: [
      { id: 'barbara', name: 'Barbara', role: 'Parent', color: '#a855f7', income: 5645.84, employer: 'Retirement / Pension' },
      { id: 'chris', name: 'Chris', role: 'Primary', color: '#6366f1', income: 4546.27, employer: 'NC A&T State University' },
      { id: 'erin', name: 'Erin', role: 'Spouse', color: '#ec4899', income: 2500.00, employer: 'UNCG' },
      { id: 'hayden', name: 'Hayden', role: 'Child', color: '#14b8a6', birthYear: 2020 },
      { id: 'ava', name: 'Ava Joy', role: 'Child', color: '#f59e0b', birthYear: 2024 }
    ]
  },
  accounts: [
    { id: 'boa-checking', name: 'BoA Business 360 Checking', type: 'Checking', memberId: 'chris', institution: 'Bank of America', balance: 1130.94 },
    { id: 'boa-barbara', name: 'BoA Barbara Checking', type: 'Checking', memberId: 'barbara', institution: 'Bank of America', balance: 2722.64 },
    { id: 'bmo-alto', name: 'BMO Alto Savings', type: 'Savings', memberId: 'erin', institution: 'BMO Alto', balance: 84904.00, apy: 4.0 },
    { id: 'cap1-emergency', name: 'Capital One Emergency Fund', type: 'Savings', memberId: 'family', institution: 'Capital One', balance: 15000.00 },
    { id: 'secu-emergency', name: 'SECU Emergency Savings', type: 'Savings', memberId: 'erin', institution: 'SECU', balance: 8500.00 },
    { id: 'wf-vacation', name: 'Wells Fargo Vacation', type: 'Savings', memberId: 'erin', institution: 'Wells Fargo', balance: 3200.00 },
    { id: 'chris-401k', name: 'Chris 401(k)', type: 'Retirement', memberId: 'chris', institution: 'TSERS', balance: 42500.00, monthlyContribution: 500 },
    { id: 'erin-401k', name: 'Erin 401(k)', type: 'Retirement', memberId: 'erin', institution: 'UNCG', balance: 28400.00, monthlyContribution: 100 },
    { id: 'robinhood', name: 'Robinhood Portfolio', type: 'Brokerage', memberId: 'erin', institution: 'Robinhood', balance: 9072.42, monthlyContribution: 50 }
  ],
  bills: [
    { id: 'b1', name: 'Mortgage Payment', amount: 1800.00, dueDay: 1, category: 'Housing', paidBy: 'joint', status: 'upcoming' },
    { id: 'b2', name: 'Duke Energy (Electricity)', amount: 285.00, dueDay: 5, category: 'Utilities', paidBy: 'joint', status: 'upcoming' },
    { id: 'b3', name: 'Spectrum Fiber Internet', amount: 89.99, dueDay: 8, category: 'Utilities', paidBy: 'joint', status: 'upcoming' },
    { id: 'b4', name: 'City of Greensboro Water', amount: 175.62, dueDay: 10, category: 'Utilities', paidBy: 'joint', status: 'upcoming' },
    { id: 'b5', name: 'American Home Shield Warranty', amount: 200.00, dueDay: 12, category: 'Housing', paidBy: 'joint', status: 'upcoming' },
    { id: 'b6', name: 'GEICO Auto Insurance', amount: 312.19, dueDay: 15, category: 'Insurance', paidBy: 'joint', status: 'upcoming' },
    { id: 'b7', name: 'Primerica Life Insurance', amount: 145.00, dueDay: 1, category: 'Insurance', paidBy: 'chris', status: 'upcoming' },
    { id: 'b8', name: 'Nationwide Pet Insurance', amount: 89.00, dueDay: 15, category: 'Insurance', paidBy: 'erin', status: 'upcoming' },
    { id: 'b9', name: 'Dental & Vision Supplemental', amount: 192.00, dueDay: 15, category: 'Insurance', paidBy: 'erin', status: 'upcoming' },
    { id: 'b10', name: 'Google Workspace (Think!)', amount: 14.00, dueDay: 20, category: 'Business', paidBy: 'chris', status: 'upcoming' }
  ],
  budgets: [
    { id: 'bg1', category: 'Home & Utilities', limit: 2550.00, spent: 2549.61, memberId: 'family', icon: 'Home' },
    { id: 'bg2', category: 'Groceries', limit: 1200.00, spent: 850.74, memberId: 'family', icon: 'ShoppingCart' },
    { id: 'bg3', category: 'Restaurants & Dining', limit: 800.00, spent: 926.00, memberId: 'family', icon: 'Utensils' },
    { id: 'bg4', category: 'Shopping & Leisure', limit: 600.00, spent: 489.12, memberId: 'family', icon: 'ShoppingBag' },
    { id: 'bg5', category: 'Transportation', limit: 350.00, spent: 280.40, memberId: 'family', icon: 'Car' },
    { id: 'bg6', category: 'Insurance & Health', limit: 750.00, spent: 738.19, memberId: 'family', icon: 'Shield' }
  ],
  transactions: [
    { id: 't101', memberId: 'chris', date: '2026-07-23', description: 'Panera Bread', amount: -56.78, category: 'Restaurants & Dining', type: 'debit' },
    { id: 't102', memberId: 'family', date: '2026-07-22', description: 'Aldi Supermarket', amount: -126.47, category: 'Groceries', type: 'debit' },
    { id: 't103', memberId: 'chris', date: '2026-07-21', description: 'McDonalds', amount: -22.15, category: 'Restaurants & Dining', type: 'debit' },
    { id: 't104', memberId: 'family', date: '2026-07-20', description: 'Texas Roadhouse', amount: -95.43, category: 'Restaurants & Dining', type: 'debit' },
    { id: 't105', memberId: 'chris', date: '2026-07-19', description: 'NC A&T Direct Deposit', amount: 4546.27, category: 'Income', type: 'income' },
    { id: 't106', memberId: 'barbara', date: '2026-07-15', description: 'OPM Pension Direct Deposit', amount: 5645.84, category: 'Income', type: 'income' },
    { id: 't107', memberId: 'erin', date: '2026-07-15', description: 'UNCG Salary Deposit', amount: 2500.00, category: 'Income', type: 'income' },
    { id: 't108', memberId: 'chris', date: '2026-07-10', description: 'DoorDash - Dare Gaec', amount: -147.30, category: 'Restaurants & Dining', type: 'debit' },
    { id: 't109', memberId: 'chris', date: '2026-07-01', description: 'Mortgage Auto Pay', amount: -1800.00, category: 'Home & Utilities', type: 'debit' },
    { id: 't110', memberId: 'family', date: '2026-07-07', description: 'Costco Wholesale', amount: -245.89, category: 'Groceries', type: 'debit' }
  ]
};
