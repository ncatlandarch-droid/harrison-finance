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
      { id: 'boa-checking', name: 'BoA Joint Checking', type: 'checking', memberId: 'family', institution: 'Bank of America', balance: 0 },
      { id: 'boa-spending', name: 'BoA Spending Account', type: 'checking', memberId: 'family', institution: 'Bank of America', balance: 0 },
      { id: 'cap1-kids', name: 'Capital One 360 - Kids Savings', type: 'savings', memberId: 'family', institution: 'Capital One', balance: 0 },
      { id: 'cap1-vacation', name: 'Capital One 360 - Vacation Fund', type: 'savings', memberId: 'family', institution: 'Capital One', balance: 0 },
      { id: 'cap1-emergency', name: 'Capital One 360 - Emergency Fund', type: 'savings', memberId: 'family', institution: 'Capital One', balance: 0 },
      { id: 'bmo-alto', name: 'BMO Alto Savings', type: 'savings', memberId: 'erin', institution: 'BMO Alto', balance: 84904 },
      { id: 'secu-emergency', name: 'SECU Emergency Fund', type: 'savings', memberId: 'erin', institution: 'SECU', balance: 0 },
      { id: 'wf-vacation', name: 'Wells Fargo Vacation', type: 'savings', memberId: 'erin', institution: 'Wells Fargo', balance: 0 },
      { id: 'chris-401k', name: 'Chris 401(k)', type: 'retirement', memberId: 'chris', institution: 'TSERS', balance: 0, monthlyContribution: 500 },
      { id: 'erin-401k', name: 'Erin 401(k)', type: 'retirement', memberId: 'erin', institution: 'UNCG', balance: 0, monthlyContribution: 100 },
      { id: 'robinhood', name: 'Robinhood', type: 'brokerage', memberId: 'erin', institution: 'Robinhood', balance: 0, monthlyContribution: 50, holdings: 'S&P 500, Vanguard Small Cap, Mid Cap, Schwab US, Invesco QQQ, Tesla' }
    ],
    transactions: [],
    bills: [
      { id: 'b1', memberId: 'chris', name: 'Mortgage', amount: 0, dueDay: 1, frequency: 'monthly', autopay: true, category: 'housing', paid: false },
      { id: 'b2', memberId: 'family', name: 'Utilities', amount: 0, dueDay: 15, frequency: 'monthly', autopay: true, category: 'utilities', paid: false },
      { id: 'b3', memberId: 'family', name: 'Spectrum Internet', amount: 0, dueDay: 10, frequency: 'monthly', autopay: true, category: 'utilities', paid: false },
      { id: 'b4', memberId: 'erin', name: 'Car Payment', amount: 0, dueDay: 5, frequency: 'monthly', autopay: false, category: 'transportation', paid: false },
      { id: 'b5', memberId: 'erin', name: 'Car Insurance', amount: 0, dueDay: 15, frequency: 'monthly', autopay: true, category: 'insurance', paid: false },
      { id: 'b6', memberId: 'erin', name: 'Hayden Transport', amount: 0, dueDay: 1, frequency: 'monthly', autopay: false, category: 'childcare', paid: false },
      { id: 'b7', memberId: 'erin', name: 'Ava Childcare', amount: 0, dueDay: 1, frequency: 'monthly', autopay: false, category: 'childcare', paid: false },
      { id: 'b8', memberId: 'erin', name: 'Dog Insurance', amount: 0, dueDay: 20, frequency: 'monthly', autopay: true, category: 'insurance', paid: false },
      { id: 'b9', memberId: 'erin', name: 'Netflix', amount: 0, dueDay: 12, frequency: 'monthly', autopay: true, category: 'subscriptions', paid: false },
      { id: 'b10', memberId: 'chris', name: 'Primerica Life Insurance', amount: 0, dueDay: 1, frequency: 'monthly', autopay: true, category: 'insurance', paid: false },
      { id: 'b11', memberId: 'chris', name: 'Burial Policy', amount: 0, dueDay: 1, frequency: 'monthly', autopay: true, category: 'insurance', paid: false },
      { id: 'b12', memberId: 'chris', name: 'AHS Home Warranty', amount: 0, dueDay: 1, frequency: 'monthly', autopay: true, category: 'housing', paid: false }
    ],
    budgets: [
      { id: 'bg1', memberId: 'chris', category: 'Home Expenses', limit: 1500, icon: 'home' },
      { id: 'bg2', memberId: 'erin', category: 'Fixed Expenses', limit: 1230, icon: 'car' },
      { id: 'bg3', memberId: 'barbara', category: 'Personal Expenses', limit: 1479.11, icon: 'user' },
      { id: 'bg4', memberId: 'family', category: 'Groceries', limit: 700, icon: 'cart' },
      { id: 'bg5', memberId: 'family', category: 'Retirement Savings', limit: 900, icon: 'trending-up' },
      { id: 'bg6', memberId: 'family', category: 'Vacation Fund', limit: 300, icon: 'plane' },
      { id: 'bg7', memberId: 'family', category: 'Kids Savings', limit: 400, icon: 'graduation' },
      { id: 'bg8', memberId: 'chris', category: 'Life Insurance', limit: 175, icon: 'shield' },
      { id: 'bg9', memberId: 'family', category: 'Discretionary', limit: 1000, icon: 'sparkles' },
      { id: 'bg10', memberId: 'family', category: 'Emergency & Real Estate', limit: 350, icon: 'piggy-bank' },
      { id: 'bg11', memberId: 'family', category: 'Household Contribution', limit: 3147.12, icon: 'home' }
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
    const saved = localStorage.getItem(this.DATA_KEY);
    if (saved) {
      try {
        this.data = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse storage, using defaults', e);
        this.data = { ...this.defaultData };
        this.save();
      }
    } else {
      this.data = { ...this.defaultData };
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
