import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Building2, Sparkles, TrendingUp, DollarSign, Wallet, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export const ThinkEcosystemSection = () => {
  const fmt = (val) => '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Banner */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.25), rgba(79, 70, 229, 0.15))' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Building2 size={24} color="#FDB927" />
              <span>Think! Ecosystem Business & Non-Profit Command Center</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Integrated cash flow matrix for Think! Design & Planning, LLC and THINK! VENTURES
            </p>
          </div>
          <span className="badge badge-primary" style={{ background: '#004684', color: '#FDB927' }}>Novo + Relay Banking Sync</span>
        </div>
      </div>

      {/* 2 Business Hub Cards */}
      <div className="grid-2" style={{ gap: '1.5rem' }}>
        
        {/* Think! Design and Planning, LLC (Novo Banking) */}
        <div className="card" style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
          <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(99, 102, 241, 0.3)', paddingBottom: '0.75rem' }}>
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>Think! Design and Planning, LLC</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>For-Profit • Architectural, GIS & AI Consulting</p>
            </div>
            <span className="badge badge-primary">Novo Banking Connected</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NOVO OPERATING BALANCE</div>
              <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>
                $12,450.00
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Active Business Operating Cash</div>
            </div>

            <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              • <strong>Owner Distribution:</strong> Transfer business profit directly into Chris's BoA operating account.<br />
              • <strong>Client Retainers:</strong> Design, planning, & AI visualization contracts.
            </div>
          </div>
        </div>

        {/* THINK! VENTURES (Relay Financial) */}
        <div className="card" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
          <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', paddingBottom: '0.75rem' }}>
            <div>
              <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>THINK! VENTURES</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Non-Profit • Small Farm & Innovation Hub</p>
            </div>
            <span className="badge badge-success">Relay Banking Connected</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RELAY FINANCIAL BALANCE</div>
              <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-light)', marginTop: '0.2rem' }}>
                $8,200.00
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Grant & Community Capital Reserve</div>
            </div>

            <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              • <strong>Grant Opportunities:</strong> USDA SBIR, NC Small Farm Platform initiatives.<br />
              • <strong>Community Impact:</strong> Non-profit agricultural tech expansion.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
