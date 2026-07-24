window.Trends = {
  init() {
    this.refresh();
  },

  refresh() {
    const container = document.getElementById('trends-content');
    if (!container) return;
    
    const txns = window.Storage.getTransactions();
    
    // Filter out active member if needed
    const currentMember = window.app ? window.app.currentMemberFilter : 'all';
    const filteredTxns = currentMember === 'all' 
      ? txns 
      : txns.filter(t => t.memberId === currentMember || t.memberId === 'family');
    
    // Count actual expenses
    const expenses = filteredTxns.filter(t => {
      if (t.type && t.type.toLowerCase() === 'income') return false;
      if (t.amount > 0 && (!t.type || t.type.toLowerCase() !== 'expense')) return false;
      return true;
    });

    if (!expenses || expenses.length === 0) {
      this.renderEmptyState(container);
      return;
    }
    
    const insights = this.processData(expenses, txns);
    this.renderLayout(container, insights);
    this.renderCharts(insights);
  },
  
  renderEmptyState(container) {
    container.innerHTML = `
      <div class="section-empty mt-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        <h4>No Transaction Data</h4>
        <p class="text-secondary mb-4">Import your BoA statements to see spending insights!</p>
        <button class="btn btn-primary" onclick="app.navigate('import')">Go to Import</button>
      </div>
    `;
  },
  
  processData(expenses, allTxns) {
    const getSpend = (t) => Math.abs(t.amount);
    
    // 1. Category
    const catMap = {};
    expenses.forEach(t => {
      const cat = t.category || 'Uncategorized';
      catMap[cat] = (catMap[cat] || 0) + getSpend(t);
    });
    const categories = Object.keys(catMap)
      .map(k => ({ label: k, value: catMap[k] }))
      .sort((a,b) => b.value - a.value);
      
    // 2. Member
    const memMap = {};
    expenses.forEach(t => {
      const m = t.memberId || 'family';
      memMap[m] = (memMap[m] || 0) + getSpend(t);
    });
    
    const membersData = window.Storage.getFamily().members;
    const getMemberColor = (id) => {
      if (id === 'family') return 'var(--color-family)';
      const m = membersData.find(x => x.id === id);
      return m ? m.color : '#ccc';
    };
    const getMemberName = (id) => {
      if (id === 'family') return 'Family';
      const m = membersData.find(x => x.id === id);
      return m ? m.name : id;
    };
    
    const members = Object.keys(memMap).map(k => ({
      label: getMemberName(k),
      value: memMap[k],
      color: getMemberColor(k)
    }));
    
    // 3. Monthly Trend
    const monthMap = {};
    expenses.forEach(t => {
      if (!t.date) return;
      const d = new Date(t.date);
      const mKey = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}`;
      if (!monthMap[mKey]) monthMap[mKey] = 0;
      monthMap[mKey] += getSpend(t);
    });
    const sortedMonths = Object.keys(monthMap).sort();
    const monthly = sortedMonths.map(k => {
      const date = new Date(k + '-01T00:00:00');
      return {
        label: date.toLocaleDateString('default', { month: 'short' }),
        value: monthMap[k]
      };
    });
    
    // 4. Merchants
    const merchMap = {};
    expenses.forEach(t => {
      const m = t.payee || t.merchant || t.description || 'Unknown';
      if (!merchMap[m]) merchMap[m] = { count: 0, total: 0, cat: t.category || 'Uncategorized' };
      merchMap[m].count++;
      merchMap[m].total += getSpend(t);
    });
    const topMerchants = Object.keys(merchMap)
      .map(k => ({ name: k, ...merchMap[k] }))
      .sort((a,b) => b.total - a.total)
      .slice(0, 10);
      
    // 5. Month over month
    let momChange = 0;
    let momMemberChanges = [];
    
    if (sortedMonths.length >= 2) {
      const lastMonth = sortedMonths[sortedMonths.length-1];
      const prevMonth = sortedMonths[sortedMonths.length-2];
      
      const lastSpend = expenses.filter(t => t.date && t.date.startsWith(lastMonth)).reduce((sum, t) => sum + getSpend(t), 0);
      const prevSpend = expenses.filter(t => t.date && t.date.startsWith(prevMonth)).reduce((sum, t) => sum + getSpend(t), 0);
      momChange = lastSpend - prevSpend;
      
      // Member MoM
      const memberMoM = {};
      Object.keys(memMap).forEach(mId => {
        const l = expenses.filter(t => t.memberId === mId && t.date && t.date.startsWith(lastMonth)).reduce((sum, t) => sum + getSpend(t), 0);
        const p = expenses.filter(t => t.memberId === mId && t.date && t.date.startsWith(prevMonth)).reduce((sum, t) => sum + getSpend(t), 0);
        memberMoM[mId] = l - p;
      });
      momMemberChanges = Object.keys(memberMoM).map(k => ({
        name: getMemberName(k),
        change: memberMoM[k]
      }));
    }
    
    return {
      categories,
      members,
      monthly,
      topMerchants,
      momChange,
      momMemberChanges
    };
  },
  
  renderLayout(container, insights) {
    const isPositive = insights.momChange <= 0;
    const momColor = isPositive ? 'var(--success)' : 'var(--danger)';
    const momArrow = isPositive ? '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>' 
                                : '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
    const momText = insights.momChange === 0 ? 'Same as last month' : 
      `You spent ${window.app.formatCurrency(Math.abs(insights.momChange))} ${insights.momChange > 0 ? 'more' : 'less'} than last month`;

    const momCardsHTML = insights.momMemberChanges.length > 0 ? insights.momMemberChanges.map(mc => {
      const mcPos = mc.change <= 0;
      const mcCol = mcPos ? 'var(--success)' : 'var(--danger)';
      const mcArr = mcPos ? '↓' : '↑';
      return `
        <div class="card stat-card" style="min-height: 80px;">
          <div class="stat-info w-full">
            <div class="stat-label">${mc.name} vs Last Month</div>
            <div class="stat-value text-lg flex items-center gap-sm" style="color: ${mcCol}; font-size: 1.2rem;">
              ${mcArr} ${window.app.formatCurrency(Math.abs(mc.change))}
            </div>
          </div>
        </div>
      `;
    }).join('') : '';

    container.innerHTML = `
      <div class="grid-4 mb-4">
        <div class="card stat-card" style="grid-column: span 1; min-height: 80px;">
          <div class="stat-icon ${isPositive ? 'cool' : 'warm'}">
            ${momArrow}
          </div>
          <div class="stat-info">
            <div class="stat-label">Month-over-Month</div>
            <div class="stat-value" style="color: ${momColor}">${window.app.formatCurrency(Math.abs(insights.momChange))}</div>
            <div class="text-sm text-secondary">${momText}</div>
          </div>
        </div>
        ${momCardsHTML}
      </div>
      
      <div class="grid-2 mb-4">
        <div class="card">
          <div class="card-header">
            <h3>Spending by Category</h3>
          </div>
          <div class="chart-container" style="height: 300px;">
            <canvas id="trends-category-chart"></canvas>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3>Spending by Person</h3>
          </div>
          <div class="chart-container" style="height: 300px;">
            <canvas id="trends-member-chart"></canvas>
          </div>
        </div>
      </div>
      
      <div class="grid-2 mb-4">
        <div class="card">
          <div class="card-header">
            <h3>Monthly Trend</h3>
          </div>
          <div class="chart-container" style="height: 300px;">
            <canvas id="trends-monthly-chart"></canvas>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Top 10 Merchants</h3>
          </div>
          <div style="overflow-x: auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Merchant</th>
                  <th>Category</th>
                  <th style="text-align: right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${insights.topMerchants.map(m => `
                  <tr>
                    <td>
                      <div class="font-medium">${m.name}</div>
                      <div class="text-sm text-secondary">${m.count} transactions</div>
                    </td>
                    <td><span class="badge badge-warning">${m.cat}</span></td>
                    <td style="text-align: right" class="font-mono font-bold">${window.app.formatCurrency(m.total)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },
  
  renderCharts(insights) {
    // 1. Spending by Category (Bar Chart)
    if (insights.categories.length > 0) {
      const topCats = insights.categories.slice(0, 6);
      const colors = ['var(--primary)', 'var(--accent-pink)', 'var(--accent-gold)', 'var(--accent-blue)', 'var(--secondary)', 'var(--color-barbara)'];
      topCats.forEach((c, i) => {
        c.color = colors[i % colors.length];
        c.label = c.label.length > 10 ? c.label.substring(0, 10) + '...' : c.label; // truncate long labels for vertical bars
      });
      if (document.getElementById('trends-category-chart')) {
        window.Charts.bar('trends-category-chart', topCats);
      }
    }

    // 2. Spending by Person (Donut Chart)
    if (insights.members.length > 0) {
      if (document.getElementById('trends-member-chart')) {
        window.Charts.donut('trends-member-chart', insights.members, { 
          innerRadius: 0.6,
          centerValue: window.app.formatCurrency(insights.members.reduce((a,b)=>a+b.value, 0)),
          centerLabel: 'Total'
        });
      }
    }
    
    // 3. Monthly Trend (Line Chart)
    if (insights.monthly.length > 0) {
      if (document.getElementById('trends-monthly-chart')) {
        window.Charts.line('trends-monthly-chart', insights.monthly, { showLabels: true });
      }
    }
  }
};
