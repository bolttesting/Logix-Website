import { useState, useEffect, useCallback } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import AdminImageUpload from '../../components/admin/AdminImageUpload';
import './Admin.css';

function emptyForm() {
  return { name: '', role: '', text: '', initials: '', photoUrl: '' };
}

function isImageAvatar(v) {
  return v && (String(v).startsWith('http') || String(v).startsWith('/'));
}

export default function TestimonialsAdmin() {
  const { testimonials, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(testimonials || []);
  }, [testimonials]);

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const openNew = useCallback(() => {
    setEditing(null);
    setForm(emptyForm());
    setEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setEditing(null);
    setForm(emptyForm());
  }, []);

  const handleSave = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      alert('Name and quote are required');
      return;
    }
    setSaving(true);
    try {
      const avatar =
        form.photoUrl.trim() || form.initials.trim() || getInitials(form.name);
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        text: form.text.trim(),
        avatar,
      };
      if (editing) {
        await adminApi.testimonials.update(editing.id, payload);
      } else {
        await adminApi.testimonials.add(payload);
      }
      await refresh();
      closeEditor();
    } catch (e) {
      alert(e.message || 'Save failed');
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
      alert(e.message || 'Delete failed');
    }
  };

  const startEdit = (item) => {
    const a = item.avatar || '';
    setEditing(item);
    setForm({
      name: item.name || '',
      role: item.role || '',
      text: item.text || '',
      photoUrl: isImageAvatar(a) ? a : '',
      initials: isImageAvatar(a) ? getInitials(item.name) : a || getInitials(item.name || ''),
    });
    setEditorOpen(true);
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Testimonials</h1>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          Add testimonial
        </button>
      </div>
      <div className="admin-card">
        {editorOpen && (
          <div className="admin-portfolio-editor" style={{ marginBottom: '2rem' }}>
            <h3>{editing ? 'Edit testimonial' : 'New testimonial'}</h3>
            <div className="admin-form__field">
              <label>Name *</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    name: e.target.value,
                    initials: f.initials || getInitials(e.target.value),
                  }))
                }
                placeholder="Client name"
              />
            </div>
            <div className="admin-form__field">
              <label>Role / Company</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CEO, TechStart" />
            </div>
            <div className="admin-form__field">
              <label>Quote *</label>
              <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} placeholder="Testimonial text" />
            </div>
            <AdminImageUpload
              label="Client photo (optional)"
              folder="testimonials"
              value={form.photoUrl}
              onChange={(url) => setForm({ ...form, photoUrl: url })}
            />
            <div className="admin-form__field">
              <label>Initials (if no photo)</label>
              <input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} placeholder="SJ" />
            </div>
            <div className="admin-form-actions">
              <button type="button" className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button type="button" className="admin-btn admin-btn--secondary" onClick={closeEditor}>
                Cancel
              </button>
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
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td style={{ maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.text}</td>
                  <td>
                    <button type="button" className="admin-btn admin-btn--secondary" style={{ marginRight: 8 }} onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button type="button" className="admin-btn admin-btn--danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
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
