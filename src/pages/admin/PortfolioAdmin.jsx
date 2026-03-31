import { useState, useEffect, useCallback } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import AdminImageUpload from '../../components/admin/AdminImageUpload';
import './Admin.css';

function defaultForm() {
  return {
    name: '',
    type: 'Web App',
    category: 'web',
    tech: '',
    description: '',
    image: '',
    gradient: '',
    sort_order: 0,
    year: '',
    client: '',
    duration: '',
    overview: '',
    liveUrl: '',
    caseStudyUrl: '',
    challenge: '',
    solution: '',
    techStackText: '',
    features: [{ title: '', desc: '' }],
    results: [{ value: '', label: '' }],
    gallery: [],
    testimonialQuote: '',
    testimonialAuthor: '',
  };
}

function detailsToForm(d) {
  if (!d || typeof d !== 'object') return {};
  const features =
    Array.isArray(d.features) && d.features.length
      ? d.features.map((f) => ({ title: f.title || '', desc: f.desc || '' }))
      : [{ title: '', desc: '' }];
  const results =
    Array.isArray(d.results) && d.results.length
      ? d.results.map((r) => ({ value: r.value || '', label: r.label || '' }))
      : [{ value: '', label: '' }];
  return {
    year: d.year || '',
    client: d.client || '',
    duration: d.duration || '',
    overview: d.overview || '',
    liveUrl: d.liveUrl || '',
    caseStudyUrl: d.caseStudyUrl || '',
    challenge: d.challenge || '',
    solution: d.solution || '',
    techStackText: Array.isArray(d.techStack) ? d.techStack.join('\n') : '',
    features,
    results,
    gallery: Array.isArray(d.gallery) ? [...d.gallery] : [],
    testimonialQuote: d.testimonial?.quote || '',
    testimonialAuthor: d.testimonial?.author || '',
  };
}

function buildDetailsJson(form) {
  const testimonial =
    form.testimonialQuote.trim()
      ? {
          quote: form.testimonialQuote.trim(),
          author: form.testimonialAuthor.trim() || 'Client',
        }
      : undefined;
  const features = form.features
    .filter((f) => (f.title && f.title.trim()) || (f.desc && f.desc.trim()))
    .map((f) => ({ title: (f.title || '').trim(), desc: (f.desc || '').trim() }));
  const results = form.results
    .filter((r) => (r.value && r.value.trim()) || (r.label && r.label.trim()))
    .map((r) => ({ value: (r.value || '').trim(), label: (r.label || '').trim() }));
  const techStack = form.techStackText
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const gallery = form.gallery.filter((u) => u && String(u).trim());

  const d = {
    overview: form.overview.trim() || undefined,
    year: form.year.trim() || undefined,
    client: form.client.trim() || undefined,
    duration: form.duration.trim() || undefined,
    liveUrl: form.liveUrl.trim() || undefined,
    caseStudyUrl: form.caseStudyUrl.trim() || undefined,
    challenge: form.challenge.trim() || undefined,
    solution: form.solution.trim() || undefined,
    features: features.length ? features : undefined,
    techStack: techStack.length ? techStack : undefined,
    results: results.length ? results : undefined,
    gallery: gallery.length ? gallery : undefined,
    testimonial,
  };
  Object.keys(d).forEach((k) => {
    if (d[k] === undefined) delete d[k];
  });
  return d;
}

