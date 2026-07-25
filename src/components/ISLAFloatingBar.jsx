import React, { useState } from 'react';
import { ISLAAssistantModal } from './ISLAAssistantModal';
import { Bot, Sparkles, Send, ArrowRight } from 'lucide-react';

export const ISLAFloatingBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'linear-gradient(135deg, rgba(7, 10, 18, 0.95), rgba(15, 23, 42, 0.98))',
        border: '2px solid #FDB927',
        borderRadius: '40px',
        padding: '0.5rem 0.6rem 0.5rem 1.25rem',
        boxShadow: '0 12px 35px rgba(253, 185, 39, 0.35)',
        backdropFilter: 'blur(12px)'
      }}>
        
        {/* ISLA Avatar Badge */}
        <div 
          onClick={() => setIsOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: '2px solid #FDB927',
            overflow: 'hidden',
            boxShadow: '0 0 15px rgba(253, 185, 39, 0.6)',
            background: '#1e1b4b'
          }}>
            <img 
              src="/avatars/isla_bulldog.png" 
              alt="ISLA AI" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Ask ISLA AI</span>
              <Sparkles size={14} color="#FDB927" />
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Financial Bulldog Mascot 🐶</span>
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #004684, #4f46e5)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.82rem',
            padding: '0.55rem 1rem',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span>Ask Question</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <ISLAAssistantModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
