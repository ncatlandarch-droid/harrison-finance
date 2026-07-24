window.Storage = {
  DATA_KEY: 'harrison_finance_data',
  data: null,

  defaultData: {
    family: {
      members: [
        { id: 'barbara', name: 'Barbara', role: 'parent', color: 'hsl(280, 70%, 60%)', income: 5645.84, employer: '', retirementAge: null, birthYear: null },
        { id: 'chris', name: 'Chris', role: 'primary', color: 'hsl(250, 85%, 60%)', income: 4546.27, employer: 'NC A&T State University', retirementAge: 67, birthYear: 1980, birthMonth: 4, birthDay: 12, grossSalary: 77413, retirementSystem: 'TSERS', pensionEstimate: 3991, ssEstimate67: 2689, retirementYear: 2047, monthlyContribution401k: 500 },
        { id: 'erin', name: 'Erin', role: 'spouse', color: 'hsl(340, 85%, 60%)', income: 2500, employer: 'UNCG', retirementAge: 55, birthYear: 1987, birthMonth: 5, birthDay: 6, grossSalary: 54091, retirementSystem: 'TSERS', tsersStartDate: '2011-08-01', pensionEstimate: 2542, ssEstimate62: 1557, ssEstimate67: 2218, ssEstimate70: 2750, retirementYear: 2042, monthlyContribution401k: 100 },
        { id: 'hayden', name: 'Hayden', role: 'child', color: 'hsl(170, 75%, 45%)', birthYear: 2020 },
        { id: 'ava', name: 'Ava Joy', role: 'child', color: 'hsl(45, 95%, 55%)', birthYear: 2024 }
      ]
    },
    accounts: [
      { id: 'boa-checking', name: 'BoA Business 360 Checking', type: 'checking', memberId: 'chris', institution: 'Bank of America', balance: 1130.94 },
      { id: 'boa-barbara', name: 'BoA Barbara Checking', type: 'checking', memberId: 'barbara', institution: 'Bank of America', balance: 2722.64 },
      { id: 'cap1-kids', name: 'Capital One 360 - Kids Savings', type: 'savings', memberId: 'family', institution: 'Capital One', balance: 0 },
      { id: 'cap1-vacation', name: 'Capital One 360 - Vacation Fund', type: 'savings', memberId: 'family', institution: 'Capital One', balance: 0 },
      { id: 'cap1-emergency', name: 'Capital One 360 - Emergency Fund', type: 'savings', memberId: 'family', institution: 'Capital One', balance: 0 },
      { id: 'bmo-alto', name: 'BMO Alto Savings', type: 'savings', memberId: 'erin', institution: 'BMO Alto', balance: 84904, apy: 4.0 },
      { id: 'secu-emergency', name: 'SECU Emergency Fund', type: 'savings', memberId: 'erin', institution: 'SECU', balance: 0 },
      { id: 'wf-vacation', name: 'Wells Fargo Vacation', type: 'savings', memberId: 'erin', institution: 'Wells Fargo', balance: 0 },
      { id: 'chris-401k', name: 'Chris 401(k)', type: 'retirement', memberId: 'chris', institution: 'TSERS', balance: 0, monthlyContribution: 500 },
      { id: 'erin-401k', name: 'Erin 401(k)', type: 'retirement', memberId: 'erin', institution: 'UNCG', balance: 0, monthlyContribution: 100 },
      { id: 'robinhood', name: 'Robinhood', type: 'brokerage', memberId: 'erin', institution: 'Robinhood', balance: 0, monthlyContribution: 50, holdings: 'S&P 500, Vanguard Small Cap, Mid Cap, Schwab US, Invesco QQQ, Tesla' }
    ],
    transactions: [
      // July 2026 BoA Spending Data (real from bank)
      { id: 't1', memberId: 'chris', date: '2026-07-01', description: 'Mortgage Payment', amount: -1800, category: 'Home & Utilities', type: 'debit' },
      { id: 't2', memberId: 'chris', date: '2026-07-05', description: 'Duke Energy', amount: -285, category: 'Home & Utilities', type: 'debit' },
      { id: 't3', memberId: 'chris', date: '2026-07-08', description: 'Spectrum Internet', amount: -89.99, category: 'Home & Utilities', type: 'debit' },
      { id: 't4', memberId: 'chris', date: '2026-07-10', description: 'City of GSO Water', amount: -175.62, category: 'Home & Utilities', type: 'debit' },
      { id: 't5', memberId: 'chris', date: '2026-07-12', description: 'AHS Home Warranty', amount: -200, category: 'Home & Utilities', type: 'debit' },
      { id: 't6', memberId: 'family', date: '2026-07-03', description: 'Harris Teeter', amount: -187.43, category: 'Groceries', type: 'debit' },
      { id: 't7', memberId: 'family', date: '2026-07-07', description: 'Costco Wholesale', amount: -245.89, category: 'Groceries', type: 'debit' },
      { id: 't8', memberId: 'family', date: '2026-07-14', description: 'Harris Teeter', amount: -156.32, category: 'Groceries', type: 'debit' },
      { id: 't9', memberId: 'family', date: '2026-07-19', description: 'Walmart Supercenter', amount: -134.67, category: 'Groceries', type: 'debit' },
      { id: 't10', memberId: 'family', date: '2026-07-22', description: 'Aldi', amount: -126.47, category: 'Groceries', type: 'debit' },
      { id: 't11', memberId: 'chris', date: '2026-07-02', description: 'Chick-fil-A', amount: -32.45, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't12', memberId: 'chris', date: '2026-07-06', description: 'Olive Garden', amount: -89.67, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't13', memberId: 'family', date: '2026-07-09', description: 'Cookout', amount: -28.90, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't14', memberId: 'chris', date: '2026-07-11', description: 'DoorDash', amount: -45.78, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't15', memberId: 'family', date: '2026-07-13', description: 'Red Lobster', amount: -112.34, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't16', memberId: 'chris', date: '2026-07-16', description: 'Starbucks', amount: -18.45, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't17', memberId: 'chris', date: '2026-07-18', description: 'Chipotle', amount: -34.67, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't18', memberId: 'family', date: '2026-07-20', description: 'Texas Roadhouse', amount: -95.43, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't19', memberId: 'chris', date: '2026-07-21', description: 'McDonalds', amount: -22.15, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't20', memberId: 'family', date: '2026-07-23', description: 'Panera Bread', amount: -56.78, category: 'Restaurants & Dining', type: 'debit' },
      { id: 't21', memberId: 'family', date: '2026-07-04', description: 'Amazon', amount: -234.56, category: 'Shopping & Entertainment', type: 'debit' },
      { id: 't22', memberId: 'family', date: '2026-07-08', description: 'Target', amount: -178.90, category: 'Shopping & Entertainment', type: 'debit' },
      { id: 't23', memberId: 'chris', date: '2026-07-12', description: 'Amazon Prime', amount: -14.99, category: 'Shopping & Entertainment', type: 'debit' },
      { id: 't24', memberId: 'family', date: '2026-07-15', description: 'Walmart', amount: -289.45, category: 'Shopping & Entertainment', type: 'debit' },
      { id: 't25', memberId: 'family', date: '2026-07-19', description: 'Amazon', amount: -198.67, category: 'Shopping & Entertainment', type: 'debit' },
      { id: 't26', memberId: 'erin', date: '2026-07-22', description: 'Amazon', amount: -156.78, category: 'Shopping & Entertainment', type: 'debit' },
      { id: 't27', memberId: 'chris', date: '2026-07-01', description: 'Primerica Life Insurance', amount: -145.00, category: 'Insurance', type: 'debit' },
      { id: 't28', memberId: 'chris', date: '2026-07-01', description: 'Burial Policy', amount: -42.00, category: 'Insurance', type: 'debit' },
      { id: 't29', memberId: 'erin', date: '2026-07-05', description: 'GEICO Auto Insurance', amount: -312.19, category: 'Insurance', type: 'debit' },
      { id: 't30', memberId: 'erin', date: '2026-07-15', description: 'Nationwide Pet Insurance', amount: -89.00, category: 'Insurance', type: 'debit' },
      { id: 't31', memberId: 'erin', date: '2026-07-15', description: 'Dental/Vision Insurance', amount: -192.00, category: 'Insurance', type: 'debit' },
      { id: 't32', memberId: 'chris', date: '2026-07-04', description: 'Shell Gas', amount: -52.34, category: 'Transportation', type: 'debit' },
      { id: 't33', memberId: 'chris', date: '2026-07-18', description: 'BP Gas Station', amount: -64.73, category: 'Transportation', type: 'debit' },
      { id: 't34', memberId: 'family', date: '2026-07-06', description: 'Walgreens Pharmacy', amount: -89.45, category: 'Health', type: 'debit' },
      { id: 't35', memberId: 'chris', date: '2026-07-12', description: 'Cone Health Copay', amount: -75.00, category: 'Health', type: 'debit' },
      { id: 't36', memberId: 'family', date: '2026-07-18', description: 'CVS Pharmacy', amount: -45.67, category: 'Health', type: 'debit' },
      { id: 't37', memberId: 'erin', date: '2026-07-20', description: 'Pediatrics Copay', amount: -50.00, category: 'Health', type: 'debit' },
      { id: 't38', memberId: 'chris', date: '2026-07-10', description: 'Great Clips', amount: -28.00, category: 'Personal & Family Care', type: 'debit' },
      { id: 't39', memberId: 'erin', date: '2026-07-14', description: 'Target Baby Items', amount: -156.90, category: 'Personal & Family Care', type: 'debit' },
      { id: 't40', memberId: 'family', date: '2026-07-20', description: 'Hayden Activities', amount: -125.00, category: 'Personal & Family Care', type: 'debit' },
      { id: 't41', memberId: 'chris', date: '2026-07-05', description: 'Zelle from Erin - BILLS', amount: 1000, category: 'Income', type: 'credit' },
      { id: 't42', memberId: 'chris', date: '2026-07-01', description: 'NC A&T Payroll', amount: 4546.27, category: 'Income', type: 'credit' },
      { id: 't43', memberId: 'chris', date: '2026-07-15', description: 'NC A&T Payroll', amount: 4546.27, category: 'Income', type: 'credit' },
      { id: 't44', memberId: 'chris', date: '2026-07-08', description: 'Zelle Transfer', amount: -500, category: 'Cash, Checks & Misc', type: 'debit' },
      { id: 't45', memberId: 'chris', date: '2026-07-15', description: 'Capital One Transfer', amount: -400, category: 'Cash, Checks & Misc', type: 'debit' },
      { id: 't46', memberId: 'chris', date: '2026-07-20', description: 'ATM Withdrawal', amount: -200, category: 'Cash, Checks & Misc', type: 'debit' },
      { id: 't47', memberId: 'chris', date: '2026-07-22', description: 'Venmo Payment', amount: -150, category: 'Cash, Checks & Misc', type: 'debit' },
      { id: 't48', memberId: 'chris', date: '2026-07-10', description: 'Adobe Creative Cloud', amount: -54.99, category: 'Business Expenses', type: 'debit' },
      { id: 't49', memberId: 'chris', date: '2026-07-15', description: 'Netlify Pro', amount: -19.00, category: 'Business Expenses', type: 'debit' },
      { id: 't50', memberId: 'chris', date: '2026-07-01', description: 'BoA Cash Rewards', amount: 45.32, category: 'Income', type: 'credit' }
    ],
    bills: [
      { id: 'b1', memberId: 'chris', name: 'Mortgage', amount: 1800, dueDay: 1, frequency: 'monthly', autopay: true, category: 'Home & Utilities', paid: true },
      { id: 'b2', memberId: 'chris', name: 'Duke Energy', amount: 285, dueDay: 5, frequency: 'monthly', autopay: true, category: 'Home & Utilities', paid: true },
      { id: 'b3', memberId: 'family', name: 'Spectrum Internet', amount: 89.99, dueDay: 8, frequency: 'monthly', autopay: true, category: 'Home & Utilities', paid: true },
      { id: 'b4', memberId: 'chris', name: 'City Water/Sewer', amount: 175.62, dueDay: 10, frequency: 'monthly', autopay: false, category: 'Home & Utilities', paid: true },
      { id: 'b5', memberId: 'chris', name: 'AHS Home Warranty', amount: 200, dueDay: 12, frequency: 'monthly', autopay: true, category: 'Home & Utilities', paid: true },
      { id: 'b6', memberId: 'erin', name: 'Car Payment', amount: 450, dueDay: 5, frequency: 'monthly', autopay: false, category: 'Transportation', paid: false },
      { id: 'b7', memberId: 'erin', name: 'GEICO Auto Insurance', amount: 312.19, dueDay: 5, frequency: 'monthly', autopay: true, category: 'Insurance', paid: true },
      { id: 'b8', memberId: 'erin', name: 'Pet Insurance', amount: 89, dueDay: 15, frequency: 'monthly', autopay: true, category: 'Insurance', paid: true },
      { id: 'b9', memberId: 'erin', name: 'Dental/Vision', amount: 192, dueDay: 15, frequency: 'monthly', autopay: true, category: 'Insurance', paid: true },
      { id: 'b10', memberId: 'chris', name: 'Primerica Life Insurance', amount: 145, dueDay: 1, frequency: 'monthly', autopay: true, category: 'Insurance', paid: true },
      { id: 'b11', memberId: 'chris', name: 'Burial Policy', amount: 42, dueDay: 1, frequency: 'monthly', autopay: true, category: 'Insurance', paid: true },
      { id: 'b12', memberId: 'erin', name: 'Netflix', amount: 22.99, dueDay: 12, frequency: 'monthly', autopay: true, category: 'Shopping & Entertainment', paid: true }
    ],
    budgets: [
      { id: 'bg1', memberId: 'family', category: 'Home & Utilities', limit: 3165, spent: 2550.61, icon: 'home' },
      { id: 'bg2', memberId: 'family', category: 'Transportation', limit: 484, spent: 117.07, icon: 'car' },
      { id: 'bg3', memberId: 'family', category: 'Groceries', limit: 735, spent: 850.78, icon: 'cart' },
      { id: 'bg4', memberId: 'family', category: 'Personal & Family Care', limit: 175, spent: 439.90, icon: 'user' },
      { id: 'bg5', memberId: 'family', category: 'Health', limit: 604, spent: 431.10, icon: 'heart' },
      { id: 'bg6', memberId: 'family', category: 'Insurance', limit: 388, spent: 780.19, icon: 'shield' },
      { id: 'bg7', memberId: 'family', category: 'Restaurants & Dining', limit: 1638, spent: 1386.23, icon: 'utensils' },
      { id: 'bg8', memberId: 'family', category: 'Shopping & Entertainment', limit: 2386, spent: 1993.69, icon: 'cart' },
      { id: 'bg9', memberId: 'family', category: 'Cash, Checks & Misc', limit: 1307, spent: 2459.45, icon: 'dollar' },
      { id: 'bg10', memberId: 'chris', category: 'Business Expenses', limit: 100, spent: 151.23, icon: 'briefcase' },
      { id: 'bg11', memberId: 'family', category: 'Finance', limit: 1374, spent: 145.69, icon: 'trending-up' }
    ],
    savingsGoals: [
      { id: 'sg1', memberId: 'family', name: 'Emergency Fund', targetAmount: 25000, currentAmount: 0, deadline: '2026-12-31', category: 'emergency' },
      { id: 'sg2', memberId: 'family', name: 'Family Vacation', targetAmount: 5000, currentAmount: 0, deadline: '2026-06-01', category: 'vacation' },
      { id: 'sg3', memberId: 'family', name: 'Hayden College Fund', targetAmount: 50000, currentAmount: 0, deadline: '2038-08-01', category: 'education' },
      { id: 'sg4', memberId: 'family', name: 'Ava Joy College Fund', targetAmount: 50000, currentAmount: 0, deadline: '2042-08-01', category: 'education' }
    ],
    investments: [
      { id: 'inv1', memberId: 'chris', accountType: '401k', name: 'Chris 401(k) - TSERS', balance: 0, monthlyContribution: 500, expectedReturn: 7 },
      { id: 'inv2', memberId: 'erin', accountType: '401k', name: 'Erin 401(k)', balance: 0, monthlyContribution: 100, expectedReturn: 7 },
      { id: 'inv3', memberId: 'erin', accountType: 'brokerage', name: 'Robinhood Portfolio', balance: 0, monthlyContribution: 50, expectedReturn: 8, holdings: 'S&P 500, Vanguard Small Cap, Mid Cap, Schwab US, QQQ, Tesla' },
      { id: 'inv4', memberId: 'erin', accountType: 'savings', name: 'BMO Alto High-Yield', balance: 84904, monthlyContribution: 0, expectedReturn: 4 }
    ],
    debts: [],
    sharedExpenses: [],
    netWorthSnapshots: [],
    householdFinance: {
      totalHouseholdExpense: 3321.12,
      contributionPerPerson: 1049.04,
      members: {
        barbara: { income: 5645.84, expenses: 1479.11, contribution: 1049.04, available: 3117.69 },
        chris: { income: 4546.27, expenses: 1356.62, contribution: 1049.04, available: 2140.61 },
        erin: { income: 2500.00, expenses: 1230.00, contribution: 1049.04, available: 220.96 }
      }
    }
  },

  init() {
    const currentVersion = 'v2.1-boa-real-data';
    const savedVersion = localStorage.getItem(this.DATA_KEY + '_version');
    const saved = localStorage.getItem(this.DATA_KEY);

    if (saved && savedVersion === currentVersion) {
      try {
        this.data = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse storage, using defaults', e);
        this.data = JSON.parse(JSON.stringify(this.defaultData));
        this.save();
      }
    } else {
      // New version or first load — reset to defaults with real data
      this.data = JSON.parse(JSON.stringify(this.defaultData));
      localStorage.setItem(this.DATA_KEY + '_version', currentVersion);
      this.save();
    }
  },

  save() {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(this.data));
  },

  getData() { return this.data; },
  setData(data) { this.data = data; this.save(); },

  getFamily() { return this.data.family; },
  getMembers() { return this.data.family.members.filter(m => m.role !== 'child'); },
  getMember(id) { return this.data.family.members.find(m => m.id === id); },

  // Generic methods
  _getAll(collection) { return this.data[collection] || []; },
  _getByMember(collection, id) { return (this.data[collection] || []).filter(item => item.memberId === id || item.memberId === 'family'); },
  _add(collection, item) { 
    item.id = item.id || this.generateId();
    this.data[collection].push(item);
    this.save();
    return item;
  },
  _update(collection, id, updates) {
    const arr = this.data[collection];
    const idx = arr.findIndex(item => item.id === id);
    if (idx !== -1) {
      arr[idx] = { ...arr[idx], ...updates };
      this.save();
      return arr[idx];
    }
    return null;
  },
  _delete(collection, id) {
    this.data[collection] = this.data[collection].filter(item => item.id !== id);
    this.save();
  },

  getAccounts() { return this._getAll('accounts'); },
  getAccountsByMember(id) { return this._getByMember('accounts', id); },
  addAccount(acct) { return this._add('accounts', acct); },
  updateAccount(id, data) { return this._update('accounts', id, data); },
  deleteAccount(id) { this._delete('accounts', id); },

  getTransactions() { return this._getAll('transactions'); },
  getTransactionsByMember(id) { return this._getByMember('transactions', id); },
  getTransactionsByMonth(year, month) {
    // Add logic later
    return [];
  },
  addTransaction(txn) { return this._add('transactions', txn); },
  updateTransaction(id, data) { return this._update('transactions', id, data); },
  deleteTransaction(id) { this._delete('transactions', id); },

  getBills() { return this._getAll('bills'); },
  getBillsByMember(id) { return this._getByMember('bills', id); },
  addBill(bill) { return this._add('bills', bill); },
  updateBill(id, data) { return this._update('bills', id, data); },
  deleteBill(id) { this._delete('bills', id); },

  getBudgets() { return this._getAll('budgets'); },
  getBudgetsByMember(id) { return this._getByMember('budgets', id); },
  addBudget(b) { return this._add('budgets', b); },
  updateBudget(id, data) { return this._update('budgets', id, data); },
  deleteBudget(id) { this._delete('budgets', id); },

  getGoals() { return this._getAll('savingsGoals'); },
  addGoal(g) { return this._add('savingsGoals', g); },
  updateGoal(id, data) { return this._update('savingsGoals', id, data); },
  deleteGoal(id) { this._delete('savingsGoals', id); },

  getInvestments() { return this._getAll('investments'); },
  addInvestment(inv) { return this._add('investments', inv); },
  updateInvestment(id, data) { return this._update('investments', id, data); },
  deleteInvestment(id) { this._delete('investments', id); },

  getDebts() { return this._getAll('debts'); },
  addDebt(d) { return this._add('debts', d); },
  updateDebt(id, data) { return this._update('debts', id, data); },
  deleteDebt(id) { this._delete('debts', id); },

  getSharedExpenses() { return this._getAll('sharedExpenses'); },
  addSharedExpense(exp) { return this._add('sharedExpenses', exp); },
  deleteSharedExpense(id) { this._delete('sharedExpenses', id); },

  getSnapshots() { return this._getAll('netWorthSnapshots'); },
  addSnapshot(snap) { return this._add('netWorthSnapshots', snap); },

  generateId() { return 'hf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9); },

  getTotalAssets() {
    let total = 0;
    this.getAccounts().forEach(a => total += (a.balance || 0));
    this.getInvestments().forEach(i => total += (i.balance || 0));
    return total;
  },

  getTotalLiabilities() {
    let total = 0;
    this.getDebts().forEach(d => total += (d.balance || 0));
    return total;
  },

  getNetWorth() {
    return this.getTotalAssets() - this.getTotalLiabilities();
  },

  getCombinedMonthlyIncome() {
    return this.getMembers().reduce((sum, m) => sum + (m.income || 0), 0);
  },

  getHouseholdFinance() {
    return this.data.householdFinance;
  },

  exportData() {
    return JSON.stringify(this.data);
  },

  importData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.family) {
        this.data = parsed;
        this.save();
        return true;
      }
    } catch(e) {
      console.error(e);
    }
    return false;
  },

  resetData() {
    this.data = { ...this.defaultData };
    this.save();
  }
};
