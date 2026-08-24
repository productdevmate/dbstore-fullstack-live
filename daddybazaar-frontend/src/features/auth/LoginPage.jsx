import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Loader, ShoppingBag, User, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(form);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back, ${result.data.ownerName}!`);
      if (result.data.role === 'SUPER_ADMIN') {
        navigate('/super-admin');
      } else if (result.data.role === 'PRODUCT_MANAGER') {
        navigate('/product-manager');
      } else if (result.data.role === 'PRODUCT') {
        navigate('/product-admin');
      } else if (result.data.role === 'PRODUCT_ASSOCIATE') {
        navigate('/product-associate');
      } else {
        navigate('/dashboard');
      }
    } else {
      toast.error(result.message);
    }
  };

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
        flex: 6,
        position: 'relative',
        backgroundColor: '#000',
        overflow: 'hidden'
      }}>
        <img 
          src="/login-bg.jpg" 
          alt="South Indian Woman Vendor" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.9
          }} 
        />
        <Link 
          to="/"
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            color: '#fff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            zIndex: 10,
            background: 'rgba(0,0,0,0.3)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            backdropFilter: 'blur(4px)',
            transition: 'background 0.2s'
          }}
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
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
            Your Business.<br />
            Your Website.<br />
            Your Growth.
          </h1>
          <div style={{ width: 60, height: 1, backgroundColor: '#fff', marginBottom: '1.5rem' }} />
          <p style={{ fontSize: '1.1rem', color: '#e5e5e5', lineHeight: 1.6 }}>
            Create your professional business website in minutes with DaddyBazaar.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div style={{
        flex: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          
          {/* Titles */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1a1f36', letterSpacing: '-0.02em' }}>
              Welcome back
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1a1f36', marginBottom: '0.5rem' }}>
                Email or Phone Number<span style={{ color: '#e11d48' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                  <User size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Enter email or phone number"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  autoFocus
                  style={{
                    width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem',
                    border: '1px solid #e2e8f0', borderRadius: '8px',
                    fontSize: '0.95rem', color: '#000', outline: 'none',
                    transition: 'border-color 0.2s', backgroundColor: '#f0f4f8'
                  }}
                  onFocus={e => e.target.style.borderColor = '#cf1919'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1f36' }}>
                  Password<span style={{ color: '#e11d48', marginLeft: '0.2rem' }}>*</span>
                </label>
                <a href="#" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cf1919', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                  <Lock size={18} />
                </div>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  style={{
                    width: '100%', padding: '0.9rem 2.8rem',
                    border: '1px solid #e2e8f0', borderRadius: '8px',
                    fontSize: '0.95rem', color: '#000', outline: 'none',
                    transition: 'border-color 0.2s', backgroundColor: '#f0f4f8'
                  }}
                  onFocus={e => e.target.style.borderColor = '#cf1919'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  style={{
                    position: 'absolute', right: '1rem', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#9ca3af', padding: 0, display: 'flex'
                  }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.9rem',
                backgroundColor: '#cf1919', color: '#fff',
                border: 'none', borderRadius: '8px',
                fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                marginBottom: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
              }}
            >
              {loading ? <Loader size={18} className="animate-spin" /> : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              &copy; 2026 DaddyBazaar. All rights reserved.
            </span>
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
