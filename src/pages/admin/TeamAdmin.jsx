import { useState, useEffect, useCallback } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import AdminImageUpload from '../../components/admin/AdminImageUpload';
import './Admin.css';

function emptyForm() {
  return {
    name: '',
    role: '',
    avatar: '',
    photo_url: '',
    bio: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    youtube_url: '',
    show_on_home: false,
    home_sort_order: 0,
  };
}

function isPhotoUrl(s) {
  return s && (String(s).startsWith('http') || String(s).startsWith('/'));
}

export default function TeamAdmin() {
  const { team, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(team || []);
  }, [team]);

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
    if (!form.name.trim()) {
      alert('Name is required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        avatar: form.avatar.trim() || getInitials(form.name),
        photo_url: form.photo_url.trim() || null,
        bio: form.bio.trim() || null,
        github_url: form.github_url.trim() || null,
        linkedin_url: form.linkedin_url.trim() || null,
        twitter_url: form.twitter_url.trim() || null,
        youtube_url: form.youtube_url.trim() || null,
        show_on_home: !!form.show_on_home,
        home_sort_order: Number(form.home_sort_order) || 0,
      };
      if (editing) {
        await adminApi.team.update(editing.id, payload);
      } else {
        await adminApi.team.add(payload);
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
    if (!confirm('Delete this team member?')) return;
    try {
      await adminApi.team.delete(id);
      await refresh();
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name || '',
      role: item.role || '',
      avatar: item.avatar || getInitials(item.name),
      photo_url: item.photo_url || item.image || '',
      bio: item.bio || '',
      github_url: item.github_url || '',
      linkedin_url: item.linkedin_url || '',
      twitter_url: item.twitter_url || '',
      youtube_url: item.youtube_url || '',
      show_on_home: !!item.show_on_home,
      home_sort_order: item.home_sort_order ?? item.sort_order ?? 0,
    });
    setEditorOpen(true);
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Team</h1>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          Add member
        </button>
      </div>
      <div className="admin-card">
        {editorOpen && (
          <div className="admin-portfolio-editor" style={{ marginBottom: '2rem' }}>
            <h3>{editing ? 'Edit member' : 'New member'}</h3>
            <div className="admin-form-grid">
              <div className="admin-form__field">
                <label>Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value, avatar: form.avatar || getInitials(e.target.value) })}
                  placeholder="Full name"
                />
              </div>
              <div className="admin-form__field">
                <label>Role</label>
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CEO & Founder" />
              </div>
              <div className="admin-form__field">
                <label>Initials (fallback if no photo)</label>
                <input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} placeholder="AB" />
              </div>
            </div>
            <div className="admin-form__field">
              <AdminImageUpload label="Photo" folder="team" value={form.photo_url} onChange={(url) => setForm({ ...form, photo_url: url })} />
            </div>
            <div className="admin-form__field">
              <label>Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} placeholder="Short bio" />
            </div>
            <h4 style={{ margin: '1.25rem 0 0.5rem', fontSize: '0.95rem' }}>Social links (About page)</h4>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', opacity: 0.75 }}>
              Used for the team carousel icons. Leave blank to hide each icon.
            </p>
            <div className="admin-form-grid">
              <div className="admin-form__field">
                <label>GitHub URL</label>
                <input
                  type="url"
                  value={form.github_url}
                  onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                  placeholder="https://github.com/…"
                />
              </div>
              <div className="admin-form__field">
                <label>LinkedIn URL</label>
                <input
                  type="url"
                  value={form.linkedin_url}
                  onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/…"
                />
              </div>
              <div className="admin-form__field">
                <label>X / Twitter URL</label>
                <input
                  type="url"
                  value={form.twitter_url}
                  onChange={(e) => setForm({ ...form, twitter_url: e.target.value })}
                  placeholder="https://x.com/…"
                />
              </div>
              <div className="admin-form__field">
                <label>YouTube URL</label>
                <input
                  type="url"
                  value={form.youtube_url}
                  onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                  placeholder="https://youtube.com/…"
                />
              </div>
            </div>
            <h4 style={{ margin: '1.25rem 0 0.5rem', fontSize: '0.95rem' }}>Home page hero</h4>
            <div className="admin-form__field" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                id="team-show-on-home"
                type="checkbox"
                checked={!!form.show_on_home}
                onChange={(e) => setForm({ ...form, show_on_home: e.target.checked })}
              />
              <label htmlFor="team-show-on-home" style={{ margin: 0 }}>
                Show this member in the hero avatar strip (bottom of home)
              </label>
            </div>
            <div className="admin-form__field">
              <label>Hero display order</label>
              <input
                type="number"
                min={0}
                value={form.home_sort_order}
                onChange={(e) => setForm({ ...form, home_sort_order: e.target.value === '' ? 0 : Number(e.target.value) })}
                style={{ maxWidth: 120 }}
              />
              <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', opacity: 0.75 }}>Lower numbers appear first.</span>
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
        <h2>Members ({items.length})</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Role</th>
              <th>Hero</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const src = item.photo_url || (isPhotoUrl(item.avatar) ? item.avatar : null);
              return (
                <tr key={item.id}>
                  <td>
                    {src ? (
                      <img src={src} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: 'rgba(238,119,35,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                        }}
                      >
                        {item.avatar}
                      </div>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>{item.show_on_home ? 'Yes' : '—'}</td>
                  <td>
                    <button type="button" className="admin-btn admin-btn--secondary" style={{ marginRight: 8 }} onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button type="button" className="admin-btn admin-btn--danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
