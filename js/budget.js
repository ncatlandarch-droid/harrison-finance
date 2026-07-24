window.Budget = {
  init() {
    this.render();
    this.bindEvents();
    this.loadData();
  },
  render() {
    const section = document.getElementById('section-budget');
    if (!section) return;
    
    section.innerHTML = `
      <div class="budget-container">
        <!-- HEADER ROW -->
        <div class="header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h2>Budget Tracker</h2>
          <div style="display:flex; gap:10px; align-items:center;">
            <select id="budget-month-select" class="form-select">
              <option value="current">Current Month</option>
              <option value="last">Last Month</option>
            </select>
            <select id="budget-member-select" class="form-select">
              <option value="all">All Members</option>
              <option value="barbara">Barbara</option>
              <option value="chris">Chris</option>
              <option value="erin">Erin</option>
              <option value="family">Family</option>
            </select>
            <button class="btn btn-primary" id="btn-add-budget">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Category
            </button>
          </div>
        </div>

        <!-- SUMMARY ROW - 3 stat cards -->
        <div class="grid-3 summary-stats animate-fade-in-up mb-4">
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Total Budget</span>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="budget-total-limit">$0.00</div>
          </div>
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Total Spent</span>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="budget-total-spent">$0.00</div>
          </div>
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Remaining</span>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="budget-total-remaining">$0.00</div>
          </div>
        </div>

        <!-- BUDGET CATEGORIES GRID -->
        <div class="grid-3 budget-categories animate-fade-in-up mt-4" style="animation-delay: 0.1s" id="budget-categories-grid">
          <!-- Populated by JS -->
        </div>

        <!-- TREND CHART -->
        <div class="card animate-fade-in-up mt-4" style="animation-delay: 0.2s">
          <h3 class="mb-4">Spending Trends</h3>
          <div class="chart-container">
            <canvas id="budget-trend-chart"></canvas>
          </div>
        </div>
      </div>
      
      <!-- ADD/EDIT MODAL -->
      <dialog id="modal-budget-form" class="modal" style="border:none; border-radius:8px; padding:20px; box-shadow:0 4px 15px rgba(0,0,0,0.2); max-width:400px; width:100%;">
        <h3 id="modal-budget-title" class="mb-4">Add Budget Category</h3>
        <form id="form-budget">
          <div class="form-group mb-3">
            <label class="text-sm font-bold mb-1 block">Category Name</label>
            <input type="text" id="budget-form-name" class="form-input w-full" required>
          </div>
          <div class="form-group mb-3">
            <label class="text-sm font-bold mb-1 block">Monthly Limit ($)</label>
            <input type="number" id="budget-form-limit" class="form-input w-full" min="0" step="0.01" required>
          </div>
          <div class="form-group mb-4">
            <label class="text-sm font-bold mb-1 block">Assigned To</label>
            <select id="budget-form-member" class="form-select w-full">
              <option value="family">Family</option>
              <option value="barbara">Barbara</option>
              <option value="chris">Chris</option>
              <option value="erin">Erin</option>
            </select>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn" id="btn-cancel-budget">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </dialog>
    `;
  },
  bindEvents() {
    const addBtn = document.getElementById('btn-add-budget');
    const cancelBtn = document.getElementById('btn-cancel-budget');
    const modal = document.getElementById('modal-budget-form');
    const form = document.getElementById('form-budget');
    const memberSelect = document.getElementById('budget-member-select');

    if (addBtn && modal) {
      addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('modal-budget-title').textContent = 'Add Budget Category';
        if (window.App && App.showModal) App.showModal('modal-budget-form');
        else modal.showModal();
      });
    }

    if (cancelBtn && modal) {
      cancelBtn.addEventListener('click', () => {
        if (window.App && App.hideModal) App.hideModal('modal-budget-form');
        else modal.close();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('budget-form-name').value;
        const limit = parseFloat(document.getElementById('budget-form-limit').value);
        const member = document.getElementById('budget-form-member').value;

        if (window.Storage && Storage.addBudget) {
          Storage.addBudget({ name, limit, member, spent: 0 }); // spent is calculated in reality
          if (window.App && App.showToast) App.showToast('Budget category saved!');
          if (window.App && App.hideModal) App.hideModal('modal-budget-form');
          else document.getElementById('modal-budget-form').close();
          this.refresh();
        }
      });
    }

    if (memberSelect) {
      memberSelect.addEventListener('change', () => this.loadData());
    }
  },
  loadData() {
    this.updateGrid();
    setTimeout(() => { this.updateChart(); }, 100);
  },
  refresh() {
    this.loadData();
  },
  getMockBudgets() {
    // Return pre-populated categories as specified
    return [
      { id: '1', name: 'Home Expenses', limit: 1500, spent: 1450, member: 'chris' },
      { id: '2', name: 'Fixed Expenses', limit: 1230, spent: 1230, member: 'erin' },
      { id: '3', name: 'Personal Expenses', limit: 1479.11, spent: 1200, member: 'barbara' },
      { id: '4', name: 'Groceries', limit: 700, spent: 650, member: 'family' },
      { id: '5', name: 'Retirement Savings', limit: 900, spent: 900, member: 'family' },
      { id: '6', name: 'Vacation Fund', limit: 300, spent: 150, member: 'family' },
      { id: '7', name: 'Kids Savings', limit: 400, spent: 400, member: 'family' },
      { id: '8', name: 'Life Insurance', limit: 175, spent: 175, member: 'chris' },
      { id: '9', name: 'Discretionary', limit: 1000, spent: 850, member: 'family' },
      { id: '10', name: 'Emergency & Real Estate', limit: 350, spent: 0, member: 'family' },
      { id: '11', name: 'Household Contribution', limit: 3147.12, spent: 3147.12, member: 'family' }
    ];
  },
  updateGrid() {
    const container = document.getElementById('budget-categories-grid');
    const memberSelect = document.getElementById('budget-member-select');
    if (!container || !window.App) return;

    const filterMember = memberSelect ? memberSelect.value : 'all';
    let budgets = window.Storage && Storage.getBudgets ? Storage.getBudgets() : this.getMockBudgets();

    if (filterMember !== 'all') {
      budgets = budgets.filter(b => b.member === filterMember);
    }

    let totalLimit = 0;
    let totalSpent = 0;
    let html = '';

    budgets.forEach(b => {
      totalLimit += b.limit;
      const spent = b.spent || 0;
      totalSpent += spent;
      const remaining = b.limit - spent;
      const pct = b.limit > 0 ? (spent / b.limit) * 100 : 0;
      
      let ringColor = 'var(--success-color, #4ade80)';
      let pulseClass = '';
      if (pct > 100) { ringColor = 'var(--danger-color, #f87171)'; pulseClass = 'pulsing-red'; }
      else if (pct > 80) ringColor = 'var(--danger-color, #f87171)';
      else if (pct > 50) ringColor = 'var(--warning-color, #fbbf24)';

      const memberColor = App.getMemberColor ? App.getMemberColor(b.member) : '#ccc';

      html += `
        <div class="card ${pulseClass}">
          <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              <h4 style="margin:0">${b.name}</h4>
            </div>
            <div class="member-badge badge" style="background-color:${memberColor}20; color:${memberColor}; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; text-transform:capitalize;">
              ${b.member}
            </div>
          </div>
          
          <div style="display:flex; justify-content:center; margin-bottom:15px; position:relative;">
            <div style="position:relative; width:100px; height:100px;">
              <!-- Simple SVG ring fallback if canvas ring is not used here -->
              <svg viewBox="0 0 36 36" style="width:100%; height:100%; transform: rotate(-90deg);">
                <path style="fill:none; stroke:#eee; stroke-width:3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path style="fill:none; stroke:${ringColor}; stroke-width:3; stroke-dasharray:${Math.min(pct, 100)}, 100;" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:0.8rem; font-weight:bold;">
                ${Math.round(pct)}%
              </div>
            </div>
          </div>
          
          <div style="display:flex; justify-content:space-between; text-align:center; font-size:0.9rem;">
            <div>
              <div class="text-muted text-sm">Spent</div>
              <div class="dm-mono font-bold">${App.formatCurrency(spent)}</div>
            </div>
            <div>
              <div class="text-muted text-sm">Limit</div>
              <div class="dm-mono font-bold">${App.formatCurrency(b.limit)}</div>
            </div>
          </div>
        </div>
      `;
    });

    if (budgets.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align:center; padding: 40px;">
          <p class="text-muted">No budget categories found.</p>
        </div>
      `;
    } else {
      container.innerHTML = html;
    }

    const remaining = totalLimit - totalSpent;
    const remainingEl = document.getElementById('budget-total-remaining');
    document.getElementById('budget-total-limit').textContent = App.formatCurrency(totalLimit);
    document.getElementById('budget-total-spent').textContent = App.formatCurrency(totalSpent);
    if (remainingEl) {
      remainingEl.textContent = App.formatCurrency(remaining);
      remainingEl.style.color = remaining >= 0 ? 'var(--success-color, #4ade80)' : 'var(--danger-color, #f87171)';
    }
  },
  updateChart() {
    if (!window.Charts) return;
    const barData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Budget', values: [10000, 10000, 10000, 10000, 10000, 11000], color: '#e2e8f0' },
        { label: 'Spent', values: [9500, 9800, 10200, 9100, 9400, 8900], color: 'hsl(200, 85%, 55%)' }
      ]
    };
    window.Charts.bar('budget-trend-chart', barData, { height: 300, stacked: false, showValues: false });
  }
};
