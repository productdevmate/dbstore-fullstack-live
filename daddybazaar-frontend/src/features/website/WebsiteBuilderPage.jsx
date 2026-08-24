import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { websiteApi, templateApi } from '../../api/api';
import toast from 'react-hot-toast';
import { Save, Loader, Palette, LayoutTemplate, Search } from 'lucide-react';

const TABS = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'branding',  label: 'Branding',  icon: Palette },
  { id: 'seo',       label: 'SEO',       icon: Search },
];

export default function WebsiteBuilderPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [templates, setTemplates] = useState([]);
  
  const [form, setForm] = useState({
    templateId: '', primaryColor: '#2563EB', secondaryColor: '#1E40AF',
    fontFamily: 'Inter', seoTitle: '', seoDescription: '', faviconUrl: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [settingsRes, templatesRes] = await Promise.all([
        websiteApi.getSettings(),
        templateApi.list()
      ]);
      setTemplates(templatesRes.data.data);
      
      const settings = settingsRes.data.data;
      setForm({
        templateId: settings.templateId || '',
        primaryColor: settings.primaryColor || '#2563EB',
        secondaryColor: settings.secondaryColor || '#1E40AF',
        fontFamily: settings.fontFamily || 'Inter',
        seoTitle: settings.seoTitle || '',
        seoDescription: settings.seoDescription || '',
        faviconUrl: settings.faviconUrl || ''
      });
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await websiteApi.saveSettings(form);
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const selectTemplate = async (id) => {
    setForm(f => ({ ...f, templateId: id }));
    toast.success('Template selected. Please save your changes.');
  };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Website Builder</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Customize the look and feel of your public website.</p>
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
            Loading builder...
          </div>
        ) : (
          <div className="card glass animate-fade-in">
            <form onSubmit={handleSave}>
              
              {/* TEMPLATES */}
              {activeTab === 'templates' && (
                <div className="animate-fade-in">
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Choose a template for your business. This will instantly change how your public website looks.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {templates.map(tpl => (
                      <div 
                        key={tpl.id}
                        onClick={() => selectTemplate(tpl.id)}
                        style={{
                          border: `2px solid ${form.templateId === tpl.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
                          borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s',
                          background: 'var(--color-surface)'
                        }}
                      >
                        <div style={{ height: 160, background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                          {tpl.previewImage ? (
                            <img src={tpl.previewImage} alt={tpl.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <LayoutTemplate size={40} color="var(--color-text-muted)" />
                          )}
                          {form.templateId === tpl.id && (
                            <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600 }}>
                              Active
                            </div>
                          )}
                        </div>
                        <div style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{tpl.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{tpl.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BRANDING */}
              {activeTab === 'branding' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 600 }}>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    Customize the colors and typography to match your brand identity.
                  </p>

                  <div>
                    <label className="form-label">Primary Color</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={form.primaryColor} 
                        onChange={e => setForm({...form, primaryColor: e.target.value})}
                        style={{ width: 60, height: 40, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }} 
                      />
                      <input 
                        type="text" 
                        className="form-input" 
                        value={form.primaryColor} 
                        onChange={e => setForm({...form, primaryColor: e.target.value})} 
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Secondary Color</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={form.secondaryColor} 
                        onChange={e => setForm({...form, secondaryColor: e.target.value})}
                        style={{ width: 60, height: 40, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }} 
                      />
                      <input 
                        type="text" 
                        className="form-input" 
                        value={form.secondaryColor} 
                        onChange={e => setForm({...form, secondaryColor: e.target.value})} 
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Font Family</label>
                    <select className="form-input" value={form.fontFamily} onChange={e => setForm({...form, fontFamily: e.target.value})}>
                      <option value="Inter">Inter (Default)</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Outfit">Outfit</option>
                      <option value="Playfair Display">Playfair Display (Serif)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* SEO */}
              {activeTab === 'seo' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 600 }}>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    Optimize how your website appears on search engines and social media.
                  </p>

                  <div>
                    <label className="form-label">SEO Title</label>
                    <input type="text" className="form-input" value={form.seoTitle} onChange={e => setForm({...form, seoTitle: e.target.value})} placeholder="E.g., CakeSquare | Best Custom Cakes in NY" />
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Appears in browser tab and search results.</div>
                  </div>

                  <div>
                    <label className="form-label">SEO Description</label>
                    <textarea className="form-input" rows={3} value={form.seoDescription} onChange={e => setForm({...form, seoDescription: e.target.value})} placeholder="Briefly describe your business for search engines..." />
                  </div>

                  <div>
                    <label className="form-label">Favicon URL</label>
                    <input type="url" className="form-input" value={form.faviconUrl} onChange={e => setForm({...form, faviconUrl: e.target.value})} placeholder="https://example.com/favicon.png" />
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>The small icon next to your website title in the browser tab.</div>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
