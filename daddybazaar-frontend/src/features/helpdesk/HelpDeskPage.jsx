import { DashboardLayout } from '../../components/layout/DashboardLayout';

export default function HelpDeskPage() {
  return (
    <DashboardLayout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Help Desk</h1>
        <p style={{ color: '#64748b' }}>Get support and manage your tickets.</p>
        
        <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <p style={{ color: '#64748b' }}>Help Desk feature coming soon.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
