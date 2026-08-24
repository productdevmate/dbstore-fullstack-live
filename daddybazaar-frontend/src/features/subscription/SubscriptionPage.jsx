import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { subscriptionApi } from '../../api/api';
import toast from 'react-hot-toast';
import { Crown, Check, Zap, Loader, Calendar, Star } from 'lucide-react';

export default function SubscriptionPage() {
  const [currentSub, setCurrentSub] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [subRes, plansRes] = await Promise.all([
        subscriptionApi.get(),
        subscriptionApi.getPlans()
      ]);
      setCurrentSub(subRes.data.data);
      setPlans(plansRes.data.data);
    } catch (err) {
      toast.error('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId) => {
    if (!window.confirm('Are you sure you want to upgrade to this plan?')) return;
    setUpgrading(true);
    try {
      await subscriptionApi.upgrade({ planId });
      toast.success('Successfully upgraded plan!');
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upgrade failed');
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
          <Loader size={40} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
          Loading your subscription...
        </div>
      </DashboardLayout>
    );
  }

  const isTrial = currentSub?.status === 'TRIAL';
  const renewalDate = new Date(currentSub?.endDate).toLocaleDateString();
  const trialEnd = new Date(currentSub?.trialEndDate).toLocaleDateString();

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        {/* Current Plan Banner */}
        <div className="card glass animate-fade-in" style={{
          marginBottom: '3rem',
          background: isTrial ? 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(99,102,241,0.05) 100%)' : 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(99,102,241,0.05) 100%)',
          border: `1px solid ${isTrial ? 'rgba(236,72,153,0.3)' : 'rgba(16,185,129,0.3)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {isTrial ? <Star size={24} color="#EC4899" /> : <Crown size={24} color="#10B981" />}
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{currentSub?.planName || 'Active Plan'}</h2>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>Status:</span> 
              <span style={{
                padding: '0.15rem 0.6rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700,
                background: isTrial ? 'rgba(236,72,153,0.15)' : 'rgba(16,185,129,0.15)',
                color: isTrial ? '#EC4899' : '#10B981'
              }}>{currentSub?.status}</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={14} /> {isTrial ? 'Trial Ends' : 'Next Billing'}
              </div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{isTrial ? trialEnd : renewalDate}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Billing Cycle</div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', textTransform: 'capitalize' }}>{currentSub?.billingCycle?.toLowerCase()}</div>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Upgrade your Business</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: 500, margin: '0 auto' }}>
            Choose a plan that scales with your growth. Switch at any time.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {plans.map(plan => {
            const isCurrent = currentSub?.planId === plan.id;
            
            return (
              <div key={plan.id} className="card glass animate-fade-in" style={{
                position: 'relative',
                display: 'flex', flexDirection: 'column',
                border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                transform: isCurrent ? 'scale(1.02)' : 'none',
                boxShadow: isCurrent ? '0 10px 30px rgba(99,102,241,0.15)' : 'none',
                padding: '2rem'
              }}>
                {isCurrent && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--color-primary)', color: 'white', padding: '0.25rem 1rem',
                    borderRadius: 99, fontSize: '0.75rem', fontWeight: 700
                  }}>CURRENT PLAN</div>
                )}
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{plan.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', minHeight: 40, marginBottom: '1.5rem' }}>
                  {plan.description}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>${plan.priceMonthly}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>/mo</span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <Check size={16} color="#10B981" /> Up to {plan.maxProducts} Products
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <Check size={16} color="#10B981" /> Up to {plan.maxImages} Images
                  </div>
                  {plan.hasAnalytics && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                      <Check size={16} color="#10B981" /> Dashboard Analytics
                    </div>
                  )}
                  {plan.hasCustomDomain && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                      <Check size={16} color="#10B981" /> Custom Domain Support
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isCurrent || upgrading}
                  className={`btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}`} 
                  style={{ width: '100%', padding: '1rem' }}
                >
                  {isCurrent ? 'Current Plan' : (
                    <>Upgrade to {plan.name} <Zap size={16} /></>
                  )}
                </button>
              </div>
            )
          })}
        </div>

      </div>
    </DashboardLayout>
  );
}
