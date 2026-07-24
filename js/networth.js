(function() {
    const iconTrendingUp = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`;
    const iconCamera = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`;

    function renderNetWorth() {
        const container = document.getElementById('section-networth');
        if (!container) return;

        const assets = window.Storage.getTotalAssets();
        const liabilities = window.Storage.getTotalLiabilities();
        const netWorth = assets - liabilities;

        let accounts = window.Storage.getAccounts() || [];
        if (accounts.length === 0) {
            accounts = [
                { id: window.Storage.generateId(), name: 'BoA Joint Checking', type: 'asset', balance: 1130.94, memberId: 'joint' },
                { id: window.Storage.generateId(), name: "Barbara's Checking", type: 'asset', balance: 2722.64, memberId: 'barbara' },
                { id: window.Storage.generateId(), name: 'BMO Alto Savings', type: 'asset', balance: 84904.00, memberId: 'erin' },
                { id: window.Storage.generateId(), name: 'Chris 401(k)', type: 'asset', balance: 45000.00, memberId: 'chris' },
                { id: window.Storage.generateId(), name: 'Mortgage', type: 'liability', balance: 150000.00, memberId: 'joint' }
            ];
            accounts.forEach(a => window.Storage.addAccount(a));
        }

        const assetAccounts = accounts.filter(a => a.type === 'asset');
        const liabilityAccounts = accounts.filter(a => a.type === 'liability');

        let html = `
            <div class="header-action">
                <h2>${iconTrendingUp} Net Worth</h2>
                <button class="btn btn-primary" onclick="window.NetWorth.takeSnapshot()">${iconCamera} Snapshot</button>
            </div>
            
            <div class="card text-center mb-6 py-10 animate-fade-in-up">
                <div class="text-gray-400 text-lg uppercase tracking-wider mb-2">Total Net Worth</div>
                <div class="text-6xl font-bold gradient-text dm-mono mb-6">${window.App.formatCurrency(netWorth)}</div>
                
                <div class="flex justify-center gap-8 max-w-lg mx-auto">
                    <div class="flex-1 text-right">
                        <div class="text-sm text-gray-500">Assets</div>
                        <div class="text-xl text-green-400 dm-mono">${window.App.formatCurrency(assets)}</div>
                    </div>
                    <div class="w-px bg-gray-700"></div>
                    <div class="flex-1 text-left">
                        <div class="text-sm text-gray-500">Liabilities</div>
                        <div class="text-xl text-red-400 dm-mono">${window.App.formatCurrency(liabilities)}</div>
                    </div>
                </div>
            </div>

            <div class="grid-2 mb-6">
                <div class="card animate-fade-in-up" style="animation-delay: 0.1s">
                    <h3 class="text-lg font-bold mb-4">Asset Allocation</h3>
                    <div class="chart-container" style="height: 250px;">
                        <canvas id="nw-allocation-chart"></canvas>
                    </div>
                </div>
                <div class="card animate-fade-in-up" style="animation-delay: 0.2s">
                    <h3 class="text-lg font-bold mb-4">Net Worth History</h3>
                    <div class="chart-container" style="height: 250px;">
                        <canvas id="nw-history-chart"></canvas>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <div class="card animate-fade-in-up" style="animation-delay: 0.3s">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold text-green-400">Assets</h3>
                        <button class="btn btn-sm btn-outline" onclick="window.NetWorth.showAddAccountModal('asset')">+ Add</button>
                    </div>
                    <div class="data-table">
                        ${assetAccounts.map(a => `
                            <div class="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                                <div class="flex items-center gap-2">
                                    <span class="member-badge" style="background-color: ${window.App.getMemberColor(a.memberId)}">${window.App.getInitials(a.memberId)}</span>
                                    <span>${a.name}</span>
                                </div>
                                <span class="dm-mono text-green-400">${window.App.formatCurrency(a.balance)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="card animate-fade-in-up" style="animation-delay: 0.4s">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold text-red-400">Liabilities</h3>
                        <button class="btn btn-sm btn-outline" onclick="window.NetWorth.showAddAccountModal('liability')">+ Add</button>
                    </div>
                    <div class="data-table">
                        ${liabilityAccounts.map(a => `
                            <div class="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                                <div class="flex items-center gap-2">
                                    <span class="member-badge" style="background-color: ${window.App.getMemberColor(a.memberId)}">${window.App.getInitials(a.memberId)}</span>
                                    <span>${a.name}</span>
                                </div>
                                <span class="dm-mono text-red-400">${window.App.formatCurrency(a.balance)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = html;

        setTimeout(() => {
            if(window.Charts) {
                if(assetAccounts.length > 0) {
                    window.Charts.donut('nw-allocation-chart', {
                        labels: assetAccounts.map(a => a.name),
                        datasets: [{ data: assetAccounts.map(a => a.balance) }]
                    }, { cutout: '60%' });
                }

                const snaps = window.Storage.getSnapshots() || [];
                if(snaps.length > 0) {
                    window.Charts.line('nw-history-chart', {
                        labels: snaps.map(s => window.App.formatDate(s.date)),
                        datasets: [{
                            label: 'Net Worth',
                            data: snaps.map(s => s.netWorth),
                            borderColor: '#8b5cf6',
                            tension: 0.4
                        }]
                    });
                }
            }
        }, 100);
    }

    function showAddAccountModal(type) {
        const members = window.Storage.getMembers() || [];
        const html = `
            <input type="hidden" id="acc-type" value="${type}">
            <div class="form-group">
                <label>Account Name</label>
                <input type="text" id="acc-name" class="form-input">
            </div>
            <div class="form-group">
                <label>Balance ($)</label>
                <input type="number" id="acc-balance" class="form-input dm-mono">
            </div>
            <div class="form-group">
                <label>Owner</label>
                <select id="acc-member" class="form-input">
                    <option value="joint">Joint</option>
                    ${members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                </select>
            </div>
        `;
        window.App.showModal('Add ' + (type === 'asset' ? 'Asset' : 'Liability'), html, `<button class="btn btn-primary" onclick="window.NetWorth.saveAccount()">Save</button>`);
    }

    function saveAccount() {
        const type = document.getElementById('acc-type').value;
        const name = document.getElementById('acc-name').value;
        const balance = parseFloat(document.getElementById('acc-balance').value);
        const memberId = document.getElementById('acc-member').value;

        if(!name || isNaN(balance)) return;

        window.Storage.addAccount({ type, name, balance, memberId });
        window.App.hideModal();
        window.App.showToast('Account added', 'success');
        renderNetWorth();
    }

    function takeSnapshot() {
        window.Storage.addSnapshot();
        window.App.showToast('Snapshot saved!', 'success');
        window.Confetti.fire();
        renderNetWorth();
    }

    window.NetWorth = { init: renderNetWorth, refresh: renderNetWorth, render: renderNetWorth, showAddAccountModal, saveAccount, takeSnapshot };

})();
