import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { categoryApi } from '../../api/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader, Image as ImageIcon } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [form, setForm] = useState({ name: '', description: '', imageUrl: '', displayOrder: 0, active: true });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setLoading(true);
    categoryApi.list()
      .then(res => setCategories(res.data.data))
      .catch(err => toast.error('Failed to load categories'))
      .finally(() => setLoading(false));
  };

  const openModal = (cat = null) => {
    if (cat) {
      setEditingCat(cat);
      setForm({ name: cat.name, description: cat.description || '', imageUrl: cat.imageUrl || '', displayOrder: cat.displayOrder, active: cat.active });
    } else {
      setEditingCat(null);
      setForm({ name: '', description: '', imageUrl: '', displayOrder: 0, active: true });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingCat) {
        await categoryApi.update(editingCat.id, form);
        toast.success('Category updated');
      } else {
        await categoryApi.create(form);
        toast.success('Category created');
      }
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoryApi.delete(id);
      toast.success('Category deleted');
      loadCategories();
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  const handleToggle = async (id) => {
    try {
      await categoryApi.toggle(id);
      toast.success('Category status updated');
      loadCategories();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Categories</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Organize your products and services.</p>
          </div>
          <button onClick={() => openModal()} className="btn btn-primary">
            <Plus size={16} /> Add Category
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            <Loader size={30} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
            Loading categories...
          </div>
        ) : (
          <div className="card glass animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Image</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Name</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Status</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No categories found. Create one to get started!
                    </td>
                  </tr>
                )}
                {categories.map(cat => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem' }}>
                      {cat.imageUrl ? (
                        <img src={cat.imageUrl} alt={cat.name} style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ImageIcon size={18} color="var(--color-text-muted)" />
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{cat.name}</div>
                      {cat.description && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 4 }}>{cat.description}</div>}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => handleToggle(cat.id)} style={{
                        padding: '0.25rem 0.75rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                        background: cat.active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: cat.active ? '#22C55E' : '#EF4444'
                      }}>
                        {cat.active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button onClick={() => openModal(cat)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', marginRight: '1rem' }}>
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
            <div className="card glass animate-fade-in" style={{ width: '100%', maxWidth: 500, padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>{editingCat ? 'Edit Category' : 'New Category'}</h2>
              <form onSubmit={handleSave}>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="E.g., Cakes" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Description (Optional)</label>
                  <textarea className="form-input" rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Category description" />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Image URL (Optional)</label>
                  <input type="url" className="form-input" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} placeholder="https://..." />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                  <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Category</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
