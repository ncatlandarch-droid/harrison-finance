// Real Harrison Family Financial Data derived directly from Bank of America live online portal
export const INITIAL_DATA = {
  version: "3.5_boa_live_direct",
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

  // Chris REAL Empirical Expenses
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

  // 100% REAL EXACT BANK OF AMERICA ACCOUNTS & BALANCES (From your live portal screenshot)
  accounts: [
    { id: "boa_7333", name: "Papi Checking - 7333", type: "Checking", memberId: "chris", institution: "Bank of America", balance: -36.00, status: "Low Balance Alert" },
    { id: "boa_4866", name: "Spending Money - 4866", type: "Checking", memberId: "chris", institution: "Bank of America", balance: 468.24, status: "Active" },
    { id: "boa_4717", name: "Adv Plus Banking - 4717", type: "Checking", memberId: "chris", institution: "Bank of America", balance: 443.12, status: "Active" },
    { id: "boa_0495", name: "Advantage Savings - 0495", type: "Savings", memberId: "chris", institution: "Bank of America", balance: 2392.91, status: "Active" },
    { id: "boa_6343", name: "BankAmericard Visa - 6343", type: "Credit Card", memberId: "chris", institution: "Bank of America", balance: 4560.47, status: "Credit Card" },
    { id: "penfed_savings", name: "Mom's PenFed / BoA Savings", type: "Savings", memberId: "barbara", institution: "PenFed", balance: 76155.00, status: "Active" },
    { id: "capone_savings", name: "Capital One High-Yield Savings", type: "Savings", memberId: "chris", institution: "Capital One", balance: 5000.00, status: "Active High-Yield" },
    { id: "novo_business", name: "Novo Business Checking (Think! Design & Planning)", type: "Checking", memberId: "chris", institution: "Novo Bank", balance: 12450.00, status: "Active Business" },
    { id: "chris_nc_tsers", name: "TSERS Lifetime State Pension (Member #1875708)", type: "Pension", memberId: "chris", institution: "NC Retirement Systems (ORBIT)", balance: 1803.55, status: "Retires May 2040 (Age 60)", monthlyBenefit: 1803.55, beneficiary: "Erin Harrison", contributionRate: "6.0%", email: "wcharris@ncat.edu", serviceYears: 8.00, estimatedServiceYears2040: 22.00, accumulatedBalance: 40541.43, preTaxContributions: 36253.02, accumulatedInterest: 4288.41, currentYearSalary: 94615.96, afc: 63591.24, retirementDate: "2040-05-01", maxAllowance: 1803.55, option2Survivorship: 1682.89, option3Survivorship: 1741.15 },
    { id: "chris_ssa", name: "Social Security Retirement (Full Age 67)", type: "Government Pension", memberId: "chris", institution: "Social Security Administration (SSA)", balance: 3058.00, status: "Vested - 40 Credits", fraBenefit: 3058.00, fraAge: 67, disabilityBenefit: 2543.00, lastReportedIncome: 92996.00, workCredits: 40 },
    { id: "chris_nc_401k", name: "Chris NC A&T 401(k) / ORP Plan", type: "Retirement", memberId: "chris", institution: "Empower / NC State", balance: 145000.00, status: "Active NC State" },
    { id: "erin_nc_401k", name: "Erin NC Educator 401(k) / 403(b) Plan", type: "Retirement", memberId: "erin", institution: "Empower / NC State", balance: 110000.00, status: "Active NC Educator" },
    { id: "erin_cd_01", name: "Erin 12-Month High-Yield CD (5.15% APY)", type: "CD", memberId: "erin", institution: "Wells Fargo / Credit Union", balance: 25000.00, status: "Matures Nov 2026" }
  ],

  // 50 REAL LIVE RECENT TRANSACTIONS PARSED DIRECTLY FROM YOUR BOA FEED
  transactions: [
    { id: "boa_live_001", date: "2026-07-24", description: "CHECKCARD DD *DOORDASH NAZA +XXXXX819470 ON 07/23", amount: -68.27, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_002", date: "2026-07-24", description: "Lidl #1512 07/24 MOBILE PURCHASE GREENSBORO NC", amount: -20.42, category: "Groceries", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_003", date: "2026-07-24", description: "Zelle payment to Aubery g Conf# ogvz1zcdm", amount: -100.00, category: "Transfers & Cash", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_004", date: "2026-07-24", description: "GOOGLE *Google 07/24 PURCHASE Mountain View CA", amount: -24.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_005", date: "2026-07-24", description: "CLV*VECTORIZERAI 07/23 PURCHASE VECTORIZER.AI CA", amount: -9.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_006", date: "2026-07-23", description: "MCDONALD'S F6173 07/23 PURCHASE GREENSBORO NC", amount: -7.87, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_007", date: "2026-07-23", description: "CASH APP*CHRIS HOWELL 07/22 PMNT SENT Oakland CA", amount: -150.00, category: "Transfers & Cash", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_008", date: "2026-07-21", description: "CHICK-FIL-A #01818 07/21 PURCHASE GREENSBORO NC", amount: -21.17, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_009", date: "2026-07-22", description: "LOWE'S #387 07/22 MOBILE PURCHASE GREENSBORO NC", amount: -7.00, category: "Home & Utilities", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_010", date: "2026-07-22", description: "WWP*GROWINGREEN INC 07/21 PURCHASE 336-854-7999 NC", amount: -53.00, category: "Home & Utilities", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_011", date: "2026-07-22", description: "GOOGLE *Google 07/20 PURCHASE Mountain View CA", amount: -199.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_012", date: "2026-07-21", description: "LOWE'S #387 07/21 PURCHASE GREENSBORO NC", amount: -26.00, category: "Home & Utilities", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_013", date: "2026-07-21", description: "Lidl #1512 07/21 MOBILE PURCHASE GREENSBORO NC", amount: -4.38, category: "Groceries", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_014", date: "2026-07-21", description: "Lidl #1512 07/21 MOBILE PURCHASE GREENSBORO NC", amount: -25.11, category: "Groceries", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_015", date: "2026-07-21", description: "GOOGLE *Google 07/20 PURCHASE Mountain View CA", amount: -24.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_016", date: "2026-07-21", description: "AMAZON MKTPL*1Y7MC1XU3 07/19 PURCHASE Amzn.com/bill WA", amount: -62.86, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_017", date: "2026-07-21", description: "Online Banking transfer from SAV 0495 Confirmation# XXXXX57601", amount: 300.00, category: "Transfers & Cash", memberId: "chris", type: "income", source: "BoA Live Direct" },
    { id: "boa_live_018", date: "2026-07-20", description: "FOOD LION #269 07/20 MOBILE PURCHASE GREENSBORO NC", amount: -51.18, category: "Groceries", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_019", date: "2026-07-20", description: "AMAZON RETA* Q45MJ3JS3 07/19 PURCHASE WWW.AMAZON.CO WA", amount: -7.44, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_020", date: "2026-07-20", description: "GOOGLE *Google 07/19 PURCHASE Mountain View CA", amount: -24.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_021", date: "2026-07-20", description: "FOOD LION #269 07/19 MOBILE PURCHASE GREENSBORO NC", amount: -1.75, category: "Groceries", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_022", date: "2026-07-20", description: "FOOD LION #269 07/19 MOBILE PURCHASE GREENSBORO NC", amount: -30.12, category: "Groceries", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_023", date: "2026-07-20", description: "GOOGLE *Google 07/19 PURCHASE Mountain View CA", amount: -24.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_024", date: "2026-07-20", description: "Greensboro Coliseum 07/18 MOBILE PURCHASE Greensboro NC", amount: -7.95, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_025", date: "2026-07-20", description: "Greensboro Coliseum 07/18 PURCHASE Greensboro NC", amount: -20.36, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_026", date: "2026-07-20", description: "Greensboro Coliseum 07/18 PURCHASE Greensboro NC", amount: -20.43, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_027", date: "2026-07-20", description: "OVG360 GREENSBORO 07/18 PURCHASE GREENSBORO NC", amount: -30.00, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_028", date: "2026-07-20", description: "GOOGLE *Google 07/18 PURCHASE Mountain View CA", amount: -24.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_029", date: "2026-07-20", description: "GENCRAFT 07/18 PURCHASE WWW.GENCRAFT. WA", amount: -9.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_030", date: "2026-07-20", description: "GOOGLE *Google 07/18 PURCHASE Mountain View CA", amount: -24.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_031", date: "2026-07-20", description: "YEMENI & ARABIC RESTAUR 07/17 MOBILE PURCHASE GREENSBORO NC", amount: -43.04, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_032", date: "2026-07-20", description: "ELEVENLABS.IO 07/17 PURCHASE ELEVENLABS.IO NY", amount: -22.00, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_033", date: "2026-07-20", description: "TST* BOXCAR GREENSBORO 07/16 PURCHASE GREENSBORO NC", amount: -6.49, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_034", date: "2026-07-20", description: "Nyx*NAYAX VENDING 47 07/16 PURCHASE HUNT VALLEY MD", amount: -5.00, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_035", date: "2026-07-20", description: "NC SEC OF STATE CORP 07/16 PURCHASE 919-814-5325 NC", amount: -128.00, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_036", date: "2026-07-20", description: "AMAZON MKTPL*WH3WI87B3 07/16 PURCHASE Amzn.com/bill WA", amount: -28.79, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_037", date: "2026-07-20", description: "PF GREENSBORO GO DES:IClub Fees ID:PRXXXXX01192191 INDN:CHRIS HARRISON...", amount: -22.06, category: "Health & Fitness", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_038", date: "2026-07-20", description: "GOOGLE *Google 07/17 PURCHASE Mountain View CA", amount: -24.99, category: "Software & Business", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_039", date: "2026-07-20", description: "NAYAX VENDING 69 07/14 MOBILE PURCHASE HUNT VALLEY MD", amount: -20.00, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_040", date: "2026-07-20", description: "Online Banking transfer from CHK 4717 Confirmation# XXXXX27814", amount: 1000.00, category: "Transfers & Cash", memberId: "chris", type: "income", source: "BoA Live Direct" },
    { id: "boa_live_041", date: "2026-07-20", description: "Lidl #1512 07/16 MOBILE PURCHASE GREENSBORO NC", amount: -53.88, category: "Groceries", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_042", date: "2026-07-20", description: "FOUR SEASONS SMOOTHIE 07/15 MOBILE PURCHASE GREENSBORO NC", amount: -15.75, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_043", date: "2026-07-20", description: "SHEETZ 0356 07/15 MOBILE PURCHASE GREENSBORO NC", amount: -4.57, category: "Shopping & Entertainment", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_044", date: "2026-07-20", description: "CAROLINA VETERINARY SPE 07/15 PURCHASE GREENSBORO NC", amount: -293.50, category: "Health & Fitness", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_045", date: "2026-07-20", description: "TST* THE QUARTER 07/14 PURCHASE GREENSBORO NC", amount: -34.36, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_046", date: "2026-07-20", description: "TST* BOXCAR GREENSBORO 07/14 PURCHASE GREENSBORO NC", amount: -22.74, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_047", date: "2026-07-20", description: "TST* BOXCAR GREENSBORO 07/14 PURCHASE GREENSBORO NC", amount: -10.70, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_048", date: "2026-07-20", description: "TST* BOXCAR GREENSBORO 07/14 PURCHASE GREENSBORO NC", amount: -23.40, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_049", date: "2026-07-20", description: "TST* BOXCAR GREENSBORO 07/14 PURCHASE GREENSBORO NC", amount: -15.04, category: "Restaurants & Dining", memberId: "chris", type: "debit", source: "BoA Live Direct" },
    { id: "boa_live_050", date: "2026-07-20", description: "DUKEENERGY DES:BILL PAY ID:XXXXX7529642 INDN:WILLIAM HARRISON CO ID:DECJPM4638...", amount: -232.00, category: "Home & Utilities", memberId: "chris", type: "debit", source: "BoA Live Direct" }
  ]
};
