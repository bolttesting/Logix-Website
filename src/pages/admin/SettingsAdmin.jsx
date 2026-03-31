import { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { adminApi } from '../../lib/adminApi';
import './Admin.css';

export default function SettingsAdmin() {
  const { settings, refresh } = useSiteData();
  const [form, setForm] = useState({ email: '', phone: '', address: '', hours: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      email: settings?.email || 'info@logixcontact.co.uk',
      phone: settings?.phone || '+123-456-7890',
      address: settings?.address || '123 Street, City, Country',
      hours: settings?.hours || 'Mon - Fri: 9AM - 6PM',
    });
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.settings.update(form);
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
        <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
      </div>
      <div className="admin-card">
        <h2>Contact Information</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>These appear on the Contact page and in the footer.</p>
        <div className="admin-form__field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="info@logixcontact.co.uk" />
        </div>
        <div className="admin-form__field">
          <label>Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+123-456-7890" />
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
    </div>
  );
}
