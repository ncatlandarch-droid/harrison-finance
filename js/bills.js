window.Bills = {
  init() {
    this.currentDate = new Date();
    this.render();
    this.loadData();
    this.bindEvents();
  },
  
  render() {
    const section = document.getElementById('section-bills');
    if (!section) return;

    section.innerHTML = `
      <div class="bills-container">
        <!-- 1. HEADER -->
        <div class="flex-between align-center mb-6 animate-fade-in-up">
          <h2 class="text-3xl font-bold">Bills & Payments</h2>
          <div class="flex-align-center gap-5">
            <div class="flex-align-center gap-3 bg-card p-2" style="border-radius: 24px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
              <button class="btn btn-icon btn-sm" style="border-radius: 50%;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
              <span class="font-bold px-3">July 2026</span>
              <button class="btn btn-icon btn-sm" style="border-radius: 50%;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
            <button class="btn btn-primary flex-align-center gap-2 px-4 py-2" id="btn-add-bill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Bill
            </button>
          </div>
        </div>

        <!-- 2. SUMMARY STATS -->
        <div class="grid-4 mb-6 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="card stat-card p-5" style="border-left: 4px solid var(--primary);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Total Monthly</p>
            <p class="text-3xl font-mono font-bold text-primary">$3,321.12</p>
          </div>
          <div class="card stat-card p-5" style="border-left: 4px solid var(--success);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Paid</p>
            <p class="text-3xl font-mono font-bold text-success">8 <span class="text-base text-muted font-sans font-normal ml-1">($2,100.00)</span></p>
          </div>
          <div class="card stat-card p-5" style="border-left: 4px solid var(--danger);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Unpaid</p>
            <p class="text-3xl font-mono font-bold text-danger">4 <span class="text-base text-muted font-sans font-normal ml-1">($1,221.12)</span></p>
          </div>
          <div class="card stat-card p-5" style="border-left: 4px solid var(--warning);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Next Due</p>
            <p class="text-xl font-bold mb-1">Mortgage</p>
            <p class="text-sm text-warning font-bold">Due in 3 days</p>
          </div>
        </div>

        <!-- 3. VISUAL CALENDAR -->
        <div class="card mb-6 animate-fade-in-up" style="animation-delay: 0.2s">
          <h3 class="mb-4 text-xl font-bold">July 2026 Calendar</h3>
          <div class="grid-7 gap-2 text-center mb-3 text-xs text-muted font-bold tracking-wider">
            <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
          </div>
          <div class="grid-7 gap-2" id="calendar-grid" style="grid-auto-rows: minmax(80px, auto);">
            <!-- Populated by JS -->
          </div>
        </div>

        <!-- 4. BILLS LIST -->
        <div class="card animate-fade-in-up" style="animation-delay: 0.3s">
          <div class="flex-between align-center mb-5">
            <h3 class="m-0 text-xl font-bold">Upcoming & Paid</h3>
            <div class="flex-align-center gap-4 text-sm font-bold">
              <span class="flex-align-center gap-2"><div style="width:12px;height:12px;border-radius:50%;background:var(--success);box-shadow:0 0 8px var(--success)"></div> Paid</span>
              <span class="flex-align-center gap-2"><div style="width:12px;height:12px;border-radius:50%;background:var(--warning);box-shadow:0 0 8px var(--warning)"></div> Upcoming</span>
              <span class="flex-align-center gap-2"><div style="width:12px;height:12px;border-radius:50%;background:var(--danger);box-shadow:0 0 8px var(--danger)"></div> Overdue</span>
            </div>
          </div>
          <div id="bills-list-container" style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Populated by JS -->
          </div>
        </div>
      </div>
    `;
  },
  
  loadData() {
    this.renderCalendar();
    this.renderBillsList();
  },

  renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;

    let html = '';
    // Mocking July 2026: starts on Wednesday (3 empty slots)
    for(let i=0; i<3; i++) {
      html += '<div style="background: var(--bg-secondary); border-radius: var(--radius-md); opacity: 0.3;"></div>';
    }
    for(let i=1; i<=31; i++) {
      let dots = '';
      if (i === 1) dots = '<div style="width:8px;height:8px;border-radius:50%;background:var(--success);margin:4px auto;box-shadow:0 0 5px var(--success)"></div>';
      if (i === 5) dots = '<div style="width:8px;height:8px;border-radius:50%;background:var(--success);margin:4px auto;box-shadow:0 0 5px var(--success)"></div>';
      if (i === 15) dots = '<div style="width:8px;height:8px;border-radius:50%;background:var(--warning);margin:4px auto;box-shadow:0 0 5px var(--warning)"></div>';
      if (i === 27) dots = '<div style="width:8px;height:8px;border-radius:50%;background:var(--warning);margin:4px auto;box-shadow:0 0 5px var(--warning)"></div>';
      
      const isToday = i === 24;
      const bg = isToday ? 'var(--primary-light, rgba(59,130,246,0.1))' : 'var(--bg-card)';
      const border = isToday ? '2px solid var(--primary)' : '1px solid var(--border-color)';
      
      html += `
        <div class="calendar-day" style="background: ${bg}; border: ${border}; border-radius: var(--radius-md); padding: 8px; position: relative; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='none'">
          <span class="text-sm ${isToday ? 'font-bold text-primary' : ''}">${i}</span>
          ${dots}
        </div>
      `;
    }
    grid.innerHTML = html;
  },

  renderBillsList() {
    const container = document.getElementById('bills-list-container');
    if (!container) return;

    const formatFn = window.App && window.App.formatCurrency ? window.App.formatCurrency : (v) => '$' + v.toFixed(2);

    const bills = [
      { id: 1, name: 'Mortgage', amount: 1800, due: 27, member: 'Family', autopay: true, paid: false },
      { id: 2, name: 'Duke Energy', amount: 150, due: 15, member: 'Barbara', autopay: false, paid: false },
      { id: 3, name: 'Internet', amount: 80, due: 5, member: 'Chris', autopay: true, paid: true },
      { id: 4, name: 'Car Insurance', amount: 220, due: 1, member: 'Family', autopay: true, paid: true }
    ];

    container.innerHTML = bills.map(bill => {
      const statusColor = bill.paid ? 'var(--success)' : 'var(--warning)';
      const checkIcon = bill.paid ? '<polyline points="20 6 9 17 4 12"></polyline>' : '';

      return `
        <div class="bill-row flex-between align-center p-4" style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); background: var(--bg-card); transition: all 0.3s; box-shadow: var(--shadow-sm);" onmouseover="this.style.borderColor='var(--primary)'; this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.boxShadow='var(--shadow-sm)'">
          <div class="flex-align-center gap-5">
            <button class="btn-toggle-paid" data-id="${bill.id}" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid ${statusColor}; background: ${bill.paid ? statusColor : 'transparent'}; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; flex-shrink: 0;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">${checkIcon}</svg>
            </button>
            <div>
              <p class="font-bold text-lg mb-1" style="${bill.paid ? 'color: var(--text-muted);' : ''}">${bill.name}</p>
              <div class="flex-align-center gap-3">
                <span class="text-sm font-bold ${bill.paid ? 'text-muted' : 'text-main'}">Due: Jul ${bill.due}</span>
                ${bill.autopay ? '<span class="badge text-xs font-bold" style="background: rgba(59,130,246,0.1); color: var(--primary); padding: 4px 8px;">AutoPay</span>' : ''}
              </div>
            </div>
          </div>
          <div class="text-right flex-align-center gap-5">
            <span class="badge text-sm font-bold" style="background: var(--bg-secondary); padding: 6px 12px;">${bill.member}</span>
            <p class="font-mono font-bold text-xl" style="${bill.paid ? 'text-decoration: line-through; color: var(--text-muted); opacity: 0.7;' : 'color: var(--text-main);'}">${formatFn(bill.amount)}</p>
          </div>
        </div>
      `;
    }).join('');
    
    // Add event listeners to toggle buttons
    const btns = container.querySelectorAll('.btn-toggle-paid');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const isPaid = e.currentTarget.style.background !== 'transparent' && e.currentTarget.style.background !== '';
        
        if (window.Confetti && !isPaid) window.Confetti.celebrate();
        if (window.App && window.App.showToast) {
          window.App.showToast(isPaid ? 'Marked as unpaid' : 'Bill marked as paid!', isPaid ? 'info' : 'success');
        }
        
        // Simple visual toggle
        e.currentTarget.style.background = isPaid ? 'transparent' : 'var(--success)';
        e.currentTarget.style.borderColor = isPaid ? 'var(--warning)' : 'var(--success)';
        e.currentTarget.innerHTML = isPaid ? '' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        
        const row = e.currentTarget.closest('.bill-row');
        const nameP = row.querySelector('p.text-lg');
        const amountP = row.querySelector('p.font-mono');
        const dueSpan = row.querySelector('span.text-sm');

        if (isPaid) {
          nameP.style.color = 'var(--text-main)';
          amountP.style.textDecoration = 'none';
          amountP.style.color = 'var(--text-main)';
          amountP.style.opacity = '1';
          dueSpan.classList.remove('text-muted');
          dueSpan.classList.add('text-main');
        } else {
          nameP.style.color = 'var(--text-muted)';
          amountP.style.textDecoration = 'line-through';
          amountP.style.color = 'var(--text-muted)';
          amountP.style.opacity = '0.7';
          dueSpan.classList.remove('text-main');
          dueSpan.classList.add('text-muted');
        }
      });
    });
  },

  bindEvents() {
    const btnAdd = document.getElementById('btn-add-bill');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        if (window.App && window.App.showModal) {
          window.App.showModal('Add Bill', '<p class="p-4 text-center text-muted">Bill form implementation pending.</p>', '<button class="btn btn-secondary" onclick="window.App.hideModal()">Cancel</button><button class="btn btn-primary" onclick="window.App.hideModal()">Save Bill</button>');
        }
      });
    }
  }
};
