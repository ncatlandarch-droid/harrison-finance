import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export const TransactionsSection = () => {
  const { data } = useFinance();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const categories = ['all', ...new Set(data.transactions.map(t => t.category))];

  const filtered = data.transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'all' || t.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Search & Filter Bar */}
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.4rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              outline: 'none',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: '0.65rem 1rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: '#fff',
            outline: 'none',
            fontFamily: 'var(--font-body)'
          }}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
          ))}
        </select>
      </div>

      {/* Transactions Table / List */}
      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(txn => {
            const isIncome = txn.type === 'income' || txn.amount > 0;
            return (
              <div key={txn.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {isIncome ? (
                    <ArrowUpCircle size={24} color="var(--success)" />
                  ) : (
                    <ArrowDownCircle size={24} color="var(--text-muted)" />
                  )}
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>{txn.description}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{txn.date} • {txn.category}</div>
                  </div>
                </div>

                <div className="font-mono" style={{
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: isIncome ? 'var(--success)' : '#fff'
                }}>
                  {isIncome ? '+' : '-'}{fmt(txn.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
