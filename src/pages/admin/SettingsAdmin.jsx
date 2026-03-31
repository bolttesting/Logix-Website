import { useState, useEffect, useCallback } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import {
  SOCIAL_ICON_OPTIONS,
  socialLinksForForm,
  normalizeSocialLinkForSave,
  genSocialLinkId,
} from '../../utils/footerSocialLinks';
import './Admin.css';

export default function SettingsAdmin() {
  const { settings, refresh } = useSiteData();
  const [form, setForm] = useState({
    email: '',
    phone: '',
    address: '',
    hours: '',
    whatsapp: '',
    social_links: [],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      email: settings?.email || 'info@logixcontact.co.uk',
      phone: settings?.phone || '+123-456-7890',
      address: settings?.address || '123 Street, City, Country',
      hours: settings?.hours || 'Mon - Fri: 9AM - 6PM',
      whatsapp: settings?.whatsapp ?? '',
      social_links: socialLinksForForm(settings?.social_links),
    });
  }, [settings]);

  const updateSocialLink = useCallback((index, field, value) => {
    setForm((f) => ({
      ...f,
      social_links: f.social_links.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    }));
  }, []);

  const addSocialLink = useCallback(() => {
    setForm((f) => ({
      ...f,
      social_links: [
        ...f.social_links,
        { id: genSocialLinkId(), name: 'New link', url: '', icon: 'globe' },
      ],
    }));
  }, []);

  const removeSocialLink = useCallback((index) => {
    setForm((f) => ({
      ...f,
      social_links: f.social_links.filter((_, i) => i !== index),
    }));
  }, []);

  const moveSocialLink = useCallback((index, delta) => {
    setForm((f) => {
      const next = [...f.social_links];
      const j = index + delta;
      if (j < 0 || j >= next.length) return f;
      [next[index], next[j]] = [next[j], next[index]];
      return { ...f, social_links: next };
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const social_links = form.social_links
        .map(normalizeSocialLinkForSave)
        .filter((s) => s.url && String(s.url).trim());
      await adminApi.settings.update({
        email: form.email,
        phone: form.phone,
        address: form.address,
        hours: form.hours,
        whatsapp: form.whatsapp,
        social_links,
      });
      await refresh();
    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Site Settings</h1>
        <button type="button" className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
      <div className="admin-card">
        <h2>Contact Information</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>
          These appear on the Contact page and in the footer. WhatsApp controls the floating chat button on the public site.
        </p>
        <div className="admin-form__field">
          <label>Email addresses</label>
          <p style={{ color: '#71717a', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>
            One per line. All lines show on the Contact page and in the footer.
          </p>
          <textarea
            rows={4}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={'info@logixcontact.co.uk\nhello@logixcontact.co.uk'}
            style={{ fontFamily: 'inherit', minHeight: 88 }}
          />
        </div>
        <div className="admin-form__field">
          <label>Phone numbers</label>
          <p style={{ color: '#71717a', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>
            One per line (include country code where useful). Each line becomes a clickable call link.
          </p>
          <textarea
            rows={4}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder={'+44 20 1234 5678\n+971 4 123 4567'}
            style={{ fontFamily: 'inherit', minHeight: 88 }}
          />
        </div>
        <div className="admin-form__field">
          <label>WhatsApp number (floating button)</label>
          <p style={{ color: '#71717a', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>
            Country code + number, digits only (spaces ok). Example: <code style={{ color: '#a1a1aa' }}>447911123456</code> or{' '}
            <code style={{ color: '#a1a1aa' }}>971501234567</code>. Leave empty to hide the button.
          </p>
          <input
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            placeholder="447911123456"
            autoComplete="tel"
          />
        </div>
        <div className="admin-form__field">
          <label>Address</label>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="123 Street, City, Country" />
        </div>
        <div className="admin-form__field">
          <label>Business Hours</label>
          <input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} placeholder="Mon - Fri: 9AM - 6PM" />
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Footer &amp; contact social links</h2>
          <button type="button" className="admin-btn admin-btn--secondary" onClick={addSocialLink}>
            Add link
          </button>
        </div>
        <p style={{ color: '#a1a1aa', marginBottom: '1.25rem' }}>
          Shown in the footer bar and on the Contact page. Use full URLs (https://…). Rows without a URL are skipped when you save. Clear all and save to hide every icon.
        </p>
        {form.social_links.length === 0 ? (
          <p style={{ color: '#71717a' }}>No links yet. Click &quot;Add link&quot; or save defaults from a fresh database.</p>
        ) : (
          <ul className="admin-social-list">
            {form.social_links.map((row, index) => (
              <li key={row.id} className="admin-social-row">
                <div className="admin-social-row__grid">
                  <div className="admin-form__field" style={{ marginBottom: 0 }}>
                    <label>Label (screen reader &amp; tooltip)</label>
                    <input
                      value={row.name}
                      onChange={(e) => updateSocialLink(index, 'name', e.target.value)}
                      placeholder="LinkedIn"
                    />
                  </div>
                  <div className="admin-form__field" style={{ marginBottom: 0 }}>
                    <label>URL</label>
                    <input
                      value={row.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                      placeholder="https://linkedin.com/company/…"
                    />
                  </div>
                  <div className="admin-form__field" style={{ marginBottom: 0 }}>
                    <label>Icon</label>
                    <select value={row.icon} onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}>
                      {SOCIAL_ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="admin-social-row__actions">
                  <button type="button" className="admin-btn admin-btn--secondary" disabled={index === 0} onClick={() => moveSocialLink(index, -1)}>
                    Up
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--secondary"
                    disabled={index === form.social_links.length - 1}
                    onClick={() => moveSocialLink(index, 1)}
                  >
                    Down
                  </button>
                  <button type="button" className="admin-btn admin-btn--danger" onClick={() => removeSocialLink(index)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
