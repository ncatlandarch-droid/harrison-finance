import React from 'react';
import { MapPin, Building2, ShieldCheck, Heart, Sparkles, BookOpen, GraduationCap, Users } from 'lucide-react';

export const LocalResourcesSection = () => {
  const resources = [
    {
      title: "Guilford County Senior Services & Estate Planning",
      category: "Senior & Estate Care",
      location: "Greensboro, NC",
      description: "Local Guilford County resources for senior healthcare navigation, estate planning guidance, and family caregiver support.",
      badge: "Greensboro Local",
      icon: Heart,
      color: "#a855f7"
    },
    {
      title: "NC A&T State University Employee Benefit Hub",
      category: "Higher Ed Benefits",
      location: "Greensboro, NC",
      description: "State health plan, TSERS retirement system options, and faculty research grant resources for Chris.",
      badge: "NC A&T Official",
      icon: GraduationCap,
      color: "#004684"
    },
    {
      title: "UNCG Faculty & Educator Wellness Program",
      category: "Education & Wellness",
      location: "Greensboro, NC",
      description: "Employee assistance, childcare assistance programs, and educator professional development for Erin.",
      badge: "UNCG Official",
      icon: BookOpen,
      color: "#ec4899"
    },
    {
      title: "NC Small Business & USDA Farm Grant Portal",
      category: "Business & Grants",
      location: "North Carolina",
      description: "Open solicitations for SBIR grants, USDA small farm funding, and NC Commerce innovation grants for Think! Ventures.",
      badge: "State Grant Resource",
      icon: Building2,
      color: "#10b981"
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div className="card card-glow" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(99, 102, 241, 0.12))' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MapPin size={24} color="var(--success)" />
              <span>Greensboro & NC Local Family Resource Engine</span>
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Curated local NC resources tailored to the Harrison family profiles & business ecosystem.
            </p>
          </div>
          <span className="badge badge-success">Greensboro, NC Matched</span>
        </div>
      </div>

      {/* Grid of 4 Local Resources */}
      <div className="grid-2" style={{ gap: '1.25rem' }}>
        {resources.map((r, idx) => {
          const Icon = r.icon;
          return (
            <div key={idx} className="card" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}>
              <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${r.color}25`, border: `1px solid ${r.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color={r.color} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, color: '#fff', fontSize: '0.98rem' }}>{r.title}</h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{r.category} • {r.location}</span>
                  </div>
                </div>
                <span className="badge" style={{ background: `${r.color}20`, color: r.color, fontSize: '0.7rem' }}>
                  {r.badge}
                </span>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {r.description}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
