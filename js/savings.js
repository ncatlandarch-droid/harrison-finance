window.Savings = {
  init() {
    this.render();
    this.bindEvents();
    this.loadData();
  },
  render() {
    const section = document.getElementById('section-goals');
    if (!section) return;
    
    section.innerHTML = `
      <div class="savings-container">
        <!-- HEADER ROW -->
        <div class="header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h2>Savings Goals</h2>
          <button class="btn btn-primary" id="btn-add-goal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Goal
          </button>
        </div>

        <!-- SUMMARY ROW - 3 stat cards -->
        <div class="grid-3 summary-stats animate-fade-in-up mb-4">
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Total Saved</span>
            <div class="stat-value dm-mono text-2xl font-bold mt-2 text-success" id="savings-total-saved">$0.00</div>
          </div>
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Total Target</span>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="savings-total-target">$0.00</div>
          </div>
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Overall Progress</span>
            <div class="stat-value text-2xl font-bold mt-2 text-primary" id="savings-overall-progress">0%</div>
          </div>
        </div>

        <!-- GOALS GRID -->
        <div class="grid-2 goals-grid animate-fade-in-up mt-4" style="animation-delay: 0.1s" id="savings-goals-grid">
          <!-- Populated by JS -->
        </div>

        <!-- GOAL CALCULATOR -->
        <div class="card animate-fade-in-up mt-4" style="animation-delay: 0.2s">
          <h3 class="mb-4">Goal Calculator</h3>
          <div class="grid-3 gap-4" style="align-items:end;">
            <div class="form-group">
              <label class="text-sm font-bold mb-1 block">Monthly Contribution ($)</label>
              <input type="number" id="calc-monthly" class="form-input w-full" value="500">
            </div>
            <div class="form-group">
              <label class="text-sm font-bold mb-1 block">Target Amount ($)</label>
              <input type="number" id="calc-target" class="form-input w-full" value="10000">
            </div>
            <div style="background:var(--bg-secondary, #f0fdf4); padding:15px; border-radius:8px; border-left:4px solid var(--success-color, #4ade80);">
              <div class="text-sm text-muted">You will reach your goal in:</div>
              <div class="font-bold text-xl mt-1" id="calc-result">20 months</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- ADD FUNDS MODAL -->
      <dialog id="modal-add-funds" class="modal" style="border:none; border-radius:8px; padding:20px; box-shadow:0 4px 15px rgba(0,0,0,0.2); max-width:350px; width:100%;">
        <h3 class="mb-4">Add Funds to <span id="add-funds-goal-name" class="text-primary">Goal</span></h3>
        <form id="form-add-funds">
          <input type="hidden" id="add-funds-goal-id">
          <div class="form-group mb-3">
            <label class="text-sm font-bold mb-1 block">Amount ($)</label>
            <input type="number" id="add-funds-amount" class="form-input w-full dm-mono text-lg" min="0" step="0.01" required autofocus>
          </div>
          <div class="form-group mb-4">
            <label class="text-sm font-bold mb-1 block">Note (Optional)</label>
            <input type="text" id="add-funds-note" class="form-input w-full" placeholder="e.g. Bonus, Transfer">
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn" id="btn-cancel-funds">Cancel</button>
            <button type="submit" class="btn btn-primary" style="background:var(--success-color, #4ade80);">Add Funds</button>
          </div>
        </form>
      </dialog>
    `;
  },
  bindEvents() {
    const calcMonthly = document.getElementById('calc-monthly');
    const calcTarget = document.getElementById('calc-target');
    const calcResult = document.getElementById('calc-result');

    const updateCalc = () => {
      const m = parseFloat(calcMonthly.value) || 0;
      const t = parseFloat(calcTarget.value) || 0;
      if (m > 0 && t > 0) {
        const months = Math.ceil(t / m);
        calcResult.textContent = `${months} month${months !== 1 ? 's' : ''}`;
        
        // Add minimal animation
        calcResult.style.opacity = '0';
        setTimeout(() => {
          calcResult.style.transition = 'opacity 0.3s ease';
          calcResult.style.opacity = '1';
        }, 50);
      } else {
        calcResult.textContent = '--';
      }
    };

    calcMonthly?.addEventListener('input', updateCalc);
    calcTarget?.addEventListener('input', updateCalc);

    // Form submission for adding funds
    const fundsForm = document.getElementById('form-add-funds');
    if (fundsForm) {
      fundsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amt = parseFloat(document.getElementById('add-funds-amount').value);
        if (amt > 0) {
          if (window.App && App.showToast) App.showToast(`Successfully added ${App.formatCurrency(amt)}!`);
          
          // Trigger confetti (simulate milestone)
          if (window.Confetti && window.Confetti.celebrate) {
            Confetti.celebrate();
          }

          if (window.App && App.hideModal) App.hideModal('modal-add-funds');
          else document.getElementById('modal-add-funds').close();
        }
      });
    }

    document.getElementById('btn-cancel-funds')?.addEventListener('click', () => {
      const modal = document.getElementById('modal-add-funds');
      if (window.App && App.hideModal) App.hideModal('modal-add-funds');
      else modal.close();
    });
  },
  loadData() {
    this.updateGrid();
    this.updateStats();
  },
  refresh() {
    this.loadData();
  },
  getMockGoals() {
    return [
      { id: '1', name: 'Emergency Fund', current: 15000, target: 25000, member: 'family', deadline: '2027-12-31' },
      { id: '2', name: 'Family Vacation', current: 1250, target: 5000, member: 'family', deadline: '2026-06-01' },
      { id: '3', name: 'Hayden College Fund', current: 12000, target: 50000, member: 'family', deadline: '2038-08-01' },
      { id: '4', name: 'Ava Joy College Fund', current: 4000, target: 50000, member: 'family', deadline: '2042-08-01' }
    ];
  },
  updateGrid() {
    const container = document.getElementById('savings-goals-grid');
    if (!container || !window.App) return;

    let goals = window.Storage && Storage.getGoals ? Storage.getGoals() : this.getMockGoals();
    let html = '';

    goals.forEach(g => {
      const pct = Math.min((g.current / g.target) * 100, 100);
      const memberColor = App.getMemberColor ? App.getMemberColor(g.member) : '#ccc';
      
      html += `
        <div class="card" style="display:flex; flex-direction:column;">
          <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="background:var(--highlight-bg, #f0f9ff); padding:8px; border-radius:8px; color:var(--primary-color, #3b82f6);">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div>
                <h3 style="margin:0">${g.name}</h3>
                <div class="member-badge badge mt-1" style="background-color:${memberColor}20; color:${memberColor}; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; display:inline-block; text-transform:capitalize;">${g.member}</div>
              </div>
            </div>
            <div>
              <button class="btn btn-icon" style="background:none; border:none; cursor:pointer; color:var(--text-muted, #666);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
            </div>
          </div>
          
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:10px; flex-grow:1;">
            <div>
              <div class="text-sm text-muted">Saved</div>
              <div class="dm-mono font-bold text-2xl text-success">${App.formatCurrency(g.current)}</div>
            </div>
            <div style="text-align:right;">
              <div class="text-sm text-muted">Target</div>
              <div class="dm-mono font-bold text-xl">${App.formatCurrency(g.target)}</div>
            </div>
          </div>

          <div style="position:relative; margin:15px 0 25px 0;">
            <div class="progress-bar" style="height:12px; border-radius:6px; background:var(--border-color, #eee); overflow:hidden;">
              <div class="progress-bar-fill" style="height:100%; width:${pct}%; background:var(--primary-color, #3b82f6); transition:width 1s ease;"></div>
            </div>
            <!-- Milestone markers -->
            <div style="position:absolute; top:-2px; left:25%; height:16px; width:2px; background:white; opacity:0.8;"></div>
            <div style="position:absolute; top:-2px; left:50%; height:16px; width:2px; background:white; opacity:0.8;"></div>
            <div style="position:absolute; top:-2px; left:75%; height:16px; width:2px; background:white; opacity:0.8;"></div>
            
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted, #666); margin-top:5px; font-weight:bold;">
              <span>0%</span>
              <span style="position:absolute; left:25%; transform:translateX(-50%);">25%</span>
              <span style="position:absolute; left:50%; transform:translateX(-50%);">50%</span>
              <span style="position:absolute; left:75%; transform:translateX(-50%);">75%</span>
              <span>100%</span>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color, #eee); padding-top:15px;">
            <div class="text-sm">
              <div><strong>ETA:</strong> <span class="text-muted">Target date</span></div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="window.Savings.openAddFunds('${g.id}', '${g.name}')" style="padding:6px 12px; font-size:0.85rem;">
              + Add Funds
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },
  updateStats() {
    let goals = window.Storage && Storage.getGoals ? Storage.getGoals() : this.getMockGoals();
    let totalSaved = 0;
    let totalTarget = 0;

    goals.forEach(g => {
      totalSaved += g.current;
      totalTarget += g.target;
    });

    const pct = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    if (document.getElementById('savings-total-saved')) document.getElementById('savings-total-saved').textContent = window.App ? App.formatCurrency(totalSaved) : `$${totalSaved}`;
    if (document.getElementById('savings-total-target')) document.getElementById('savings-total-target').textContent = window.App ? App.formatCurrency(totalTarget) : `$${totalTarget}`;
    if (document.getElementById('savings-overall-progress')) document.getElementById('savings-overall-progress').textContent = `${Math.round(pct)}%`;
  },
  openAddFunds(id, name) {
    document.getElementById('add-funds-goal-id').value = id;
    document.getElementById('add-funds-goal-name').textContent = name;
    document.getElementById('form-add-funds').reset();
    
    const modal = document.getElementById('modal-add-funds');
    if (window.App && App.showModal) App.showModal('modal-add-funds');
    else modal.showModal();
  }
};
