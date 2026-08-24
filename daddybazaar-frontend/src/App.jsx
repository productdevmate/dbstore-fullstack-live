import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicSiteRouter } from './public-site/PublicSiteRouter';

// Pages
import LandingPage  from './features/landing/LandingPage';
import TemplatesPage from './features/landing/TemplatesPage';
import TemplatePreviewPage from './features/landing/TemplatePreviewPage';
import LoginPage    from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import DashboardPage from './features/dashboard/DashboardPage';
import BusinessPage  from './features/business/BusinessPage';
import CategoriesPage from './features/categories/CategoriesPage';
import ProductsPage  from './features/products/ProductsPage';
import WebsitePage   from './features/website/WebsitePage';
import SubscriptionPage from './features/subscription/SubscriptionPage';
import SuperAdminDashboard from './features/admin/SuperAdminDashboard';
import RegisterVendorPage from './features/admin/RegisterVendorPage';
import VendorListPage from './features/admin/VendorListPage';
import ProductManagerDashboard from './features/admin/ProductManagerDashboard';
import ProductAdminDashboard from './features/admin/ProductAdminDashboard';
import ProductAssociateDashboard from './features/admin/ProductAssociateDashboard';
import HelpDeskPage from './features/helpdesk/HelpDeskPage';
import SettingsPage from './features/settings/SettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const APP_DOMAIN = import.meta.env.VITE_APP_DOMAIN || 'daddybazaar.com';

function isPublicSiteHost() {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return false;
  if (hostname === APP_DOMAIN || hostname === `www.${APP_DOMAIN}`) return false;
  return hostname.endsWith(`.${APP_DOMAIN}`);
}

export default function App() {
  // If this request is for a vendor subdomain, render the public site
  if (isPublicSiteHost()) {
    return (
      <>
        <Toaster position="top-right" />
        <PublicSiteRouter />
      </>
    );
  }

  // Otherwise render the vendor console (SPA)
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1E293B',
              color: '#F1F5F9',
              border: '1px solid #334155',
            },
          }}
        />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/preview/:id" element={<TemplatePreviewPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/super-admin" element={
            <ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>
          } />
          <Route path="/vendors" element={
            <ProtectedRoute><VendorListPage /></ProtectedRoute>
          } />
          <Route path="/register-vendor" element={
            <ProtectedRoute><RegisterVendorPage /></ProtectedRoute>
          } />
          <Route path="/product-manager" element={
            <ProtectedRoute><ProductManagerDashboard /></ProtectedRoute>
          } />
          <Route path="/product-admin" element={
            <ProtectedRoute><ProductAdminDashboard /></ProtectedRoute>
          } />
          <Route path="/product-associate" element={
            <ProtectedRoute><ProductAssociateDashboard /></ProtectedRoute>
          } />
          <Route path="/business" element={
            <ProtectedRoute><BusinessPage /></ProtectedRoute>
          } />
          <Route path="/categories" element={
            <ProtectedRoute><CategoriesPage /></ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute><ProductsPage /></ProtectedRoute>
          } />
          <Route path="/website/*" element={
            <ProtectedRoute><WebsitePage /></ProtectedRoute>
          } />
          <Route path="/subscription" element={
            <ProtectedRoute><SubscriptionPage /></ProtectedRoute>
          } />
          <Route path="/help-desk" element={
            <ProtectedRoute><HelpDeskPage /></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute><SettingsPage /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
