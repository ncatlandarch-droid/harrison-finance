import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { CheckCircle2, Clock, Calendar, Plus, ShieldCheck } from 'lucide-react';

export const BillsSection = () => {
  const { data, billAllocations, updateBillStatus } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Allocation Summary Card */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Monthly Bill Transfer & Allocation Guide
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          To ensure all joint family expenses (Mortgage, Utilities, Insurance) are covered seamlessly, each member transfers their proportional share into the primary checking account.
        </p>

        <div className="grid-3">
          {billAllocations.map(alloc => (
            <div key={alloc.memberId} style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              border: `1px solid ${alloc.color}50`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: alloc.color, color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {alloc.name.charAt(0)}
                </div>
                <span style={{ fontWeight: 700, color: '#fff' }}>{alloc.name}'s Transfer</span>
              </div>

              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--warning)', marginBottom: '0.5rem' }}>
                {fmt(alloc.proportionalJointBillShare)} / mo
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Transfer to BoA Joint Account by 1st of month.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized Bills List */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Itemized Monthly Bills</h3>
          <div className="badge badge-primary">Total: {fmt(data.bills.reduce((s, b) => s + b.amount, 0))}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.bills.map(bill => {
            const isPaid = bill.status === 'paid';
            return (
              <div key={bill.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button 
                    onClick={() => updateBillStatus(bill.id, isPaid ? 'upcoming' : 'paid')}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    {isPaid ? (
                      <CheckCircle2 size={24} color="var(--success)" />
                    ) : (
                      <Clock size={24} color="var(--warning)" />
                    )}
                  </button>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{bill.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem', marginTop: '0.2rem' }}>
                      <span>Due: {bill.dueDay}th of month</span>
                      <span>•</span>
                      <span>Category: {bill.category}</span>
                      <span>•</span>
                      <span style={{ textTransform: 'capitalize' }}>Assigned: {bill.paidBy}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                    {fmt(bill.amount)}
                  </div>
                  <span className={`badge ${isPaid ? 'badge-success' : 'badge-warning'}`} style={{ marginTop: '0.25rem' }}>
                    {isPaid ? 'Paid' : 'Upcoming'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
