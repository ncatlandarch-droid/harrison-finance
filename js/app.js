window.App = {
  currentSection: 'dashboard',

  init() {
    if (window.Storage) Storage.init();
    
    // Set up navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        if (section) this.navigateTo(section);
      });
    });

    this.setupFAB();
    
    document.getElementById('date-display').innerText = this.getCurrentDate();
    
    // Initialize modules if they exist
    // [window.Dashboard, window.Budget, window.Bills, window.Savings, window.NetWorth, window.Splitter, window.Investments, window.Debts].forEach(mod => {
    //   if (mod && typeof mod.init === 'function') mod.init();
    // });
    
    this.navigateTo(this.currentSection);
  },

  navigateTo(sectionName) {
    // Hide all sections
    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(`section-${sectionName}`);
    if (target) {
      target.classList.add('active');
    }

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-section') === sectionName) {
        link.classList.add('active');
        document.getElementById('page-title').innerText = link.querySelector('span').innerText;
      } else {
        link.classList.remove('active');
      }
    });

    this.currentSection = sectionName;
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
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  formatCurrency(amount) {
    const isNegative = amount < 0;
    const abs = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(abs);
    if (isNegative) {
      return `<span style="color: var(--danger)">(${formatted})</span>`;
    }
    return formatted;
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

  getInitials(name) {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  },

  getMemberColor(memberId) {
    if (memberId === 'family') return 'var(--accent-blue)';
    if (window.Storage) {
      const m = Storage.getMember(memberId);
      if (m && m.color) return m.color;
    }
    return 'var(--primary)';
  },

  getCurrentDate() {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
  },

  setupFAB() {
    const fab = document.getElementById('fab');
    if (!fab) return;
    
    fab.addEventListener('click', () => {
      // Just a simple interaction for now
      this.showToast('FAB Clicked! Menu coming soon.', 'success');
      if (window.Confetti) Confetti.fire({ particleCount: 30 });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
