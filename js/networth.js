window.NetWorth = {
  init() {
    this.render();
    this.bindEvents();
    this.loadData();
  },

  render() {
    const section = document.getElementById('section-networth');
    if (!section) return;

    section.innerHTML = `
      <div class="header-row">
        <h2 class="gradient-text">Net Worth</h2>
        <div class="header-actions">
          <button id="btn-take-snapshot" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            Take Snapshot
          </button>
        </div>
      </div>

      <div class="card hero-stat animate-fade-in-up" style="text-align: center; padding: 3rem;">
        <h3 style="color: var(--text-muted);">Current Net Worth</h3>
        <h1 id="nw-total" class="dm-mono gradient-text" style="font-size: 4rem; margin: 1rem 0;">$0.00</h1>
        <div class="grid-2" style="max-width: 600px; margin: 0 auto; text-align: left;">
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Assets</span>
              <span id="nw-assets" class="dm-mono text-success">$0.00</span>
            </div>
            <div class="progress-bar"><div class="progress-bar-fill bg-success" style="width: 100%;"></div></div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span>Liabilities</span>
              <span id="nw-liabilities" class="dm-mono text-danger">$0.00</span>
            </div>
            <div class="progress-bar"><div class="progress-bar-fill bg-danger" style="width: 100%;"></div></div>
          </div>
        </div>
      </div>

      <div class="grid-2" style="margin-top: 2rem;">
        <div class="card animate-fade-in-up" style="animation-delay: 0.1s;">
          <h3>Assets vs Liabilities</h3>
          <div class="chart-container">
            <canvas id="chart-nw-bar"></canvas>
          </div>
        </div>
        <div class="card animate-fade-in-up" style="animation-delay: 0.2s;">
          <h3>Asset Allocation</h3>
          <div class="chart-container">
            <canvas id="chart-nw-donut"></canvas>
          </div>
        </div>
      </div>

      <div class="card animate-fade-in-up" style="margin-top: 2rem; animation-delay: 0.3s;">
        <h3>Net Worth Over Time</h3>
        <div class="chart-container">
          <canvas id="chart-nw-timeline"></canvas>
        </div>
      </div>

      <div class="card animate-fade-in-up" style="margin-top: 2rem; animation-delay: 0.4s;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3>Accounts List</h3>
          <button id="btn-add-account" class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Account
          </button>
        </div>
        <div id="nw-accounts-list"></div>
      </div>

      <div class="grid-3" id="nw-member-breakdown" style="margin-top: 2rem;">
        <!-- Member cards go here -->
      </div>
    `;
  },

  bindEvents() {
    document.getElementById('btn-take-snapshot')?.addEventListener('click', () => {
      this.takeSnapshot();
    });

    document.getElementById('btn-add-account')?.addEventListener('click', () => {
      // Logic to open add account modal
      App.showToast('Add account modal triggered (to be implemented)');
    });
  },

  loadData() {
    if (!window.Storage) return;
    
    const assets = window.Storage.getTotalAssets() || 0;
    const liabilities = window.Storage.getTotalLiabilities() || 0;
    const netWorth = window.Storage.getNetWorth() || 0;

    this.animateValue('nw-total', netWorth);
    this.animateValue('nw-assets', assets);
    this.animateValue('nw-liabilities', liabilities);

    this.renderCharts();
    this.renderAccountsList();
    this.renderMemberBreakdown();
  },

  animateValue(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    
    // Simple counter animation
    const duration = 1000;
    const steps = 30;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let current = 0;
    const increment = target / steps;
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = App.formatCurrency(current);
    }, stepTime);
  },

  renderCharts() {
    if (!window.Charts || !window.Storage) return;

    // Assets vs Liabilities
    window.Charts.horizontalBar('chart-nw-bar', [
      { label: 'Assets', value: window.Storage.getTotalAssets() || 0, color: 'hsl(140, 70%, 50%)' },
      { label: 'Liabilities', value: window.Storage.getTotalLiabilities() || 0, color: 'hsl(350, 70%, 50%)' }
    ]);

    // Asset Allocation
    const accounts = window.Storage.getAccounts() || [];
    const types = {};
    accounts.forEach(a => {
      if (a.balance > 0) {
        types[a.type] = (types[a.type] || 0) + a.balance;
      }
    });
    
    const donutData = Object.entries(types).map(([type, val], idx) => ({
      label: type,
      value: val,
      color: `hsl(${idx * 60 + 200}, 70%, 50%)`
    }));

    window.Charts.donut('chart-nw-donut', donutData, { showLegend: true });

    // Net Worth Timeline
    const snapshots = window.Storage.getSnapshots() || [];
    if (snapshots.length > 0) {
      const timelineData = {
        labels: snapshots.map(s => App.formatDate(s.date)),
        datasets: [{
          label: 'Net Worth',
          values: snapshots.map(s => s.netWorth),
          color: 'hsl(250, 70%, 60%)',
          fill: true
        }]
      };
      window.Charts.line('chart-nw-timeline', timelineData, { smooth: true, showDots: true });
    }
  },

  renderAccountsList() {
    const container = document.getElementById('nw-accounts-list');
    if (!container || !window.Storage) return;

    const accounts = window.Storage.getAccounts() || [];
    if (accounts.length === 0) {
      container.innerHTML = `<div class="empty-state">No accounts found. Add one to start tracking your net worth!</div>`;
      return;
    }

    let html = '<div class="data-table"><table><thead><tr><th>Name</th><th>Institution</th><th>Member</th><th style="text-align:right">Balance</th></tr></thead><tbody>';
    
    accounts.forEach(acc => {
      html += `
        <tr>
          <td>${acc.name} <span class="badge">${acc.type}</span></td>
          <td>${acc.institution}</td>
          <td><span class="member-badge" style="background:${App.getMemberColor(acc.memberId)}">${acc.memberId}</span></td>
          <td class="dm-mono" style="text-align:right; color: ${acc.balance >= 0 ? 'var(--text)' : 'var(--danger)'}">${App.formatCurrency(acc.balance)}</td>
        </tr>
      `;
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
  },

  renderMemberBreakdown() {
    const container = document.getElementById('nw-member-breakdown');
    if (!container || !window.Storage) return;

    const members = window.Storage.getMembers() || {};
    const adults = ['barbara', 'chris', 'erin'].filter(id => members[id]);
    
    let html = '';
    adults.forEach(id => {
      const memAccounts = window.Storage.getAccountsByMember(id) || [];
      const memNetWorth = memAccounts.reduce((sum, a) => sum + (a.balance || 0), 0);
      
      html += `
        <div class="card stat-card" style="border-top: 4px solid ${App.getMemberColor(id)}">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div class="avatar-circle" style="background: ${App.getMemberColor(id)}">${id.charAt(0).toUpperCase()}</div>
            <h3>${id.charAt(0).toUpperCase() + id.slice(1)}</h3>
          </div>
          <h2 class="dm-mono">${App.formatCurrency(memNetWorth)}</h2>
          <p class="text-muted" style="margin-top: 0.5rem;">${memAccounts.length} accounts</p>
        </div>
      `;
    });
    
    container.innerHTML = html;
  },

  takeSnapshot() {
    if (!window.Storage) return;
    
    window.Storage.addSnapshot();
    App.showToast('Snapshot saved successfully!');
    if (window.Confetti) Confetti.celebrate();
    this.loadData();
  },

  refresh() {
    this.loadData();
  }
};
