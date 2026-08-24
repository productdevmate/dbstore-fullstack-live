import axiosClient from './axiosClient';

export const authApi = {
  changePassword: (data) => axiosClient.put('/auth/password', data),
};

export const businessApi = {
  get:            ()          => axiosClient.get('/business'),
  updateProfile:  (data)      => axiosClient.put('/business/profile', data),
  updateSettings: (data)      => axiosClient.put('/business/settings', data),
  checkSlug:      (slug)      => axiosClient.get(`/business/slug/check?slug=${slug}`),
  adminList:      ()          => axiosClient.get('/admin/businesses'),
};

export const categoryApi = {
  list:   ()         => axiosClient.get('/categories'),
  create: (data)     => axiosClient.post('/categories', data),
  update: (id, data) => axiosClient.put(`/categories/${id}`, data),
  delete: (id)       => axiosClient.delete(`/categories/${id}`),
  toggle: (id)       => axiosClient.put(`/categories/${id}/toggle`),
};

export const productApi = {
  list:            (params)   => axiosClient.get('/products', { params }),
  create:          (data)     => axiosClient.post('/products', data),
  update:          (id, data) => axiosClient.put(`/products/${id}`, data),
  delete:          (id)       => axiosClient.delete(`/products/${id}`),
  toggleFeatured:  (id)       => axiosClient.put(`/products/${id}/toggle-featured`),
  toggleAvailable: (id)       => axiosClient.put(`/products/${id}/toggle-available`),
};

export const websiteApi = {
  getSettings:  ()     => axiosClient.get('/website/settings'),
  saveSettings: (data) => axiosClient.put('/website/settings', data),
  publish:      ()     => axiosClient.post('/website/settings/publish'),
  unpublish:    ()     => axiosClient.post('/website/settings/unpublish'),
};

export const templateApi = {
  list:         ()     => axiosClient.get('/templates'),
};

export const dashboardApi = {
  getStats:     ()     => axiosClient.get('/dashboard/stats'),
};

export const subscriptionApi = {
  get:      ()     => axiosClient.get('/subscription'),
  upgrade:  (data) => axiosClient.post('/subscription/upgrade', data),
  getPlans: ()     => axiosClient.get('/plans'),
};

export const mediaApi = {
  upload: (formData) => axiosClient.post('/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  list:   (type)     => axiosClient.get(`/media?type=${type}`),
  delete: (id)       => axiosClient.delete(`/media/${id}`),
};

export const publicApi = {
  getBusiness:  () => axiosClient.get('/public/business'),
  getProducts:  () => axiosClient.get('/public/products'),
  getCategories:() => axiosClient.get('/public/categories'),
  trackEvent:   (data) => axiosClient.post('/public/analytics', data),
};
