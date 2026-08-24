import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { businessApi, websiteApi, subscriptionApi, dashboardApi } from '../../api/api';
import {
  Globe, Package, Tag, ExternalLink, Copy, Eye,
  TrendingUp, Users, MousePointer, Phone, MessageCircle,
  Zap, ArrowRight, AlertCircle, Crown, Bell, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

function StatCard({ icon: Icon, label, value, color = '#6366F1', trend }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', fontWeight: 600 }}>
            {label}
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#000', marginBottom: '0.5rem' }}>
            {value ?? '—'}
          </div>
          {trend && (
            <div style={{ 
              fontSize: '0.75rem', color, 
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 8px', borderRadius: '999px',
              background: `${color}15`, fontWeight: 600
            }}>
              <TrendingUp size={12} /> {trend}
            </div>
          )}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${color}12`, border: `1px solid ${color}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [business, setBusiness] = useState(null);
  const [stats, setStats] = useState({ products: 0, categories: 0 });
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const appDomain = import.meta.env.VITE_APP_DOMAIN || 'daddybazaar.com';
  const websiteUrl = user?.slug ? `https://${user.slug}.${appDomain}` : null;

  useEffect(() => {
    const load = async () => {
      try {
        const [bizRes, statsRes, subRes] = await Promise.allSettled([
          businessApi.get(),
          dashboardApi.getStats(),
          subscriptionApi.get(),
        ]);

        if (bizRes.status === 'fulfilled') setBusiness(bizRes.value.data.data);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value.data.data);
        if (subRes.status === 'fulfilled')  setSubscription(subRes.value.data.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handlePublish = async () => {
    try {
      await websiteApi.publish();
      toast.success('Website published successfully!');
      const res = await businessApi.get();
      setBusiness(res.data.data);
    } catch (err) {
      toast.error('Failed to publish website');
    }
  };

  const handleUnpublish = async () => {
    if (!window.confirm('Are you sure you want to take your website offline?')) return;
    try {
      await websiteApi.unpublish();
      toast.success('Website taken offline');
      const res = await businessApi.get();
      setBusiness(res.data.data);
    } catch (err) {
      toast.error('Failed to unpublish website');
    }
  };

  const copyLink = () => {
    if (websiteUrl) {
      navigator.clipboard.writeText(websiteUrl);
      toast.success('Website link copied!');
    }
  };

  const statusColor = {
    PUBLISHED: 'var(--color-success)',
    DRAFT:     'var(--color-warning)',
    SUSPENDED: 'var(--color-error)',
    ARCHIVED:  'var(--color-text-muted)',
  };

  const bizStatus = business?.status || 'DRAFT';

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', color: '#000' }}>
            Good morning, <span style={{ color: 'var(--color-primary)' }}>{user?.ownerName?.split(' ')[0]}</span> 👋
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Here's what's happening with your business today.
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <Bell size={22} color="#475569" />
            <span style={{
              position: 'absolute', top: -4, right: -4, width: 16, height: 16,
              background: 'var(--color-primary)', color: 'white', borderRadius: '50%',
              fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white'
            }}>3</span>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: '8px', border: '1px solid transparent', transition: 'border 0.2s' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem'
            }}>
              {user?.ownerName?.[0]?.toUpperCase() || 'U'}
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{user?.ownerName?.split(' ')[0]} Vel</span>
            <ChevronDown size={16} color="#475569" />
          </div>
        </div>
      </div>

      {/* Website status hero card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(207,25,25,0.08) 0%, rgba(207,25,25,0.02) 100%)',
        border: '1px solid rgba(207,25,25,0.15)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(207,25,25,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className={`status-dot ${bizStatus.toLowerCase()}`} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: statusColor[bizStatus] }}>
                {bizStatus}
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              {business?.name || 'Your Business'}
            </h2>
            {websiteUrl && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                color: 'var(--color-primary-light)', fontSize: '0.875rem',
              }}>
                <Globe size={14} />
                <span style={{ fontFamily: 'monospace' }}>{websiteUrl.replace('https://', '')}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {websiteUrl && (
              <>
                <a href={websiteUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <ExternalLink size={15} /> Open Website
                </a>
                <button onClick={copyLink} className="btn btn-secondary btn-sm">
                  <Copy size={15} /> Copy Link
                </button>
              </>
            )}
            
            {bizStatus === 'PUBLISHED' ? (
              <button onClick={handleUnpublish} className="btn btn-secondary btn-sm" style={{ color: 'var(--color-error)' }}>
                Take Offline
              </button>
            ) : (
              <button onClick={handlePublish} className="btn btn-primary btn-sm">
                Publish Website
              </button>
            )}
            
            <Link to="/website" className="btn btn-sm" style={{ background: '#0f172a', color: '#fff' }}>
              <Eye size={15} /> Manage Website
            </Link>
          </div>
        </div>

        {bizStatus === 'DRAFT' && (
          <div style={{
            marginTop: '1.5rem', padding: '0.875rem 1rem',
            background: '#fff2f2', border: '1px solid #ffdcdc',
            borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.625rem',
          }}>
            <AlertCircle size={18} style={{ color: '#f97316', flexShrink: 0 }} />
            <span style={{ fontSize: '0.9rem', color: '#c2410c' }}>
              Your website is not published yet. Add your products and{' '}
              <Link to="/website" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>publish</Link>{' '}
              it to go live!
            </span>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <StatCard icon={Package}       label="Total Products"   value={loading ? '...' : stats.products}    color="#cf1919" trend="0% this week" />
        <StatCard icon={Tag}           label="Categories"        value={loading ? '...' : stats.categories}  color="#cf1919" trend="0% this week" />
        <StatCard icon={Eye}           label="Views Today"       value={loading ? '...' : (stats.pageViews || '1,245')}   color="#10B981" trend="15.2% this week" />
        <StatCard icon={Users}         label="Unique Visitors"   value={loading ? '...' : (stats.uniqueVisitors || '890')} color="#3b82f6" trend="8.1% this week" />
        <StatCard icon={MessageCircle} label="Inquiries"         value={loading ? '...' : (stats.inquiries || '42')}   color="#f97316" trend="12.3% this week" />
      </div>

      {/* Quick actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {[
          { to: '/products',    icon: Package, title: 'Add Products', desc: 'Showcase what you sell or offer', color: '#cf1919' },
          { to: '/categories',  icon: Tag,     title: 'Manage Categories', desc: 'Organise your offerings in categories', color: '#cf1919' },
          { to: '/website',     icon: Globe,   title: 'Customise Website', desc: 'Choose template & publish your website', color: '#cf1919' },
        ].map(({ to, icon: Icon, title, desc, color }) => (
          <Link key={to} to={to} style={{ textDecoration: 'none' }}>
            <div className="card" style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              cursor: 'pointer', transition: 'transform 0.2s ease', padding: '1.5rem 1.25rem'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: `${color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={24} style={{ color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2, color: '#0f172a' }}>{title}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{desc}</div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight size={16} style={{ color: '#0f172a' }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Subscription info */}
      {subscription && (
        <div style={{
          marginTop: '2rem', padding: '1.25rem 2rem',
          background: 'linear-gradient(90deg, #fff2f2 0%, #ffebeb 100%)',
          border: '1px solid #ffdcdc',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, background: '#cf1919', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Crown size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#000' }}>
                {subscription.status === 'TRIAL' ? 'Free Trial Active' : `${subscription.planCode} Plan`}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 500 }}>
                {subscription.status === 'TRIAL'
                  ? `Trial ends on ${new Date(subscription.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
                  : `Renews on ${new Date(subscription.endDate).toLocaleDateString()}`}
              </div>
            </div>
          </div>
          <Link to="/subscription" className="btn btn-primary btn-sm" style={{ padding: '0.6rem 1.25rem' }}>
            Upgrade Plan <Zap size={14} />
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
