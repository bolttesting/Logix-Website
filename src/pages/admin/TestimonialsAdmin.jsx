import { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import './Admin.css';

export default function TestimonialsAdmin() {
  const { testimonials, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', text: '', avatar: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(testimonials || []);
  }, [testimonials]);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { name: form.name, role: form.role, text: form.text, avatar: form.avatar || getInitials(form.name) };
      if (editing) {
        await adminApi.testimonials.update(editing.id, payload);
      } else {
        await adminApi.testimonials.add(payload);
      }
      await refresh();
      setEditing(null);
      setForm({ name: '', role: '', text: '', avatar: '' });
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await adminApi.testimonials.delete(id);
      await refresh();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name || '', role: item.role || '', text: item.text || '', avatar: item.avatar || getInitials(item.name) });
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Testimonials</h1>
        <button className="admin-btn admin-btn--primary" onClick={() => { setEditing(null); setForm({ name: '', role: '', text: '', avatar: '' }); }}>
          Add Testimonial
        </button>
      </div>
      <div className="admin-card">
        {(editing || (!editing && form.name)) && (
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3>{editing ? 'Edit' : 'New'} Testimonial</h3>
            <div className="admin-form__field">
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, avatar: form.avatar || getInitials(e.target.value) })} placeholder="Client name" />
            </div>
            <div className="admin-form__field">
              <label>Role / Company</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CEO, TechStart" />
            </div>
            <div className="admin-form__field">
              <label>Quote</label>
              <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} placeholder="Testimonial text" />
            </div>
            <div className="admin-form__field">
              <label>Avatar initials</label>
              <input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="SJ" />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving || !form.name || !form.text}>{saving ? 'Saving...' : 'Save'}</button>
              <button className="admin-btn admin-btn--secondary" onClick={() => { setEditing(null); setForm({ name: '', role: '', text: '', avatar: '' }); }}>Cancel</button>
            </div>
          </div>
        )}
        <h2>Testimonials ({items.length})</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Quote</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td style={{ maxWidth: 300 }}>{item.text?.slice(0, 80)}...</td>
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
