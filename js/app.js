window.app = {
  currentSection: 'dashboard',
  currentMemberFilter: 'all',

  init() {
    // Hide splash screen
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => loadingOverlay.classList.add('hidden'), 500);
      }, 500);
    }

    if (window.Storage) Storage.init();
    
    // Set up navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        if (section) this.navigate(section);
      });
    });

    this.setupFAB();
    this.setupMemberFilters();
    this.setupKeyboardNav();
    
    document.getElementById('date-display').innerText = this.getCurrentDate();
    this.updateGreeting();
    
    // Initialize modules
    const modules = [
      window.Dashboard, window.Budget, window.Bills, 
      window.Savings, window.NetWorth, window.Splitter, 
      window.Investments, window.Debts, window.CSVImport
    ];
    modules.forEach(mod => {
      if (mod && typeof mod.init === 'function') {
        try {
          mod.init();
        } catch (e) {
          console.error('Error initializing module:', e);
        }
      }
    });
    
    this.navigate(this.currentSection);
  },

  updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    const el = document.getElementById('greeting-text');
    if (el) el.innerText = `${greeting}, Chris`;
  },

  navigate(sectionName) {
    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const target = document.getElementById(`section-${sectionName}`);
    if (target) {
      target.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-section') === sectionName) {
        link.classList.add('active');
        const titleEl = document.getElementById('page-title');
        if (titleEl) titleEl.innerText = link.querySelector('span').innerText;
      } else {
        link.classList.remove('active');
      }
    });

    this.currentSection = sectionName;
    this.refreshCurrentSection();
  },

  refreshCurrentSection() {
    // Call refresh on the active module if it has one
    const map = {
      'dashboard': window.Dashboard,
      'budget': window.Budget,
      'bills': window.Bills,
      'savings': window.Savings,
      'networth': window.NetWorth,
      'split': window.Splitter,
      'invest': window.Investments,
      'debts': window.Debts,
      'import': window.CSVImport
    };
    const mod = map[this.currentSection];
    if (mod && typeof mod.refresh === 'function') {
      mod.refresh();
    }
  },

  setupMemberFilters() {
    const filters = document.querySelectorAll('.member-badge');
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentMemberFilter = btn.getAttribute('data-member');
        this.refreshCurrentSection();
      });
    });
  },

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideModal();
        const fabMenu = document.getElementById('fab-menu');
        if (fabMenu && !fabMenu.classList.contains('hidden')) {
          fabMenu.classList.add('hidden');
        }
      }
      // Simple section switching (Alt+1 to Alt+9) to avoid interfering with inputs
      if (e.altKey && e.key >= '1' && e.key <= '9') {
        const sections = ['dashboard', 'budget', 'bills', 'savings', 'networth', 'split', 'invest', 'debts', 'import'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) this.navigate(sections[index]);
      }
    });
  },

  showModal(title, bodyHTML, footerHTML) {
    const overlay = document.getElementById('modal-overlay');
    document.getElementById('modal-header').innerHTML = title;
    document.getElementById('modal-body').innerHTML = bodyHTML;
    document.getElementById('modal-footer').innerHTML = footerHTML;
    overlay.classList.remove('hidden');
  },

  hideModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '';
    if(type === 'success') icon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--success)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    else if(type === 'error') icon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--danger)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    else icon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  formatCurrency(amount) {
    const abs = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(abs);
    return amount < 0 ? `-${formatted}` : formatted;
  },

  formatCurrencyColored(amount) {
    const isNegative = amount < 0;
    const abs = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(abs);
    if (isNegative) {
      return `<span style="color: var(--danger)">-${formatted}</span>`;
    }
    return formatted;
  },

  animateValue(elementId, start, end, duration = 1000) {
    const obj = document.getElementById(elementId);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + easeOut * (end - start);
      
      if (obj.classList.contains('is-currency')) {
        obj.innerHTML = this.formatCurrency(current);
      } else {
        obj.innerHTML = Math.floor(current);
      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  },

  formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  },

  formatPercent(value) {
    return `${value.toFixed(1)}%`;
  },

  formatCompact(amount) {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 }).format(amount);
  },

  getCurrentDate() {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
  },

  setupFAB() {
    const fab = document.getElementById('fab');
    const fabMenu = document.getElementById('fab-menu');
    if (!fab || !fabMenu) return;
    
    fab.addEventListener('click', () => {
      fab.classList.toggle('active');
      if (fab.classList.contains('active')) {
        fabMenu.classList.remove('hidden');
        setTimeout(() => fabMenu.classList.add('visible'), 10);
      } else {
        fabMenu.classList.remove('visible');
        setTimeout(() => fabMenu.classList.add('hidden'), 300);
      }
    });
  },

  handleFabAction(action) {
    const fab = document.getElementById('fab');
    const fabMenu = document.getElementById('fab-menu');
    fab.classList.remove('active');
    fabMenu.classList.remove('visible');
    setTimeout(() => fabMenu.classList.add('hidden'), 300);

    switch(action) {
      case 'transaction':
        this.openTransactionModal();
        break;
      case 'bill':
        if(window.Bills && window.Bills.showAddModal) window.Bills.showAddModal();
        break;
      case 'snapshot':
        if(window.NetWorth && window.NetWorth.takeSnapshot) window.NetWorth.takeSnapshot();
        break;
      case 'import':
        this.navigate('import');
        break;
    }
  },

  openTransactionModal() {
    this.showModal(
      'Add Transaction',
      `<p>Transaction form goes here (placeholder).</p>`,
      `<button class="btn btn-outline" onclick="app.hideModal()">Cancel</button>
       <button class="btn btn-primary" onclick="app.hideModal(); app.showToast('Transaction added', 'success')">Save</button>`
    );
  }
};

window.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
