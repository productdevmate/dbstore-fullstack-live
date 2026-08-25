import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Tag, Package, Globe,
  CreditCard, Settings, LogOut, Menu, X, ChevronRight,
  Zap, UserPlus, Users, Headphones, UserCog
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';

const getNavItems = (role) => {
  if (role === 'SUPER_ADMIN') {
    return [
      { to: '/super-admin', icon: LayoutDashboard, label: 'Super Admin Home' },
      { to: '/vendors', icon: Users, label: 'Vendors List' },
      { to: '/register-vendor', icon: UserPlus, label: 'Register Vendor' },
      { to: '/staff', icon: UserCog, label: 'Staff' },
      { to: '/settings', icon: Settings, label: 'Platform Settings' },
    ];
  }
  if (role === 'PRODUCT_MANAGER') {
    return [
      { to: '/product-manager', icon: LayoutDashboard, label: 'PM Home' },
      { to: '/categories', icon: Tag, label: 'Global Categories' },
    ];
  }
  if (role === 'PRODUCT') {
    return [
      { to: '/product-admin', icon: LayoutDashboard, label: 'Product Admin Home' },
      { to: '/products', icon: Package, label: 'Manage Products' },
    ];
  }
  if (role === 'PRODUCT_ASSOCIATE') {
    return [
      { to: '/product-associate', icon: LayoutDashboard, label: 'Associate Home' },
      { to: '/vendors', icon: Users, label: 'Vendors List' },
      { to: '/register-vendor', icon: UserPlus, label: 'Register Vendor' },
    ];
  }
  return [
    { to: '/dashboard',    icon: LayoutDashboard, label: 'Dashboard'    },
    { to: '/business',     icon: Building2,        label: 'Business Profile' },
    { to: '/categories',   icon: Tag,              label: 'Categories'   },
    { to: '/products',     icon: Package,          label: 'Products'     },
    { to: '/website',      icon: Globe,            label: 'Website'      },
    { to: '/subscription', icon: CreditCard,       label: 'Subscription' },
    { to: '/help-desk',    icon: Headphones,       label: 'Help Desk'    },
    { to: '/settings',     icon: Settings,         label: 'Settings'     },
  ];
};

export function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const websiteUrl = user?.slug
    ? `https://${user.slug}.${import.meta.env.VITE_APP_DOMAIN || 'daddybazaar.com'}`
    : null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 40, display: 'none'
          }}
          className="lg:hidden"
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img src={logoImg} alt="DaddyBazaar Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#000' }}>
                Daddy<span style={{ color: 'var(--color-primary)' }}>Bazaar</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Vendor Console</div>
            </div>
          </div>
        </div>

        {/* Business quick-info */}
        {user?.businessName && (
          <div style={{
            margin: '0.75rem',
            padding: '0.875rem',
            borderRadius: 'var(--radius)',
            background: '#F9FAFB',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>Your Business</div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4, color: '#000' }}>{user.businessName}</div>
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.72rem', color: '#000', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none'
                }}
              >
                <Globe size={11} /> {user.slug}.daddybazaar.com
              </a>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0.5rem 0' }}>
          {getNavItems(user?.role).map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />
              <span style={{ flex: 1 }}>{label}</span>
              <ChevronRight size={14} style={{ opacity: 0.5 }} className="nav-chevron" />
            </NavLink>
          ))}
        </nav>

        {/* Bottom: user info + logout */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', backgroundColor: '#FAFAFA' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem', borderRadius: 'var(--radius)',
            background: 'var(--color-surface-2)', marginBottom: '0.75rem',
            border: '1px solid var(--color-border)', cursor: 'pointer'
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', fontWeight: 700, color: 'white', flexShrink: 0
            }}>
              {user?.ownerName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.ownerName}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email}
              </div>
            </div>
            <ChevronRight size={16} style={{ color: 'var(--color-text-muted)', transform: 'rotate(90deg)' }} />
          </div>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.5rem 0.75rem', color: '#000', fontWeight: 700 }}>
            <LogOut size={18} style={{ marginRight: '0.5rem', transform: 'rotate(180deg)' }} /> Logout
          </button>
        </div>
      </aside>

      {/* ===== Main ===== */}
      <div className="main-content" style={{ flex: 1 }}>
        {/* Top bar for mobile */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface-2)',
          position: 'sticky', top: 0, zIndex: 30
        }}>
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="btn btn-ghost btn-sm"
            style={{ display: 'none' }}
            id="sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={logoImg} alt="Logo" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            <div style={{ fontWeight: 900, color: '#000', fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
              Daddy<span style={{ color: 'var(--color-primary)' }}>Bazaar</span>
            </div>
          </div>
        </header>

        <main className="page-enter" style={{ padding: '2rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
