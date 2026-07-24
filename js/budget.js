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
            <p class="text-4xl font-mono font-bold text-primary" id="budget-total">$4,065.73</p>
          </div>
          <div class="card stat-card text-center p-5" style="border-bottom: 4px solid var(--warning);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Spent This Month</p>
            <p class="text-4xl font-mono font-bold text-warning" id="budget-spent">$1,452.30</p>
          </div>
          <div class="card stat-card text-center p-5" style="border-bottom: 4px solid var(--success);">
            <p class="text-sm text-muted mb-2 font-bold uppercase tracking-wider">Remaining</p>
            <p class="text-4xl font-mono font-bold text-success" id="budget-remaining">$2,613.43</p>
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
  },

  renderCategories() {
    const container = document.getElementById('budget-categories-list');
    if (!container) return;

    const formatFn = window.App && window.App.formatCurrency ? window.App.formatCurrency : (v) => '$' + v.toFixed(2);

    let categories = [
      { name: 'Groceries', limit: 1200, spent: 850, member: 'Family', icon: '<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>' },
      { name: 'Dining Out', limit: 400, spent: 380, member: 'Chris', icon: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>' },
      { name: 'Utilities', limit: 450, spent: 200, member: 'Barbara', icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>' },
      { name: 'Gasoline', limit: 300, spent: 150, member: 'Family', icon: '<path d="M3 22v-8p2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8"></path><path d="M11 7H3"></path><path d="M15 11l4-4 4 4"></path>' },
      { name: 'Entertainment', limit: 300, spent: 50, member: 'Erin', icon: '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>' },
      { name: 'Shopping', limit: 500, spent: 100, member: 'Barbara', icon: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>' }
    ];

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
        if (window.app && window.app.showModal) {
          window.app.showModal(
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
            `<button class="btn btn-outline" onclick="window.app.hideModal()">Cancel</button>
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
    if (window.app && window.app.hideModal) {
      window.app.hideModal();
      window.app.showToast('Budget category saved successfully', 'success');
    }
  }
};
