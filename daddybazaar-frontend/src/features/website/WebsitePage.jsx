import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { websiteApi, templateApi } from '../../api/api';
import toast from 'react-hot-toast';
import { Save, Globe, EyeOff, LayoutTemplate, Palette, Image as ImageIcon, Search, Code, CheckCircle } from 'lucide-react';

export default function WebsitePage() {
  const [settings, setSettings] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Form state
  const [form, setForm] = useState({
    templateId: '',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    fontFamily: 'Inter',
    faviconUrl: '',
    seoTitle: '',
    seoDescription: '',
    customCss: '',
    sectionsConfig: '{}'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [settingsRes, templatesRes] = await Promise.all([
        websiteApi.getSettings(),
        templateApi.list()
      ]);
      
      setTemplates(templatesRes.data.data || []);
      
      const s = settingsRes.data.data;
      if (s) {
        setSettings(s);
        setForm({
          templateId: s.templateId || '',
          primaryColor: s.primaryColor || '#000000',
          secondaryColor: s.secondaryColor || '#ffffff',
          fontFamily: s.fontFamily || 'Inter',
          faviconUrl: s.faviconUrl || '',
          seoTitle: s.seoTitle || '',
          seoDescription: s.seoDescription || '',
          customCss: s.customCss || '',
          sectionsConfig: s.sectionsConfig || '{}'
        });
      }
    } catch (error) {
      toast.error('Failed to load website settings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    try {
      setSaving(true);
      const res = await websiteApi.saveSettings(form);
      setSettings(res.data.data);
      toast.success('Website settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setPublishing(true);
      await websiteApi.publish();
      toast.success('Website published successfully!');
      fetchData(); // refresh to get updated status
    } catch (error) {
      toast.error('Failed to publish website');
    } finally {
      setPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    if (!window.confirm('Are you sure you want to unpublish your website? It will no longer be accessible to customers.')) return;
    try {
      setPublishing(true);
      await websiteApi.unpublish();
      toast.success('Website unpublished');
      fetchData();
    } catch (error) {
      toast.error('Failed to unpublish website');
    } finally {
      setPublishing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading settings...</div>
      </DashboardLayout>
    );
  }

  const isPublished = !!settings?.publishedAt;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Website Builder</h1>
          <p style={{ color: '#64748b' }}>Design and configure your public storefront.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isPublished ? (
            <button 
              onClick={handleUnpublish}
              disabled={publishing}
              style={{
                padding: '0.6rem 1.2rem', backgroundColor: '#fff', color: '#ef4444',
                border: '1px solid #fca5a5', borderRadius: '8px', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
              }}
            >
              <EyeOff size={18} /> {publishing ? 'Processing...' : 'Unpublish'}
            </button>
          ) : (
            <button 
              onClick={handlePublish}
              disabled={publishing}
              style={{
                padding: '0.6rem 1.2rem', backgroundColor: '#10b981', color: '#fff',
                border: 'none', borderRadius: '8px', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
              }}
            >
              <Globe size={18} /> {publishing ? 'Publishing...' : 'Publish Site'}
            </button>
          )}
          
          <button 
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '0.6rem 1.2rem', backgroundColor: '#0f172a', color: '#fff',
              border: 'none', borderRadius: '8px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
            }}
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Sidebar Navigation */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'general', label: 'General & Theme', icon: Palette },
            { id: 'branding', label: 'Branding', icon: ImageIcon },
            { id: 'seo', label: 'SEO Settings', icon: Search },
            { id: 'advanced', label: 'Advanced', icon: Code },
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

        {/* Form Content */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSave}>
            
            {/* General Tab */}
            {activeTab === 'general' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>Theme Settings</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Primary Color</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        name="primaryColor"
                        value={form.primaryColor}
                        onChange={handleChange}
                        style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        name="primaryColor"
                        value={form.primaryColor}
                        onChange={handleChange}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Secondary Color</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        name="secondaryColor"
                        value={form.secondaryColor}
                        onChange={handleChange}
                        style={{ width: '50px', height: '50px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        name="secondaryColor"
                        value={form.secondaryColor}
                        onChange={handleChange}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Typography (Font Family)</label>
                  <select 
                    name="fontFamily"
                    value={form.fontFamily}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                  >
                    <option value="Inter">Inter (Modern Sans-serif)</option>
                    <option value="Roboto">Roboto (Clean Sans-serif)</option>
                    <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                    <option value="Outfit">Outfit (Geometric Sans)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Website Template</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {templates.map(t => (
                      <div 
                        key={t.id}
                        onClick={() => setForm(f => ({ ...f, templateId: t.id }))}
                        style={{
                          border: form.templateId === t.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                          borderRadius: '8px', padding: '1rem', cursor: 'pointer',
                          backgroundColor: form.templateId === t.id ? '#eff6ff' : '#fff',
                          position: 'relative'
                        }}
                      >
                        {form.templateId === t.id && (
                          <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#3b82f6' }}>
                            <CheckCircle size={20} />
                          </div>
                        )}
                        <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{t.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{t.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Branding Tab */}
            {activeTab === 'branding' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>Brand Identity</h2>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Favicon URL</label>
                  <input 
                    type="url" 
                    name="faviconUrl"
                    placeholder="https://example.com/favicon.ico"
                    value={form.faviconUrl}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Enter the direct URL to your favicon image (used in browser tabs).</p>
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>Search Engine Optimization</h2>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>SEO Meta Title</label>
                  <input 
                    type="text" 
                    name="seoTitle"
                    placeholder="My Awesome Store | Quality Products"
                    value={form.seoTitle}
                    onChange={handleChange}
                    maxLength={60}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                    <span>Shown as the clickable headline in search results.</span>
                    <span>{form.seoTitle.length} / 60</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>SEO Meta Description</label>
                  <textarea 
                    name="seoDescription"
                    placeholder="Briefly describe what your store offers..."
                    value={form.seoDescription}
                    onChange={handleChange}
                    rows={4}
                    maxLength={160}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                  />
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                    <span>Shown as the summary snippet in search results.</span>
                    <span>{form.seoDescription.length} / 160</span>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>Advanced Settings</h2>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Custom CSS</label>
                  <textarea 
                    name="customCss"
                    placeholder="/* Enter custom CSS rules here */"
                    value={form.customCss}
                    onChange={handleChange}
                    rows={6}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', backgroundColor: '#f8fafc' }}
                  />
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>CSS injected directly into your website's header.</p>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Sections Configuration (JSON)</label>
                  <textarea 
                    name="sectionsConfig"
                    value={form.sectionsConfig}
                    onChange={handleChange}
                    rows={6}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', backgroundColor: '#f8fafc' }}
                  />
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Advanced JSON configuration for template sections layout.</p>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
