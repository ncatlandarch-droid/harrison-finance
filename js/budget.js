  window.Budget = {
  init() {
    this.render();
    this.loadData();
    this.bindEvents();
  },
  
  refresh() {
    this.render();
    this.loadData();
    this.bindEvents();
  },
  
  render() {
    const section = document.getElementById('section-budget');
    if (!section) return;

    section.innerHTML = `
      <div class="budget-container">
        <!-- 1. HEADER -->
        <div class="flex-between align-center mb-6 animate-fade-in-up">
          <h2 class="text-3xl font-bold">Budget Tracker</h2>
          <div class="flex-align-center gap-4">
            <select id="budget-month-select" class="form-select bg-card text-main font-bold" style="border-radius: var(--radius-md); padding: 0.6rem 1rem; border: 1px solid var(--border-color);">
              <option value="jul">July 2026</option>
              <option value="jun">June 2026</option>
            </select>
            <div id="budget-member-filters" class="pill-nav flex-align-center bg-card p-1" style="border-radius: 24px; border: 1px solid var(--border-color);">
              <button class="btn btn-sm active" data-member="All" style="border-radius: 20px; min-width: 60px;">All</button>
              <button class="btn btn-sm" data-member="Barbara" style="border-radius: 20px; min-width: 80px;">Barbara</button>
              <button class="btn btn-sm" data-member="Chris" style="border-radius: 20px; min-width: 70px;">Chris</button>
              <button class="btn btn-sm" data-member="Erin" style="border-radius: 20px; min-width: 70px;">Erin</button>
            </div>
            <button class="btn btn-primary flex-align-center gap-2" id="btn-add-budget">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Category
            </button>
          </div>
        </div>

        <!-- 2. SUMMARY STATS -->
        <div class="grid-3 mb-6 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="card stat-card text-center p-5" style="border-bottom: 4px solid var(--primary);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Total Budget</p>
            <p class="text-4xl font-mono font-bold text-primary" id="budget-total">--</p>
          </div>
          <div class="card stat-card text-center p-5" style="border-bottom: 4px solid var(--warning);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Spent This Month</p>
            <p class="text-4xl font-mono font-bold text-warning" id="budget-spent">--</p>
          </div>
          <div class="card stat-card text-center p-5" style="border-bottom: 4px solid var(--success);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Remaining</p>
            <p class="text-4xl font-mono font-bold text-success" id="budget-remaining">--</p>
          </div>
        </div>

        <!-- 3. BUDGET CATEGORIES -->
        <div class="grid-3 mb-5 animate-fade-in-up" style="animation-delay: 0.2s" id="budget-categories-list">
          <!-- Populated by JS -->
        </div>
      </div>
    `;
  },
  
  loadData() {
    this.currentFilter = 'All';
    this.renderCategories();
    this.updateSummary();
  },

  updateSummary() {
    const fmt = (v) => '$' + Math.abs(v).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    const budgets = (Storage && Storage.data) ? Storage.data.budgets : [];
    const totalLimit = budgets.reduce((s, b) => s + (b.limit || 0), 0);
    const totalSpent = budgets.reduce((s, b) => s + (b.spent || 0), 0);
    const remaining = totalLimit - totalSpent;
    const el1 = document.getElementById('budget-total');
    const el2 = document.getElementById('budget-spent');
    const el3 = document.getElementById('budget-remaining');
    if (el1) el1.textContent = fmt(totalLimit);
    if (el2) el2.textContent = fmt(totalSpent);
    if (el3) {
      el3.textContent = fmt(Math.abs(remaining));
      el3.style.color = remaining >= 0 ? 'var(--success)' : 'var(--danger)';
      if (remaining < 0) el3.textContent = '-' + el3.textContent;
    }
  },

  renderCategories() {
    const container = document.getElementById('budget-categories-list');
    if (!container) return;

    const formatFn = (v) => '$' + Math.abs(v).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    const iconMap = {
      home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
      car: '<circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle><path d="M5 17H3v-6l2-5h14l2 5v6h-2"></path><path d="M5 7h14"></path>',
      cart: '<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>',
      user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
      heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
      utensils: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
      dollar: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
      briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
      'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>'
    };
    const defaultIcon = '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>';

    let categories = ((Storage && Storage.data) ? Storage.data.budgets : []).map(b => {
      const memberName = b.memberId === 'family' ? 'Family' : (Storage.getMember(b.memberId) || {}).name || b.memberId;
      return {
        name: b.category,
        limit: b.limit || 0,
        spent: b.spent || 0,
        member: memberName,
        icon: iconMap[b.icon] || defaultIcon
      };
    });

    if (this.currentFilter && this.currentFilter !== 'All') {
      categories = categories.filter(c => c.member === this.currentFilter || c.member === 'Family');
    }

    container.innerHTML = categories.map((cat) => {
      const pct = (cat.spent / cat.limit) * 100;
      let color = 'var(--success)';
      if (pct >= 80) color = 'var(--danger)';
      else if (pct >= 50) color = 'var(--warning)';

      return `
        <div class="card hover-glow" style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 25px ${color.replace('var(--', '').replace(')', '') === 'success' ? 'rgba(74, 222, 128, 0.2)' : color.includes('danger') ? 'rgba(248, 113, 113, 0.2)' : 'rgba(250, 204, 21, 0.2)'}'" onmouseout="this.style.transform='none'; this.style.boxShadow='var(--shadow-md)'">
          <div class="flex-between align-start mb-5">
            <div class="flex-align-center gap-4">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: ${color}20; color: ${color}; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${cat.icon}</svg>
              </div>
              <div>
                <h4 class="font-bold text-lg mb-1">${cat.name}</h4>
                <span class="badge text-xs" style="background: var(--bg-secondary); padding: 2px 8px;">${cat.member}</span>
              </div>
            </div>
            <button class="btn btn-icon btn-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
          </div>

          <div class="flex-between align-center mb-3">
            <div>
              <p class="text-xs text-muted mb-1 uppercase font-bold tracking-wider">Spent</p>
              <p class="font-mono font-bold text-lg" style="color: ${color}">${formatFn(cat.spent)}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-muted mb-1 uppercase font-bold tracking-wider">Limit</p>
              <p class="font-mono font-bold text-lg">${formatFn(cat.limit)}</p>
            </div>
          </div>

          <div style="height: 10px; border-radius: 5px; overflow: hidden; background: var(--bg-secondary); width: 100%; position: relative;">
            <div style="position: absolute; top: 0; left: 0; height: 100%; width: ${Math.min(pct, 100)}%; background: ${color}; border-radius: 5px; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);"></div>
          </div>
          <p class="text-xs text-right mt-2 text-muted font-bold">${pct.toFixed(0)}% used</p>
        </div>
      `;
    }).join('');
  },

  bindEvents() {
    const btnAdd = document.getElementById('btn-add-budget');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        if (window.App && window.App.showModal) {
          window.App.showModal(
            'Add Budget Category', 
            `<form id="add-budget-form">
               <div class="form-group mb-3">
                 <label class="form-label text-sm text-secondary">Category Name</label>
                 <input type="text" class="form-input w-full" id="budget-cat-name" required>
               </div>
               <div class="form-group mb-3">
                 <label class="form-label text-sm text-secondary">Monthly Limit</label>
                 <input type="number" class="form-input w-full" id="budget-cat-limit" required>
               </div>
               <div class="form-group mb-3">
                 <label class="form-label text-sm text-secondary">Assigned Member</label>
                 <select class="form-input w-full" id="budget-cat-member">
                   <option value="Family">Family / Joint</option>
                   <option value="Barbara">Barbara</option>
                   <option value="Chris">Chris</option>
                   <option value="Erin">Erin</option>
                 </select>
               </div>
             </form>`,
            `<button class="btn btn-outline" onclick="window.App.hideModal()">Cancel</button>
             <button class="btn btn-primary" onclick="window.Budget.saveCategory()">Save Category</button>`
          );
        }
      });
    }

    const monthSelect = document.getElementById('budget-month-select');
    if (monthSelect) {
      monthSelect.addEventListener('change', () => {
        this.renderCategories();
      });
    }

    const memberFilters = document.querySelectorAll('#budget-member-filters button');
    memberFilters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        memberFilters.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.getAttribute('data-member');
        this.renderCategories();
      });
    });
  },

  saveCategory() {
    // Mock save
    if (window.App && window.App.hideModal) {
      window.App.hideModal();
      window.App.showToast('Budget category saved successfully', 'success');
    }
  }
};
