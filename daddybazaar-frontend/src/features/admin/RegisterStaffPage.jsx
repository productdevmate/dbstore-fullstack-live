import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { staffApi } from '../../api/api';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { UserPlus, Save, Loader, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterStaffPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    mobileNumber: '',
    role: 'STAFF'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await staffApi.register(formData);
      toast.success('Staff registered successfully');
      navigate('/staff');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to register staff');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/staff')}
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}
        >
          <ArrowLeft size={16} /> Back to Staff List
        </button>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
          <UserPlus color="#000" size={28} />
          Register New Staff
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Create a new staff account and assign a role.
        </p>
      </div>

      <div className="card" style={{ maxWidth: '600px', background: '#fff', border: '1px solid #E5E7EB', padding: '2rem', borderRadius: 'var(--radius)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#111827' }}>First Name *</label>
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="input"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#111827' }}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="input"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#111827' }}>Email Address *</label>
            <input
              required
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="staff@example.com"
              className="input"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#111827' }}>Mobile Number *</label>
            <input
              required
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="input"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#111827' }}>Role *</label>
            <select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '4px', background: '#fff' }}
            >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={() => navigate('/staff')} 
              className="btn"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', border: '1px solid #D1D5DB', background: '#fff', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', background: '#000', color: '#fff', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {loading ? <Loader size={18} className="spin" /> : <Save size={18} />}
              Register Staff
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
