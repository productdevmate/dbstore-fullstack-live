import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ClipboardList, Archive, MessageSquare, Briefcase } from 'lucide-react';

export default function ProductAssociateDashboard() {
  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
          <Briefcase color="#000" size={28} />
          Product Associate Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Manage your assigned vendor product reviews, onboarding, and tasks.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {[
          { label: 'Assigned Reviews', value: '142', icon: ClipboardList, color: '#000000' },
          { label: 'Pending Approvals', value: '28', icon: Archive, color: '#000000' },
          { label: 'Vendor Messages', value: '5', icon: MessageSquare, color: '#000000' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', background: '#fff', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '8px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{stat.label}</div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#000' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '2rem', background: '#fff', border: '1px solid #E5E7EB' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#000' }}>Recent Assigned Tasks</h3>
        <div style={{ border: '1px solid #E5E7EB', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Task Description</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vendor</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 600, color: '#111827' }}>Review newly imported catalog</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>Supermart Connect</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                  <span style={{ background: '#FEF08A', color: '#854D0E', padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>High</span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 600, color: '#111827' }}>Follow up on missing product images</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>Fitness Gear Hub</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                  <span style={{ background: '#E0E7FF', color: '#3730A3', padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>Normal</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
