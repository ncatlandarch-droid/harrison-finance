window.Debts = {
  strategy: 'avalanche',
  
  init() {
    this.render();
    this.bindEvents();
    this.loadData();
  },

  render() {
    const section = document.getElementById('section-debts');
    if (!section) return;

    section.innerHTML = `
      <div class="header-row">
        <h2 class="gradient-text">Debt Payoff Planner</h2>
        <button id="btn-add-debt" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Debt
        </button>
      </div>

      <div class="grid-4" style="margin-bottom: 2rem;">
        <div class="card stat-card animate-fade-in-up" style="animation-delay: 0.1s;">
          <h4 class="text-muted">Total Debt</h4>
          <h2 id="debt-total" class="dm-mono text-danger">$0.00</h2>
        </div>
        <div class="card stat-card animate-fade-in-up" style="animation-delay: 0.2s;">
          <h4 class="text-muted">Monthly Minimum</h4>
          <h2 id="debt-min" class="dm-mono">$0.00</h2>
        </div>
        <div class="card stat-card animate-fade-in-up" style="animation-delay: 0.3s;">
          <h4 class="text-muted">Highest Rate</h4>
          <h2 id="debt-rate" class="dm-mono text-warning">0%</h2>
        </div>
        <div class="card stat-card animate-fade-in-up" style="animation-delay: 0.4s;">
          <h4 class="text-muted">Debt-Free Date</h4>
          <h2 id="debt-free-date" class="dm-mono text-success">--</h2>
        </div>
      </div>

      <div class="card animate-fade-in-up" style="margin-bottom: 2rem; display: flex; flex-direction: column; align-items: center; padding: 2rem;">
        <h3>Payoff Strategy</h3>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <button id="btn-strat-avalanche" class="btn btn-primary">Avalanche ↓</button>
          <button id="btn-strat-snowball" class="btn">Snowball ↗</button>
        </div>
        <p id="strat-desc" class="text-muted" style="margin-top: 1rem; text-align: center; max-width: 500px;">
          Pay minimum on all, extra on highest interest rate. Saves the most money.
        </p>
      </div>

      <div class="grid-2" id="debts-list" style="margin-bottom: 2rem;">
        <!-- Debt cards injected here -->
      </div>

      <div class="card animate-fade-in-up" style="margin-bottom: 2rem;">
        <h3>What if I pay extra?</h3>
        <div style="display: flex; gap: 2rem; align-items: center; margin-top: 1.5rem;">
          <div style="flex: 1;">
            <label class="text-muted">Extra Monthly Payment: <strong id="lbl-extra" class="dm-mono text-primary">$0</strong></label>
            <input type="range" id="debt-extra-slider" min="0" max="1000" step="50" value="0" style="width: 100%; margin-top: 1rem;" />
          </div>
          <div style="flex: 1; display: flex; gap: 2rem; justify-content: center; background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 8px;">
            <div>
              <div class="text-muted">New Payoff Date</div>
              <h3 id="debt-sim-date" class="dm-mono text-success">--</h3>
            </div>
            <div>
              <div class="text-muted">Time Saved</div>
              <h3 id="debt-sim-time" class="dm-mono">0 mo</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="card animate-fade-in-up">
        <h3>Payoff Timeline</h3>
        <div class="chart-container" style="height: 300px; margin-top: 1rem;">
          <canvas id="chart-debt-timeline"></canvas>
        </div>
      </div>
    `;
  },

  bindEvents() {
    document.getElementById('btn-strat-avalanche')?.addEventListener('click', (e) => {
      this.strategy = 'avalanche';
      e.target.classList.add('btn-primary');
      document.getElementById('btn-strat-snowball').classList.remove('btn-primary');
      document.getElementById('strat-desc').textContent = 'Pay minimum on all, extra on highest interest rate. Saves the most money.';
      this.loadData();
    });

    document.getElementById('btn-strat-snowball')?.addEventListener('click', (e) => {
      this.strategy = 'snowball';
      e.target.classList.add('btn-primary');
      document.getElementById('btn-strat-avalanche').classList.remove('btn-primary');
      document.getElementById('strat-desc').textContent = 'Pay minimum on all, extra on smallest balance. Quick wins for motivation.';
      this.loadData();
    });

    document.getElementById('debt-extra-slider')?.addEventListener('input', (e) => {
      document.getElementById('lbl-extra').textContent = App.formatCurrency(e.target.value);
      this.simulateExtra(e.target.value);
    });
    
    document.getElementById('btn-add-debt')?.addEventListener('click', () => {
      App.showToast('Add Debt modal triggered');
    });
  },

  loadData() {
    const debts = window.Storage?.getDebts ? window.Storage.getDebts() : [];
    
    // Mock debts for layout preview if empty
    const displayDebts = debts.length > 0 ? debts : [
      { id: 1, name: 'Student Loan', balance: 15000, rate: 4.5, min: 200, memberId: 'erin' },
      { id: 2, name: 'Car Loan', balance: 8000, rate: 6.0, min: 350, memberId: 'chris' },
      { id: 3, name: 'Credit Card', balance: 4500, rate: 18.9, min: 120, memberId: 'family' }
    ];

    let totalDebt = 0;
    let minPayment = 0;
    let highRate = 0;

    displayDebts.forEach(d => {
      totalDebt += d.balance;
      minPayment += d.min;
      if (d.rate > highRate) highRate = d.rate;
    });

    document.getElementById('debt-total').textContent = App.formatCurrency(totalDebt);
    document.getElementById('debt-min').textContent = App.formatCurrency(minPayment);
    document.getElementById('debt-rate').textContent = highRate + '%';

    this.renderDebtsList(displayDebts);
    this.simulateExtra(0); // init calculation
  },

  renderDebtsList(debts) {
    const container = document.getElementById('debts-list');
    if (!container) return;

    // Sort based on strategy
    const sorted = [...debts].sort((a, b) => {
      if (this.strategy === 'avalanche') return b.rate - a.rate;
      return a.balance - b.balance;
    });

    let html = '';
    sorted.forEach((d, idx) => {
      const rateClass = d.rate > 15 ? 'bg-danger' : (d.rate > 5 ? 'bg-warning' : 'bg-success');
      
      html += `
        <div class="card animate-fade-in-up" style="animation-delay: ${idx * 0.1}s; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: ${App.getMemberColor(d.memberId)}"></div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
              <h3>${d.name}</h3>
              <span class="member-badge" style="background: ${App.getMemberColor(d.memberId)}; margin-top: 0.5rem;">${d.memberId}</span>
            </div>
            <div class="badge ${rateClass}">${d.rate}% APR</div>
          </div>
          
          <h2 class="dm-mono text-danger" style="margin: 1rem 0;">${App.formatCurrency(d.balance)}</h2>
          
          <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.9rem;">
            <span>Min: ${App.formatCurrency(d.min)}</span>
            <span>Priority: #${idx + 1}</span>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  },

  simulateExtra(extraStr) {
    const extra = parseFloat(extraStr) || 0;
    
    // Very simplified mockup of debt payoff calc for UI update
    // In real implementation, full amortization logic goes here
    const baseMonths = 60; // mockup base
    const timeSaved = Math.floor(extra / 50); // fake calc
    const newMonths = Math.max(1, baseMonths - timeSaved);
    
    const d = new Date();
    d.setMonth(d.getMonth() + newMonths);
    
    const dateEl = document.getElementById('debt-sim-date');
    if (dateEl) dateEl.textContent = App.formatDate(d);
    
    const timeEl = document.getElementById('debt-sim-time');
    if (timeEl) timeEl.textContent = timeSaved > 0 ? \`\${timeSaved} months\` : '--';

    if (extra === 0) {
      const freeEl = document.getElementById('debt-free-date');
      if (freeEl) freeEl.textContent = App.formatDate(d);
    }
  },

  refresh() {
    this.loadData();
  }
};
