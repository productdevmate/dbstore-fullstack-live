import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronDown, Check, ArrowRight } from 'lucide-react';

const TEMPLATES = [
  {
    id: 1,
    name: 'Modern Retail',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    description: 'A clean, modern single-page storefront for retail businesses.',
  },
  {
    id: 2,
    name: 'Classic Services',
    image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ce6?auto=format&fit=crop&w=800&q=80',
    description: 'A beautiful single-page layout for service-based businesses.',
  }
];

export default function TemplatesPage() {
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#f9fafb',
      color: '#000000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.5,
    }}>
      
      {/* Announcement Bar */}
      <div style={{
        backgroundColor: '#000', color: '#fff', textAlign: 'center',
        padding: '0.6rem 1rem', fontSize: '0.85rem', fontWeight: 700,
        letterSpacing: '0.05em', textTransform: 'uppercase',
      }}>
        Every one need this..!
      </div>

      {/* Navigation */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#ffffff',
        padding: '1.25rem 2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', borderBottom: '1px solid #e5e5e5'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em', flex: 1, textDecoration: 'none', color: '#000' }}>
          <ShoppingBag size={24} color="#000" fill="#000" />
          DaddyBazaar
        </Link>
        
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', justifyContent: 'center', flex: 2 }} className="hide-on-mobile">
          <Link to="/" style={{ color: '#000', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Features</Link>
          <Link to="/" style={{ color: '#000', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>How It Works</Link>
          <Link to="/templates" style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', borderBottom: '2px solid #000', paddingBottom: '2px' }}>Templates</Link>
          <Link to="/" style={{ color: '#000', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Pricing</Link>
        </div>
        
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'flex-end' }}>
          <Link to="/login" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#4b5563'}>
            Staff Login
          </Link>
          <Link to="/login" style={{
            backgroundColor: '#000', color: '#fff', padding: '0.75rem 1.5rem',
            textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', borderRadius: '6px'
          }}>
            Vendor Login
          </Link>
        </nav>
      </header>

      {/* Header Section */}
      <section style={{ backgroundColor: '#fff', padding: '6rem 2rem', textAlign: 'center', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#000' }}>
            Stunning Templates for Every Business.
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#4b5563', marginBottom: '2.5rem' }}>
            Choose from our professionally designed templates and launch your dream website today. No coding required.
          </p>
          <Link to="/login" style={{
            backgroundColor: '#000', color: '#fff', padding: '1rem 2.5rem',
            textDecoration: 'none', fontWeight: 700, fontSize: '1rem', borderRadius: '6px',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
          }}>
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '3rem'
        }}>
          {TEMPLATES.map(template => (
            <div key={template.id} style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ height: 240, overflow: 'hidden' }}>
                <img 
                  src={template.image} 
                  alt={template.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} 
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#000' }}>{template.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>{template.description}</p>
                <Link to={`/templates/preview/${template.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                  Preview Template <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#fff', padding: '4rem 2rem 2rem 2rem', marginTop: 'auto', borderTop: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem' }}>
            <div style={{ flex: '1 1 250px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem' }}>
                <ShoppingBag size={20} color="#000" fill="#000" /> DaddyBazaar
              </div>
              <p style={{ color: '#4b5563', fontSize: '0.9rem', maxWidth: 280 }}>
                Helping businesses build their online identity and grow digitally with ease.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.95rem' }}>Product</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#4b5563', fontSize: '0.9rem' }}>
                  <span>Features</span>
                  <span>Templates</span>
                  <span>Pricing</span>
                  <span>Dashboard</span>
                </div>
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.95rem' }}>Company</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#4b5563', fontSize: '0.9rem' }}>
                  <span>About Us</span>
                  <span>Blog</span>
                  <span>Careers</span>
                  <span>Contact</span>
                </div>
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.95rem' }}>Support</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#4b5563', fontSize: '0.9rem' }}>
                  <span>Help Center</span>
                  <span>Terms of Service</span>
                  <span>Privacy Policy</span>
                  <span>Refund Policy</span>
                </div>
              </div>
            </div>
            
          </div>

          <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end', fontSize: '0.85rem', color: '#6b7280' }}>
            © 2024 DaddyBazaar. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
