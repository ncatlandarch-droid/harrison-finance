window.Bills = {
  init() {
    this.currentDate = new Date(); // Start at current month
    this.render();
    this.bindEvents();
    this.loadData();
  },
  render() {
    const section = document.getElementById('section-bills');
    if (!section) return;
    
    section.innerHTML = `
      <div class="bills-container">
        <!-- HEADER ROW -->
        <div class="header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h2>Bills & Payments</h2>
          <div style="display:flex; gap:15px; align-items:center;">
            <div style="display:flex; align-items:center; gap:10px; background:var(--bg-secondary, #fff); padding:5px 10px; border-radius:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <button class="btn btn-icon" id="btn-prev-month" style="padding:5px; border:none; background:none; cursor:pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <span id="bills-month-display" style="font-weight:bold; min-width:120px; text-align:center;">Month Year</span>
              <button class="btn btn-icon" id="btn-next-month" style="padding:5px; border:none; background:none; cursor:pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
            <button class="btn btn-primary" id="btn-add-bill">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Bill
            </button>
          </div>
        </div>

        <!-- SUMMARY ROW - 4 stat cards -->
        <div class="grid-4 summary-stats animate-fade-in-up mb-4">
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Total Monthly Bills</span>
            <div class="stat-value dm-mono text-2xl font-bold mt-2" id="bills-total">$0.00</div>
          </div>
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Paid</span>
            <div class="stat-value text-2xl font-bold mt-2 text-success" id="bills-paid-count">0</div>
          </div>
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Unpaid</span>
            <div class="stat-value text-2xl font-bold mt-2 text-danger" id="bills-unpaid-count">0</div>
          </div>
          <div class="stat-card card">
            <span class="stat-title text-muted text-sm">Next Due</span>
            <div class="stat-value mt-2" id="bills-next-due" style="font-size:1.1rem; font-weight:bold; line-height:1.2;">None</div>
          </div>
        </div>

        <!-- VISUAL CALENDAR -->
        <div class="card animate-fade-in-up mt-4" style="animation-delay: 0.1s; overflow-x:auto;">
          <h3 class="mb-4">Calendar</h3>
          <div id="bills-calendar" style="min-width:600px;">
            <!-- Populated by JS -->
          </div>
        </div>

        <!-- BILLS LIST -->
        <div class="card animate-fade-in-up mt-4" style="animation-delay: 0.2s">
          <h3 class="mb-4">Bill List</h3>
          <div id="bills-list">
            <!-- Populated by JS -->
          </div>
        </div>
      </div>
      
      <!-- ADD/EDIT BILL MODAL -->
      <dialog id="modal-bill-form" class="modal" style="border:none; border-radius:8px; padding:20px; box-shadow:0 4px 15px rgba(0,0,0,0.2); max-width:400px; width:100%;">
        <h3 id="modal-bill-title" class="mb-4">Add Bill</h3>
        <form id="form-bill">
          <div class="form-group mb-3">
            <label class="text-sm font-bold mb-1 block">Bill Name</label>
            <input type="text" id="bill-form-name" class="form-input w-full" required>
          </div>
          <div class="form-group mb-3">
            <label class="text-sm font-bold mb-1 block">Amount ($)</label>
            <input type="number" id="bill-form-amount" class="form-input w-full" min="0" step="0.01" required>
          </div>
          <div class="grid-2 gap-3 mb-3">
            <div class="form-group">
              <label class="text-sm font-bold mb-1 block">Due Day (1-31)</label>
              <input type="number" id="bill-form-day" class="form-input w-full" min="1" max="31" required>
            </div>
            <div class="form-group">
              <label class="text-sm font-bold mb-1 block">Frequency</label>
              <select id="bill-form-freq" class="form-select w-full">
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>
          <div class="grid-2 gap-3 mb-3">
            <div class="form-group">
              <label class="text-sm font-bold mb-1 block">Assigned To</label>
              <select id="bill-form-member" class="form-select w-full">
                <option value="family">Family</option>
                <option value="barbara">Barbara</option>
                <option value="chris">Chris</option>
                <option value="erin">Erin</option>
              </select>
            </div>
            <div class="form-group">
              <label class="text-sm font-bold mb-1 block">Category</label>
              <input type="text" id="bill-form-category" class="form-input w-full" placeholder="e.g. Utility">
            </div>
          </div>
          <div class="form-group mb-4" style="display:flex; align-items:center; gap:10px;">
            <input type="checkbox" id="bill-form-autopay" style="width:16px; height:16px;">
            <label for="bill-form-autopay" class="text-sm font-bold m-0 block">Autopay Enabled</label>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn" id="btn-cancel-bill">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </dialog>
    `;
  },
  bindEvents() {
    document.getElementById('btn-prev-month')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.loadData();
    });
    
    document.getElementById('btn-next-month')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.loadData();
    });

    const addBtn = document.getElementById('btn-add-bill');
    const modal = document.getElementById('modal-bill-form');
    if (addBtn && modal) {
      addBtn.addEventListener('click', () => {
        document.getElementById('form-bill').reset();
        document.getElementById('modal-bill-title').textContent = 'Add Bill';
        if (window.App && App.showModal) App.showModal('modal-bill-form');
        else modal.showModal();
      });
    }

    document.getElementById('btn-cancel-bill')?.addEventListener('click', () => {
      if (window.App && App.hideModal) App.hideModal('modal-bill-form');
      else modal.close();
    });
  },
  loadData() {
    this.updateMonthDisplay();
    this.updateCalendar();
    this.updateList();
    this.updateStats();
  },
  refresh() {
    this.loadData();
  },
  getMockBills() {
    return [
      { id: '1', name: 'Mortgage', amount: 1500, dueDay: 1, freq: 'monthly', member: 'chris', category: 'Housing', autopay: true, paid: true },
      { id: '2', name: 'Duke Energy', amount: 150, dueDay: 12, freq: 'monthly', member: 'family', category: 'Utility', autopay: false, paid: false },
      { id: '3', name: 'Water', amount: 60, dueDay: 15, freq: 'monthly', member: 'family', category: 'Utility', autopay: true, paid: false },
      { id: '4', name: 'Internet', amount: 80, dueDay: 21, freq: 'monthly', member: 'chris', category: 'Utility', autopay: true, paid: false },
      { id: '5', name: 'Car Insurance', amount: 120, dueDay: 5, freq: 'monthly', member: 'barbara', category: 'Insurance', autopay: true, paid: true }
    ];
  },
  updateMonthDisplay() {
    const el = document.getElementById('bills-month-display');
    if (el) {
      const options = { month: 'long', year: 'numeric' };
      el.textContent = this.currentDate.toLocaleDateString(undefined, options);
    }
  },
  updateCalendar() {
    const container = document.getElementById('bills-calendar');
    if (!container) return;

    const bills = window.Storage && Storage.getBills ? Storage.getBills() : this.getMockBills();
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    let html = `
      <div style="display:grid; grid-template-columns:repeat(7, 1fr); gap:1px; background:var(--border-color, #eee); border:1px solid var(--border-color, #eee); border-radius:8px; overflow:hidden;">
        ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `<div style="background:var(--bg-secondary, #fafafa); padding:10px; text-align:center; font-weight:bold; font-size:0.8rem;">${d}</div>`).join('')}
    `;

    // Empty cells before start of month
    for (let i = 0; i < firstDay; i++) {
      html += `<div style="background:var(--card-bg, #fff); min-height:80px;"></div>`;
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = isCurrentMonth && today.getDate() === d;
      const dayBills = bills.filter(b => b.dueDay === d);
      
      let dayHtml = `<div style="background:var(--card-bg, #fff); min-height:80px; padding:5px; position:relative; ${isToday ? 'background:var(--highlight-bg, #f0f9ff); font-weight:bold;' : ''}">
        <div style="text-align:right; font-size:0.85rem; color:${isToday ? 'var(--primary-color, #3b82f6)' : 'inherit'};">${d}</div>
        <div style="display:flex; flex-wrap:wrap; gap:2px; margin-top:5px;">`;
      
      dayBills.forEach(b => {
        const color = window.App && App.getMemberColor ? App.getMemberColor(b.member) : '#ccc';
        const isPastDue = isCurrentMonth && d < today.getDate() && !b.paid;
        const dotStyle = `width:8px; height:8px; border-radius:50%; background:${color}; display:inline-block; margin:2px;`;
        dayHtml += `<div title="${b.name}" style="${dotStyle} ${isPastDue ? 'box-shadow: 0 0 0 2px red;' : ''}"></div>`;
      });
      
      dayHtml += `</div></div>`;
      html += dayHtml;
    }
    
    // Fill remaining cells
    const remainingCells = (7 - ((firstDay + daysInMonth) % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
      html += `<div style="background:var(--card-bg, #fff); min-height:80px;"></div>`;
    }

    html += `</div>`;
    container.innerHTML = html;
  },
  updateList() {
    const container = document.getElementById('bills-list');
    if (!container || !window.App) return;

    let bills = window.Storage && Storage.getBills ? Storage.getBills() : this.getMockBills();
    // sort by due day
    bills.sort((a, b) => a.dueDay - b.dueDay);

    if (bills.length === 0) {
      container.innerHTML = `<div class="empty-state text-center p-4">No bills added yet.</div>`;
      return;
    }

    let html = `
      <div class="data-table" style="overflow-x:auto;">
        <table style="width:100%; text-align:left; border-collapse:collapse;">
          <thead>
            <tr>
              <th style="padding:12px; border-bottom:2px solid var(--border-color, #eee);">Bill</th>
              <th style="padding:12px; border-bottom:2px solid var(--border-color, #eee);">Amount</th>
              <th style="padding:12px; border-bottom:2px solid var(--border-color, #eee);">Due</th>
              <th style="padding:12px; border-bottom:2px solid var(--border-color, #eee);">Assigned</th>
              <th style="padding:12px; border-bottom:2px solid var(--border-color, #eee);">Status</th>
              <th style="padding:12px; border-bottom:2px solid var(--border-color, #eee);">Actions</th>
            </tr>
          </thead>
          <tbody>
    `;

    bills.forEach(b => {
      const memberColor = App.getMemberColor ? App.getMemberColor(b.member) : '#999';
      const autopayBadge = b.autopay ? 
        `<span class="badge" style="background:#dcfce7; color:#166534; padding:2px 6px; border-radius:4px; font-size:0.75rem;">Auto</span>` : 
        `<span class="badge" style="background:#fef9c3; color:#854d0e; padding:2px 6px; border-radius:4px; font-size:0.75rem;">Manual</span>`;
      
      const paidToggleClass = b.paid ? 'bg-success' : 'bg-gray';
      const paidToggleStyle = b.paid ? 'background:var(--success-color, #4ade80); color:white;' : 'background:#e5e7eb; color:#6b7280;';

      html += `
        <tr style="border-bottom:1px solid var(--border-color, #eee);">
          <td style="padding:12px;">
            <div style="font-weight:bold;">${b.name}</div>
            <div style="font-size:0.8rem; color:var(--text-muted, #666);">${b.category}</div>
          </td>
          <td style="padding:12px;" class="dm-mono font-bold">${App.formatCurrency(b.amount)}</td>
          <td style="padding:12px;">Day ${b.dueDay}</td>
          <td style="padding:12px;">
            <div class="member-badge badge" style="background-color:${memberColor}20; color:${memberColor}; padding:4px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; display:inline-block; text-transform:capitalize;">
              ${b.member}
            </div>
          </td>
          <td style="padding:12px; display:flex; gap:5px; align-items:center;">
            <button class="btn btn-sm ${paidToggleClass}" style="padding:4px 10px; border-radius:12px; font-size:0.8rem; border:none; cursor:pointer; transition:all 0.2s; ${paidToggleStyle}" onclick="window.Bills.togglePaid('${b.id}')">
              ${b.paid ? 'Paid' : 'Unpaid'}
            </button>
            ${autopayBadge}
          </td>
          <td style="padding:12px;">
            <button class="btn btn-icon" style="background:none; border:none; cursor:pointer; color:var(--text-muted, #666);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;
  },
  updateStats() {
    let bills = window.Storage && Storage.getBills ? Storage.getBills() : this.getMockBills();
    let total = 0;
    let paidCount = 0;
    let unpaidCount = 0;
    
    const today = new Date();
    let nextDue = null;
    let minDays = Infinity;

    bills.forEach(b => {
      total += b.amount;
      if (b.paid) paidCount++;
      else {
        unpaidCount++;
        // calc next due approx
        let dueDayThisMonth = b.dueDay;
        let daysUntil = dueDayThisMonth - today.getDate();
        if (daysUntil < 0) daysUntil += new Date(today.getFullYear(), today.getMonth()+1, 0).getDate(); // roughly
        
        if (daysUntil < minDays) {
          minDays = daysUntil;
          nextDue = `${b.name} (in ${daysUntil} days)`;
        }
      }
    });

    if (document.getElementById('bills-total')) document.getElementById('bills-total').textContent = window.App ? App.formatCurrency(total) : `$${total}`;
    if (document.getElementById('bills-paid-count')) document.getElementById('bills-paid-count').textContent = paidCount;
    if (document.getElementById('bills-unpaid-count')) document.getElementById('bills-unpaid-count').textContent = unpaidCount;
    if (document.getElementById('bills-next-due')) document.getElementById('bills-next-due').textContent = nextDue || 'None';
  },
  togglePaid(id) {
    if (window.App && App.showToast) App.showToast('Status updated');
    // In a real app, update Storage and call this.loadData()
    // Mock interaction:
    const btn = event.currentTarget;
    const isPaid = btn.textContent.trim() === 'Paid';
    if (isPaid) {
      btn.textContent = 'Unpaid';
      btn.style.background = '#e5e7eb';
      btn.style.color = '#6b7280';
    } else {
      btn.textContent = 'Paid';
      btn.style.background = 'var(--success-color, #4ade80)';
      btn.style.color = 'white';
      // satisfying animation could be triggered here
    }
  }
};
