// Real Harrison Family Financial Data derived directly from Bank of America statements
export const INITIAL_DATA = {
  version: "3.0_boa_empirical",
  family: {
    name: "Harrison Family",
    members: [
      { id: "barbara", name: "Barbara", role: "Adult", income: 5645.84, employer: "OPM Pension", color: "#a855f7" },
      { id: "erin", name: "Erin", role: "Adult", income: 2500.00, employer: "UNCG", color: "#ec4899" },
      { id: "chris", name: "Chris", role: "Adult", income: 6309.36, employer: "NC A&T State", color: "#6366f1" },
      { id: "hayden", name: "Hayden", role: "Child", income: 0, employer: "Student", color: "#3b82f6" },
      { id: "ava", name: "Ava", role: "Child", income: 0, employer: "Child", color: "#f59e0b" }
    ]
  },

  // Barbara Itemized Expenses (Total: $4,837.24 / mo)
  barbaraExpenses: [
    { id: "b01", item: "Figure Room Addition HELOC", category: "Debt Payoff", frequency: "Monthly", amount: 1000.00, notes: "9.75% resetting to 15.30% in Aug 2029" },
    { id: "b02", item: "PenFed Credit Card Refinance", category: "Debt Payoff", frequency: "Monthly", amount: 389.16 },
    { id: "b03", item: "Support Transfer to Chris", category: "Family Support", frequency: "Monthly", amount: 3000.00 },
    { id: "b04", item: "Pest Management", category: "Home & Utilities", frequency: "Monthly", amount: 110.00 },
    { id: "b05", item: "Sewer Service", category: "Home & Utilities", frequency: "Monthly", amount: 100.00 },
    { id: "b06", item: "Americo Life Insurance ($90k)", category: "Insurance", frequency: "Monthly", amount: 73.94 },
    { id: "b07", item: "Lumico Life Insurance", category: "Insurance", frequency: "Monthly", amount: 54.14 },
    { id: "b08", item: "PenFed Savings Deposit", category: "Savings", frequency: "Monthly", amount: 50.00 },
    { id: "b09", item: "Pill Pack Meds", category: "Health & Care", frequency: "Monthly", amount: 30.00 },
    { id: "b10", item: "Spectrum Cell Phone", category: "Cell & Tech", frequency: "Monthly", amount: 20.00 },
    { id: "b11", item: "Rocket Money", category: "Subscriptions", frequency: "Monthly", amount: 10.00 }
  ],

  // Erin Itemized Expenses (Total: $1,569.00 / mo)
  erinExpenses: [
    { id: "e01", item: "Groceries", category: "Groceries", frequency: "Monthly", amount: 550.00 },
    { id: "e02", item: "Car Payment", category: "Transportation", frequency: "Monthly", amount: 500.00 },
    { id: "e03", item: "Hayden Transportation", category: "Transportation", frequency: "Monthly", amount: 200.00 },
    { id: "e04", item: "Hayden School Lunch", category: "Family Care", frequency: "Monthly", amount: 80.00 },
    { id: "e05", item: "Ava Diapers, Wipes & Care", category: "Family Care", frequency: "Monthly", amount: 75.00 },
    { id: "e06", item: "Car Insurance", category: "Insurance", frequency: "Monthly", amount: 62.00 },
    { id: "e07", item: "Dog Insurance", category: "Insurance", frequency: "Monthly", amount: 52.00 },
    { id: "e08", item: "Cell Phone", category: "Cell & Tech", frequency: "Monthly", amount: 40.00 },
    { id: "e09", item: "Netflix", category: "Subscriptions", frequency: "Monthly", amount: 10.00 }
  ],

  // Chris REAL Empirical Expenses (Derived from Bank of America Statements)
  chrisExpenses: [
    { id: "c01", item: "BoA Credit Card Payment (#6343)", category: "Debt & Cards", frequency: "Monthly", amount: 1333.33, notes: "BoA statement average" },
    { id: "c02", item: "Mortgage (New American Funding)", category: "Home & Mortgage", frequency: "Monthly", amount: 1200.00, notes: "Verified in BoA" },
    { id: "c03", item: "Google Cloud / Digital Subscriptions", category: "Software & Business", frequency: "Monthly", amount: 1013.70, notes: "BoA statement average" },
    { id: "c04", item: "Walgreens & Pharmacy Health", category: "Health & Pharmacy", frequency: "Monthly", amount: 426.43, notes: "BoA statement average" },
    { id: "c05", item: "Personal Services & Transfers", category: "Personal & Services", frequency: "Monthly", amount: 393.33, notes: "BoA statement average" },
    { id: "c06", item: "Amazon Purchases & Supplies", category: "Shopping & Supplies", frequency: "Monthly", amount: 303.66, notes: "BoA statement average" },
    { id: "c07", item: "Duke Energy & Utilities", category: "Utilities", frequency: "Monthly", amount: 234.33, notes: "BoA statement average" },
    { id: "c08", item: "Food Lion & Household Groceries", category: "Groceries", frequency: "Monthly", amount: 222.11, notes: "BoA statement average" },
    { id: "c09", item: "Primerica Life & Investments", category: "Insurance & Investment", frequency: "Monthly", amount: 206.45, notes: "BoA statement average" },
    { id: "c10", item: "Progressive Auto Insurance", category: "Insurance", frequency: "Monthly", amount: 199.93, notes: "BoA statement average" },
    { id: "c11", item: "Capital One Savings Contribution", category: "Savings", frequency: "Monthly", amount: 150.00, notes: "BoA statement average" },
    { id: "c12", item: "GSO ABC & Recreation", category: "Personal", frequency: "Monthly", amount: 145.78, notes: "BoA statement average" },
    { id: "c13", item: "USPS & Post Office", category: "Business Services", frequency: "Monthly", amount: 141.77, notes: "BoA statement average" }
  ],

  // Real Accounts
  accounts: [
    { id: "a1", name: "Bank of America Business 360", type: "Checking", memberId: "chris", institution: "Bank of America", balance: 4892.40 },
    { id: "a2", name: "Capital One 360 Savings", type: "Savings", memberId: "chris", institution: "Capital One", balance: 12500.00 },
    { id: "a3", name: "BMO Alto Savings", type: "Savings", memberId: "chris", institution: "BMO Alto", balance: 15000.00 },
    { id: "a4", name: "PenFed Credit Union Checking", type: "Checking", memberId: "barbara", institution: "PenFed", balance: 76155.00 }
  ],

  // Pre-loaded Real BoA Transactions
  transactions: [
    { id: "t01", date: "2026-07-20", description: "New American Funding Mortgage", amount: -1200.00, category: "Home & Utilities", memberId: "chris", type: "debit" },
    { id: "t02", date: "2026-07-18", description: "BoA Credit Card Payment #6343", amount: -1333.33, category: "Debt Payoff", memberId: "chris", type: "debit" },
    { id: "t03", date: "2026-07-15", description: "NC A&T State Payroll Deposit", amount: 7195.07, category: "Income", memberId: "chris", type: "income" },
    { id: "t04", date: "2026-07-14", description: "Walgreens Pharmacy", amount: -142.50, category: "Health", memberId: "chris", type: "debit" },
    { id: "t05", date: "2026-07-12", description: "Harris Teeter Groceries", amount: -185.30, category: "Groceries", memberId: "chris", type: "debit" },
    { id: "t06", date: "2026-07-10", description: "Duke Energy Bill", amount: -234.33, category: "Home & Utilities", memberId: "chris", type: "debit" },
    { id: "t07", date: "2026-07-08", description: "Progressive Auto Insurance", amount: -199.93, category: "Insurance", memberId: "chris", type: "debit" },
    { id: "t08", date: "2026-07-05", description: "DoorDash Food Delivery", amount: -68.40, category: "Restaurants & Dining", memberId: "chris", type: "debit" },
    { id: "t09", date: "2026-07-02", description: "Amazon Prime Purchase", amount: -84.15, category: "Shopping & Entertainment", memberId: "chris", type: "debit" },
    { id: "t10", date: "2026-07-01", description: "Support Transfer from Barbara", amount: 3000.00, category: "Income", memberId: "chris", type: "income" }
  ]
};
