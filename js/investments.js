(function() {
    const iconBriefcase = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;

    function renderInvestments() {
        const container = document.getElementById('section-invest');
        if (!container) return;

        let investments = window.Storage.getInvestments() || [];
        if (investments.length === 0) {
            investments = [
                { id: '1', name: 'BMO Alto Savings', balance: 84904, type: 'Savings', memberId: 'erin', rate: 4.0, contribution: 0 },
                { id: '2', name: 'Chris 401(k)', balance: 45000, type: 'Retirement', memberId: 'chris', rate: 7.0, contribution: 500 },
                { id: '3', name: 'Erin 401(k)', balance: 12000, type: 'Retirement', memberId: 'erin', rate: 7.0, contribution: 100 },
                { id: '4', name: 'Robinhood', balance: 5000, type: 'Brokerage', memberId: 'erin', rate: 8.0, contribution: 50 }
            ];
            // Mock adding them to storage if needed
        }

        const totalBalance = investments.reduce((s, i) => s + (i.balance || 0), 0);
        const totalContrib = investments.reduce((s, i) => s + (i.contribution || 0), 0);
        const bmoAlto = investments.find(i => i.name.includes('BMO'))?.balance || 84904;

        // Projections
        const chrisAge = new Date().getFullYear() - 1980; // mock age calculation
        const erinAge = new Date().getFullYear() - 1987;
        const chrisPension = 3991;
        const chrisSS = 2689;
        const erinPension = 2542;
        const erinSS = 2000;
        const projectedIncome = chrisPension + chrisSS + erinPension + erinSS;

        let html = `
            <div class="header-action">
                <h2>${iconBriefcase} Investments & Retirement</h2>
                <button class="btn btn-primary">+ Add Account</button>
            </div>

            <div class="grid-4 mb-6">
                <div class="stat-card animate-fade-in-up">
                    <div class="stat-title">Total Portfolio</div>
                    <div class="stat-value dm-mono gradient-text">${window.App.formatCurrency(totalBalance)}</div>
                </div>
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.1s">
                    <div class="stat-title">Monthly Contrib.</div>
                    <div class="stat-value dm-mono">${window.App.formatCurrency(totalContrib)}</div>
                </div>
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.2s">
                    <div class="stat-title">BMO Alto (4%)</div>
                    <div class="stat-value dm-mono text-green-400">${window.App.formatCurrency(bmoAlto)}</div>
                </div>
                <div class="stat-card animate-fade-in-up" style="animation-delay: 0.3s">
                    <div class="stat-title">Projected Retirement /mo</div>
                    <div class="stat-value dm-mono text-purple-400">${window.App.formatCurrency(projectedIncome)}</div>
                </div>
            </div>

            <div class="grid-2 mb-6">
                <div class="card animate-fade-in-up">
                    <h3 class="text-lg font-bold mb-4">Compound Growth (Next 25 Yrs)</h3>
                    <div class="chart-container" style="height: 300px;">
                        <canvas id="invest-growth-chart"></canvas>
                    </div>
                </div>
                <div class="card animate-fade-in-up">
                    <h3 class="text-lg font-bold mb-4">Investment Accounts</h3>
                    <div class="space-y-4">
                        ${investments.map(inv => `
                            <div class="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                                <div>
                                    <div class="font-bold flex items-center gap-2">
                                        <span class="member-badge" style="background-color: ${window.App.getMemberColor(inv.memberId)}">${window.App.getInitials(inv.memberId)}</span>
                                        ${inv.name}
                                    </div>
                                    <div class="text-sm text-gray-400">${inv.type} • ${inv.rate}% Return</div>
                                </div>
                                <div class="text-right">
                                    <div class="dm-mono text-lg">${window.App.formatCurrency(inv.balance)}</div>
                                    <div class="dm-mono text-sm text-green-400">+${window.App.formatCurrency(inv.contribution)}/mo</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="card animate-fade-in-up">
                <h3 class="text-xl font-bold mb-6 gradient-text">Retirement Planner (Combined ~${window.App.formatCurrency(projectedIncome)}/mo)</h3>
                <div class="grid-2 gap-8">
                    <div class="p-4 border border-gray-700 rounded-lg">
                        <h4 class="font-bold text-lg mb-4 flex items-center gap-2">
                            <span class="avatar-circle" style="background-color: ${window.App.getMemberColor('chris')}">C</span> Chris (Retire 2047, Age 67)
                        </h4>
                        <div class="space-y-2">
                            <div class="flex justify-between"><span class="text-gray-400">TSERS Pension:</span><span class="dm-mono text-green-400">$3,991/mo</span></div>
                            <div class="flex justify-between"><span class="text-gray-400">Social Security:</span><span class="dm-mono text-green-400">$2,689/mo</span></div>
                            <div class="flex justify-between"><span class="text-gray-400">401(k) Contrib:</span><span class="dm-mono">$500/mo</span></div>
                        </div>
                    </div>
                    <div class="p-4 border border-gray-700 rounded-lg">
                        <h4 class="font-bold text-lg mb-4 flex items-center gap-2">
                            <span class="avatar-circle" style="background-color: ${window.App.getMemberColor('erin')}">E</span> Erin (Retire 2042, Age 55)
                        </h4>
                        <div class="space-y-2">
                            <div class="flex justify-between"><span class="text-gray-400">TSERS Pension:</span><span class="dm-mono text-green-400">$2,542/mo</span></div>
                            <div class="flex justify-between"><span class="text-gray-400">Social Security:</span><span class="dm-mono text-green-400">$1,557 - $2,750/mo</span></div>
                            <div class="flex justify-between"><span class="text-gray-400">401(k) / RH:</span><span class="dm-mono">$150/mo</span></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = html;

        setTimeout(() => {
            if(window.Charts) {
                // Mock compound growth calculation
                let labels = [];
                let data = [];
                let current = totalBalance;
                for(let i=0; i<=25; i++) {
                    labels.push(new Date().getFullYear() + i);
                    data.push(current);
                    current = (current + (totalContrib * 12)) * 1.07;
                }
                
                window.Charts.line('invest-growth-chart', {
                    labels: labels,
                    datasets: [{
                        label: 'Projected Portfolio Value',
                        data: data,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                });
            }
        }, 100);
    }

    window.Investments = { init: renderInvestments, refresh: renderInvestments, render: renderInvestments };

})();
