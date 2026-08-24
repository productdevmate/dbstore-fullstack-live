import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, ChevronDown, PlayCircle, CheckCircle2, 
  Store, Globe, Users, Star, Layout, PenTool, Phone, 
  BarChart, Rocket, Check 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#ffffff',
      color: '#000000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.5,
    }}>
      
      {/* Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1400,
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em', flex: 1, color: '#000' }}>
          <div style={{ width: 22, height: 22, backgroundColor: '#cf1919', borderRadius: 4 }}></div>
          <span>Daddy<span style={{color: '#cf1919'}}>Bazaar</span></span>
        </div>
        
        {/* Center: Menu */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', justifyContent: 'center', flex: 2 }} className="hide-on-mobile">
          <a href="#" style={{ color: '#000', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Features</a>
          <a href="#" style={{ color: '#000', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>How It Works</a>
          <Link to="/templates" style={{ color: '#000', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Templates</Link>
          <a href="#" style={{ color: '#000', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Pricing</a>
          <a href="#" style={{ color: '#000', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Resources <ChevronDown size={14} />
          </a>
        </div>
        
        {/* Right: Auth */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'flex-end' }}>
          <Link to="/login" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#4b5563'}>
            Staff Login
          </Link>
          <Link to="/login" style={{
            backgroundColor: '#cf1919',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            borderRadius: '6px',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
          onMouseLeave={e => e.currentTarget.style.opacity = 1}
          >
            Vendor Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '6rem 2rem 8rem 2rem', backgroundColor: '#fff', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          
          {/* Left Text */}
          <div style={{ flex: '1 1 500px' }}>
            <h1 style={{
              fontSize: '4.5rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: '#000'
            }}>
              Your Business.<br/>
              Your Website.<br/>
              Your Identity.
            </h1>
            <p style={{
              fontSize: '1.15rem',
              color: '#4b5563',
              marginBottom: '2.5rem',
              maxWidth: 480,
            }}>
              Create your professional business website in minutes. 
              Get your unique subdomain and start growing online.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              <Link to="/login" style={{
                backgroundColor: '#cf1919', color: '#fff',
                padding: '1rem 2rem', borderRadius: '6px',
                textDecoration: 'none', fontWeight: 600, fontSize: '1rem'
              }}>
                Vendor Login
              </Link>
              <Link to="/login" style={{
                backgroundColor: '#fff', color: '#000',
                border: '1px solid #000',
                padding: '1rem 2rem', borderRadius: '6px',
                textDecoration: 'none', fontWeight: 600, fontSize: '1rem'
              }}>
                Staff Login
              </Link>
              <a href="#" style={{
                backgroundColor: '#fff', color: '#000',
                border: '1px solid #e5e5e5',
                padding: '1rem 2rem', borderRadius: '6px',
                textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
                display: 'flex', alignItems: 'center', gap: '0.6rem'
              }}>
                <div style={{ width: 12, height: 12, backgroundColor: '#000', borderRadius: '50%' }}></div> Watch Demo
              </a>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', color: '#4b5563', fontSize: '0.9rem', fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#cf1919" /> No Credit Card
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#cf1919" /> Setup in Minutes
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#cf1919" /> Secure & Reliable
              </div>
            </div>
          </div>

          {/* Right Mockups */}
          <div style={{ flex: '1 1 500px', position: 'relative', height: 500 }}>
            {/* Desktop Mockup */}
            <div style={{
              position: 'absolute', top: 20, right: 40, width: '90%', height: 420,
              backgroundColor: '#fff', border: '2px solid #000', borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}>
              {/* Browser Bar */}
              <div style={{ backgroundColor: '#000', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#fff', opacity: 0.5 }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#fff', opacity: 0.5 }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#fff', opacity: 0.5 }} />
                </div>
                <div style={{ backgroundColor: '#222', borderRadius: '4px', padding: '0.2rem 1rem', color: '#888', fontSize: '0.7rem', flex: 1, textAlign: 'center' }}>
                  https://yourbusiness.daddybazaar.com
                </div>
              </div>
              {/* Browser Content */}
              <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                {/* Mock Nav */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>LOGO</div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', fontWeight: 600 }}>
                    <span>Home</span><span>About</span><span>Services</span><span>Products</span><span>Contact</span>
                  </div>
                </div>
                {/* Mock Hero */}
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>Welcome to</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>Your Business</div>
                    <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '1.5rem', maxWidth: 200 }}>
                      We provide the best products / services to grow your business.
                    </div>
                    <div style={{ backgroundColor: '#cf1919', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.7rem', borderRadius: '4px', display: 'inline-block' }}>
                      Explore Now
                    </div>
                  </div>
                  <div style={{ width: 180, height: 140, backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '40%', height: '40%', border: '2px solid #ccc', borderBottom: 0, borderRight: 0, transform: 'rotate(45deg) translate(20%, 20%)' }} />
                  </div>
                </div>
                {/* Mock Features */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '1rem', flex: 1, textAlign: 'center' }}>
                      <CheckCircle2 size={16} style={{ margin: '0 auto 0.5rem' }} color="#666" />
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.25rem' }}>{i===1?'Quality':i===2?'Trust':'Support'}</div>
                      <div style={{ fontSize: '0.5rem', color: '#888' }}>Premium quality products</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div style={{
              position: 'absolute', bottom: -20, right: 0, width: 220, height: 440,
              backgroundColor: '#fff', border: '6px solid #000', borderRadius: '24px',
              boxShadow: '-10px 20px 40px rgba(0,0,0,0.15)', overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}>
               {/* Mobile Nav */}
               <div style={{ padding: '1.5rem 1rem 1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e5e5' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>LOGO</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: 4 }}>
                    <div style={{ width: 16, height: 2, backgroundColor: '#000' }}/>
                    <div style={{ width: 16, height: 2, backgroundColor: '#000' }}/>
                    <div style={{ width: 16, height: 2, backgroundColor: '#000' }}/>
                  </div>
                </div>
                {/* Mobile Hero */}
                <div style={{ padding: '2rem 1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.25rem' }}>Welcome to</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.1 }}>Your Business</div>
                  <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '1.25rem' }}>
                    We provide the best products / services to grow your business.
                  </div>
                  <div style={{ backgroundColor: '#cf1919', color: '#fff', padding: '0.5rem', fontSize: '0.7rem', borderRadius: '4px', textAlign: 'center', marginBottom: '2rem' }}>
                    Explore Now
                  </div>
                  <div style={{ width: '100%', height: 120, backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '40%', height: '40%', border: '2px solid #ccc', borderBottom: 0, borderRight: 0, transform: 'rotate(45deg) translate(20%, 20%)' }} />
                  </div>
                </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: '#f9fafb', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '3rem' }}>Trusted by Thousands of Businesses</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Store size={32} color="#4b5563" style={{ marginBottom: '1rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>10,000+</div>
              <div style={{ color: '#4b5563', fontWeight: 500 }}>Businesses</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Globe size={32} color="#4b5563" style={{ marginBottom: '1rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>25,000+</div>
              <div style={{ color: '#4b5563', fontWeight: 500 }}>Websites Live</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Users size={32} color="#4b5563" style={{ marginBottom: '1rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>100,000+</div>
              <div style={{ color: '#4b5563', fontWeight: 500 }}>Customers</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Star size={32} color="#4b5563" style={{ marginBottom: '1rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>4.8/5</div>
              <div style={{ color: '#4b5563', fontWeight: 500 }}>Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '8rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', color: '#4b5563', marginBottom: '1rem', textTransform: 'uppercase' }}>Features</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Everything You Need to Succeed Online
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', marginBottom: '4rem' }}>
            Powerful features to build, manage and grow your business website.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            textAlign: 'left'
          }}>
            {[
              { icon: Globe, title: 'Unique Subdomain', desc: 'Get your unique subdomain like yourbusiness.daddybazaar.com and go live instantly.' },
              { icon: Layout, title: 'Beautiful Templates', desc: 'Choose from professionally designed templates and create your website in minutes.' },
              { icon: PenTool, title: 'Easy Customization', desc: 'Customize your website with easy tools. No coding knowledge required.' },
              { icon: ShoppingBag, title: 'Showcase Products', desc: 'Add and manage your products or services with images, price and details.' },
              { icon: Phone, title: 'Contact & Enquiries', desc: 'Let customers contact you via call, WhatsApp, or enquiry form easily.' },
              { icon: BarChart, title: 'Analytics Dashboard', desc: 'Track your website visitors, popular products and grow your business.' }
            ].map(f => (
              <div key={f.title} style={{
                border: '1px solid #e5e5e5', borderRadius: '8px', padding: '2rem',
                display: 'flex', gap: '1.5rem', alignItems: 'flex-start'
              }}>
                <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '50%' }}>
                  <f.icon size={24} color="#000" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '6rem 2rem 8rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', color: '#4b5563', marginBottom: '1rem', textTransform: 'uppercase' }}>Pricing</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', marginBottom: '4rem' }}>
            Start free and upgrade anytime. No hidden charges.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            textAlign: 'left',
            alignItems: 'flex-start'
          }}>
            {/* Free Plan */}
            <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Free Trial</h3>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>₹0</span>
                <span style={{ color: '#4b5563', fontSize: '0.9rem', marginLeft: '0.5rem' }}>14 Days</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {['Basic Subdomain', '5 Products', 'Basic Templates', 'Standard Support'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: '#4b5563' }}>
                    <Check size={18} color="#000" /> {f}
                  </div>
                ))}
              </div>
              <a href="mailto:support@daddybazaar.com" style={{ display: 'block', textAlign: 'center', border: '1px solid #000', color: '#000', padding: '0.8rem', borderRadius: '4px', fontWeight: 600, textDecoration: 'none' }}>
                Contact Sales
              </a>
            </div>

            {/* Business Plan */}
            <div style={{ border: '2px solid #000', borderRadius: '8px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <div style={{ backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '0.4rem', fontSize: '0.8rem', fontWeight: 700, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                Most Popular
              </div>
              <div style={{ padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Business</h3>
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>₹499</span>
                  <span style={{ color: '#4b5563', fontSize: '0.9rem', marginLeft: '0.5rem' }}>/month</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                  {['Custom Subdomain', 'Unlimited Products', 'Premium Templates', 'Analytics Dashboard', 'Priority Support'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: '#4b5563' }}>
                      <Check size={18} color="#000" /> {f}
                    </div>
                  ))}
                </div>
                <a href="mailto:support@daddybazaar.com" style={{ display: 'block', textAlign: 'center', backgroundColor: '#000', color: '#fff', padding: '0.8rem', borderRadius: '4px', fontWeight: 600, textDecoration: 'none' }}>
                  Contact Sales
                </a>
              </div>
            </div>

            {/* Pro Plan */}
            <div style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Pro</h3>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>₹999</span>
                <span style={{ color: '#4b5563', fontSize: '0.9rem', marginLeft: '0.5rem' }}>/month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {['Everything in Business', 'Custom Domain', 'Advanced Analytics', 'Priority Support'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: '#4b5563' }}>
                    <Check size={18} color="#000" /> {f}
                  </div>
                ))}
              </div>
              <a href="mailto:support@daddybazaar.com" style={{ display: 'block', textAlign: 'center', border: '1px solid #000', color: '#000', padding: '0.8rem', borderRadius: '4px', fontWeight: 600, textDecoration: 'none' }}>
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: '#f9fafb', padding: '4rem 2rem', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Rocket size={48} color="#000" strokeWidth={1.5} />
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Ready to Grow Your Business Online?</h2>
              <p style={{ color: '#4b5563' }}>Join thousands of businesses and create your professional website today.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/login" style={{ backgroundColor: '#fff', color: '#000', border: '1px solid #000', padding: '1rem 2.5rem', borderRadius: '6px', fontWeight: 600, textDecoration: 'none' }}>
              Staff Login
            </Link>
            <Link to="/login" style={{ backgroundColor: '#cf1919', color: '#fff', padding: '1rem 2.5rem', borderRadius: '6px', fontWeight: 600, textDecoration: 'none' }}>
              Vendor Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '5rem 2rem 2rem 2rem', marginTop: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem' }}>
            <div style={{ flex: '1 1 250px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 22, height: 22, backgroundColor: '#cf1919', borderRadius: 4 }}></div> <span>Daddy<span style={{color: '#cf1919'}}>Bazaar</span></span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', maxWidth: 280, lineHeight: 1.6 }}>
                Helping businesses build their online identity and grow digitally with ease.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem', color: '#fff' }}>Product</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Features</Link>
                  <Link to="/templates" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Templates</Link>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Pricing</Link>
                  <Link to="/login" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Dashboard</Link>
                </div>
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem', color: '#fff' }}>Company</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>About Us</Link>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Blog</Link>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Careers</Link>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Contact</Link>
                </div>
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem', color: '#fff' }}>Support</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Help Center</Link>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Terms of Service</Link>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Privacy Policy</Link>
                  <Link to="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Refund Policy</Link>
                </div>
              </div>
            </div>
            
            <div style={{ flex: '0 0 auto' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem', color: '#fff' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Facebook</a>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Instagram</a>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Twitter</a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              © {new Date().getFullYear()} DaddyBazaar. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
               <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Status</a>
               <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>Security</a>
            </div>
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
