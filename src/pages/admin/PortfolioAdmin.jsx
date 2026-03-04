import { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import './Admin.css';

export default function PortfolioAdmin() {
  const { portfolio, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', type: 'Web App', category: 'web', tech: '', description: '', image: '', gradient: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(portfolio || []);
  }, [portfolio]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { name: form.name, type: form.type, category: form.category, tech: form.tech, description: form.description, image: form.image || `/portfolio/${items.length + 1}.jpg`, gradient: form.gradient };
      if (editing) {
        await adminApi.portfolio.update(editing.id, payload);
      } else {
        await adminApi.portfolio.add(payload);
      }
      await refresh();
      setEditing(null);
      setForm({ name: '', type: 'Web App', category: 'web', tech: '', description: '', image: '', gradient: '' });
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await adminApi.portfolio.delete(id);
      await refresh();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, type: item.type || 'Web App', category: item.category || 'web', tech: item.tech || '', description: item.description || '', image: item.image || '', gradient: item.gradient || '' });
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Portfolio</h1>
        <button className="admin-btn admin-btn--primary" onClick={() => { setEditing(null); setForm({ name: '', type: 'Web App', category: 'web', tech: '', description: '', image: '', gradient: '' }); }}>
          Add Project
        </button>
      </div>
      <div className="admin-card">
        {(editing || (!editing && form.name)) && (
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3>{editing ? 'Edit' : 'New'} Project</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form__field">
                <label>Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Project name" />
              </div>
              <div className="admin-form__field">
                <label>Type</label>
                <input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Web App, Mobile App, etc." />
              </div>
              <div className="admin-form__field">
                <label>Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ padding: '0.75rem', background: '#0f0f14', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff' }}>
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
              <div className="admin-form__field">
                <label>Tech Stack</label>
                <input value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} placeholder="React • Node • PostgreSQL" />
              </div>
              <div className="admin-form__field" style={{ gridColumn: '1 / -1' }}>
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
              </div>
              <div className="admin-form__field">
                <label>Image URL</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/portfolio/1.jpg" />
              </div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving || !form.name}>{saving ? 'Saving...' : 'Save'}</button>
              <button className="admin-btn admin-btn--secondary" onClick={() => { setEditing(null); setForm({ name: '', type: 'Web App', category: 'web', tech: '', description: '', image: '', gradient: '' }); }}>Cancel</button>
            </div>
          </div>
        )}
        <h2>Projects ({items.length})</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Category</th>
                <th>Tech</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.category}</td>
                  <td>{item.tech}</td>
                  <td>
                    <button className="admin-btn admin-btn--secondary" style={{ marginRight: 8 }} onClick={() => startEdit(item)}>Edit</button>
                    <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
