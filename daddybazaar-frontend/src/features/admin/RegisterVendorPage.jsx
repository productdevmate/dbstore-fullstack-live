import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Loader, UserPlus, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const BUSINESS_CATEGORIES = [
  'Bakery', 'Restaurant / Cafe', 'Retail Shop', 'Salon / Beauty',
  'Electronics', 'Clothing & Fashion', 'Medical / Pharmacy', 'Education',
  'Fitness / Gym', 'Home Services', 'Automobile', 'Consulting',
  'Event Management', 'Photography', 'Other',
];

export default function RegisterVendorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    ownerName: '', email: '', mobile: '', password: '',
    businessName: '', businessCategory: '',
    whatsapp: '', city: '', state: '', pincode: '',
  });

  const set = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors(er => ({ ...er, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      // Call backend directly so we don't modify the active session
      await authApi.register(form);
      toast.success('🎉 Business registered successfully!');
      navigate(-1);
    } catch (err) {
      const apiErrors = err.response?.data?.data || {};
      setErrors(apiErrors);
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm"
          style={{ padding: '0.5rem', background: '#F3F4F6', color: '#000', borderRadius: '50%' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
            <UserPlus color="#000" size={28} />
            Register New Vendor
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Provision a new vendor account and business profile.
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '2rem', background: '#fff', border: '1px solid #E5E7EB', maxWidth: 800 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#000', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Business Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>Business Name *</label>
                <input required type="text" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.businessName} onChange={set('businessName')} placeholder="e.g. Raju Supermart" />
                {errors.businessName && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.businessName}</span>}
              </div>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>Business Category *</label>
                <select required className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.businessCategory} onChange={set('businessCategory')}>
                  <option value="">Select Category</option>
                  {BUSINESS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.businessCategory && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.businessCategory}</span>}
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#000', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Owner Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>Owner Name *</label>
                <input required type="text" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.ownerName} onChange={set('ownerName')} placeholder="Full Name" />
                {errors.ownerName && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.ownerName}</span>}
              </div>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>Email Address *</label>
                <input required type="email" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.email} onChange={set('email')} placeholder="vendor@example.com" />
                {errors.email && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}
              </div>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>Mobile Number *</label>
                <input required type="tel" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.mobile} onChange={set('mobile')} placeholder="10-digit number" />
                {errors.mobile && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.mobile}</span>}
              </div>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>Initial Password *</label>
                <input required type="text" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.password} onChange={set('password')} placeholder="Secure password" />
                {errors.password && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#000', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Location & Contact</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>WhatsApp Number</label>
                <input type="tel" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.whatsapp} onChange={set('whatsapp')} placeholder="Optional" />
              </div>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>City *</label>
                <input required type="text" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.city} onChange={set('city')} placeholder="City Name" />
                {errors.city && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.city}</span>}
              </div>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>State *</label>
                <input required type="text" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.state} onChange={set('state')} placeholder="State Name" />
                {errors.state && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.state}</span>}
              </div>
              <div>
                <label className="form-label" style={{ color: '#000', fontWeight: 600 }}>Pincode *</label>
                <input required type="text" className="form-input" style={{ border: '1px solid #E5E7EB', background: '#fff' }} value={form.pincode} onChange={set('pincode')} placeholder="6-digit pincode" />
                {errors.pincode && <span className="form-error" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.pincode}</span>}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', background: '#000', color: '#fff', border: 'none', padding: '0.75rem', fontWeight: 700 }}>
              {loading ? <Loader className="spin" size={18} /> : 'Register Vendor Account'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