export default function PortfolioAdmin() {
  const { portfolio, refresh } = useSiteData();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(portfolio || []);
  }, [portfolio]);

  const openNew = useCallback(() => {
    setEditing(null);
    setForm({
      ...defaultForm(),
      sort_order: (portfolio || []).length,
    });
    setEditorOpen(true);
  }, [portfolio]);

  const startEdit = useCallback((item) => {
    const d = item.details && typeof item.details === 'object' ? item.details : {};
    setEditing(item);
    setForm({
      ...defaultForm(),
      name: item.name || '',
      type: item.type || 'Web App',
      category: item.category || 'web',
      tech: item.tech || '',
      description: item.description || '',
      image: item.image || '',
      gradient: item.gradient || '',
      sort_order: item.sort_order ?? 0,
      ...detailsToForm(d),
    });
    setEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setEditing(null);
    setForm(defaultForm());
  }, []);

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert('Project name is required');
      return;
    }
    setSaving(true);
    try {
      const details = buildDetailsJson(form);
      const payload = {
        name: form.name.trim(),
        type: form.type.trim() || 'Web App',
        category: form.category,
        tech: form.tech.trim(),
        description: form.description.trim(),
        image: form.image.trim() || null,
        gradient: form.gradient.trim() || null,
        sort_order: Number(form.sort_order) || 0,
        details,
      };
      if (editing) {
        await adminApi.portfolio.update(editing.id, payload);
      } else {
        await adminApi.portfolio.add(payload);
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
    if (!confirm('Delete this project?')) return;
    try {
      await adminApi.portfolio.delete(id);
      await refresh();
    } catch (e) {
      alert(e.message || 'Delete failed');
    }
  };

  const setFeature = (i, field, val) => {
    const next = [...form.features];
    next[i] = { ...next[i], [field]: val };
    setForm({ ...form, features: next });
  };

  const addFeature = () => setForm({ ...form, features: [...form.features, { title: '', desc: '' }] });
  const removeFeature = (i) =>
    setForm({
      ...form,
      features: form.features.length > 1 ? form.features.filter((_, j) => j !== i) : [{ title: '', desc: '' }],
    });

  const setResult = (i, field, val) => {
    const next = [...form.results];
    next[i] = { ...next[i], [field]: val };
    setForm({ ...form, results: next });
  };
  const addResult = () => setForm({ ...form, results: [...form.results, { value: '', label: '' }] });
  const removeResult = (i) =>
    setForm({
      ...form,
      results: form.results.length > 1 ? form.results.filter((_, j) => j !== i) : [{ value: '', label: '' }],
    });

  const appendGallery = (url) => {
    if (!url) return;
    setForm((f) => ({ ...f, gallery: [...f.gallery, url] }));
  };
  const removeGallery = (i) =>
    setForm((f) => ({ ...f, gallery: f.gallery.filter((_, j) => j !== i) }));

  return (
    <div>
      <div className="admin-header">
        <h1>Portfolio</h1>
        <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
          Add project
        </button>
      </div>

      <div className="admin-card">
        {editorOpen && (
          <div className="admin-portfolio-editor">
            <div className="admin-portfolio-editor__head">
              <h3>{editing ? 'Edit project' : 'New project'}</h3>
            </div>

            <h4 className="admin-section-title">Basics</h4>
            <div className="admin-form-grid">
              <div className="admin-form__field">
                <label>Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Project name"
                />
              </div>
              <div className="admin-form__field">
                <label>Type</label>
                <input
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  placeholder="Web App, Mobile App…"
                />
              </div>
              <div className="admin-form__field">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="admin-select"
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
              <div className="admin-form__field">
                <label>Sort order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                />
              </div>
              <div className="admin-form__field admin-form-grid__full">
                <label>Tech line (hero)</label>
                <input
                  value={form.tech}
                  onChange={(e) => setForm({ ...form, tech: e.target.value })}
                  placeholder="React • Node • PostgreSQL"
                />
              </div>
              <div className="admin-form__field admin-form-grid__full">
                <label>Short description (listing + fallback)</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="admin-form__field admin-form-grid__full">
                <label>Card gradient (CSS)</label>
                <input
                  value={form.gradient}
                  onChange={(e) => setForm({ ...form, gradient: e.target.value })}
                  placeholder="linear-gradient(135deg, …)"
                />
              </div>
              <div className="admin-form__field admin-form-grid__full">
                <AdminImageUpload
                  label="Hero image (upload or URL)"
                  folder="portfolio"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>
            </div>

            <h4 className="admin-section-title">Case study (project page)</h4>
            <div className="admin-form-grid">
              <div className="admin-form__field">
                <label>Year</label>
                <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2025" />
              </div>
              <div className="admin-form__field">
                <label>Client</label>
                <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
              </div>
              <div className="admin-form__field">
                <label>Duration</label>
                <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="12 weeks" />
              </div>
              <div className="admin-form__field admin-form-grid__full">
                <label>Overview (long intro)</label>
                <textarea
                  value={form.overview}
                  onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  rows={4}
                  placeholder="Full overview shown on the project page"
                />
              </div>
              <div className="admin-form__field">
                <label>Live project URL</label>
                <input
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  placeholder="https://"
                />
              </div>
              <div className="admin-form__field">
                <label>Case study URL</label>
                <input
                  value={form.caseStudyUrl}
                  onChange={(e) => setForm({ ...form, caseStudyUrl: e.target.value })}
                  placeholder="https://"
                />
              </div>
              <div className="admin-form__field admin-form-grid__full">
                <label>The challenge</label>
                <textarea value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} rows={3} />
              </div>
              <div className="admin-form__field admin-form-grid__full">
                <label>Our solution</label>
                <textarea value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} rows={3} />
              </div>
            </div>

            <h4 className="admin-section-title">Key features</h4>
            {form.features.map((f, i) => (
              <div key={i} className="admin-repeat-row">
                <input
                  placeholder="Title"
                  value={f.title}
                  onChange={(e) => setFeature(i, 'title', e.target.value)}
                />
                <input
                  placeholder="Description"
                  value={f.desc}
                  onChange={(e) => setFeature(i, 'desc', e.target.value)}
                />
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => removeFeature(i)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="admin-btn admin-btn--secondary admin-btn--sm" onClick={addFeature}>
              + Add feature
            </button>

            <h4 className="admin-section-title">Technologies (one per line or comma-separated)</h4>
            <div className="admin-form__field">
              <textarea
                value={form.techStackText}
                onChange={(e) => setForm({ ...form, techStackText: e.target.value })}
                rows={4}
                placeholder="React&#10;Node.js&#10;PostgreSQL"
              />
            </div>

            <h4 className="admin-section-title">Results</h4>
            {form.results.map((r, i) => (
              <div key={i} className="admin-repeat-row">
                <input placeholder="Value (e.g. 40%)" value={r.value} onChange={(e) => setResult(i, 'value', e.target.value)} />
                <input placeholder="Label" value={r.label} onChange={(e) => setResult(i, 'label', e.target.value)} />
                <button type="button" className="admin-btn admin-btn--secondary" onClick={() => removeResult(i)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="admin-btn admin-btn--secondary admin-btn--sm" onClick={addResult}>
              + Add result
            </button>

            <h4 className="admin-section-title">Gallery</h4>
            <AdminImageUpload
              label="Upload image to gallery"
              folder="portfolio-gallery"
              value=""
              showUrlField={false}
              onChange={appendGallery}
            />
            <ul className="admin-gallery-list">
              {form.gallery.map((url, i) => (
                <li key={`${i}-${url}`}>
                  <img src={url} alt="" />
                  <span className="admin-gallery-list__url">{url.length > 64 ? `${url.slice(0, 64)}…` : url}</span>
                  <button type="button" className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeGallery(i)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <h4 className="admin-section-title">Testimonial</h4>
            <div className="admin-form-grid">
              <div className="admin-form__field admin-form-grid__full">
                <label>Quote</label>
                <textarea
                  value={form.testimonialQuote}
                  onChange={(e) => setForm({ ...form, testimonialQuote: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="admin-form__field admin-form-grid__full">
                <label>Author</label>
                <input
                  value={form.testimonialAuthor}
                  onChange={(e) => setForm({ ...form, testimonialAuthor: e.target.value })}
                  placeholder="Name, Role"
                />
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="button" className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save project'}
              </button>
              <button type="button" className="admin-btn admin-btn--secondary" onClick={closeEditor}>
                Cancel
              </button>
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
                <th />
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
