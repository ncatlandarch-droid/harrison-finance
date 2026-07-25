import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { CheckCircle2, Clock, Calendar, Plus, ShieldCheck, Building2 } from 'lucide-react';

export const BillsSection = () => {
  const { data, billAllocations, updateBillStatus } = useFinance();

  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Allocation Summary Card */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))' }}>
        <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
            1st-of-the-Month Family Transfer & Bill Allocation Guide
          </h3>
          <span className="badge badge-primary">No Joint Account Needed</span>
        </div>
        
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Since there is no single joint bank account, each family member transfers their share on the 1st of the month into <strong>Chris's BoA Primary Family Operating Account</strong> to cover shared mortgage, food, and utility commitments.
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
                Transfer to Chris's BoA Account by 1st of month.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ERIN WELLS FARGO SYNC STATUS CARD */}
      <div className="card" style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
        <div className="flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <Building2 size={24} color="var(--success)" />
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Erin's Wells Fargo Account Ready for Live Sync</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                When Erin is ready, click <strong>`Connect Bank Account`</strong> to link her Wells Fargo account. Her balance and transactions will stream right alongside your BoA accounts!
              </p>
            </div>
          </div>
          <span className="badge badge-success">Wells Fargo Ready</span>
        </div>
      </div>

      {/* Itemized Bills List */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Itemized Monthly Bills (34 Commitments)</h3>
          <div className="badge badge-primary">Total: {fmt(data.bills.reduce((s, b) => s + b.amount, 0))}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {data.bills.map((bill, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.85rem 1rem',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{bill.item || bill.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {bill.member} • {bill.category} • Frequency: {bill.frequency || 'Monthly'}
                </div>
              </div>

              <div className="font-mono" style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--danger)' }}>
                {fmt(bill.amount)} / mo
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
