import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { businessApi } from '../../api/api';
import toast from 'react-hot-toast';
import { Save, Image as ImageIcon, MapPin, Link2, Loader, Building } from 'lucide-react';

const TABS = [
  { id: 'basic',   label: 'Basic Info', icon: Building },
  { id: 'contact', label: 'Contact',    icon: MapPin },
  { id: 'social',  label: 'Social',     icon: Link2 },
  { id: 'images',  label: 'Images',     icon: ImageIcon },
];

const Field = ({ label, name, type = 'text', as = 'input', placeholder, rows, hint, prefix, form, handleChange }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <label className="form-label">{label}</label>
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}>
      {prefix && <span style={{ paddingLeft: '1rem', color: 'var(--color-text-muted)' }}>{prefix}</span>}
      {as === 'textarea' ? (
        <textarea
          name={name} value={form[name] || ''} onChange={handleChange}
          placeholder={placeholder} rows={rows}
          style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--color-text)', padding: '0.625rem 1rem', outline: 'none', fontFamily: 'inherit' }}
        />
      ) : (
        <input
          type={type} name={name} value={form[name] || ''} onChange={handleChange}
          placeholder={placeholder}
          style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--color-text)', padding: '0.625rem 1rem', outline: 'none', fontFamily: 'inherit' }}
        />
      )}
    </div>
    {hint && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{hint}</div>}
  </div>
);

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', businessCategory: '', description: '', tagline: '',
    phone: '', whatsapp: '', email: '',
    address: '', city: '', state: '', country: '', pincode: '', googleMapsUrl: '',
    instagramUrl: '', facebookUrl: '', youtubeUrl: '', xUrl: '',
    logoUrl: '', bannerUrl: ''
  });

  useEffect(() => {
    businessApi.get().then(res => {
      const data = res.data.data;
      setForm(prev => ({ ...prev, ...data }));
    }).catch(err => {
      toast.error('Failed to load business profile');
    }).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await businessApi.updateProfile(form);
      toast.success('Business profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };



  return (
    <DashboardLayout>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Business Profile</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Manage your public identity and contact details.</p>
          </div>
          <button onClick={handleSave} className="btn btn-primary" disabled={loading || saving}>
            {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem', overflowX: 'auto' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1rem', background: 'none', border: 'none',
                borderBottom: `2px solid ${activeTab === t.id ? 'var(--color-primary)' : 'transparent'}`,
                color: activeTab === t.id ? 'var(--color-text)' : 'var(--color-text-muted)',
                fontWeight: activeTab === t.id ? 600 : 500,
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            <Loader size={30} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
            Loading profile...
          </div>
        ) : (
          <div className="card glass animate-fade-in">
            <form onSubmit={handleSave}>

              {/* BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="animate-fade-in">
                  <Field label="Business Name" name="name" form={form} handleChange={handleChange} />
                  <Field label="Category" name="businessCategory" hint="E.g., Bakery, Salon, Pharmacy" form={form} handleChange={handleChange} />
                  <Field label="Tagline" name="tagline" placeholder="Brief, catchy slogan for the hero banner" form={form} handleChange={handleChange} />
                  <Field label="Description" name="description" as="textarea" rows={4} placeholder="Tell your customers about your business..." form={form} handleChange={handleChange} />
                </div>
              )}

              {/* CONTACT */}
              {activeTab === 'contact' && (
                <div className="animate-fade-in">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Phone" name="phone" placeholder="+91 9876543210" form={form} handleChange={handleChange} />
                    <Field label="WhatsApp" name="whatsapp" placeholder="+91 9876543210" form={form} handleChange={handleChange} />
                  </div>
                  <Field label="Email Address" name="email" type="email" form={form} handleChange={handleChange} />
                  
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Location</h3>
                    <Field label="Address Line" name="address" placeholder="123 Main Street" form={form} handleChange={handleChange} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <Field label="City" name="city" form={form} handleChange={handleChange} />
                      <Field label="State" name="state" form={form} handleChange={handleChange} />
                      <Field label="Pincode" name="pincode" form={form} handleChange={handleChange} />
                    </div>
                    <Field label="Google Maps URL" name="googleMapsUrl" placeholder="https://maps.app.goo.gl/..." hint="Paste your exact location link to help customers find you." form={form} handleChange={handleChange} />
                  </div>
                </div>
              )}

              {/* SOCIAL */}
              {activeTab === 'social' && (
                <div className="animate-fade-in">
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Link your social media profiles to appear on your website footer.
                  </p>
                  <Field label="Instagram" name="instagramUrl" placeholder="https://instagram.com/yourbusiness" prefix="@" form={form} handleChange={handleChange} />
                  <Field label="Facebook" name="facebookUrl" placeholder="https://facebook.com/yourbusiness" prefix="f" form={form} handleChange={handleChange} />
                  <Field label="YouTube" name="youtubeUrl" placeholder="https://youtube.com/@yourbusiness" prefix="▶" form={form} handleChange={handleChange} />
                  <Field label="X (Twitter)" name="xUrl" placeholder="https://x.com/yourbusiness" prefix="X" form={form} handleChange={handleChange} />
                </div>
              )}

              {/* IMAGES */}
              {activeTab === 'images' && (
                <div className="animate-fade-in">
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Provide direct URLs for your images. (Image upload will be available in Phase 5).
                  </p>
                  <Field label="Logo URL" name="logoUrl" placeholder="https://example.com/logo.png" form={form} handleChange={handleChange} />
                  {form.logoUrl && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--color-surface-2)', borderRadius: 'var(--radius)' }}>
                      <img src={form.logoUrl} alt="Logo Preview" style={{ maxHeight: 60, objectFit: 'contain' }} />
                    </div>
                  )}

                  <Field label="Banner Image URL" name="bannerUrl" placeholder="https://example.com/banner.jpg" form={form} handleChange={handleChange} />
                  {form.bannerUrl && (
                    <div style={{ padding: '1rem', background: 'var(--color-surface-2)', borderRadius: 'var(--radius)' }}>
                      <img src={form.bannerUrl} alt="Banner Preview" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    </div>
                  )}
                </div>
              )}

            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
