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
            <p class="text-2xl font-mono font-bold" id="stat-income">$12,692.11</p>
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
            <p class="text-2xl font-mono font-bold" id="stat-budget">$4,065.73</p>
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
            <p class="text-2xl font-mono font-bold text-success" id="stat-cashflow">$8,626.38</p>
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
            <p class="text-2xl font-mono font-bold" id="stat-networth">$125,430.00</p>
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
              <h2 class="text-5xl font-mono font-bold text-primary mb-6">$3,321.12</h2>
              <div class="flex-around">
                <div class="text-center">
                  <div style="background: hsl(280, 70%, 60%); width: 48px; height: 48px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; font-size: 1.2rem;">B</div>
                  <p class="font-mono text-sm font-bold">$1,049.04</p>
                </div>
                <div class="text-center">
                  <div style="background: hsl(250, 85%, 60%); width: 48px; height: 48px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; font-size: 1.2rem;">C</div>
                  <p class="font-mono text-sm font-bold">$1,049.04</p>
                </div>
                <div class="text-center">
                  <div style="background: hsl(340, 85%, 60%); width: 48px; height: 48px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; font-size: 1.2rem;">E</div>
                  <p class="font-mono text-sm font-bold">$1,049.04</p>
                </div>
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
            <button class="btn btn-primary" onclick="window.app && window.app.navigate('import')">Import Data</button>
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

    this.renderFamilyCards();
    this.renderCharts();
    this.renderActivity();
  },

  renderFamilyCards() {
    const container = document.getElementById('family-cards-container');
    if (!container) return;

    const formatFn = window.App && window.App.formatCurrency ? window.App.formatCurrency : (v) => '$' + v.toFixed(2);

    const family = [
      { name: 'Barbara', role: 'Primary', income: 5645.84, expenses: 1479.11, contribution: 1049.04, available: 3117.69, color: 'hsl(280, 70%, 60%)' },
      { name: 'Chris', role: 'Primary', income: 4546.27, expenses: 1356.62, contribution: 1049.04, available: 2140.61, color: 'hsl(250, 85%, 60%)' },
      { name: 'Erin', role: 'Spouse', income: 2500.00, expenses: 1230.00, contribution: 1049.04, available: 220.96, color: 'hsl(340, 85%, 60%)' }
    ];

    container.innerHTML = family.map(member => {
      const incTotal = member.income;
      const pExp = (member.expenses / incTotal) * 100;
      const pCon = (member.contribution / incTotal) * 100;
      const pAvail = (member.available / incTotal) * 100;

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
              <p class="font-mono font-bold text-lg">${formatFn(member.income)}</p>
            </div>
            <div class="bg-secondary p-2 rounded">
              <p class="text-xs text-muted mb-1">Available</p>
              <p class="font-mono font-bold text-lg text-success">${formatFn(member.available)}</p>
            </div>
            <div class="bg-secondary p-2 rounded">
              <p class="text-xs text-muted mb-1">Expenses</p>
              <p class="font-mono font-bold">${formatFn(member.expenses)}</p>
            </div>
            <div class="bg-secondary p-2 rounded">
              <p class="text-xs text-muted mb-1">Contribution</p>
              <p class="font-mono font-bold text-warning">${formatFn(member.contribution)}</p>
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
        window.Charts.donut('cashFlowChart', [
          { label: 'Available', value: 5479.26, color: '#4ade80' },
          { label: 'Expenses', value: 4065.73, color: '#f87171' },
          { label: 'Household', value: 3147.12, color: '#fbbf24' }
        ], { responsive: true, maintainAspectRatio: false });

        window.Charts.bar('incomeComparisonChart', {
          labels: ['Barbara', 'Chris', 'Erin'],
          datasets: [{
            label: 'Income',
            values: [5645.84, 4546.27, 2500],
            color: ['hsl(280, 70%, 60%)', 'hsl(250, 85%, 60%)', 'hsl(340, 85%, 60%)']
          }]
        }, { responsive: true, maintainAspectRatio: false });

        window.Charts.donut('householdPieChart', [
          { label: 'Mortgage', value: 1800, color: '#a855f7' },
          { label: 'Utilities', value: 450, color: '#3b82f6' },
          { label: 'Groceries', value: 800, color: '#10b981' },
          { label: 'Misc', value: 271.12, color: '#f59e0b' }
        ], { responsive: true, maintainAspectRatio: false });
      }, 100);
    }
  },

  renderActivity() {
    const list = document.getElementById('recent-activity-list');
    if (!list) return;

    const txns = [
      { date: 'Today', name: 'NC A&T Payroll', amount: 4537.96, type: 'income', member: 'Chris' },
      { date: 'Yesterday', name: 'Erin Zelle to Chris', amount: 650.00, type: 'income', member: 'Erin' },
      { date: 'Jul 15', name: 'Barbara OPM Pension', amount: 5974.31, type: 'income', member: 'Barbara' },
      { date: 'Jul 14', name: 'BoA Cash Rewards', amount: -150.00, type: 'expense', member: 'Chris' }
    ];

    const formatFn = window.App && window.App.formatCurrency ? window.App.formatCurrency : (v) => '$' + Math.abs(v).toFixed(2);

    let html = '<div class="transaction-list" style="margin: -1.5rem;">';
    txns.forEach(t => {
      const isIncome = t.type === 'income' || t.amount > 0;
      const color = isIncome ? 'var(--success)' : 'var(--text-main)';
      const sign = isIncome ? '+' : '-';
      
      let memberColor = 'var(--text-muted)';
      if (t.member === 'Barbara') memberColor = 'hsl(280, 70%, 60%)';
      if (t.member === 'Chris') memberColor = 'hsl(250, 85%, 60%)';
      if (t.member === 'Erin') memberColor = 'hsl(340, 85%, 60%)';

      html += `
        <div class="flex-between align-center p-4 hover-bg" style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;">
          <div class="flex-align-center gap-4">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: ${memberColor}20; color: ${memberColor}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">
              ${t.member.charAt(0)}
            </div>
            <div class="text-left">
              <p class="font-bold text-lg">${t.name}</p>
              <p class="text-sm text-muted">${t.date}</p>
            </div>
          </div>
          <p class="font-mono font-bold text-lg" style="color: ${color}">${sign}${formatFn(Math.abs(t.amount))}</p>
        </div>
      `;
    });
    html += '</div>';
    list.innerHTML = html;
    list.classList.remove('empty-state', 'text-center', 'p-5');
  },

  bindEvents() {}
};
