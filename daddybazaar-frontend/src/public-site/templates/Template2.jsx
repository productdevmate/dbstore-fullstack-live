import { useEffect } from 'react';
import { publicApi } from '../../api/api';
import { Phone, MessageCircle, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * Template 2 — Classic Services
 * Sections: Hero, Featured Services, About, Contact
 */
export default function Template2({ data }) {
  const { business, categories, products, featured } = data;

  const trackAndOpen = (type, url) => {
    publicApi.trackEvent({ eventType: type }).catch(() => {});
    window.open(url, '_blank');
  };

  useEffect(() => {
    const title = `${business.name}${business.city ? ` | ${business.city}` : ''}`;
    document.title = title;
    const desc = business.description || `${business.name} - Professional Services`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
  }, [business]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#ffffff', color: '#000000', minHeight: '100vh' }}>
      
      {/* Header */}
      <header style={{
        padding: '1.5rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: '#fff', borderBottom: '1px solid #000'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {business.logoUrl ? (
            <img src={business.logoUrl} alt="Logo" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 40, height: 40, background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', borderRadius: 4 }}>
              {business.name.substring(0, 1).toUpperCase()}
            </div>
          )}
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>{business.name}</h1>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {business.whatsapp && (
            <button onClick={() => trackAndOpen('WHATSAPP_CLICK', `https://wa.me/91${business.whatsapp.replace(/\D/g, '')}`)} style={{
              background: '#fff', border: '2px solid #000', padding: '0.5rem 1rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
            }}>
              <MessageCircle size={18} /> WhatsApp
            </button>
          )}
          {business.phone && (
            <button onClick={() => trackAndOpen('PHONE_CLICK', `tel:${business.phone}`)} style={{
              background: '#000', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
            }}>
              <Phone size={18} /> Call Now
            </button>
          )}
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Premium Services, <br />Delivered Professionally.
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '2.5rem' }}>
            {business.description || 'Welcome to our business. We provide top-notch services tailored to your needs.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.95rem', fontWeight: 600 }}>
            {business.city && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> {business.city}</span>}
            {business.businessCategory && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} /> {business.businessCategory}</span>}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      {products && products.length > 0 && (
        <section style={{ padding: '5rem 2rem', background: '#f9fafb' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '3rem', textAlign: 'center' }}>Our Services</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {products.map(p => (
                <div key={p.id} style={{ background: '#fff', border: '1px solid #e5e5e5', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                  {p.imageUrl && (
                    <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: 200, objectFit: 'cover', marginBottom: '1.5rem', filter: 'grayscale(100%)' }} />
                  )}
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>{p.name}</h4>
                  <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                    {p.description || 'Professional service tailored to your requirements.'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>₹{p.price.toLocaleString('en-IN')}</span>
                    {business.whatsapp && (
                      <button onClick={() => trackAndOpen('WHATSAPP_CLICK', `https://wa.me/91${business.whatsapp.replace(/\D/g, '')}?text=Hi, I am interested in ${p.name}`)} style={{
                        background: 'transparent', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', padding: 0
                      }}>
                        Enquire <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: '#000', color: '#fff', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{business.name}</h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', maxWidth: 600, margin: '0 auto 2rem auto' }}>
            {business.address}, {business.city}, {business.state} - {business.pincode}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
            Powered by DaddyBazaar
          </p>
        </div>
      </footer>
    </div>
  );
}
