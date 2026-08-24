import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Monitor, Check } from 'lucide-react';
import Template1 from '../../public-site/templates/Template1';
import Template2 from '../../public-site/templates/Template2';

export default function TemplatePreviewPage() {
  const { id } = useParams();
  
  const templateId = parseInt(id) || 1;
  const templateName = templateId === 1 ? 'Modern Retail' : 'Classic Services';

  const mockData = useMemo(() => {
    return {
      business: {
        name: templateId === 1 ? 'TOYS SHOP' : 'Sample Business',
        description: templateId === 1 
          ? 'Discover quality toys for every age at your trusted local toy shop. We bring joy, learning and creativity to every child.' 
          : 'This is a live preview of how your business website will look to your customers.',
        address: '123 Market Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '9876543210',
        whatsapp: '9876543210',
        businessCategory: templateId === 1 ? 'Toys & Games' : 'Services',
        themeColor: '#000000',
        templateId: templateId
      },
      categories: templateId === 1 ? [
        { id: 'c1', name: 'Soft Toys' },
        { id: 'c2', name: 'Remote Cars' },
        { id: 'c3', name: 'Educational Toys' },
        { id: 'c4', name: 'Dolls' },
        { id: 'c5', name: 'Action Toys' }
      ] : [
        { id: 'c1', name: 'Featured', description: 'Our top items' }
      ],
      products: templateId === 1 ? [
        { id: 'p1', name: 'Teddy Bear', description: 'Soft and cuddly teddy bear for kids.', price: 499, imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=300&q=80' },
        { id: 'p2', name: 'Remote Control Car', description: 'High speed RC car with rechargeable battery.', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=300&q=80' },
        { id: 'p3', name: 'Building Blocks', description: 'Colorful building blocks for creativity.', price: 599, imageUrl: 'https://images.unsplash.com/photo-1587654780288-6a271abc2e20?auto=format&fit=crop&w=300&q=80' },
        { id: 'p4', name: 'Doll', description: 'Beautiful doll for endless pretend play.', price: 699, imageUrl: 'https://images.unsplash.com/photo-1560961811-667dc009657b?auto=format&fit=crop&w=300&q=80' },
        { id: 'p5', name: 'Toy Kitchen Set', description: 'Complete kitchen play set for little chefs.', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=300&q=80' }
      ] : [
        { id: 'p1', name: 'Consultation Service', description: 'High quality product designed to impress.', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60' }
      ],
      featured: []
    };
  }, [templateId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Preview Control Bar */}
      <div style={{
        background: '#000',
        color: '#fff',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #333',
        zIndex: 9999
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/templates" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Gallery
          </Link>
          <div style={{ width: 1, height: 24, background: '#333' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#e5e5e5' }}>
            <Monitor size={16} /> Previewing: <strong style={{ color: '#fff' }}>{templateName}</strong>
          </div>
        </div>

        <Link to="/register" style={{
          background: '#fff',
          color: '#000',
          padding: '0.5rem 1.25rem',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Check size={16} /> Use This Template
        </Link>
      </div>

      {/* iframe-like container for the template rendering */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#e5e5e5' }}>
        <div style={{
          width: '100%',
          minHeight: '100%',
          background: '#fff',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Suppress pointer events inside the preview if you want it to be view-only, or allow it for full interactivity */}
          <div style={{ pointerEvents: 'auto' }}>
            {templateId === 1 ? (
              <Template1 data={mockData} />
            ) : (
              <Template2 data={mockData} />
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
