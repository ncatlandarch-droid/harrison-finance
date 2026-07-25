import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, MapPin, Building2, UserPlus, Sparkles, Save, Calendar } from 'lucide-react';

export const FamilyProfilePortalModal = ({ isOpen, onClose }) => {
  const { householdProfile, setHouseholdProfile, addFamilyMember } = useFinance();
  const [activeSubTab, setActiveSubTab] = useState('location');

  const [formData, setFormData] = useState({ ...householdProfile });

  // New Member Form State
  const [newMember, setNewMember] = useState({
    name: '',
    title: '',
    role: 'Adult Earner',
    birthday: '2000-01-01',
    income: ''
  });

  if (!isOpen) return null;

  const handleSaveLocation = (e) => {
    e.preventDefault();
    setHouseholdProfile(formData);
    onClose();
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name) return;
    
    addFamilyMember({
      name: newMember.name,
      title: newMember.title || newMember.role,
      role: newMember.role,
      birthday: newMember.birthday,
      income: parseFloat(newMember.income || 0)
    });

    setNewMember({ name: '', title: '', role: 'Adult Earner', birthday: '2000-01-01', income: '' });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="animate-scale-up" style={{
        width: '100%',
        maxWidth: '680px',
        background: 'var(--bg-surface)',
        borderRadius: '20px',
        border: '2px solid #004684',
        boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 30px rgba(0, 70, 132, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1.5rem 1.75rem',
          background: 'linear-gradient(135deg, rgba(0, 70, 132, 0.4), rgba(79, 70, 229, 0.2))',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={22} color="#FDB927" />
              <span>Household Location & Family Roster Portal</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Manage your household location to target local NC resources & add family members
            </p>
          </div>

          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </div>

        {/* Sub Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
          <button
            onClick={() => setActiveSubTab('location')}
            style={{
              flex: 1,
              padding: '0.85rem',
              border: 'none',
              background: activeSubTab === 'location' ? 'rgba(0, 70, 132, 0.3)' : 'transparent',
              borderBottom: activeSubTab === 'location' ? '3px solid #FDB927' : 'none',
              color: activeSubTab === 'location' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            🏠 Household Location
          </button>
          <button
            onClick={() => setActiveSubTab('addmember')}
            style={{
              flex: 1,
              padding: '0.85rem',
              border: 'none',
              background: activeSubTab === 'addmember' ? 'rgba(0, 70, 132, 0.3)' : 'transparent',
              borderBottom: activeSubTab === 'addmember' ? '3px solid #FDB927' : 'none',
              color: activeSubTab === 'addmember' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            ➕ Add Family Member
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.75rem' }}>
          
          {/* SubTab 1: Location Settings */}
          {activeSubTab === 'location' && (
            <form onSubmit={handleSaveLocation} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                  Household Name
                </label>
                <input 
                  type="text"
                  value={formData.familyName}
                  onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                    City
                  </label>
                  <input 
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                    State
                  </label>
                  <input 
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                  Zip Code (Targets Local Resources)
                </label>
                <input 
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #004684, #4f46e5)', padding: '0.85rem', fontWeight: 800, marginTop: '0.5rem' }}>
                Save Household Location Settings
              </button>
            </form>
          )}

          {/* SubTab 2: Add New Member Form */}
          {activeSubTab === 'addmember' && (
            <form onSubmit={handleAddMember} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                  Full Name
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Hayden Harrison"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                    Role / Category
                  </label>
                  <select 
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                  >
                    <option value="Adult Earner">Adult Earner</option>
                    <option value="Senior Pillar">Senior Pillar</option>
                    <option value="Youth Dependent">Youth Dependent (Child / Student)</option>
                    <option value="Partner">Partner / Spouse</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                    Birthday
                  </label>
                  <input 
                    type="date"
                    value={newMember.birthday}
                    onChange={(e) => setNewMember({ ...newMember, birthday: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                  Monthly Inflow / Allowance ($)
                </label>
                <input 
                  type="number"
                  placeholder="e.g. 50.00"
                  value={newMember.income}
                  onChange={(e) => setNewMember({ ...newMember, income: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '0.85rem', fontWeight: 800, marginTop: '0.5rem' }}>
                ➕ Add Family Member to Roster
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
