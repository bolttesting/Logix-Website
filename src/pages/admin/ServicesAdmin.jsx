import { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import { servicesMenu } from '../../data/servicesData';
import './Admin.css';

export default function ServicesAdmin() {
  const { services, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ id: '', title: '', path: '', items: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(services && Array.isArray(services) ? services : servicesMenu);
  }, [services]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { id: form.id, title: form.title, path: form.path || `/services/${form.id}`, items: form.items };
      await adminApi.services.upsert(payload);
      await refresh();
      setEditing(null);
      setForm({ id: '', title: '', path: '', items: [] });
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({
      id: item.id,
      title: item.title || '',
      path: item.path || `/services/${item.id}`,
      items: Array.isArray(item.items) ? item.items : [],
    });
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Services</h1>
      </div>
      <div className="admin-card">
        <h2>Service Menu</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '1rem' }}>Services shown in the dropdown and on service pages. Edit via the Edit button. Full page content editing coming soon.</p>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Path</th>
              <th>Items</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.path}</td>
                <td>{Array.isArray(item.items) ? item.items.length : 0} items</td>
                <td>
                  <button className="admin-btn admin-btn--secondary" onClick={() => startEdit(item)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editing && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <h3>Edit Service: {form.title}</h3>
            <p style={{ color: '#71717a', fontSize: '0.9rem' }}>Changing service structure requires JSON. For now, use the static data in servicesData.js. This section will be expanded.</p>
            <button className="admin-btn admin-btn--secondary" onClick={() => setEditing(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
