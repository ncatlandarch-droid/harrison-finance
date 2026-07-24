(function() {
    const iconShield = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;

    function renderDebts() {
        const container = document.getElementById('section-debts');
        if (!container) return;

        let debts = window.Storage.getDebts() || [];
        if (debts.length === 0) {
            // Empty state celebration if no debts!
            debts = [
                // Un-comment to test debts, otherwise empty means DEBT FREE!
                // { id: 'd1', name: 'Mortgage', balance: 150000, rate: 3.5, minPayment: 1200 },
                // { id: 'd2', name: 'Car Loan', balance: 15000, rate: 5.0, minPayment: 400 }
            ];
        }

        if (debts.length === 0) {
            container.innerHTML = `
                <div class="header-action">
                    <h2>${iconShield} Debt Reduction</h2>
                    <button class="btn btn-primary">+ Add Debt</button>
                </div>
                <div class="empty-state card text-center py-20 animate-fade-in-up">
                    <div class="text-6xl mb-4">🎉</div>
                    <h2 class="text-3xl font-bold gradient-text mb-4">You are DEBT FREE!</h2>
                    <p class="text-gray-400 mb-6">Congratulations on this incredible financial milestone!</p>
                    <button class="btn btn-primary" onclick="window.Confetti.celebrate()">Celebrate Again!</button>
                </div>
            `;
            setTimeout(() => window.Confetti.celebrate(), 500);
            return;
        }

        const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
        const totalMin = debts.reduce((s, d) => s + d.minPayment, 0);
        const highestRate = Math.max(...debts.map(d => d.rate));

        let html = `
            <div class="header-action">
                <h2>${iconShield} Debt Reduction</h2>
                <button class="btn btn-primary">+ Add Debt</button>
            </div>

            <div class="grid-4 mb-6">
                <div class="stat-card animate-fade-in-up">
                    <div class="stat-title">Total Debt</div>
                    <div class="stat-value dm-mono text-red-400">${window.App.formatCurrency(totalDebt)}</div>
                </div>
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.1s">
                    <div class="stat-title">Total Minimums</div>
                    <div class="stat-value dm-mono">${window.App.formatCurrency(totalMin)}</div>
                </div>
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.2s">
                    <div class="stat-title">Highest Rate</div>
                    <div class="stat-value dm-mono">${highestRate}%</div>
                </div>
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.3s">
                    <div class="stat-title">Est. Payoff</div>
                    <div class="stat-value gradient-text">Dec 2028</div>
                </div>
            </div>

            <div class="grid-2">
                <div class="card animate-fade-in-up">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold">Strategy: Avalanche</h3>
                        <div class="badge bg-purple-900 text-purple-200">Saves Most Money</div>
                    </div>
                    <div class="space-y-4">
                        ${debts.sort((a,b) => b.rate - a.rate).map((d, i) => `
                            <div class="flex justify-between items-center p-3 bg-gray-800 rounded-lg border-l-4 ${i===0 ? 'border-purple-500' : 'border-gray-600'}">
                                <div>
                                    <div class="font-bold">${d.name}</div>
                                    <div class="text-sm text-gray-400">${d.rate}% APR</div>
                                </div>
                                <div class="text-right">
                                    <div class="dm-mono text-red-400">${window.App.formatCurrency(d.balance)}</div>
                                    <div class="dm-mono text-sm">${window.App.formatCurrency(d.minPayment)}/mo</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="card animate-fade-in-up" style="animation-delay: 0.2s">
                    <h3 class="text-lg font-bold mb-4">Payoff Simulator</h3>
                    <div class="form-group">
                        <label>Add Extra Payment ($/mo)</label>
                        <input type="number" class="form-input dm-mono" value="200" oninput="/* update chart */">
                    </div>
                    <div class="chart-container mt-4" style="height: 200px;">
                        <canvas id="debt-payoff-chart"></canvas>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = html;

        setTimeout(() => {
            if(window.Charts && debts.length > 0) {
                window.Charts.line('debt-payoff-chart', {
                    labels: ['2024', '2025', '2026', '2027', '2028'],
                    datasets: [{
                        label: 'Remaining Debt',
                        data: [totalDebt, totalDebt*0.8, totalDebt*0.5, totalDebt*0.2, 0],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true
                    }]
                });
            }
        }, 100);
    }

    window.DebtsModule = { render: renderDebts };
    
    document.addEventListener('DOMContentLoaded', () => {
        if(document.getElementById('section-debts')) {
            window.DebtsModule.render();
        }
    });

})();
