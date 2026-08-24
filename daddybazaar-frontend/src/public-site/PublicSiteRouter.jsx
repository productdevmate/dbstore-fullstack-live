import { useEffect, useState } from 'react';
import { publicApi } from '../api/api';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';

const TEMPLATE_MAP = {
  TEMPLATE_1: Template1,
  TEMPLATE_2: Template2,
  TEMPLATE_3: Template3,
};

/**
 * Public site router — loaded when window.location.hostname is a vendor subdomain.
 * Calls /api/v1/public/business (tenant resolved server-side from Host header).
 * Renders the correct template dynamically.
 */
export function PublicSiteRouter() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    publicApi.getBusiness()
      .then(res => setData(res.data.data))
      .catch(err => {
        if (err.response?.status === 404 || err.response?.status === 403) {
          setError('not_found');
        } else {
          setError('error');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Track page view
  useEffect(() => {
    if (data?.business?.id) {
      publicApi.trackEvent({ eventType: 'PAGE_VIEW' }).catch(() => {});
    }
  }, [data]);

  if (loading) return <PublicSiteLoader />;

  if (error === 'not_found') return <NotFound />;
  if (error) return <SiteError />;

  const templateCode = data?.template?.code || 'TEMPLATE_1';
  const TemplateComponent = TEMPLATE_MAP[templateCode] || Template1;

  return <TemplateComponent data={data} />;
}

function PublicSiteLoader() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0F172A', color: '#94A3B8',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          border: '3px solid #334155', borderTopColor: '#6366F1',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem',
        }} />
        <p style={{ fontSize: '0.9rem' }}>Loading business website…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#0F172A', color: '#F1F5F9', textAlign: 'center', padding: '2rem',
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏪</div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Business Not Found</h1>
      <p style={{ color: '#94A3B8', maxWidth: 400 }}>
        This business website isn't available yet. It may not be published or the URL might be incorrect.
      </p>
      <a href="https://daddybazaar.com" style={{ marginTop: '1.5rem', color: '#6366F1' }}>
        ← Back to DaddyBazaar
      </a>
    </div>
  );
}

function SiteError() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#0F172A', color: '#F1F5F9', textAlign: 'center', padding: '2rem',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Something went wrong</h1>
      <p style={{ color: '#94A3B8' }}>Unable to load this business website. Please try again later.</p>
      <button onClick={() => window.location.reload()} style={{
        marginTop: '1.5rem', padding: '0.625rem 1.5rem',
        background: '#6366F1', color: 'white', border: 'none',
        borderRadius: 8, cursor: 'pointer', fontWeight: 600,
      }}>
        Retry
      </button>
    </div>
  );
}
