export const INITIAL_DATA = {
  version: '2.8-complete-family-exact',
  family: {
    members: [
      { id: 'barbara', name: 'Barbara', role: 'Parent', color: '#a855f7', income: 5645.84, employer: 'OPM Pension' },
      { id: 'chris', name: 'Chris', role: 'Primary', color: '#6366f1', income: 4546.27, employer: 'NC A&T State University' },
      { id: 'erin', name: 'Erin', role: 'Spouse', color: '#ec4899', income: 2500.00, employer: 'UNCG' },
      { id: 'hayden', name: 'Hayden', role: 'Child', color: '#14b8a6', birthYear: 2020 },
      { id: 'ava', name: 'Ava Joy', role: 'Child', color: '#f59e0b', birthYear: 2024 }
    ]
  },
  accounts: [
    { id: 'boa-checking', name: 'BoA Business 360 Checking', type: 'Checking', memberId: 'chris', institution: 'Bank of America', balance: 1130.94 },
    { id: 'boa-barbara', name: 'BoA Barbara Checking', type: 'Checking', memberId: 'barbara', institution: 'Bank of America', balance: 2722.64 },
    { id: 'penfed-savings', name: 'PenFed Credit Union Savings', type: 'Savings', memberId: 'barbara', institution: 'PenFed', balance: 1250.00 },
    { id: 'bmo-alto', name: 'BMO Alto Savings', type: 'Savings', memberId: 'erin', institution: 'BMO Alto', balance: 84904.00, apy: 4.0 },
    { id: 'cap1-emergency', name: 'Capital One Emergency Fund', type: 'Savings', memberId: 'family', institution: 'Capital One', balance: 15000.00 }
  ],
  // Barbara's Exact Itemized Bills ($4,837.24 / mo)
  barbaraExpenses: [
    { id: 'barb-1', description: 'Figure Room Addition Loan', name: 'Figure', amount: 1000.00, category: 'Debt & Loans', paidBy: 'barbara', notes: '9.75% interest ($140k total int). Jumps to 15.3% Aug 2029 ($227k total int)!' },
    { id: 'barb-2', description: 'PenFed Credit Card Refinance', name: 'PenFed', amount: 389.16, category: 'Debt & Loans', paidBy: 'barbara' },
    { id: 'barb-3', description: 'Support / Transfer to Chris', name: 'Chris', amount: 3000.00, category: 'Family Transfer', paidBy: 'barbara' },
    { id: 'barb-4', description: 'Pest Management', name: 'Pest Management', amount: 110.00, category: 'Utilities & Home', paidBy: 'barbara' },
    { id: 'barb-5', description: 'Sewer Service', name: 'City Sewer', amount: 100.00, category: 'Utilities & Home', paidBy: 'barbara' },
    { id: 'barb-6', description: 'Americo Life Insurance ($90k Policy)', name: 'Americo', amount: 73.94, category: 'Insurance', paidBy: 'barbara' },
    { id: 'barb-7', description: 'Lumico Life Insurance', name: 'Lumico', amount: 54.14, category: 'Insurance', paidBy: 'barbara' },
    { id: 'barb-8', description: 'PenFed Savings Contribution', name: 'PenFed Savings', amount: 50.00, category: 'Savings', paidBy: 'barbara' },
    { id: 'barb-9', description: 'Pill Pack Medication', name: 'Pill Pack', amount: 30.00, category: 'Health', paidBy: 'barbara' },
    { id: 'barb-10', description: 'Spectrum Cell Phone', name: 'Spectrum', amount: 20.00, category: 'Utilities', paidBy: 'barbara' },
    { id: 'barb-11', description: 'Rocket Money', name: 'Rocket', amount: 10.00, category: 'Services', paidBy: 'barbara' }
  ],
  // Erin's Exact Itemized Bills ($1,569.00 / mo)
  erinExpenses: [
    { id: 'erin-1', description: 'Groceries', name: 'Groceries', amount: 550.00, category: 'Food', paidBy: 'erin' },
    { id: 'erin-2', description: 'Car Payment', name: 'Auto Loan', amount: 500.00, category: 'Transportation', paidBy: 'erin' },
    { id: 'erin-3', description: 'Hayden Transportation', name: 'Transportation', amount: 200.00, category: 'Kids & Family', paidBy: 'erin' },
    { id: 'erin-4', description: 'Hayden School Lunch', name: 'School Lunch', amount: 80.00, category: 'Kids & Family', paidBy: 'erin' },
    { id: 'erin-5', description: 'Ava Diapers, Wipes & Care', name: 'Baby Care', amount: 75.00, category: 'Kids & Family', paidBy: 'erin' },
    { id: 'erin-6', description: 'Car Insurance', name: 'Auto Insurance', amount: 62.00, category: 'Insurance', paidBy: 'erin' },
    { id: 'erin-7', description: 'Dog Insurance', name: 'Pet Insurance', amount: 52.00, category: 'Insurance', paidBy: 'erin' },
    { id: 'erin-8', description: 'Cell Phone', name: 'Mobile Phone', amount: 40.00, category: 'Utilities', paidBy: 'erin' },
    { id: 'erin-9', description: 'Netflix Streaming', name: 'Netflix', amount: 10.00, category: 'Entertainment', paidBy: 'erin' }
  ],
  // Chris's Exact Itemized Bills ($4,311.62 / mo)
  chrisExpenses: [
    { id: 'chris-1', description: 'Food for Everyone (Household Dining & Groceries)', name: 'Food Pool', amount: 2100.00, category: 'Food & Groceries', paidBy: 'chris' },
    { id: 'chris-2', description: 'Mortgage Payment', name: 'Mortgage', amount: 1200.00, category: 'Housing', paidBy: 'chris' },
    { id: 'chris-3', description: 'Weed / Personal Dispensary', name: 'Personal', amount: 400.00, category: 'Personal & Recreation', paidBy: 'chris' },
    { id: 'chris-4', description: 'Capital One Savings Deposit', name: 'Capital One', amount: 150.00, category: 'Savings', paidBy: 'chris' },
    { id: 'chris-5', description: 'Car Insurance', name: 'Progressive Insurance', amount: 124.71, category: 'Insurance', paidBy: 'chris' },
    { id: 'chris-6', description: 'Primerica Monthly Investment', name: 'Primerica', amount: 100.00, category: 'Investments', paidBy: 'chris' },
    { id: 'chris-7', description: 'Primerica Life Insurance', name: 'Primerica', amount: 96.82, category: 'Insurance', paidBy: 'chris' },
    { id: 'chris-8', description: 'Adobe Creative Cloud', name: 'Adobe', amount: 37.35, category: 'Business & Software', paidBy: 'chris' },
    { id: 'chris-9', description: 'Planet Fitness Gym Membership', name: 'Planet Fitness', amount: 24.99, category: 'Health & Fitness', paidBy: 'chris' },
    { id: 'chris-10', description: 'ChatGPT Subscription', name: 'OpenAI', amount: 20.00, category: 'Software & AI', paidBy: 'chris' },
    { id: 'chris-11', description: 'HBO Max (via Amazon)', name: 'Amazon', amount: 16.99, category: 'Subscriptions', paidBy: 'chris' },
    { id: 'chris-12', description: 'Amazon Prime', name: 'Amazon', amount: 14.99, category: 'Subscriptions', paidBy: 'chris' },
    { id: 'chris-13', description: 'Showtime (via Amazon)', name: 'Amazon', amount: 12.99, category: 'Subscriptions', paidBy: 'chris' },
    { id: 'chris-14', description: 'Pandora Music', name: 'Amazon', amount: 12.78, category: 'Subscriptions', paidBy: 'chris' }
  ],
  bills: [],
  budgets: [
    { id: 'bg1', category: 'Food for Everyone', limit: 2100.00, spent: 2100.00, memberId: 'chris', icon: 'ShoppingCart' },
    { id: 'bg2', category: 'Housing & Utilities', limit: 1200.00, spent: 1200.00, memberId: 'chris', icon: 'Home' },
    { id: 'bg3', category: 'Personal & Recreation', limit: 400.00, spent: 400.00, memberId: 'chris', icon: 'ShoppingBag' }
  ],
  transactions: [
    { id: 't101', memberId: 'chris', date: '2026-07-23', description: 'Panera Bread', amount: -56.78, category: 'Restaurants & Dining', type: 'debit' },
    { id: 't102', memberId: 'family', date: '2026-07-22', description: 'Aldi Supermarket', amount: -126.47, category: 'Groceries', type: 'debit' },
    { id: 't103', memberId: 'chris', date: '2026-07-21', description: 'McDonalds', amount: -22.15, category: 'Restaurants & Dining', type: 'debit' },
    { id: 't104', memberId: 'family', date: '2026-07-20', description: 'Texas Roadhouse', amount: -95.43, category: 'Restaurants & Dining', type: 'debit' },
    { id: 't105', memberId: 'chris', date: '2026-07-19', description: 'NC A&T Direct Deposit', amount: 4546.27, category: 'Income', type: 'income' },
    { id: 't106', memberId: 'barbara', date: '2026-07-15', description: 'OPM Pension Direct Deposit', amount: 5645.84, category: 'Income', type: 'income' },
    { id: 't107', memberId: 'erin', date: '2026-07-15', description: 'UNCG Salary Deposit', amount: 2500.00, category: 'Income', type: 'income' }
  ]
};
