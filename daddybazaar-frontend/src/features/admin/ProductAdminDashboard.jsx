import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Package, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export default function ProductAdminDashboard() {
  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
          <Package color="#000" size={28} />
          Product Admin Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Platform-wide product catalog oversight and administration.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {[
          { label: 'Total Products', value: '45,210', icon: Package, color: '#000000' },
          { label: 'Active Products', value: '42,100', icon: CheckCircle, color: '#000000' },
          { label: 'Out of Stock', value: '3,110', icon: AlertCircle, color: '#000000' },
          { label: 'Products Added Today', value: '1,204', icon: TrendingUp, color: '#000000' }
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
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#000' }}>Recent Product Activity</h3>
        <div style={{ border: '1px solid #E5E7EB', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Name</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vendor</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Added</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 600, color: '#111827' }}>Premium Cotton Shirt</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>Tech Store</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                  <span style={{ background: '#DCFCE7', color: '#16A34A', padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>Active</span>
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '0.9rem' }}>Just now</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 600, color: '#111827' }}>Wireless Headphones</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>Audio Galaxy</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                  <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>Out of Stock</span>
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: '0.9rem' }}>2 hrs ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
