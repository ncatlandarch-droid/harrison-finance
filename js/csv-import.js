window.CSVImport = {
  parseCSV(csvText) {
    const lines = csvText.split('\\n');
    const result = [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      // Basic CSV parsing handling quotes
      const obj = {};
      let currentline = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (currentline) {
        for (let j = 0; j < headers.length; j++) {
          let val = currentline[j] ? currentline[j].replace(/"/g, '').trim() : '';
          obj[headers[j]] = val;
        }
        result.push(obj);
      }
    }
    return result;
  },

  parseBOAStatement(csvText) {
    // Bank of America CSV format approximation
    const rows = this.parseCSV(csvText);
    const transactions = [];
    
    rows.forEach(row => {
      // Find Date, Description, Amount
      const dateKey = Object.keys(row).find(k => k.toLowerCase().includes('date'));
      const descKey = Object.keys(row).find(k => k.toLowerCase().includes('description') || k.toLowerCase().includes('payee'));
      const amtKey = Object.keys(row).find(k => k.toLowerCase().includes('amount'));
      
      if (dateKey && descKey && amtKey && row[dateKey] && row[amtKey]) {
        const dateStr = row[dateKey];
        const desc = row[descKey];
        const amountStr = row[amtKey].replace(/[^0-9.-]/g, '');
        const amount = parseFloat(amountStr);
        
        if (!isNaN(amount)) {
          const type = amount < 0 ? 'debit' : 'credit';
          const { category, icon } = this.categorizeTransaction(desc);
          
          transactions.push({
            date: dateStr,
            description: desc,
            amount: Math.abs(amount),
            type,
            category,
            icon
          });
        }
      }
    });
    
    return transactions;
  },

  categorizeTransaction(description) {
    const desc = description.toLowerCase();
    
    const categories = {
      'walmart': 'Groceries', 'target': 'Groceries', 'costco': 'Groceries', 'publix': 'Groceries', 'harris teeter': 'Groceries', 'food lion': 'Groceries',
      'shell': 'Transportation', 'bp': 'Transportation', 'exxon': 'Transportation', 'speedway': 'Transportation',
      'amazon': 'Shopping', 'amzn': 'Shopping',
      'netflix': 'Entertainment', 'spotify': 'Entertainment', 'hulu': 'Entertainment',
      'mcdonalds': 'Dining', 'starbucks': 'Dining', 'chick-fil-a': 'Dining', 'restaurant': 'Dining',
      'duke energy': 'Utility', 'water': 'Utility', 'spectrum': 'Utility',
      'payroll': 'Income', 'deposit': 'Income', 'transfer from': 'Transfer'
    };

    let matchedCat = 'Uncategorized';
    let icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'; // default info icon

    for (const [key, category] of Object.entries(categories)) {
      if (desc.includes(key)) {
        matchedCat = category;
        break;
      }
    }
    
    // Set icon based on matched cat (in real app, use a mapping)
    if (matchedCat === 'Groceries') icon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>'; // shopping cart

    return { category: matchedCat, icon };
  },

  createImportUI(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div id="csv-drop-zone" style="border: 2px dashed var(--border-color, #ccc); border-radius: 12px; padding: 40px 20px; text-align: center; cursor: pointer; transition: all 0.3s ease; background: var(--bg-secondary, #fafafa);">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted, #666); margin-bottom:15px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        <p style="font-size: 1.1rem; font-weight: bold; margin-bottom: 5px;">Drop your BoA CSV here</p>
        <p style="font-size: 0.9rem; color: var(--text-muted, #666);">or click to browse</p>
        <input type="file" id="csv-file-input" accept=".csv" style="display:none;">
      </div>
      <div id="csv-preview-container" style="display:none; margin-top:20px;">
        <h4 class="mb-2">Preview Transactions</h4>
        <div id="csv-preview-table" class="data-table" style="max-height: 300px; overflow-y: auto;"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
          <div id="csv-import-summary" class="text-sm font-bold"></div>
          <button class="btn btn-primary" id="btn-confirm-import">Import Transactions</button>
        </div>
      </div>
    `;

    const dropZone = document.getElementById('csv-drop-zone');
    const fileInput = document.getElementById('csv-file-input');

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--primary-color, #3b82f6)';
      dropZone.style.background = 'var(--highlight-bg, #eff6ff)';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'var(--border-color, #ccc)';
      dropZone.style.background = 'var(--bg-secondary, #fafafa)';
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--border-color, #ccc)';
      dropZone.style.background = 'var(--bg-secondary, #fafafa)';
      
      if (e.dataTransfer.files.length) {
        this.handleFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        this.handleFile(e.target.files[0]);
      }
    });

    document.getElementById('btn-confirm-import')?.addEventListener('click', () => {
      if (window.App && App.showToast) App.showToast(`${this.stagedTransactions?.length || 0} transactions imported successfully!`);
      // In real app, loop and Storage.addTransaction()
      document.getElementById('csv-preview-container').style.display = 'none';
      if (window.App && App.hideModal) App.hideModal('modal-csv-import');
    });
  },

  handleFile(file) {
    if (!file || !file.name.endsWith('.csv')) {
      if (window.App && App.showToast) App.showToast('Please upload a valid CSV file', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const txns = this.parseBOAStatement(text);
      this.showPreview(txns);
    };
    reader.readAsText(file);
  },

  showPreview(transactions) {
    this.stagedTransactions = transactions;
    const previewContainer = document.getElementById('csv-preview-container');
    const tableContainer = document.getElementById('csv-preview-table');
    const summary = document.getElementById('csv-import-summary');
    
    if (!previewContainer || !tableContainer) return;

    previewContainer.style.display = 'block';
    
    let html = `<table style="width:100%; text-align:left; border-collapse:collapse; font-size:0.9rem;">
      <thead style="background:var(--bg-secondary, #fafafa); position:sticky; top:0;">
        <tr>
          <th style="padding:8px; border-bottom:1px solid #ddd;">Date</th>
          <th style="padding:8px; border-bottom:1px solid #ddd;">Description</th>
          <th style="padding:8px; border-bottom:1px solid #ddd; text-align:right;">Amount</th>
          <th style="padding:8px; border-bottom:1px solid #ddd;">Category</th>
        </tr>
      </thead>
      <tbody>
    `;

    let credits = 0;
    let debits = 0;

    transactions.forEach(t => {
      if (t.type === 'credit') credits += t.amount;
      else debits += t.amount;
      
      const amountColor = t.type === 'credit' ? 'var(--success-color, green)' : 'inherit';
      const amountPrefix = t.type === 'credit' ? '+' : '-';

      html += `<tr>
        <td style="padding:8px; border-bottom:1px solid #eee;">${t.date}</td>
        <td style="padding:8px; border-bottom:1px solid #eee; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${t.description}">${t.description}</td>
        <td class="dm-mono" style="padding:8px; border-bottom:1px solid #eee; text-align:right; color:${amountColor};">${amountPrefix}${window.App ? App.formatCurrency(t.amount) : t.amount}</td>
        <td style="padding:8px; border-bottom:1px solid #eee;"><span class="badge" style="background:#eee; padding:2px 6px; border-radius:4px;">${t.category}</span></td>
      </tr>`;
    });

    html += `</tbody></table>`;
    tableContainer.innerHTML = html;

    if (summary) {
      summary.innerHTML = `Found ${transactions.length} txns (Credits: ${window.App ? App.formatCurrency(credits) : credits}, Debits: ${window.App ? App.formatCurrency(debits) : debits})`;
    }
  },

  showImportModal() {
    // Create modal dynamically if it doesn't exist
    let modal = document.getElementById('modal-csv-import');
    if (!modal) {
      modal = document.createElement('dialog');
      modal.id = 'modal-csv-import';
      modal.className = 'modal';
      modal.style.cssText = 'border:none; border-radius:12px; padding:25px; box-shadow:0 10px 30px rgba(0,0,0,0.3); max-width:600px; width:100%;';
      modal.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="margin:0;">Import Bank Statement</h3>
          <button class="btn btn-icon" onclick="this.closest('dialog').close()" style="background:none; border:none; cursor:pointer;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
        <div id="csv-import-ui-container"></div>
      `;
      document.body.appendChild(modal);
    }
    
    if (window.App && App.showModal) {
      App.showModal('modal-csv-import');
    } else {
      modal.showModal();
    }
    
    this.createImportUI('csv-import-ui-container');
  }
};
