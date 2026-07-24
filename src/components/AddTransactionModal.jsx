import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X } from 'lucide-react';

export const AddTransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction, members } = useFinance();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Shopping & Entertainment');
  const [memberId, setMemberId] = useState('chris');
  const [type, setType] = useState('debit');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    addTransaction({
      date: new Date().toISOString().split('T')[0],
      description,
      amount: type === 'debit' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
      category,
      memberId,
      type
    });

    setDescription('');
    setAmount('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '460px', background: 'var(--bg-surface)', border: '1px solid var(--border-highlight)' }}>
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Add New Transaction</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Description</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Costco, DoorDash" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Amount ($)</label>
              <input 
                type="number" 
                step="0.01"
                required
                placeholder="0.00" 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff' }}
              >
                <option value="debit">Debit (Expense)</option>
                <option value="income">Credit (Income)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              style={{ width: '100%', padding: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff' }}
            >
              <option value="Groceries">Groceries</option>
              <option value="Restaurants & Dining">Restaurants & Dining</option>
              <option value="Home & Utilities">Home & Utilities</option>
              <option value="Shopping & Entertainment">Shopping & Entertainment</option>
              <option value="Insurance">Insurance</option>
              <option value="Transportation">Transportation</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Family Member</label>
            <select 
              value={memberId} 
              onChange={e => setMemberId(e.target.value)}
              style={{ width: '100%', padding: '0.65rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: '#fff' }}
            >
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
              <option value="family">Family / Joint</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};
