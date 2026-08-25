import { useState, useEffect } from 'react';
import { staffApi } from '../../api/api';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { UserCog, Loader, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StaffListPage() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await staffApi.list();
      setStaffList(res.data?.data?.content || res.data?.data || []);
    } catch (err) {
      toast.error('Failed to load staff');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
            <UserCog color="#000" size={28} />
            Staff List
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Directory of all registered staff accounts on the platform.
          </p>
        </div>
        <a href="/register-staff" className="btn btn-primary" style={{ background: '#000', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          Register Staff
        </a>
      </div>

      <div className="card" style={{ padding: '2rem', background: '#fff', border: '1px solid #E5E7EB' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <Loader className="spin" size={32} color="#000" />
          </div>
        ) : staffList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <Users size={48} color="#D1D5DB" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#000', marginBottom: '0.5rem' }}>No staff found</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Get started by registering a new staff account.</p>
            <a href="/register-staff" className="btn btn-primary" style={{ background: '#000', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none' }}>Register New Staff</a>
          </div>
        ) : (
          <div style={{ border: '1px solid #E5E7EB', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <tr>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map(staff => (
                  <tr key={staff.id || staff.email}>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', fontWeight: 600, color: '#111827' }}>
                      {staff.firstName} {staff.lastName}
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{staff.email}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{staff.mobileNumber || '-'}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                      <span style={{ 
                        background: '#F3F4F6', 
                        color: '#4B5563', 
                        padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 
                      }}>
                        {staff.role || 'STAFF'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
