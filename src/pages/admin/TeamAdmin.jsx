import { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import './Admin.css';

export default function TeamAdmin() {
  const { team, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', avatar: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(team || []);
  }, [team]);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { name: form.name, role: form.role, avatar: form.avatar || getInitials(form.name) };
      if (editing) {
        await adminApi.team.update(editing.id, payload);
      } else {
        await adminApi.team.add(payload);
      }
      await refresh();
      setEditing(null);
      setForm({ name: '', role: '', avatar: '' });
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this team member?')) return;
    try {
      await adminApi.team.delete(id);
      await refresh();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name || '', role: item.role || '', avatar: item.avatar || getInitials(item.name) });
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Team</h1>
        <button className="admin-btn admin-btn--primary" onClick={() => { setEditing(null); setForm({ name: '', role: '', avatar: '' }); }}>
          Add Member
        </button>
      </div>
      <div className="admin-card">
        {(editing || (!editing && form.name)) && (
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3>{editing ? 'Edit' : 'New'} Team Member</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form__field">
                <label>Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, avatar: form.avatar || getInitials(e.target.value) })} placeholder="Full name" />
              </div>
              <div className="admin-form__field">
                <label>Role</label>
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CEO &amp; Founder" />
              </div>
              <div className="admin-form__field">
                <label>Avatar initials</label>
                <input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="Auto from name" />
              </div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving || !form.name}>{saving ? 'Saving...' : 'Save'}</button>
              <button className="admin-btn admin-btn--secondary" onClick={() => { setEditing(null); setForm({ name: '', role: '', avatar: '' }); }}>Cancel</button>
            </div>
          </div>
        )}
        <h2>Members ({items.length})</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(238,119,35,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{item.avatar}</div>
                </td>
                <td>{item.name}</td>
                <td>{item.role}</td>
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
