(function() {
    const iconTarget = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`;
    const iconPlus = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
    const iconSave = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;

    function renderSavings() {
        const container = document.getElementById('section-goals');
        if (!container) return;

        let goals = window.Storage.getGoals() || [];
        if (goals.length === 0) {
            goals = [
                { id: window.Storage.generateId(), name: 'Emergency', current: 15000, target: 25000, deadline: '2026-12-31' },
                { id: window.Storage.generateId(), name: 'Vacation', current: 2000, target: 5000, deadline: '2025-06-01' },
                { id: window.Storage.generateId(), name: 'Hayden College', current: 10000, target: 50000, deadline: '2030-08-01' },
                { id: window.Storage.generateId(), name: 'Ava Joy College', current: 8000, target: 50000, deadline: '2032-08-01' }
            ];
            goals.forEach(g => window.Storage.addGoal(g));
        }

        const totalSaved = goals.reduce((sum, g) => sum + (g.current || 0), 0);
        const totalTarget = goals.reduce((sum, g) => sum + (g.target || 0), 0);
        const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

        let html = `
            <div class="header-action">
                <h2>${iconTarget} Savings Goals</h2>
                <button class="btn btn-primary" onclick="window.SavingsModule.showAddModal()">${iconPlus} Add Goal</button>
            </div>
            
            <div class="grid-3 mb-4">
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.1s">
                    <div class="stat-title">Total Saved</div>
                    <div class="stat-value dm-mono gradient-text">${window.App.formatCurrency(totalSaved)}</div>
                </div>
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.2s">
                    <div class="stat-title">Total Target</div>
                    <div class="stat-value dm-mono">${window.App.formatCurrency(totalTarget)}</div>
                </div>
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.3s">
                    <div class="stat-title">Overall Progress</div>
                    <div class="progress-bar mt-2"><div class="progress-fill" style="width: ${overallProgress}%"></div></div>
                    <div class="text-right text-sm dm-mono mt-1">${window.App.formatPercent(overallProgress)}</div>
                </div>
            </div>

            <div class="grid-2" id="goals-grid">
                ${goals.map((g, i) => {
                    const pct = Math.min(100, ((g.current || 0) / (g.target || 1)) * 100);
                    return `
                    <div class="card animate-fade-in-up" style="animation-delay: ${0.1 * i}s">
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="text-lg font-bold">${g.name}</h3>
                            <button class="btn btn-sm btn-outline" onclick="window.SavingsModule.showAddFundsModal('${g.id}')">Add Funds</button>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="chart-container relative" style="width: 80px; height: 80px;">
                                <canvas id="goal-chart-${g.id}"></canvas>
                                <div class="absolute inset-0 flex items-center justify-center dm-mono text-sm">${window.App.formatPercent(pct)}</div>
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-500">Saved</span>
                                    <span class="dm-mono">${window.App.formatCurrency(g.current)}</span>
                                </div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm text-gray-500">Target</span>
                                    <span class="dm-mono">${window.App.formatCurrency(g.target)}</span>
                                </div>
                                <div class="text-xs text-gray-400 mt-2">Target Date: ${window.App.formatDate(g.deadline)}</div>
                            </div>
                        </div>
                    </div>`;
                }).join('')}
            </div>

            <div class="card mt-6">
                <h3 class="text-lg font-bold mb-4">Goal Calculator</h3>
                <div class="grid-3 gap-4">
                    <div class="form-group">
                        <label>Monthly Savings ($)</label>
                        <input type="number" id="calc-monthly" class="form-input dm-mono" value="500" oninput="window.SavingsModule.updateCalc()">
                    </div>
                    <div class="form-group">
                        <label>Target Amount ($)</label>
                        <input type="number" id="calc-target" class="form-input dm-mono" value="10000" oninput="window.SavingsModule.updateCalc()">
                    </div>
                    <div class="form-group">
                        <label>Months to Reach</label>
                        <div id="calc-result" class="text-2xl font-bold gradient-text dm-mono mt-2">20 months</div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = html;

        // Render charts
        setTimeout(() => {
            goals.forEach(g => {
                const pct = Math.min(100, ((g.current || 0) / (g.target || 1)) * 100);
                if (window.Charts && typeof window.Charts.donut === 'function') {
                    window.Charts.donut(`goal-chart-${g.id}`, {
                        labels: ['Saved', 'Remaining'],
                        datasets: [{ data: [pct, 100 - pct], backgroundColor: ['#3b82f6', '#1e293b'] }]
                    }, { cutout: '75%', plugins: { legend: { display: false } } });
                }
            });
            window.SavingsModule.updateCalc();
        }, 100);
    }

    function showAddModal() {
        const html = `
            <div class="form-group">
                <label>Goal Name</label>
                <input type="text" id="goal-name" class="form-input">
            </div>
            <div class="grid-2 gap-4">
                <div class="form-group">
                    <label>Target Amount ($)</label>
                    <input type="number" id="goal-target" class="form-input dm-mono">
                </div>
                <div class="form-group">
                    <label>Current Amount ($)</label>
                    <input type="number" id="goal-current" class="form-input dm-mono" value="0">
                </div>
            </div>
            <div class="form-group">
                <label>Target Date</label>
                <input type="date" id="goal-deadline" class="form-input">
            </div>
        `;
        const footer = `<button class="btn btn-primary" onclick="window.SavingsModule.saveGoal()">Save Goal</button>`;
        window.App.showModal('Add Savings Goal', html, footer);
    }

    function saveGoal() {
        const name = document.getElementById('goal-name').value;
        const target = parseFloat(document.getElementById('goal-target').value);
        const current = parseFloat(document.getElementById('goal-current').value);
        const deadline = document.getElementById('goal-deadline').value;

        if (!name || isNaN(target) || isNaN(current) || !deadline) {
            window.App.showToast('Please fill all fields', 'error');
            return;
        }

        window.Storage.addGoal({ name, target, current, deadline });
        window.App.hideModal();
        window.App.showToast('Goal added successfully!', 'success');
        renderSavings();
    }

    function showAddFundsModal(id) {
        window.App.showModal('Add Funds', `
            <input type="hidden" id="fund-goal-id" value="${id}">
            <div class="form-group">
                <label>Amount to Add ($)</label>
                <input type="number" id="fund-amount" class="form-input dm-mono">
            </div>
        `, `<button class="btn btn-primary" onclick="window.SavingsModule.addFunds()">Add Funds</button>`);
    }

    function addFunds() {
        const id = document.getElementById('fund-goal-id').value;
        const amount = parseFloat(document.getElementById('fund-amount').value);
        if (isNaN(amount) || amount <= 0) return;

        let goals = window.Storage.getGoals();
        let goal = goals.find(g => g.id === id);
        if (goal) {
            let oldPct = (goal.current / goal.target) * 100;
            goal.current += amount;
            let newPct = (goal.current / goal.target) * 100;
            window.Storage.updateGoal(id, { current: goal.current });
            window.App.hideModal();
            renderSavings();

            if (newPct >= 100 && oldPct < 100) {
                window.Confetti.celebrate();
                window.App.showToast('Goal reached! Incredible!', 'success');
            } else if (newPct >= 50 && oldPct < 50) {
                window.Confetti.fire({ particleCount: 50 });
                window.App.showToast('Halfway there! Keep it up!', 'success');
            } else {
                window.App.showToast('Funds added successfully', 'success');
            }
        }
    }

    function updateCalc() {
        const monthly = parseFloat(document.getElementById('calc-monthly')?.value || 0);
        const target = parseFloat(document.getElementById('calc-target')?.value || 0);
        const res = document.getElementById('calc-result');
        if (res && monthly > 0 && target > 0) {
            const months = Math.ceil(target / monthly);
            res.textContent = `${months} month${months !== 1 ? 's' : ''}`;
        }
    }

    window.SavingsModule = { render: renderSavings, showAddModal, saveGoal, showAddFundsModal, addFunds, updateCalc };
    
    // Auto-render if on load the section is visible or requested
    document.addEventListener('DOMContentLoaded', () => {
        if(document.getElementById('section-goals')) {
            window.SavingsModule.render();
        }
    });

})();
