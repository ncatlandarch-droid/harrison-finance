export const INITIAL_DATA = {
  version: '2.6-barbara-exact',
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
    { id: 'barb-2', description: 'PenFed Credit Card Refinance', name: 'PenFed', amount: 389.16, category: 'Debt & Loans', paidBy: 'barbara', notes: 'Credit card refinance' },
    { id: 'barb-3', description: 'Support / Transfer to Chris', name: 'Chris', amount: 3000.00, category: 'Family Transfer', paidBy: 'barbara', notes: 'Monthly family support transfer' },
    { id: 'barb-4', description: 'Pest Management', name: 'Pest Management', amount: 110.00, category: 'Utilities & Home', paidBy: 'barbara' },
    { id: 'barb-5', description: 'Sewer Service', name: 'City Sewer', amount: 100.00, category: 'Utilities & Home', paidBy: 'barbara' },
    { id: 'barb-6', description: 'Americo Life Insurance ($90k Policy)', name: 'Americo', amount: 73.94, category: 'Insurance', paidBy: 'barbara' },
    { id: 'barb-7', description: 'Lumico Life Insurance', name: 'Lumico', amount: 54.14, category: 'Insurance', paidBy: 'barbara' },
    { id: 'barb-8', description: 'PenFed Savings Contribution', name: 'PenFed Savings', amount: 50.00, category: 'Savings', paidBy: 'barbara' },
    { id: 'barb-9', description: 'Pill Pack Medication', name: 'Pill Pack', amount: 30.00, category: 'Health', paidBy: 'barbara' },
    { id: 'barb-10', description: 'Spectrum Cell Phone', name: 'Spectrum', amount: 20.00, category: 'Utilities', paidBy: 'barbara' },
    { id: 'barb-11', description: 'Rocket Money', name: 'Rocket', amount: 10.00, category: 'Services', paidBy: 'barbara' }
  ],
  // Household Shared & Household Bills
  bills: [
    { id: 'b1', name: 'Mortgage Payment', amount: 1800.00, dueDay: 1, category: 'Housing', paidBy: 'joint', status: 'upcoming' },
    { id: 'b2', name: 'Duke Energy (Electricity)', amount: 285.00, dueDay: 5, category: 'Utilities', paidBy: 'joint', status: 'upcoming' },
    { id: 'b3', name: 'Spectrum Fiber Internet', amount: 89.99, dueDay: 8, category: 'Utilities', paidBy: 'joint', status: 'upcoming' },
    { id: 'b4', name: 'City of Greensboro Water', amount: 175.62, dueDay: 10, category: 'Utilities', paidBy: 'joint', status: 'upcoming' },
    { id: 'b5', name: 'American Home Shield Warranty', amount: 200.00, dueDay: 12, category: 'Housing', paidBy: 'joint', status: 'upcoming' },
    { id: 'b6', name: 'GEICO Auto Insurance', amount: 312.19, dueDay: 15, category: 'Insurance', paidBy: 'joint', status: 'upcoming' },
    { id: 'b7', name: 'Primerica Life Insurance', amount: 145.00, dueDay: 1, category: 'Insurance', paidBy: 'chris', status: 'upcoming' },
    { id: 'b8', name: 'Nationwide Pet Insurance', amount: 89.00, dueDay: 15, category: 'Insurance', paidBy: 'erin', status: 'upcoming' },
    { id: 'b9', name: 'Dental & Vision Supplemental', amount: 192.00, dueDay: 15, category: 'Insurance', paidBy: 'erin', status: 'upcoming' }
  ],
  budgets: [
    { id: 'bg1', category: 'Home & Utilities', limit: 2550.00, spent: 2549.61, memberId: 'family', icon: 'Home' },
    { id: 'bg2', category: 'Groceries', limit: 1200.00, spent: 850.74, memberId: 'family', icon: 'ShoppingCart' },
    { id: 'bg3', category: 'Restaurants & Dining (DoorDash)', limit: 800.00, spent: 926.00, memberId: 'family', icon: 'Utensils' },
    { id: 'bg4', category: 'Shopping & Leisure', limit: 600.00, spent: 489.12, memberId: 'family', icon: 'ShoppingBag' }
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
