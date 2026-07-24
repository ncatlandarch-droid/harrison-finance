(function() {
    const iconUsers = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;

    function renderSplitter() {
        const container = document.getElementById('section-split');
        if (!container) return;

        let expenses = window.Storage.getSharedExpenses() || [];
        if (expenses.length === 0) {
            expenses = [
                { id: '1', date: '2024-07-20', description: 'Groceries', amount: 150.00, paidBy: 'chris', splits: { chris: 75, erin: 75 }, method: 'Equal' },
                { id: '2', date: '2024-07-22', description: 'Internet Bill', amount: 80.00, paidBy: 'erin', splits: { chris: 40, erin: 40 }, method: 'Equal' }
            ];
        }

        // Calculate balances
        let balances = { chris: 0, erin: 0, barbara: 0 };
        expenses.forEach(ex => {
            balances[ex.paidBy] += ex.amount; // they paid this much
            for (let member in ex.splits) {
                balances[member] -= ex.splits[member]; // they owe this much
            }
        });

        const settleOwe = balances.chris > balances.erin ? 
            `Erin owes Chris <span class="dm-mono font-bold text-green-400">${window.App.formatCurrency(balances.chris - balances.erin)}</span>` : 
            `Chris owes Erin <span class="dm-mono font-bold text-green-400">${window.App.formatCurrency(balances.erin - balances.chris)}</span>`;

        let html = `
            <div class="header-action">
                <h2>${iconUsers} Expense Splitter</h2>
                <button class="btn btn-primary" onclick="window.Splitter.showAddExpenseModal()">+ Add Expense</button>
            </div>

            <div class="grid-3 mb-6">
                <div class="card animate-fade-in-up text-center">
                    <h3 class="font-bold text-gray-400 mb-2">Chris Balance</h3>
                    <div class="text-3xl dm-mono ${balances.chris >= 0 ? 'text-green-400' : 'text-red-400'}">
                        ${window.App.formatCurrency(Math.abs(balances.chris))} ${balances.chris >= 0 ? '(Owed)' : '(Owes)'}
                    </div>
                </div>
                <div class="card animate-fade-in-up text-center" style="animation-delay: 0.1s">
                    <h3 class="font-bold text-gray-400 mb-2">Erin Balance</h3>
                    <div class="text-3xl dm-mono ${balances.erin >= 0 ? 'text-green-400' : 'text-red-400'}">
                        ${window.App.formatCurrency(Math.abs(balances.erin))} ${balances.erin >= 0 ? '(Owed)' : '(Owes)'}
                    </div>
                </div>
                <div class="card animate-fade-in-up flex flex-col justify-center items-center" style="animation-delay: 0.2s; background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.3);">
                    <h3 class="text-lg font-bold mb-2">Settlement</h3>
                    <div class="text-lg mb-4 text-center">${settleOwe}</div>
                    <button class="btn btn-sm" style="background: var(--primary); color: white;">Settle Up</button>
                </div>
            </div>

            <div class="card animate-fade-in-up" style="animation-delay: 0.3s">
                <h3 class="text-lg font-bold mb-4">Recent Shared Expenses</h3>
                <div class="data-table">
                    <div class="grid grid-cols-5 gap-4 font-bold text-gray-400 border-b border-gray-700 pb-2 mb-2">
                        <div>Date</div>
                        <div class="col-span-2">Description</div>
                        <div>Paid By</div>
                        <div class="text-right">Amount</div>
                    </div>
                    ${expenses.map(ex => `
                        <div class="grid grid-cols-5 gap-4 py-3 border-b border-gray-800 items-center">
                            <div class="text-sm">${window.App.formatDate(ex.date)}</div>
                            <div class="col-span-2 font-bold">${ex.description} <span class="badge ml-2">${ex.method}</span></div>
                            <div><span class="member-badge" style="background-color: ${window.App.getMemberColor(ex.paidBy)}">${window.App.getInitials(ex.paidBy)}</span></div>
                            <div class="text-right dm-mono">${window.App.formatCurrency(ex.amount)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    function showAddExpenseModal() {
        const members = window.Storage.getMembers() || [{id:'chris', name:'Chris'}, {id:'erin', name:'Erin'}, {id:'barbara', name:'Barbara'}];
        const html = `
            <div class="form-group">
                <label>Description</label>
                <input type="text" id="split-desc" class="form-input">
            </div>
            <div class="grid-2 gap-4">
                <div class="form-group">
                    <label>Amount ($)</label>
                    <input type="number" id="split-amt" class="form-input dm-mono">
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="split-date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                </div>
            </div>
            <div class="form-group">
                <label>Paid By</label>
                <select id="split-paidby" class="form-input">
                    ${members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Split Method</label>
                <select id="split-method" class="form-input">
                    <option value="Equal">Equal (50/50)</option>
                    <option value="Custom">Custom</option>
                </select>
            </div>
        `;
        window.App.showModal('Add Shared Expense', html, `<button class="btn btn-primary" onclick="window.Splitter.saveExpense()">Add Expense</button>`);
    }

    function saveExpense() {
        // mock save
        window.App.hideModal();
        window.App.showToast('Expense added', 'success');
        renderSplitter();
    }

    window.Splitter = { init: renderSplitter, refresh: renderSplitter, render: renderSplitter, showAddExpenseModal, saveExpense };

})();
