import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ShieldAlert, Users, Store, Activity, TrendingUp } from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert color="#000" size={28} />
            Super Admin Dashboard
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Platform-wide overview and administrative controls.
          </p>
        </div>
        <a href="/super-admin/register-vendor" className="btn btn-primary" style={{ background: '#000', color: '#fff', padding: '0.75rem 1.5rem', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          + Register New Vendor
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {[
          { label: 'Total Businesses', value: '1,204', icon: Store, color: '#000000' },
          { label: 'Total Users', value: '3,450', icon: Users, color: '#000000' },
          { label: 'Active Subscriptions', value: '890', icon: Activity, color: '#000000' },
          { label: 'Monthly Revenue (MRR)', value: '₹4.5M', icon: TrendingUp, color: '#000000' }
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
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#000' }}>Recent Platform Activity</h3>
        <div style={{ border: '1px solid #E5E7EB', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 500, color: '#111827' }}>New Business Registered (Tech Store)</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>john@example.com</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '0.9rem' }}>2 mins ago</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 500, color: '#111827' }}>Subscription Upgraded to PRO</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>sara@clothing.com</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '0.9rem' }}>1 hr ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
