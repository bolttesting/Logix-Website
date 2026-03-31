import { Component } from 'react';

/** Surfaces render errors instead of a blank screen (helps debug admin / env issues). */
export default class RootErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: '2rem',
            background: '#0f0f14',
            color: '#e4e4e7',
            fontFamily: 'system-ui, sans-serif',
            maxWidth: 720,
          }}
        >
          <h1 style={{ color: '#f87171', marginBottom: '1rem', fontSize: '1.25rem' }}>App error</h1>
          <p style={{ marginBottom: '1rem', color: '#a1a1aa' }}>
            Open the browser console for full details. Common causes: invalid <code style={{ color: '#fff' }}>VITE_SUPABASE_*</code> in{' '}
            <code style={{ color: '#fff' }}>.env</code> (remove extra quotes, use a full https URL).
          </p>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: 13,
              background: '#14141c',
              padding: '1rem',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {error?.message || String(error)}
            {error?.stack ? `\n\n${error.stack}` : ''}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
