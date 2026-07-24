(function() {
    const iconUpload = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`;

    // Utility Functions
    function categorizeTransaction(description) {
        const desc = description.toLowerCase();
        if (desc.includes('walmart') || desc.includes('target') || desc.includes('harris teeter') || desc.includes('food lion')) return 'Groceries';
        if (desc.includes('shell') || desc.includes('bp') || desc.includes('exxon') || desc.includes('circle k')) return 'Gas';
        if (desc.includes('netflix') || desc.includes('spotify') || desc.includes('hulu') || desc.includes('apple')) return 'Subscriptions';
        if (desc.includes('mcdonald') || desc.includes('starbucks') || desc.includes('chick-fil-a') || desc.includes('restaurant')) return 'Dining';
        if (desc.includes('duke energy') || desc.includes('water') || desc.includes('spectrum') || desc.includes('at&t')) return 'Utilities';
        if (desc.includes('payroll') || desc.includes('salary') || desc.includes('deposit')) return 'Income';
        return 'Uncategorized';
    }

    function parseCSV(text) {
        const lines = text.split('\\n');
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = lines[i].split(',').map(c => c.replace(/"/g, '').trim());
            result.push(cols);
        }
        return result;
    }

    function parseBOAStatement(text) {
        const rows = parseCSV(text);
        const transactions = [];
        rows.forEach(cols => {
            if (cols.length >= 3) {
                const date = cols[0];
                const desc = cols[1];
                const amount = parseFloat(cols[2]);
                if (!isNaN(amount)) {
                    transactions.push({
                        id: 'txn_' + Date.now() + Math.random().toString(36).substr(2, 5),
                        date: date,
                        description: desc,
                        amount: amount,
                        category: categorizeTransaction(desc),
                        memberId: 'joint' // Default
                    });
                }
            }
        });
        return transactions;
    }

    // UI Rendering
    function renderImportUI() {
        const container = document.getElementById('section-import');
        if (!container) return;

        let html = `
            <div class="header-action">
                <h2>${iconUpload} Import Transactions</h2>
            </div>

            <div class="card mb-6">
                <div class="tabs mb-6 flex gap-4 border-b border-gray-700 pb-2">
                    <button class="font-bold text-primary border-b-2 border-primary pb-2">CSV Upload</button>
                    <button class="text-gray-400 pb-2">Manual Entry</button>
                </div>
                
                <div id="drop-zone" class="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center hover:border-primary transition-colors cursor-pointer bg-gray-800/50">
                    <div class="text-4xl mb-4 text-gray-400 flex justify-center">${iconUpload}</div>
                    <h3 class="text-lg font-bold mb-2">Drag & Drop CSV File</h3>
                    <p class="text-gray-400 mb-4">or click to browse from your computer</p>
                    <p class="text-sm text-gray-500">Supports Bank of America, SECU, and standard formats</p>
                    <input type="file" id="csv-file-input" class="hidden" accept=".csv">
                </div>
            </div>

            <div id="import-preview-section" class="card hidden animate-fade-in-up">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold">Preview Transactions</h3>
                    <button class="btn btn-primary" onclick="window.ImportModule.importAll()">Import All to Ledger</button>
                </div>
                <div class="data-table" id="import-preview-table">
                    <!-- Populated by JS -->
                </div>
            </div>
        `;
        container.innerHTML = html;

        // Setup listeners
        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('csv-file-input');

        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('border-primary'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('border-primary'));
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary');
            if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
        });
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) handleFile(e.target.files[0]);
        });
    }

    let pendingTransactions = [];

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            pendingTransactions = parseBOAStatement(text);
            showPreview();
        };
        reader.readAsText(file);
    }

    function showPreview() {
        const previewSection = document.getElementById('import-preview-section');
        const previewTable = document.getElementById('import-preview-table');
        const members = window.Storage.getMembers() || [{id:'joint', name:'Joint'}, {id:'chris', name:'Chris'}, {id:'erin', name:'Erin'}, {id:'barbara', name:'Barbara'}];

        previewSection.classList.remove('hidden');
        
        if (pendingTransactions.length === 0) {
            previewTable.innerHTML = `<p class="text-gray-400">No valid transactions found in file.</p>`;
            return;
        }

        let tableHtml = `
            <div class="grid grid-cols-12 gap-4 font-bold text-gray-400 border-b border-gray-700 pb-2 mb-2">
                <div class="col-span-2">Date</div>
                <div class="col-span-4">Description</div>
                <div class="col-span-3">Category</div>
                <div class="col-span-2">Assign To</div>
                <div class="text-right">Amount</div>
            </div>
        `;

        pendingTransactions.forEach((txn, index) => {
            tableHtml += `
                <div class="grid grid-cols-12 gap-4 py-2 border-b border-gray-800 items-center text-sm">
                    <div class="col-span-2">${txn.date}</div>
                    <div class="col-span-4 truncate" title="${txn.description}">${txn.description}</div>
                    <div class="col-span-3">
                        <span class="badge ${txn.category === 'Uncategorized' ? 'bg-gray-700 text-gray-300' : 'bg-blue-900 text-blue-200'}">${txn.category}</span>
                    </div>
                    <div class="col-span-2">
                        <select class="form-input py-1 text-xs" onchange="window.ImportModule.updateAssign(${index}, this.value)">
                            ${members.map(m => `<option value="${m.id}" ${m.id === 'joint' ? 'selected' : ''}>${m.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="text-right dm-mono ${txn.amount >= 0 ? 'text-green-400' : ''}">${window.App.formatCurrency(txn.amount)}</div>
                </div>
            `;
        });
        previewTable.innerHTML = tableHtml;
        window.App.showToast(\`Found \${pendingTransactions.length} transactions\`, 'success');
    }

    function updateAssign(index, memberId) {
        if (pendingTransactions[index]) {
            pendingTransactions[index].memberId = memberId;
        }
    }

    function importAll() {
        if (pendingTransactions.length === 0) return;
        pendingTransactions.forEach(txn => window.Storage.addTransaction(txn));
        window.App.showToast(\`Successfully imported \${pendingTransactions.length} transactions!\`, 'success');
        window.Confetti.fire();
        pendingTransactions = [];
        document.getElementById('import-preview-section').classList.add('hidden');
        // trigger budget update if needed
    }

    window.ImportModule = { 
        render: renderImportUI, 
        parseCSV, 
        parseBOAStatement, 
        categorizeTransaction,
        updateAssign,
        importAll
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        if(document.getElementById('section-import')) {
            window.ImportModule.render();
        }
    });

})();
