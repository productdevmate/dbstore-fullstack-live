import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { productApi, categoryApi } from '../../api/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Loader, Image as ImageIcon, Star, CheckCircle, XCircle } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState(null);

  const [form, setForm] = useState({
    categoryId: '', name: '', description: '', price: '', discountPrice: '',
    imageUrl: '', sku: '', productType: 'PRODUCT', featured: false, available: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([productApi.list(), categoryApi.list()]);
      setProducts(prodRes.data.data);
      setCategories(catRes.data.data);
    } catch (err) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (prod = null) => {
    if (prod) {
      setEditingProd(prod);
      setForm({
        categoryId: prod.categoryId || '', name: prod.name, description: prod.description || '',
        price: prod.price || '', discountPrice: prod.discountPrice || '',
        imageUrl: prod.imageUrl || '', sku: prod.sku || '', productType: prod.productType || 'PRODUCT',
        featured: prod.featured, available: prod.available
      });
    } else {
      setEditingProd(null);
      setForm({
        categoryId: categories.length > 0 ? categories[0].id : '', name: '', description: '',
        price: '', discountPrice: '', imageUrl: '', sku: '', productType: 'PRODUCT', featured: false, available: true
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingProd) {
        await productApi.update(editingProd.id, form);
        toast.success('Product updated');
      } else {
        await productApi.create(form);
        toast.success('Product created');
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productApi.delete(id);
      toast.success('Product deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleToggle = async (id, type) => {
    try {
      if (type === 'featured') await productApi.toggleFeatured(id);
      if (type === 'available') await productApi.toggleAvailable(id);
      toast.success('Status updated');
      loadData();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || 'Uncategorized';

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Products & Services</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Manage what you sell to your customers.</p>
          </div>
          <button onClick={() => openModal()} className="btn btn-primary">
            <Plus size={16} /> Add Product
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            <Loader size={30} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
            Loading products...
          </div>
        ) : (
          <div className="card glass animate-fade-in" style={{ padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 800 }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Item</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Category</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Price</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)', textAlign: 'center' }}>Featured</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)', textAlign: 'center' }}>Available</th>
                  <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text-muted)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No products found. Start adding your catalog!
                    </td>
                  </tr>
                )}
                {products.map(prod => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {prod.imageUrl ? (
                        <img src={prod.imageUrl} alt={prod.name} style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ImageIcon size={20} color="var(--color-text-muted)" />
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600 }}>{prod.name}</div>
                        {prod.sku && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>SKU: {prod.sku}</div>}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                      <span style={{ padding: '0.25rem 0.5rem', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem' }}>
                        {getCategoryName(prod.categoryId)}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {prod.discountPrice ? (
                        <div>
                          <div style={{ fontWeight: 600 }}>${prod.discountPrice}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>${prod.price}</div>
                        </div>
                      ) : (
                        <div style={{ fontWeight: 600 }}>${prod.price || '0.00'}</div>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button onClick={() => handleToggle(prod.id, 'featured')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: prod.featured ? '#F59E0B' : 'var(--color-text-muted)' }}>
                        <Star fill={prod.featured ? '#F59E0B' : 'none'} size={20} />
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button onClick={() => handleToggle(prod.id, 'available')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: prod.available ? '#10B981' : 'var(--color-text-muted)' }}>
                        {prod.available ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button onClick={() => openModal(prod)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', marginRight: '1rem' }}>
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(prod.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
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
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)', padding: '1rem' }}>
            <div className="card glass animate-fade-in" style={{ width: '100%', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>{editingProd ? 'Edit Product' : 'New Product'}</h2>
              
              <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Name</label>
                  <input type="text" className="form-input" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Product Name" />
                </div>
                
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-input" required value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
                    <option value="" disabled>Select a category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="form-label">Type</label>
                  <select className="form-input" value={form.productType} onChange={e => setForm({...form, productType: e.target.value})}>
                    <option value="PRODUCT">Physical Product</option>
                    <option value="SERVICE">Service</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Price</label>
                  <input type="number" step="0.01" className="form-input" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="0.00" />
                </div>

                <div>
                  <label className="form-label">Discount Price (Optional)</label>
                  <input type="number" step="0.01" className="form-input" value={form.discountPrice} onChange={e => setForm({...form, discountPrice: e.target.value})} placeholder="0.00" />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Description</label>
                  <textarea className="form-input" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Product details..." />
                </div>

                <div>
                  <label className="form-label">Image URL</label>
                  <input type="url" className="form-input" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} placeholder="https://..." />
                </div>

                <div>
                  <label className="form-label">SKU (Optional)</label>
                  <input type="text" className="form-input" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} placeholder="Stock Keeping Unit" />
                </div>
                
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Product</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
