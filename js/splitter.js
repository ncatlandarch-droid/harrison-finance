window.Splitter = {
  init() {
    this.render();
    this.bindEvents();
    this.loadData();
  },

  render() {
    const section = document.getElementById('section-split');
    if (!section) return;

    section.innerHTML = `
      <div class="header-row">
        <h2 class="gradient-text">Expense Splitter</h2>
        <button id="btn-add-expense" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Shared Expense
        </button>
      </div>

      <div class="grid-3" id="split-balances" style="margin-bottom: 2rem;">
        <!-- Balance cards populated here -->
      </div>

      <div class="card animate-fade-in-up" style="margin-bottom: 2rem; animation-delay: 0.1s;">
        <h3>Settlement Summary</h3>
        <div id="split-settlements"></div>
      </div>

      <div class="card animate-fade-in-up" style="animation-delay: 0.2s;">
        <h3>Shared Expenses</h3>
        <div id="split-expenses-list"></div>
      </div>
    `;
  },

  bindEvents() {
    document.getElementById('btn-add-expense')?.addEventListener('click', () => {
      App.showToast('Add Shared Expense modal triggered');
      // logic for opening modal
    });
  },

  loadData() {
    this.renderBalances();
    this.renderSettlements();
    this.renderExpenses();
  },

  renderBalances() {
    const container = document.getElementById('split-balances');
    if (!container || !window.Storage) return;

    // This is a simplified balance logic for presentation
    const adults = ['barbara', 'chris', 'erin'];
    let html = '';
    
    // Mock balances since we don't have full data populated
    const mockBalances = { barbara: -150, chris: 300, erin: -150 };

    adults.forEach((id, idx) => {
      const bal = mockBalances[id] || 0;
      const isOwed = bal > 0;
      const isNeutral = bal === 0;
      
      html += `
        <div class="card stat-card animate-fade-in-up" style="animation-delay: ${idx * 0.1}s">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div class="avatar-circle" style="background: ${App.getMemberColor(id)}">${id.charAt(0).toUpperCase()}</div>
            <h3>${id.charAt(0).toUpperCase() + id.slice(1)}</h3>
          </div>
          <div style="display: flex; flex-direction: column;">
            <span class="text-muted">${isNeutral ? 'Settled up' : (isOwed ? 'Gets back' : 'Owes')}</span>
            <h2 class="dm-mono ${isNeutral ? '' : (isOwed ? 'text-success' : 'text-danger')}">
              ${isNeutral ? '$0.00' : App.formatCurrency(Math.abs(bal))}
            </h2>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderSettlements() {
    const container = document.getElementById('split-settlements');
    if (!container) return;

    // Mock settlements
    const settlements = [
      { from: 'barbara', to: 'chris', amount: 150 },
      { from: 'erin', to: 'chris', amount: 150 }
    ];

    if (settlements.length === 0) {
      container.innerHTML = '<div class="empty-state">Everyone is settled up! 🎉</div>';
      return;
    }

    let html = '<div class="list-group">';
    settlements.forEach(s => {
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid var(--border);">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="member-badge" style="background: ${App.getMemberColor(s.from)}">${s.from}</span>
            <span>owes</span>
            <span class="member-badge" style="background: ${App.getMemberColor(s.to)}">${s.to}</span>
            <span class="dm-mono" style="font-weight: bold; margin-left: 0.5rem;">${App.formatCurrency(s.amount)}</span>
          </div>
          <button class="btn btn-sm" onclick="App.showToast('Marked as settled')">Settle</button>
        </div>
      `;
    });
    html += '</div>';
    
    container.innerHTML = html;
  },

  renderExpenses() {
    const container = document.getElementById('split-expenses-list');
    if (!container || !window.Storage) return;

    const expenses = window.Storage.getSharedExpenses ? window.Storage.getSharedExpenses() : [];
    
    if (expenses.length === 0) {
      container.innerHTML = `<div class="empty-state">No shared expenses yet. Add one to get started!</div>`;
      return;
    }

    let html = '<div class="data-table"><table><thead><tr><th>Date</th><th>Description</th><th>Paid By</th><th>Amount</th><th>Method</th><th></th></tr></thead><tbody>';
    
    expenses.forEach(exp => {
      html += `
        <tr>
          <td>${App.formatDate(exp.date)}</td>
          <td>${exp.description}</td>
          <td><span class="member-badge" style="background:${App.getMemberColor(exp.paidBy)}">${exp.paidBy}</span></td>
          <td class="dm-mono">${App.formatCurrency(exp.amount)}</td>
          <td><span class="badge">${exp.splitMethod}</span></td>
          <td>
            <button class="btn btn-sm" style="color: var(--danger)" onclick="App.showToast('Delete not implemented')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </td>
        </tr>
      `;
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
  },

  refresh() {
    this.loadData();
  }
};
