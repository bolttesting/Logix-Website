import { useState, useEffect, useCallback } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import AdminImageUpload from '../../components/admin/AdminImageUpload';
import { getBlogPostPath } from '../../utils/blogPaths';
import './Admin.css';

function defaultDate() {
  return new Date().toISOString().slice(0, 10);
}

function emptyForm() {
  return {
    title: '',
    excerpt: '',
    category: 'Web Development',
    content: '',
    date: defaultDate(),
    image: '',
    published: true,
    slug: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    og_image: '',
    author_name: '',
    author_image: '',
  };
}

function slugifyTitle(title) {
  if (!title || typeof title !== 'string') return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);
}

export default function BlogAdmin() {
  const { blogPosts, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(blogPosts || []);
  }, [blogPosts]);

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
    if (!form.title.trim()) {
      alert('Title is required');
      return;
    }
    const slugNormalized = form.slug.trim() ? slugifyTitle(form.slug) : '';
    if (slugNormalized && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugNormalized)) {
      alert('URL slug: use only letters, numbers, and hyphens (use “From title” to generate one).');
      return;
    }

    setSaving(true);
    const now = new Date().toISOString();
    try {
      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        category: form.category.trim(),
        content: form.content.trim() || form.excerpt.trim(),
        date: form.date,
        published: form.published,
        image: form.image.trim() || null,
        slug: slugNormalized || null,
        seo_title: form.seo_title.trim() || null,
        seo_description: form.seo_description.trim() || null,
        seo_keywords: form.seo_keywords.trim() || null,
        og_image: form.og_image.trim() || null,
        author_name: form.author_name.trim() || null,
        author_image: form.author_image.trim() || null,
        updated_at: now,
      };
      if (editing) {
        await adminApi.blog.update(editing.id, payload);
      } else {
        await adminApi.blog.add(payload);
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
    if (!confirm('Delete this post?')) return;
    try {
      await adminApi.blog.delete(id);
      await refresh();
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  const startEdit = (item) => {
    setEditing(item);
    const d = item.date ? String(item.date).slice(0, 10) : defaultDate();
    setForm({
      title: item.title || '',
      excerpt: item.excerpt || '',
      category: item.category || 'Web Development',
      content: item.content || item.excerpt || '',
      date: d,
      image: item.image || '',
      published: item.published !== false,
      slug: item.slug || '',
      seo_title: item.seo_title || '',
      seo_description: item.seo_description || '',
      seo_keywords: item.seo_keywords || '',
      og_image: item.og_image || '',
      author_name: item.author_name || '',
      author_image: item.author_image || item.authorImage || '',
    });
    setEditorOpen(true);
  };

  const metaTitleLen = (form.seo_title || form.title).length;
  const descLen = (form.seo_description || form.excerpt).length;

  return (
    <div>
      <div className="admin-header">
        <h1>Blog</h1>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          Add post
        </button>
      </div>
      <div className="admin-card">
        {editorOpen && (
          <div className="admin-portfolio-editor" style={{ marginBottom: '2rem' }}>
            <h3>{editing ? 'Edit post' : 'New post'}</h3>

            <h4 className="admin-section-title">Content</h4>
            <div className="admin-form__field">
              <label>Title * (on-page H1)</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" />
            </div>
            <div className="admin-form__field">
              <label>Excerpt</label>
              <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="Short description (listing & fallback for meta)" />
            </div>
            <div className="admin-form-grid">
              <div className="admin-form__field">
                <label>Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <div className="admin-form__field">
                <label>Published date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div className="admin-form__field">
              <label className="admin-checkbox">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Published (visible on site)
              </label>
            </div>
            <div className="admin-form__field">
              <label>URL slug (optional)</label>
              <div className="admin-slug-row">
                <span className="admin-slug-prefix">/blog/</span>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase() })}
                  placeholder="my-post-url"
                  className="admin-slug-input"
                />
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary admin-btn--sm"
                  onClick={() => setForm((f) => ({ ...f, slug: slugifyTitle(f.title) }))}
                >
                  From title
                </button>
              </div>
              <p className="admin-field-hint">Lowercase, hyphens only. Leave empty to use the post ID in links. Must be unique.</p>
            </div>
            <div className="admin-form__field">
              <AdminImageUpload label="Cover image" folder="blog" value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            </div>
            <div className="admin-form__field">
              <label>Body</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} placeholder="Paragraphs separated by blank lines" />
            </div>

            <h4 className="admin-section-title">SEO & social</h4>
            <p className="admin-field-hint admin-field-hint--block">
              These fields feed meta tags, Open Graph, Twitter cards, and JSON-LD for this post. Empty SEO fields fall back to title / excerpt / category.
            </p>
            <div className="admin-form__field">
              <label>Meta title (browser tab &amp; search)</label>
              <input
                value={form.seo_title}
                onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                placeholder="Shorter title for Google (optional)"
              />
              <span className="admin-char-count">{metaTitleLen} / ~60 characters suggested</span>
            </div>
            <div className="admin-form__field">
              <label>Meta description</label>
              <textarea
                value={form.seo_description}
                onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                rows={3}
                placeholder="Search snippet (optional — else excerpt is used)"
              />
              <span className="admin-char-count">{descLen} / ~155 characters suggested</span>
            </div>
            <div className="admin-form__field">
              <label>Keywords</label>
              <input
                value={form.seo_keywords}
                onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
                placeholder="e.g. React, UK, web performance, Core Web Vitals"
              />
              <span className="admin-field-hint">Comma-separated. Used in meta keywords and site search.</span>
            </div>
            <div className="admin-form__field">
              <label>Author name (structured data)</label>
              <input
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                placeholder="Shown in article schema &amp; og:article:author"
              />
            </div>
            <div className="admin-form__field">
              <AdminImageUpload
                label="Author image (optional)"
                folder="blog-authors"
                value={form.author_image}
                onChange={(url) => setForm({ ...form, author_image: url })}
              />
              <span className="admin-field-hint">Shown next to the author name on the single blog post page.</span>
            </div>
            <div className="admin-form__field">
              <AdminImageUpload
                label="Social share image (optional)"
                folder="blog-og"
                value={form.og_image}
                onChange={(url) => setForm({ ...form, og_image: url })}
              />
              <span className="admin-field-hint">Overrides cover image for Open Graph / Twitter when set (1200×630 recommended).</span>
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
        <h2>Posts ({items.length})</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <code className="admin-code-sm">{getBlogPostPath(item)}</code>
                </td>
                <td>{item.category}</td>
                <td>{item.date || '-'}</td>
                <td>{item.published === false ? 'Draft' : 'Live'}</td>
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
  );
}
