import { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import './Admin.css';

export default function BlogAdmin() {
  const { blogPosts, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const defaultDate = () => new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ title: '', excerpt: '', category: 'Web Development', content: '', date: defaultDate() });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(blogPosts || []);
  }, [blogPosts]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { title: form.title, excerpt: form.excerpt, category: form.category, content: form.content || form.excerpt, date: form.date, published: true };
      if (editing) {
        await adminApi.blog.update(editing.id, payload);
      } else {
        await adminApi.blog.add(payload);
      }
      await refresh();
      setEditing(null);
      setForm({ title: '', excerpt: '', category: 'Web Development', content: '', date: defaultDate() });
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await adminApi.blog.delete(id);
      await refresh();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    const d = item.date ? (String(item.date).slice(0, 10)) : defaultDate();
    setForm({
      title: item.title || '',
      excerpt: item.excerpt || '',
      category: item.category || 'Web Development',
      content: item.content || item.excerpt || '',
      date: d,
    });
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Blog</h1>
        <button className="admin-btn admin-btn--primary" onClick={() => { setEditing(null); setForm({ title: '', excerpt: '', category: 'Web Development', content: '', date: defaultDate() }); }}>
          Add Post
        </button>
      </div>
      <div className="admin-card">
        {(editing || (!editing && form.title)) && (
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3>{editing ? 'Edit' : 'New'} Post</h3>
            <div className="admin-form__field">
              <label>Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" />
            </div>
            <div className="admin-form__field">
              <label>Excerpt</label>
              <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="Short description" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form__field">
                <label>Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Web Development" />
              </div>
              <div className="admin-form__field">
                <label>Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div className="admin-form__field">
              <label>Content (optional)</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} placeholder="Full post content" />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving || !form.title}>{saving ? 'Saving...' : 'Save'}</button>
              <button className="admin-btn admin-btn--secondary" onClick={() => { setEditing(null); setForm({ title: '', excerpt: '', category: 'Web Development', content: '', date: defaultDate() }); }}>Cancel</button>
            </div>
          </div>
        )}
        <h2>Posts ({items.length})</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.date || '-'}</td>
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
  );
}
