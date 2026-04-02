import { useEffect, useMemo, useState } from 'react';
import { adminApi } from '../../lib/adminApi';
import './Admin.css';

function formatDate(d) {
  if (!d) return '-';
  const dt = new Date(d);
  return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
}

function toCsv(rows) {
  const header = ['email', 'created_at'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [header.join(',')];
  rows.forEach((r) => lines.push([esc(r.email), esc(r.created_at)].join(',')));
  return lines.join('\n');
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function NewsletterAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await adminApi.newsletter.list();
      if (error) throw error;
      setItems(data || []);
    } catch (e) {
      alert('Error: ' + (e?.message || String(e)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const uniqueCount = useMemo(() => new Set(items.map((x) => (x.email || '').toLowerCase())).size, [items]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this subscriber?')) return;
    try {
      await adminApi.newsletter.delete(id);
      await load();
    } catch (e) {
      alert('Error: ' + (e?.message || String(e)));
    }
  };

  const handleExport = () => {
    downloadText(`newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(items));
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Newsletter Subscribers</h1>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="admin-btn admin-btn--secondary" onClick={load} disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button className="admin-btn admin-btn--primary" onClick={handleExport} disabled={items.length === 0}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h2>Subscribers ({items.length})</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '1rem' }}>
          Unique emails: {uniqueCount}. Signup source: “Join Our Daily Newsletter”.
        </p>

        {items.length === 0 ? (
          <div className="admin-empty">{loading ? 'Loading…' : 'No subscribers yet.'}</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{formatDate(item.created_at)}</td>
                  <td>
                    <a href={`mailto:${item.email}`} style={{ color: '#14b8a6' }}>
                      {item.email}
                    </a>
                  </td>
                  <td>
                    <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

