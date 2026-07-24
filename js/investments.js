window.Investments = {
  init() {
    this.render();
    this.bindEvents();
    this.loadData();
  },

  render() {
    const section = document.getElementById('section-invest');
    if (!section) return;

    section.innerHTML = `
      <div class="header-row">
        <h2 class="gradient-text">Investments & Retirement</h2>
        <button id="btn-add-investment" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Account
        </button>
      </div>

      <div class="grid-4" style="margin-bottom: 2rem;">
        <div class="card stat-card animate-fade-in-up" style="animation-delay: 0.1s;">
          <h4 class="text-muted">Total Portfolio</h4>
          <h2 id="inv-total" class="dm-mono gradient-text">$0.00</h2>
        </div>
        <div class="card stat-card animate-fade-in-up" style="animation-delay: 0.2s;">
          <h4 class="text-muted">Monthly Contributions</h4>
          <h2 id="inv-contrib" class="dm-mono">$650.00</h2>
        </div>
        <div class="card stat-card animate-fade-in-up" style="animation-delay: 0.3s;">
          <h4 class="text-muted">BMO Alto Savings</h4>
          <h2 class="dm-mono text-success">$84,904.00</h2>
          <span class="badge" style="margin-top: 0.5rem">4% APY</span>
        </div>
        <div class="card stat-card animate-fade-in-up" style="animation-delay: 0.4s;">
          <h4 class="text-muted">Proj. Retirement Income</h4>
          <h2 class="dm-mono" style="color: var(--primary)">$12,406/mo</h2>
          <span class="text-muted" style="font-size: 0.8rem">At age 67</span>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 2rem;">
        <div class="card animate-fade-in-up">
          <h3>Asset Allocation</h3>
          <div class="chart-container" style="height: 300px;">
            <canvas id="chart-inv-donut"></canvas>
          </div>
        </div>
        <div class="card animate-fade-in-up">
          <h3>Monthly Contributions</h3>
          <div class="chart-container" style="height: 300px;">
            <canvas id="chart-inv-contrib"></canvas>
          </div>
        </div>
      </div>

      <!-- Retirement Planner -->
      <div class="card animate-fade-in-up" style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1.5rem; text-align: center;">Harrison Family Retirement Planner</h2>
        
        <div class="grid-2">
          <!-- Chris -->
          <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border);">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div class="avatar-circle" style="background: ${App.getMemberColor('chris')}">C</div>
              <h3>Chris's Retirement</h3>
            </div>
            
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
              <li style="display: flex; justify-content: space-between;"><span>Retirement Age:</span> <strong class="dm-mono">67 (2047)</strong></li>
              <li style="display: flex; justify-content: space-between;"><span>TSERS Pension:</span> <strong class="dm-mono text-success">$3,991/mo</strong></li>
              <li style="display: flex; justify-content: space-between;"><span>Social Security (at 67):</span> <strong class="dm-mono text-success">$2,689/mo</strong></li>
              <li style="display: flex; justify-content: space-between;"><span>401(k) Projection:</span> <strong class="dm-mono">~$2,000/mo</strong></li>
              <hr style="border-color: var(--border); margin: 0.5rem 0;" />
              <li style="display: flex; justify-content: space-between; font-size: 1.2rem;"><span>Total Projected:</span> <strong class="dm-mono text-primary">$8,680/mo</strong></li>
            </ul>
          </div>

          <!-- Erin -->
          <div style="background: rgba(255,255,255,0.02); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border);">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div class="avatar-circle" style="background: ${App.getMemberColor('erin')}">E</div>
              <h3>Erin's Retirement</h3>
            </div>
            
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
              <li style="display: flex; justify-content: space-between;"><span>Retirement Age:</span> <strong class="dm-mono">55 (2042)</strong></li>
              <li style="display: flex; justify-content: space-between;"><span>TSERS Pension:</span> <strong class="dm-mono text-success">$2,542/mo</strong></li>
              <li style="display: flex; justify-content: space-between;"><span>Bridge Income (BMO):</span> <strong class="dm-mono text-warning">2042-2049</strong></li>
              <li style="display: flex; justify-content: space-between;"><span>401k/Investments:</span> <strong class="dm-mono">~$450/mo</strong></li>
              <hr style="border-color: var(--border); margin: 0.5rem 0;" />
              <li style="display: flex; justify-content: space-between; font-size: 1.2rem;"><span>Total Projected (Pre-SS):</span> <strong class="dm-mono text-primary">$2,992/mo</strong></li>
            </ul>
          </div>
        </div>

        <div style="margin-top: 2rem;">
          <h4>Combined Summary (At age 67)</h4>
          <div class="data-table" style="margin-top: 1rem;">
            <table>
              <thead><tr><th>Source</th><th>Monthly</th><th>Annual</th><th>Notes</th></tr></thead>
              <tbody>
                <tr><td>Chris Pension</td><td class="dm-mono">$3,991</td><td class="dm-mono">$47,900</td><td></td></tr>
                <tr><td>Chris SS</td><td class="dm-mono">$2,689</td><td class="dm-mono">$32,268</td><td></td></tr>
                <tr><td>Chris 401k Draw</td><td class="dm-mono">~$2,000</td><td class="dm-mono">~$24,000</td><td>4% safe withdrawal</td></tr>
                <tr><td>Erin Pension</td><td class="dm-mono">$2,542</td><td class="dm-mono">$30,500</td><td>Starts 2042</td></tr>
                <tr><td>Erin SS</td><td class="dm-mono">$2,218</td><td class="dm-mono">$26,616</td><td>Assuming taking at 67</td></tr>
                <tr><td>Rental Income (Goal)</td><td class="dm-mono">$750</td><td class="dm-mono">$9,000</td><td>Est. average</td></tr>
                <tr style="font-weight: bold; background: rgba(255,255,255,0.05);">
                  <td>TOTAL</td><td class="dm-mono text-success">$14,190</td><td class="dm-mono text-success">$170,284</td><td>Combined projection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- What-if Calculator -->
      <div class="card animate-fade-in-up" style="margin-bottom: 2rem;">
        <h3>What-If Retirement Calculator</h3>
        <p class="text-muted" style="margin-bottom: 1.5rem;">Adjust inputs to see how compound growth affects your portfolio.</p>
        
        <div class="grid-2">
          <div>
            <div class="form-group">
              <label>Current Savings ($)</label>
              <input type="number" id="calc-savings" class="form-input" value="100000" />
            </div>
            <div class="form-group">
              <label>Monthly Contribution ($)</label>
              <input type="number" id="calc-contrib" class="form-input" value="650" />
            </div>
            <div class="form-group">
              <label>Expected Return (%)</label>
              <input type="number" id="calc-return" class="form-input" value="7" />
            </div>
            <div class="grid-2">
              <div class="form-group">
                <label>Current Age</label>
                <input type="number" id="calc-age" class="form-input" value="46" />
              </div>
              <div class="form-group">
                <label>Retire Age</label>
                <input type="number" id="calc-retire" class="form-input" value="67" />
              </div>
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 2rem;">
            <h4 class="text-muted">Projected Balance</h4>
            <h1 id="calc-result" class="dm-mono text-success" style="font-size: 3rem; margin: 1rem 0;">$0</h1>
            <p>Provides <strong id="calc-draw" class="dm-mono text-primary">$0/mo</strong> (4% rule)</p>
          </div>
        </div>
      </div>

      <!-- Compound Growth Chart -->
      <div class="card animate-fade-in-up">
        <h3>Projected Growth</h3>
        <div class="chart-container" style="height: 400px;">
          <canvas id="chart-inv-growth"></canvas>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const inputs = ['calc-savings', 'calc-contrib', 'calc-return', 'calc-age', 'calc-retire'];
    inputs.forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.updateCalculator());
    });

    document.getElementById('btn-add-investment')?.addEventListener('click', () => {
      App.showToast('Add Investment modal triggered');
    });
  },

  loadData() {
    this.renderCharts();
    this.updateCalculator();
    
    // Animate total
    const totalEl = document.getElementById('inv-total');
    if (totalEl) totalEl.textContent = App.formatCurrency(150000); // placeholder total
  },

  updateCalculator() {
    const savings = parseFloat(document.getElementById('calc-savings')?.value || 0);
    const contrib = parseFloat(document.getElementById('calc-contrib')?.value || 0);
    const retRate = parseFloat(document.getElementById('calc-return')?.value || 0) / 100;
    const age = parseInt(document.getElementById('calc-age')?.value || 0);
    const retire = parseInt(document.getElementById('calc-retire')?.value || 0);

    const years = retire - age;
    if (years <= 0) return;

    let balance = savings;
    const monthlyRate = retRate / 12;
    const months = years * 12;

    for (let i = 0; i < months; i++) {
      balance = (balance + contrib) * (1 + monthlyRate);
    }

    const draw = (balance * 0.04) / 12;

    document.getElementById('calc-result').textContent = App.formatCurrency(balance);
    document.getElementById('calc-draw').textContent = App.formatCurrency(draw);
  },

  renderCharts() {
    if (!window.Charts) return;

    // Asset Allocation Donut
    window.Charts.donut('chart-inv-donut', [
      { label: 'Chris 401k', value: 45000, color: App.getMemberColor('chris') },
      { label: 'Erin 401k', value: 12000, color: App.getMemberColor('erin') },
      { label: 'BMO Alto', value: 84904, color: 'hsl(180, 70%, 50%)' },
      { label: 'Robinhood', value: 8000, color: 'hsl(140, 70%, 50%)' }
    ], { showLegend: true });

    // Contributions Bar
    window.Charts.bar('chart-inv-contrib', {
      labels: ['Chris 401k', 'Erin 401k', 'Robinhood'],
      datasets: [{
        label: 'Monthly ($)',
        values: [500, 100, 50],
        color: 'hsl(220, 80%, 60%)'
      }]
    });

    // Growth Timeline
    const labels = [];
    const values = [];
    let bal = 150000;
    for (let y = 0; y <= 20; y++) {
      labels.push(new Date().getFullYear() + y);
      values.push(bal);
      bal = (bal + 650 * 12) * 1.07;
    }

    window.Charts.line('chart-inv-growth', {
      labels: labels,
      datasets: [{
        label: 'Projected Total',
        values: values,
        color: 'hsl(150, 70%, 50%)',
        fill: true
      }]
    }, { smooth: true, showDots: false });
  },

  refresh() {
    this.loadData();
  }
};
