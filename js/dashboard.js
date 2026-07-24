window.Dashboard = {
  init() {
    this.render();
    this.bindEvents();
    this.loadData();
  },
  render() {
    const section = document.getElementById('section-dashboard');
    if (!section) return;
    
    section.innerHTML = `
      <div class="dashboard-container">
        <!-- TOP ROW - 4 stat cards in .grid-4 -->
        <div class="grid-4 top-stats animate-fade-in-up">
          <div class="stat-card card" style="border-top: 4px solid var(--accent-green, #4ade80)">
            <div class="stat-header" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="stat-title text-sm">Combined Income</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-green, #4ade80)"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            </div>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="dash-combined-income">...</div>
          </div>
          <div class="stat-card card" style="border-top: 4px solid var(--accent-red, #f87171)">
            <div class="stat-header" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="stat-title text-sm">Total Expenses</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-red, #f87171)"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path><path d="M16 14h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path></svg>
            </div>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="dash-total-expenses">...</div>
          </div>
          <div class="stat-card card" id="dash-net-cash-card">
            <div class="stat-header" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="stat-title text-sm">Net Cash Flow</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="dash-net-cash">...</div>
          </div>
          <div class="stat-card card" style="border-top: 4px solid var(--accent-purple, #c084fc)">
            <div class="stat-header" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="stat-title text-sm">Net Worth</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-purple, #c084fc)"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
            </div>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="dash-net-worth">...</div>
          </div>
        </div>

        <!-- SECOND ROW - 3 family member cards in .grid-3 -->
        <div class="grid-3 member-cards animate-fade-in-up mt-4" style="animation-delay: 0.1s" id="dash-member-cards">
          <!-- Populated by JS -->
        </div>

        <!-- THIRD ROW - 2 charts in .grid-2 -->
        <div class="grid-2 dashboard-charts animate-fade-in-up mt-4" style="animation-delay: 0.2s">
          <div class="card">
            <h3 class="mb-4">Monthly Cash Flow Allocation</h3>
            <div class="chart-container" style="display:flex; justify-content:center;">
              <canvas id="dash-donut-chart"></canvas>
            </div>
          </div>
          <div class="card">
            <h3 class="mb-4">Family Income Split</h3>
            <div class="chart-container">
              <canvas id="dash-bar-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- FOURTH ROW - Household Contribution Summary -->
        <div class="card animate-fade-in-up mt-4" style="animation-delay: 0.3s">
          <h3 class="mb-4">Household Contribution Summary</h3>
          <div id="dash-household-summary">
            <!-- Populated by JS -->
          </div>
        </div>

        <!-- FIFTH ROW - Recent Activity -->
        <div class="card animate-fade-in-up mt-4" style="animation-delay: 0.4s">
          <h3 class="mb-4">Recent Activity</h3>
          <div id="dash-recent-activity">
            <!-- Populated by JS -->
          </div>
        </div>
      </div>
    `;
  },
  bindEvents() {
    // Dashboard events if any
  },
  loadData() {
    this.updateTopStats();
    this.updateMemberCards();
    setTimeout(() => { this.updateCharts(); }, 100); // Allow DOM to render canvas
    this.updateHouseholdSummary();
    this.updateRecentActivity();
  },
  refresh() {
    this.loadData();
  },
  updateTopStats() {
    if (!window.Storage || !window.App) return;
    const combinedIncome = Storage.getCombinedMonthlyIncome ? Storage.getCombinedMonthlyIncome() : 12692.11;
    const hf = Storage.getHouseholdFinance ? Storage.getHouseholdFinance() : { totalHouseholdExpense: 3321.12 };
    const netCashFlow = combinedIncome - hf.totalHouseholdExpense;
    const netWorth = Storage.getNetWorth ? Storage.getNetWorth() : 0;

    document.getElementById('dash-combined-income').textContent = App.formatCurrency(combinedIncome);
    document.getElementById('dash-total-expenses').textContent = App.formatCurrency(hf.totalHouseholdExpense);
    
    const cashFlowEl = document.getElementById('dash-net-cash');
    cashFlowEl.textContent = App.formatCurrency(netCashFlow);
    const netCashCard = document.getElementById('dash-net-cash-card');
    if (netCashFlow >= 0) {
      cashFlowEl.style.color = 'var(--success-color, #4ade80)';
      netCashCard.style.borderTop = '4px solid var(--success-color, #4ade80)';
    } else {
      cashFlowEl.style.color = 'var(--danger-color, #f87171)';
      netCashCard.style.borderTop = '4px solid var(--danger-color, #f87171)';
    }

    document.getElementById('dash-net-worth').textContent = App.formatCurrency(netWorth);
  },
  updateMemberCards() {
    const container = document.getElementById('dash-member-cards');
    if (!container || !window.Storage || !window.App) return;

    const hf = Storage.getHouseholdFinance ? Storage.getHouseholdFinance() : null;
    if (!hf || !hf.members) return;

    let html = '';
    const membersData = [
      { id: 'barbara', name: 'Barbara', ...hf.members.barbara },
      { id: 'chris', name: 'Chris', ...hf.members.chris },
      { id: 'erin', name: 'Erin', ...hf.members.erin }
    ];

    membersData.forEach(m => {
      const color = App.getMemberColor ? App.getMemberColor(m.id) : '#000';
      const initial = m.name.charAt(0);
      
      const expPct = (m.expenses / m.income) * 100;
      const contribPct = (m.contribution / m.income) * 100;
      const availPct = (m.available / m.income) * 100;

      html += `
        <div class="card" style="border-top: 4px solid ${color}">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
            <div class="avatar-circle" style="background-color: ${color}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">
              ${initial}
            </div>
            <h3 style="margin:0">${m.name}</h3>
          </div>
          <div style="margin-bottom: 15px; font-size: 0.9em;">
            <div style="display:flex; justify-content: space-between; margin-bottom: 8px;">
              <span class="text-muted">Income</span> <span class="dm-mono">${App.formatCurrency(m.income)}</span>
            </div>
            <div style="display:flex; justify-content: space-between; margin-bottom: 8px;">
              <span class="text-muted">Expenses</span> <span class="dm-mono">${App.formatCurrency(m.expenses)}</span>
            </div>
            <div style="display:flex; justify-content: space-between; margin-bottom: 8px;">
              <span class="text-muted">Contribution</span> <span class="dm-mono">${App.formatCurrency(m.contribution)}</span>
            </div>
            <div style="display:flex; justify-content: space-between; font-weight: bold; padding-top: 8px; border-top: 1px solid var(--border-color, #eee); margin-top: 8px;">
              <span>Available</span> <span class="dm-mono gradient-text" style="color: var(--success-color, #4ade80)">${App.formatCurrency(m.available)}</span>
            </div>
          </div>
          <!-- Progress bar breakdown -->
          <div class="progress-bar mt-2" style="height: 8px; display: flex; border-radius: 4px; overflow: hidden; background: var(--bg-tertiary, #eee); width: 100%;">
            <div class="progress-bar-fill" style="width: ${expPct}%; background: var(--danger-color, #f87171);" title="Expenses: ${App.formatPercent(expPct/100)}"></div>
            <div class="progress-bar-fill" style="width: ${contribPct}%; background: var(--warning-color, #fbbf24);" title="Contribution: ${App.formatPercent(contribPct/100)}"></div>
            <div class="progress-bar-fill" style="width: ${availPct}%; background: var(--success-color, #4ade80);" title="Available: ${App.formatPercent(availPct/100)}"></div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  },
  updateCharts() {
    if (!window.Charts || !window.Storage || !window.App) return;
    
    // Donut chart
    const donutData = [
      {label: 'Home', value: 1500, color: '#f87171'},
      {label: 'Fixed', value: 1230, color: '#fb923c'},
      {label: 'Groceries', value: 700, color: '#fbbf24'},
      {label: 'Retirement', value: 900, color: '#34d399'},
      {label: 'Vacation', value: 300, color: '#2dd4bf'},
      {label: 'Kids', value: 400, color: '#38bdf8'},
      {label: 'Insurance', value: 175, color: '#818cf8'},
      {label: 'Discretionary', value: 1000, color: '#c084fc'},
      {label: 'Emergency', value: 350, color: '#f472b6'},
      {label: 'Available', value: 5479.26, color: '#4ade80'}
    ];
    window.Charts.donut('dash-donut-chart', donutData, { size: 250, innerRadius: 0.6, showLegend: true });

    // Bar chart
    const hf = Storage.getHouseholdFinance ? Storage.getHouseholdFinance() : null;
    if (hf && hf.members) {
      const barData = {
        labels: ['Barbara', 'Chris', 'Erin'],
        datasets: [{
          label: 'Income',
          values: [hf.members.barbara.income || 0, hf.members.chris.income || 0, hf.members.erin.income || 0],
          color: 'hsl(200, 85%, 55%)'
        }]
      };
      window.Charts.bar('dash-bar-chart', barData, { height: 250, stacked: false, showValues: true });
    }
  },
  updateHouseholdSummary() {
    const container = document.getElementById('dash-household-summary');
    if (!container || !window.Storage || !window.App) return;
    
    const hf = Storage.getHouseholdFinance ? Storage.getHouseholdFinance() : null;
    if (!hf) return;
    
    container.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <p class="mb-2">Total Household Expenses: <strong class="dm-mono text-lg">${App.formatCurrency(hf.totalHouseholdExpense)}</strong></p>
          <p class="mb-2">Per Person Contribution: <strong class="dm-mono text-lg">${App.formatCurrency(hf.contributionPerPerson)}</strong> <span class="text-muted">/ month</span></p>
          <p class="text-sm text-muted mt-4">This covers common bills like mortgage, utilities, and joint expenses, split evenly among 3 adults.</p>
        </div>
      </div>
    `;
  },
  updateRecentActivity() {
    const container = document.getElementById('dash-recent-activity');
    if (!container || !window.Storage || !window.App) return;

    const txns = Storage.getTransactions ? Storage.getTransactions().slice(0, 5) : [];
    
    if (txns.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align:center; padding: 40px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5; margin: 0 auto 10px auto;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <p class="text-muted">No transactions yet. Add your first transaction!</p>
        </div>
      `;
      return;
    }
    
    let html = '<div class="data-table" style="overflow-x:auto;"><table style="width:100%; text-align:left;"><thead><tr><th style="padding:10px; border-bottom:1px solid var(--border-color, #eee);">Date</th><th style="padding:10px; border-bottom:1px solid var(--border-color, #eee);">Description</th><th style="padding:10px; border-bottom:1px solid var(--border-color, #eee); text-align:right;">Amount</th></tr></thead><tbody>';
    txns.forEach(t => {
      html += `<tr>
        <td style="padding:10px; border-bottom:1px solid var(--border-color, #eee);">${App.formatDate(t.date)}</td>
        <td style="padding:10px; border-bottom:1px solid var(--border-color, #eee);">${t.description}</td>
        <td class="dm-mono" style="padding:10px; border-bottom:1px solid var(--border-color, #eee); text-align:right;">${App.formatCurrency(t.amount)}</td>
      </tr>`;
    });
    html += '</tbody></table></div>';
    container.innerHTML = html;
  }
};
