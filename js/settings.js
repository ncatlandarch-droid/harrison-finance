window.Settings = {
  init() {
    this.render();
  },

  refresh() {
    this.render();
  },

  render() {
    const container = document.getElementById('settings-content');
    if (!container) return;

    const currentKey = localStorage.getItem('harrison_finance_api_key') || '';
    
    const html = `
      <div class="settings-grid" style="display: grid; gap: 24px; max-width: 800px;">
        <!-- API Configuration -->
        <div class="card">
          <div class="card-header">
            <h3><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px; vertical-align:middle"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg> API Configuration</h3>
          </div>
          <div class="card-body">
            <p class="text-secondary mb-4">Set your Gemini API key to enable the Harrison Finance Weekly Podcast and other AI features.</p>
            <div class="form-group mb-4">
              <label>Gemini API Key</label>
              <div style="display: flex; gap: 8px;">
                <input type="password" id="settings-api-key" class="form-control" placeholder="AIzaSy..." value="${currentKey}" style="flex-grow: 1;">
                <button class="btn btn-outline" id="btn-toggle-key-visibility" type="button" title="Show/Hide">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-primary" id="btn-save-api-key">Save Key</button>
              <button class="btn btn-outline" id="btn-test-api-key">Test Connection</button>
            </div>
            <div id="api-test-result" class="mt-4 text-sm"></div>
          </div>
        </div>
        
        <!-- Data Management -->
        <div class="card">
          <div class="card-header">
            <h3><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px; vertical-align:middle"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg> Data Management</h3>
          </div>
          <div class="card-body">
            <p class="text-secondary mb-4">Export your data for backup, import existing data, or reset the application completely.</p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button class="btn btn-outline" onclick="Settings.handleExport()">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export Data
              </button>
              <label class="btn btn-outline cursor-pointer" style="margin:0; cursor:pointer;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Import Data
                <input type="file" id="settings-import-file" accept=".json" style="display:none;" onchange="Settings.handleImport(event)">
              </label>
              <button class="btn btn-danger" style="background:var(--danger); border-color:var(--danger);" onclick="Settings.confirmReset()">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Reset App Data
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachListeners();
  },

  attachListeners() {
    const input = document.getElementById('settings-api-key');
    const toggleBtn = document.getElementById('btn-toggle-key-visibility');
    const saveBtn = document.getElementById('btn-save-api-key');
    const testBtn = document.getElementById('btn-test-api-key');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (input.type === 'password') {
          input.type = 'text';
          toggleBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
        } else {
          input.type = 'password';
          toggleBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        }
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const key = input.value.trim();
        if (key) {
          localStorage.setItem('harrison_finance_api_key', key);
          app.showToast('API Key saved successfully', 'success');
        } else {
          localStorage.removeItem('harrison_finance_api_key');
          app.showToast('API Key removed', 'info');
        }
      });
    }

    if (testBtn) {
      testBtn.addEventListener('click', async () => {
        const key = input.value.trim();
        const resultEl = document.getElementById('api-test-result');
        if (!key) {
          resultEl.innerHTML = '<span style="color:var(--danger)">Please enter a key first.</span>';
          return;
        }

        testBtn.disabled = true;
        resultEl.innerHTML = 'Testing connection...';
        
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] })
          });
          
          if (res.ok) {
            resultEl.innerHTML = '<span style="color:var(--success)">Connection successful! The API key is valid.</span>';
          } else {
            const err = await res.json();
            resultEl.innerHTML = `<span style="color:var(--danger)">Connection failed: ${err.error?.message || 'Invalid API Key'}</span>`;
          }
        } catch (e) {
          resultEl.innerHTML = `<span style="color:var(--danger)">Network error: ${e.message}</span>`;
        } finally {
          testBtn.disabled = false;
        }
      });
    }
  },

  handleExport() {
    const dataStr = Storage.exportData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'harrison_finance_backup_' + new Date().toISOString().split('T')[0] + '.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  },

  handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target.result;
        Storage.importData(json);
        app.showToast('Data imported successfully!', 'success');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        app.showToast('Failed to import data. Invalid format.', 'error');
        console.error(err);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset input
  },

  confirmReset() {
    app.showModal(
      'Reset All Data?',
      '<p>Are you sure you want to completely reset all data? This will clear all transactions, bills, savings, and settings. This action cannot be undone.</p>',
      `<button class="btn btn-outline" onclick="app.hideModal()">Cancel</button>
       <button class="btn btn-danger" style="background:var(--danger); border-color:var(--danger);" onclick="app.hideModal(); Storage.resetData();">Yes, Reset Everything</button>`
    );
  }
};
