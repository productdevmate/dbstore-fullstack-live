import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Loader, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const BUSINESS_CATEGORIES = [
  'Bakery', 'Restaurant / Cafe', 'Retail Shop', 'Salon / Beauty',
  'Electronics', 'Clothing & Fashion', 'Medical / Pharmacy', 'Education',
  'Fitness / Gym', 'Home Services', 'Automobile', 'Consulting',
  'Event Management', 'Photography', 'Other',
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
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

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      toast.success('🎉 Business created! Welcome to DaddyBazaar!');
      navigate('/dashboard');
    } else {
      if (result.errors) setErrors(result.errors);
      toast.error(result.message);
    }
  };

  const inputStyle = (error) => ({
    width: '100%', padding: '0.8rem 1rem',
    border: `1px solid ${error ? '#ef4444' : '#e5e5e5'}`, borderRadius: '6px',
    fontSize: '0.95rem', color: '#000', outline: 'none',
    transition: 'border-color 0.2s', backgroundColor: '#fafafa'
  });

  const Field = ({ id, label, type='text', placeholder, field, required=true, hint }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#000', marginBottom: '0.5rem' }} htmlFor={id}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onChange={set(field)}
        required={required}
        style={inputStyle(errors[field])}
        onFocus={e => !errors[field] && (e.target.style.borderColor = '#000')}
        onBlur={e => !errors[field] && (e.target.style.borderColor = '#e5e5e5')}
      />
      {errors[field] && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 500 }}>{errors[field]}</div>}
      {hint && <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{hint}</div>}
    </div>
  );

  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#ffffff'
    }}>
      
      {/* Left Column - Image (Hidden on Mobile) */}
      <div className="hide-on-mobile" style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',
        overflow: 'hidden'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80" 
          alt="Grocery Shop Owner" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            opacity: 0.8
          }} 
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '4rem',
          left: '4rem',
          color: '#fff',
          maxWidth: 500
        }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Build.<br />
            Manage.<br />
            Scale.
          </h1>
          <div style={{ width: 60, height: 1, backgroundColor: '#fff', marginBottom: '1.5rem' }} />
          <p style={{ fontSize: '1.1rem', color: '#e5e5e5', lineHeight: 1.6 }}>
            Join thousands of local businesses growing their digital footprint with DaddyBazaar.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 2rem 4rem 2rem',
        overflowY: 'auto'
      }}>
        <div style={{ width: '100%', maxWidth: 460, marginTop: 'auto', marginBottom: 'auto' }}>
          
          {/* Header Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.02em' }}>
              <ShoppingBag size={28} color="#000" fill="#000" />
              DaddyBazaar
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.25rem' }}>
              Launch your business website
            </div>
          </div>

          {/* Titles */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#000', letterSpacing: '-0.02em' }}>
              Create an account
            </h2>
            <p style={{ color: '#4b5563', fontSize: '0.95rem' }}>
              Get a free 14-day trial · No credit card required
            </p>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
            {[1, 2].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  backgroundColor: s <= step ? '#000' : '#e5e5e5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.3s',
                  color: s <= step ? '#fff' : '#9ca3af',
                }}>
                  {s < step ? <Check size={14} /> : s}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: s <= step ? '#000' : '#9ca3af' }}>
                  {s === 1 ? 'Your Account' : 'Business Info'}
                </span>
                {s < 2 && <div style={{ width: 24, height: 1, backgroundColor: '#e5e5e5' }} />}
              </div>
            ))}
          </div>

          {/* Form */}
          {step === 1 && (
            <form onSubmit={nextStep}>
              <Field id="reg-owner" label="Your Full Name" placeholder="Rahul Sharma" field="ownerName" />
              <Field id="reg-email" label="Email Address" type="email" placeholder="rahul@example.com" field="email" />
              <Field id="reg-mobile" label="Mobile Number" type="tel" placeholder="9876543210" field="mobile"
                     hint="10-digit Indian mobile number" />
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#000', marginBottom: '0.5rem' }} htmlFor="reg-password">
                  Password <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="reg-password" type={showPw ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    value={form.password} onChange={set('password')} required
                    minLength={8} 
                    style={{ ...inputStyle(errors.password), paddingRight: '2.75rem' }}
                    onFocus={e => !errors.password && (e.target.style.borderColor = '#000')}
                    onBlur={e => !errors.password && (e.target.style.borderColor = '#e5e5e5')}
                  />
                  <button type="button" onClick={() => setShowPw(s => !s)} style={{
                    position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0, display: 'flex'
                  }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 500 }}>{errors.password}</div>}
              </div>
              
              <button type="submit" style={{
                width: '100%', padding: '1rem',
                backgroundColor: '#000', color: '#fff',
                border: 'none', borderRadius: '6px',
                fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                Continue <ArrowRight size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <Field id="reg-biz-name" label="Business Name" placeholder="Cake Square" field="businessName"
                     hint="Your website URL will be based on this" />
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#000', marginBottom: '0.5rem' }} htmlFor="reg-biz-cat">
                  Business Category <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  id="reg-biz-cat" 
                  value={form.businessCategory} onChange={set('businessCategory')} required
                  style={inputStyle(errors.businessCategory)}
                  onFocus={e => !errors.businessCategory && (e.target.style.borderColor = '#000')}
                  onBlur={e => !errors.businessCategory && (e.target.style.borderColor = '#e5e5e5')}
                >
                  <option value="">Select category</option>
                  {BUSINESS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.businessCategory && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 500 }}>{errors.businessCategory}</div>}
              </div>
              <Field id="reg-whatsapp" label="WhatsApp Number" placeholder="9876543210 (optional)" field="whatsapp" required={false} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field id="reg-city"    label="City"    placeholder="Chennai"    field="city"    required={false} />
                <Field id="reg-state"   label="State"   placeholder="Tamil Nadu" field="state"   required={false} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} style={{
                  flex: 1, padding: '1rem',
                  backgroundColor: '#fff', color: '#000',
                  border: '1px solid #e5e5e5', borderRadius: '6px',
                  fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                }}>
                  Back
                </button>
                <button type="submit" disabled={loading} style={{
                  flex: 2, padding: '1rem',
                  backgroundColor: '#000', color: '#fff',
                  border: 'none', borderRadius: '6px',
                  fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}>
                  {loading ? <Loader size={18} className="animate-spin" /> : 'Launch My Business'}
                </button>
              </div>
            </form>
          )}

          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#4b5563', marginTop: '2rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#000', fontWeight: 700, textDecoration: 'none' }}>
              Sign in
            </Link>
          </div>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
