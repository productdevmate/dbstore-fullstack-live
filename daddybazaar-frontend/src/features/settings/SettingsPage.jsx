import { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/api';
import toast from 'react-hot-toast';
import { Shield, User, Key, CheckCircle, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [savingPassword, setSavingPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    try {
      setSavingPassword(true);
      await authApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Platform Settings</h1>
        <p style={{ color: '#64748b' }}>Manage your account settings and security preferences.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Sidebar Navigation */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'profile', label: 'My Profile', icon: User },
            { id: 'security', label: 'Security & Password', icon: Shield },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem', width: '100%', textAlign: 'left',
                backgroundColor: activeTab === tab.id ? '#fff' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: activeTab === tab.id ? '#0f172a' : '#64748b',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <tab.icon size={20} color={activeTab === tab.id ? '#3b82f6' : '#94a3b8'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>Personal Information</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Full Name</label>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}>
                    {user?.ownerName}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Email Address</label>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}>
                    {user?.email}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>System Role</label>
                  <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} color="#10b981" /> {user?.role}
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <p style={{ color: '#1e40af', fontSize: '0.9rem', margin: 0 }}>
                  <strong>Note:</strong> Currently, profile details are synced with your Business Profile. To update your name or contact details, please visit the Business Profile page.
                </p>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>Change Password</h2>
              
              <form onSubmit={submitPasswordChange} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Current Password</label>
                  <div style={{ position: 'relative' }}>
                    <Key size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="password" 
                      name="currentPassword"
                      required
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <Key size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="password" 
                      name="newPassword"
                      required
                      minLength={6}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Minimum 6 characters"
                      style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Confirm New Password</label>
                  <div style={{ position: 'relative' }}>
                    <Key size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="password" 
                      name="confirmPassword"
                      required
                      minLength={6}
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Re-enter new password"
                      style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={savingPassword}
                  style={{
                    padding: '0.75rem 1.5rem', backgroundColor: '#0f172a', color: '#fff',
                    border: 'none', borderRadius: '8px', fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  <Save size={18} /> {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}
          
        </div>
      </div>
    </DashboardLayout>
  );
}
