import React, { useEffect } from 'react';
import { Phone, MapPin, CheckCircle, Clock, Star, MessageCircle, Map, PlayCircle, ShieldCheck, Tag, Truck, ShoppingBag } from 'lucide-react';
import { publicApi } from '../../api/api';

/**
 * Template 1 — Toys Shop Redesign
 */
export default function Template1({ data }) {
  const { business, categories, products } = data;

  const trackAndOpen = (type, url) => {
    publicApi.trackEvent({ eventType: type }).catch(() => {});
    window.open(url, '_blank');
  };

  const whatsappUrl = business.whatsapp 
    ? `https://wa.me/91${business.whatsapp.replace(/\D/g, '')}` 
    : '#';

  const callUrl = business.phone ? `tel:${business.phone}` : '#';

  useEffect(() => {
    const title = `${business.name}${business.city ? ` | ${business.city}` : ''}`;
    document.title = title;
    const desc = business.description || `${business.name} - Trusted Local Toy Shop`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
  }, [business]);

  const TitleStar = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem', marginBottom: '2.5rem' }}>
      <div style={{ width: '40px', height: '2px', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Star size={16} fill="#fbbf24" color="#fbbf24" style={{ background: '#fff', padding: '0 4px' }} />
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#ffffff', color: '#111827', minHeight: '100vh', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', maxWidth: 1400, margin: '0 auto', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Left: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} color="#4b5563" /> Address: {business.address || '[Shop Address]'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={16} color="#4b5563" /> Contact: +91 {business.phone || 'XXXXX XXXXX'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Map size={16} color="#4b5563" /> Location: <span style={{ color: '#2563eb', cursor: 'pointer' }} onClick={() => trackAndOpen('MAP_CLICK', business.googleMapsUrl || '#')}>View on Google Maps</span>
          </div>
        </div>

        {/* Center: Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {business.logoUrl ? (
            <img src={business.logoUrl} alt="Logo" style={{ height: 60, objectFit: 'contain' }} />
          ) : (
            <>
              <img src="https://cdn-icons-png.flaticon.com/512/3081/3081119.png" alt="Bear" style={{ height: 50, marginBottom: '0.25rem' }} />
              <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#ef4444', lineHeight: 1, textAlign: 'center' }}>
                {business.name.toUpperCase()}
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#6b7280' }}>— SHOP —</div>
            </>
          )}
        </div>

        {/* Right: Hours & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 700 }}>
            <div style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: 8, height: 8, background: '#16a34a', borderRadius: '50%' }} /> Open Today
            </div>
            <div>9:00 AM - 9:00 PM</div>
            <div style={{ color: '#4b5563', fontSize: '0.75rem' }}>Monday - Sunday</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => trackAndOpen('WHATSAPP_CLICK', whatsappUrl)} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <MessageCircle size={16} /> WhatsApp Us
            </button>
            <button onClick={() => trackAndOpen('PHONE_CLICK', callUrl)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1.25rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', justifyContent: 'center' }}>
              <Phone size={16} /> Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        background: `url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
        padding: '5rem 2rem',
        minHeight: 400,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: 600 }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Fun, <span style={{ color: '#fbbf24' }}>Learning & Happiness</span> for Every Child
            </h1>
            <p style={{ color: '#e5e7eb', fontSize: '1.1rem', marginBottom: '2rem', fontWeight: 500, lineHeight: 1.5 }}>
              Discover quality toys for every age<br />at your trusted local toy shop.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>
                <ShoppingBag size={18} /> Shop Now
              </button>
              <button onClick={() => trackAndOpen('WHATSAPP_CLICK', whatsappUrl)} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>
                <MessageCircle size={18} /> WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Toys Grid */}
      {products && products.length > 0 && (
        <section style={{ padding: '4rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#111827' }}>Our Popular Toys</h2>
          <TitleStar />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {products.map((product, index) => (
              <div key={product.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#2563eb', color: '#fff', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, fontWeight: 800, fontSize: '0.85rem', zIndex: 2 }}>
                  {index + 1}
                </div>
                <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <img src={product.imageUrl || 'https://via.placeholder.com/200'} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>{product.name}</h3>
                  <div style={{ color: '#2563eb', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>₹{product.price.toLocaleString('en-IN')}</div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem', flex: 1 }}>{product.description}</p>
                  
                  <button onClick={() => trackAndOpen('WHATSAPP_CLICK', `${whatsappUrl}?text=Hi, I am interested in ${product.name}`)} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', width: '100%', fontSize: '0.85rem' }}>
                    <MessageCircle size={14} /> Enquire on WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <section style={{ padding: '2rem 2rem 4rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#111827' }}>Toy Categories</h2>
          <TitleStar />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', justifyContent: 'center' }}>
            {categories.map((cat, i) => (
              <div key={cat.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.5rem', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   {/* Fallback mock images if category doesn't have one */}
                   <img src={`https://picsum.photos/seed/${cat.id}/150/150`} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} onError={(e) => { e.target.style.display='none'; }}/>
                </div>
                <h4 style={{ fontWeight: 800, fontSize: '0.9rem', margin: 0 }}>{cat.name}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section style={{ padding: '0 2rem 4rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#111827' }}>Why Choose Our Toy Shop?</h2>
        <TitleStar />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: <ShieldCheck size={32} color="#fff" />, bg: '#3b82f6', title: 'Trusted Local Shop', desc: 'Quality products from a trusted neighborhood store.' },
            { icon: <CheckCircle size={32} color="#fff" />, bg: '#22c55e', title: 'Quality Toys', desc: 'Safe and carefully selected toys for children.' },
            { icon: <Tag size={32} color="#fff" />, bg: '#f97316', title: 'Affordable Prices', desc: 'Great toys at family-friendly prices.' },
            { icon: <Truck size={32} color="#fff" />, bg: '#8b5cf6', title: 'Fast Local Delivery', desc: 'Convenient delivery within the local area.' },
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '2rem 1.5rem', textAlign: 'center', background: '#fff' }}>
              <div style={{ width: 64, height: 64, background: item.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                {item.icon}
              </div>
              <h4 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Your Local Destination */}
      <section style={{ background: '#e0f2fe', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0369a1', marginBottom: '1.5rem' }}>Your Local Toy Destination</h2>
            <p style={{ color: '#0f172a', lineHeight: 1.6, fontSize: '0.95rem', fontWeight: 500 }}>
              We bring joy, learning and creativity to every child with our wide range of toys. From soft toys, educational toys, action figures, dolls to games and more - everything a child needs to learn, play and grow.
              <br/><br/>
              Perfect for everyday fun, birthdays, return gifts and special occasions. Visit us and make your child's world more colorful and happy!
            </p>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80" alt="Store Interior" style={{ width: '100%', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* Visit Our Store */}
      <section style={{ padding: '4rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: '#111827' }}>Visit Our Store</h2>
        <TitleStar />
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', background: '#fff' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, background: '#eff6ff', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Address:</div>
                <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.5 }}>{business.address || '[Shop Address]'}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, background: '#eff6ff', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Phone:</div>
                <div style={{ color: '#4b5563', fontSize: '0.9rem' }}>+91 {business.phone || 'XXXXX XXXXX'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageCircle size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>WhatsApp:</div>
                <div style={{ color: '#4b5563', fontSize: '0.9rem' }}>+91 {business.whatsapp || 'XXXXX XXXXX'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, background: '#fef3c7', color: '#d97706', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Business Hours:</div>
                <div style={{ color: '#4b5563', fontSize: '0.9rem' }}>9:00 AM - 9:00 PM (Mon - Sun)</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={() => trackAndOpen('MAP_CLICK', business.googleMapsUrl || '#')} style={{ flex: 1, background: '#2563eb', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <MapPin size={18} /> Get Directions
              </button>
              <button onClick={() => trackAndOpen('WHATSAPP_CLICK', whatsappUrl)} style={{ flex: 1, background: '#22c55e', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <MessageCircle size={18} /> Chat on WhatsApp
              </button>
            </div>
          </div>

          <div style={{ flex: '1 1 400px', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', minHeight: 300, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {/* Map Placeholder */}
             <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <Map size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                <div style={{ fontWeight: 600 }}>Google Maps Integration</div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: '#f8fafc', padding: '4rem 2rem 2rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#fff', lineHeight: 1 }}>
                {business.name.toUpperCase()}
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Making childhood more fun, one toy at a time.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '1.25rem', fontSize: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              <span>Home</span>
              <span>Products</span>
              <span>About Us</span>
              <span>Contact</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '1.25rem', fontSize: '1rem' }}>Connect With Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} color="#ef4444" /> Google Maps</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MessageCircle size={14} color="#22c55e" /> WhatsApp</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={14} color="#d946ef" /> Instagram</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={14} color="#3b82f6" /> Facebook</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '1.25rem', fontSize: '1rem' }}>Stay Connected</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Follow us on social media for latest toys, offers & updates.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageCircle size={16} /></div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Star size={16} /></div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Star size={16} /></div>
            </div>
          </div>
          
        </div>
        
        <div style={{ textAlign: 'center', borderTop: '1px solid #1e293b', paddingTop: '2rem', color: '#64748b', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} {business.name}. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
