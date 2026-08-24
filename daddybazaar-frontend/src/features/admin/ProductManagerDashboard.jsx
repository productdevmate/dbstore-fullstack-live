import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { PackageSearch, Tags, CheckSquare, BarChart2 } from 'lucide-react';

export default function ProductManagerDashboard() {
  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PackageSearch color="var(--color-primary)" size={28} />
          Product Manager Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Manage global catalogs, templates, and review product submissions.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {[
          { label: 'Global Categories', value: '45', icon: Tags, color: '#6366F1' },
          { label: 'Pending Reviews', value: '128', icon: CheckSquare, color: '#F59E0B' },
          { label: 'Total Templates', value: '12', icon: BarChart2, color: '#10B981' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '8px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{stat.label}</div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Pending Catalog Reviews</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Approve or reject newly added global product templates.
        </p>
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}>
              <tr>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Product Name</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Category</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Apple iPhone 15 Pro</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Smartphones</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                  <button className="btn btn-primary btn-sm" style={{ marginRight: '0.5rem' }}>Approve</button>
                  <button className="btn btn-secondary btn-sm" style={{ color: 'var(--color-error)' }}>Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
