window.Dashboard = {
  init() {
    this.render();
    this.loadData();
    this.bindEvents();
  },
  
  refresh() {
    this.render();
    this.loadData();
  },
  
  render() {
    const section = document.getElementById('section-dashboard');
    if (!section) return;

    section.innerHTML = `
      <div class="dashboard-container">
        <!-- 1. WELCOME HERO -->
        <div class="hero-section card animate-fade-in-up" style="margin-bottom: 2rem; background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0)); backdrop-filter: blur(10px); border-radius: var(--radius-lg); padding: 2.5rem;">
          <h1 class="text-3xl font-bold mb-2">Good afternoon, Harrison Family</h1>
          <div class="flex-between align-center mt-4">
            <div class="flex-align-center gap-3">
              <div class="status-ring" style="width: 48px; height: 48px; border-radius: 50%; border: 4px solid var(--success); display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div>
                <p class="text-sm text-muted">Family Health Score</p>
                <p class="text-lg font-bold text-success">Excellent</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold" id="hero-date"></p>
              <p class="text-sm text-muted flex-align-center justify-end gap-2 mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Next bill: Mortgage (Due in 3 days)
              </p>
            </div>
          </div>
        </div>

        <!-- 2. TOP STATS ROW -->
        <div class="grid-4 mb-5 animate-fade-in-up" style="animation-delay: 0.1s">
          <!-- Combined Income -->
          <div class="card stat-card" style="border-top: 4px solid var(--success); box-shadow: 0 4px 20px rgba(74, 222, 128, 0.1);">
            <div class="flex-between mb-2">
              <div class="icon-circle" style="background: linear-gradient(135deg, rgba(74,222,128,0.2), transparent); padding: 8px; border-radius: 50%;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
            </div>
            <p class="text-sm text-muted">Combined Income</p>
            <p class="text-2xl font-mono font-bold" id="stat-income">$0.00</p>
            <p class="text-xs text-success flex-align-center mt-2 gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
              +2.4% from last month
            </p>
          </div>
          <!-- Total Budget -->
          <div class="card stat-card" style="border-top: 4px solid var(--warning); box-shadow: 0 4px 20px rgba(250, 204, 21, 0.1);">
            <div class="flex-between mb-2">
              <div class="icon-circle" style="background: linear-gradient(135deg, rgba(250,204,21,0.2), transparent); padding: 8px; border-radius: 50%;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
              </div>
            </div>
            <p class="text-sm text-muted">Total Budget</p>
            <p class="text-2xl font-mono font-bold" id="stat-budget">$0.00</p>
            <p class="text-xs text-warning flex-align-center mt-2 gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Adjusted for this month
            </p>
          </div>
          <!-- Net Cash Flow -->
          <div class="card stat-card" style="border-top: 4px solid var(--primary); box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);">
            <div class="flex-between mb-2">
              <div class="icon-circle" style="background: linear-gradient(135deg, rgba(59,130,246,0.2), transparent); padding: 8px; border-radius: 50%;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
            </div>
            <p class="text-sm text-muted">Net Cash Flow</p>
            <p class="text-2xl font-mono font-bold text-success" id="stat-cashflow">$0.00</p>
            <p class="text-xs text-primary flex-align-center mt-2 gap-1">
              Remaining after budget
            </p>
          </div>
          <!-- Net Worth -->
          <div class="card stat-card" style="border-top: 4px solid #a855f7; box-shadow: 0 4px 20px rgba(168, 85, 247, 0.1);">
            <div class="flex-between mb-2">
              <div class="icon-circle" style="background: linear-gradient(135deg, rgba(168,85,247,0.2), transparent); padding: 8px; border-radius: 50%;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><path d="M3 3v18h18"></path><path d="M18 9l-5 5-4-4-4 4"></path></svg>
              </div>
            </div>
            <p class="text-sm text-muted">Net Worth</p>
            <p class="text-2xl font-mono font-bold" id="stat-networth">$0.00</p>
            <p class="text-xs text-muted flex-align-center mt-2 gap-1">
              Estimated total assets
            </p>
          </div>
        </div>

        <!-- 3. FAMILY CARDS ROW -->
        <h3 class="mb-3 mt-6">Family Members</h3>
        <div class="grid-3 mb-5 animate-fade-in-up" style="animation-delay: 0.2s" id="family-cards-container">
          <!-- Populated by JS -->
        </div>

        <!-- 4. CHARTS ROW -->
        <div class="grid-2 mb-5 animate-fade-in-up" style="animation-delay: 0.3s">
          <div class="card">
            <h3 class="mb-4 text-lg font-bold">Monthly Cash Flow</h3>
            <div style="position: relative; height: 280px; display: flex; justify-content: center;">
              <canvas id="cashFlowChart"></canvas>
            </div>
          </div>
          <div class="card">
            <h3 class="mb-4 text-lg font-bold">Income Comparison</h3>
            <div style="position: relative; height: 280px; display: flex; justify-content: center;">
              <canvas id="incomeComparisonChart"></canvas>
            </div>
          </div>
        </div>

        <!-- 5. HOUSEHOLD SUMMARY -->
        <h3 class="mb-3 mt-6">Household Summary</h3>
        <div class="card mb-5 animate-fade-in-up" style="animation-delay: 0.4s">
          <div class="flex-between align-center" style="gap: 2rem;">
            <div style="flex: 1; text-align: center;">
              <p class="text-sm text-muted mb-2">Household Total</p>
              <h2 class="text-5xl font-mono font-bold text-primary mb-6" id="household-total">$0.00</h2>
              <div class="flex-around" id="household-members">
                <!-- Populated dynamically -->
              </div>
            </div>
            <div style="flex: 1; border-left: 1px solid var(--border-color); padding-left: 2rem;">
              <div style="position: relative; height: 220px; display: flex; justify-content: center;">
                <canvas id="householdPieChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. RECENT ACTIVITY -->
        <h3 class="mb-3 mt-6">Recent Activity</h3>
        <div class="card mb-5 animate-fade-in-up" style="animation-delay: 0.5s" style="padding: 0; overflow: hidden;">
          <div id="recent-activity-list" class="empty-state text-center p-5">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin: 0 auto 1rem;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <p class="text-muted mb-4">No transactions yet — import your BoA CSV to get started!</p>
            <button class="btn btn-primary" onclick="window.App && window.App.navigate('import')">Import Data</button>
          </div>
        </div>

      </div>
    `;
  },
  
  loadData() {
    if (window.App && window.App.getCurrentDate) {
      document.getElementById('hero-date').textContent = window.App.getCurrentDate();
    } else {
      const now = new Date();
      document.getElementById('hero-date').textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }

    const fmt = (v) => '$' + Math.abs(v).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    // Retrieve Data from Storage
    const members = window.Storage ? window.Storage.getMembers() : [];
    const transactions = window.Storage ? (window.Storage.data.transactions || []) : [];
    const budgets = window.Storage ? (window.Storage.data.budgets || []) : [];
    const accounts = window.Storage ? (window.Storage.data.accounts || []) : [];
    const householdFinance = window.Storage && window.Storage.data.householdFinance ? window.Storage.data.householdFinance : { totalHouseholdExpense: 0, members: {} };
    
    // Calculate Stats
    const totalIncome = members.reduce((sum, m) => sum + (m.income || 0), 0);
    const totalBudgetLimit = budgets.reduce((sum, b) => sum + (b.limit || 0), 0);
    const totalBudgetSpent = budgets.reduce((sum, b) => sum + Math.abs(b.spent || 0), 0);
    const netCashFlow = totalIncome - totalBudgetSpent;
    const netWorth = accounts.reduce((sum, a) => sum + (a.balance || 0), 0);

    // Update Stats DOM
    const statIncomeEl = document.getElementById('stat-income');
    const statBudgetEl = document.getElementById('stat-budget');
    const statCashflowEl = document.getElementById('stat-cashflow');
    const statNetworthEl = document.getElementById('stat-networth');
    
    if (statIncomeEl) statIncomeEl.textContent = fmt(totalIncome);
    if (statBudgetEl) statBudgetEl.textContent = fmt(totalBudgetLimit);
    if (statCashflowEl) statCashflowEl.textContent = fmt(netCashFlow);
    if (statNetworthEl) statNetworthEl.textContent = fmt(netWorth);

    // Household Total
    const householdTotalEl = document.getElementById('household-total');
    if (householdTotalEl) householdTotalEl.textContent = fmt(householdFinance.totalHouseholdExpense || 0);

    // Household Members Contributions
    const householdMembersEl = document.getElementById('household-members');
    if (householdMembersEl) {
      let hHtml = '';
      members.forEach(m => {
        const mKey = Object.keys(householdFinance.members || {}).find(k => k.toLowerCase() === m.name.toLowerCase());
        if (mKey) {
          const con = householdFinance.members[mKey].contribution || 0;
          hHtml += `
            <div class="text-center">
              <div style="background: ${m.color}; width: 48px; height: 48px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; font-size: 1.2rem;">${m.name.charAt(0)}</div>
              <p class="font-mono text-sm font-bold">${fmt(con)}</p>
            </div>
          `;
        }
      });
      householdMembersEl.innerHTML = hHtml;
    }

    this.renderFamilyCards();
    this.renderCharts();
    this.renderActivity();
  },

  renderFamilyCards() {
    const container = document.getElementById('family-cards-container');
    if (!container) return;

    const fmt = (v) => '$' + Math.abs(v).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    const members = window.Storage ? window.Storage.getMembers() : [];
    const householdFinance = window.Storage && window.Storage.data.householdFinance ? window.Storage.data.householdFinance : { members: {} };
    const transactions = window.Storage ? (window.Storage.data.transactions || []) : [];
    
    container.innerHTML = members.map(member => {
      let expenses = 0;
      transactions.forEach(t => {
        if (t.memberId === member.id && (t.type === 'expense' || t.amount < 0)) {
          expenses += Math.abs(t.amount);
        }
      });
      
      const mKey = Object.keys(householdFinance.members || {}).find(k => k.toLowerCase() === member.name.toLowerCase());
      const contribution = mKey ? (householdFinance.members[mKey].contribution || 0) : 0;
      const income = member.income || 0;
      const available = income - expenses - contribution;
      
      const incTotal = income || 1;
      const pExp = (expenses / incTotal) * 100;
      const pCon = (contribution / incTotal) * 100;
      const pAvail = (Math.max(0, available) / incTotal) * 100;

      return `
        <div class="card" style="border-top: 4px solid ${member.color}; transition: all 0.3s ease; cursor: default;" onmouseover="this.style.boxShadow='0 8px 25px ${member.color.replace(')', ', 0.2)').replace('hsl', 'hsla')}'" onmouseout="this.style.boxShadow='var(--shadow-md)'">
          <div class="flex-align-center gap-4 mb-5">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, ${member.color}, var(--bg-card)); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: bold; border: 2px solid ${member.color};">
              ${member.name.charAt(0)}
            </div>
            <div>
              <h3 class="font-bold text-xl mb-1">${member.name}</h3>
              <span class="badge" style="background: ${member.color}20; color: ${member.color}; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem;">${member.role}</span>
            </div>
          </div>
          
          <div class="grid-2 gap-3 mb-4">
            <div class="bg-secondary p-2 rounded">
              <p class="text-xs text-muted mb-1">Income</p>
              <p class="font-mono font-bold text-lg">${fmt(income)}</p>
            </div>
            <div class="bg-secondary p-2 rounded">
              <p class="text-xs text-muted mb-1">Available</p>
              <p class="font-mono font-bold text-lg text-success">${fmt(available)}</p>
            </div>
            <div class="bg-secondary p-2 rounded">
              <p class="text-xs text-muted mb-1">Expenses</p>
              <p class="font-mono font-bold">${fmt(expenses)}</p>
            </div>
            <div class="bg-secondary p-2 rounded">
              <p class="text-xs text-muted mb-1">Contribution</p>
              <p class="font-mono font-bold text-warning">${fmt(contribution)}</p>
            </div>
          </div>

          <div style="height: 8px; border-radius: 4px; display: flex; overflow: hidden; background: var(--bg-secondary);">
            <div style="width: ${pExp}%; background: var(--danger);" title="Expenses"></div>
            <div style="width: ${pCon}%; background: var(--warning);" title="Contribution"></div>
            <div style="width: ${pAvail}%; background: var(--success);" title="Available"></div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderCharts() {
    if (window.Charts) {
      setTimeout(() => {
        // Cash Flow Donut
        const transactions = window.Storage ? (window.Storage.data.transactions || []) : [];
        let tIncome = 0;
        let tExpenses = 0;
        transactions.forEach(t => {
          if (t.type === 'income' || t.amount > 0) tIncome += Math.abs(t.amount);
          else tExpenses += Math.abs(t.amount);
        });
        const householdTotal = window.Storage && window.Storage.data.householdFinance ? window.Storage.data.householdFinance.totalHouseholdExpense : 0;
        const tAvailable = tIncome - tExpenses - householdTotal;

        window.Charts.donut('cashFlowChart', [
          { label: 'Available', value: Math.max(0, tAvailable), color: '#4ade80' },
          { label: 'Expenses', value: tExpenses, color: '#f87171' },
          { label: 'Household', value: householdTotal, color: '#fbbf24' }
        ], { responsive: true, maintainAspectRatio: false });

        // Income Comparison
        const members = window.Storage ? window.Storage.getMembers() : [];
        const incLabels = members.map(m => m.name);
        const incValues = members.map(m => m.income || 0);
        const incColors = members.map(m => m.color || '#3b82f6');

        window.Charts.bar('incomeComparisonChart', {
          labels: incLabels,
          datasets: [{
            label: 'Income',
            values: incValues,
            color: incColors
          }]
        }, { responsive: true, maintainAspectRatio: false });

        // Household Pie
        const budgets = window.Storage ? (window.Storage.data.budgets || []) : [];
        const budgColors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];
        const budgData = budgets.map((b, i) => ({
          label: b.category || 'Misc',
          value: Math.abs(b.spent || 0),
          color: budgColors[i % budgColors.length]
        })).filter(b => b.value > 0);
        
        if (budgData.length === 0) {
          budgData.push({label: 'No Data', value: 1, color: '#6b7280'});
        }

        window.Charts.donut('householdPieChart', budgData, { responsive: true, maintainAspectRatio: false });
      }, 100);
    }
  },

  renderActivity() {
    const list = document.getElementById('recent-activity-list');
    if (!list) return;

    let txns = window.Storage ? [...(window.Storage.data.transactions || [])] : [];
    txns.sort((a, b) => new Date(b.date) - new Date(a.date));
    txns = txns.slice(0, 10);

    const fmt = (v) => '$' + Math.abs(v).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    if (txns.length === 0) {
      list.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin: 0 auto 1rem;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <p class="text-muted mb-4">No transactions yet — import your BoA CSV to get started!</p>
        <button class="btn btn-primary" onclick="window.App && window.App.navigate('import')">Import Data</button>
      `;
      list.classList.add('empty-state', 'text-center', 'p-5');
      return;
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      if (dateStr.startsWith(todayStr)) return 'Today';
      if (dateStr.startsWith(yesterdayStr)) return 'Yesterday';
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const familyMembers = window.Storage && window.Storage.data.family && window.Storage.data.family.members 
      ? window.Storage.data.family.members 
      : [];

    let html = '<div class="transaction-list" style="margin: -1.5rem;">';
    txns.forEach(t => {
      const isIncome = t.type === 'income' || t.amount > 0;
      const color = isIncome ? 'var(--success)' : 'var(--text-main)';
      const sign = isIncome ? '+' : '-';
      
      const member = familyMembers.find(m => m.id === t.memberId);
      const memberName = member ? member.name : 'Unknown';
      const memberColor = member && member.color ? member.color : 'var(--text-muted)';
      const firstInitial = memberName.charAt(0).toUpperCase();
      
      const displayDate = formatDate(t.date);

      html += `
        <div class="flex-between align-center p-4 hover-bg" style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;">
          <div class="flex-align-center gap-4">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: ${memberColor}20; color: ${memberColor}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">
              ${firstInitial}
            </div>
            <div class="text-left">
              <p class="font-bold text-lg">${t.description || t.name || 'Transaction'}</p>
              <p class="text-sm text-muted">${displayDate}</p>
            </div>
          </div>
          <p class="font-mono font-bold text-lg" style="color: ${color}">${sign}${fmt(t.amount)}</p>
        </div>
      `;
    });
    html += '</div>';
    list.innerHTML = html;
    list.classList.remove('empty-state', 'text-center', 'p-5');
  },

  bindEvents() {}
};
