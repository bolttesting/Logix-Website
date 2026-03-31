import Seo from '../../components/Seo';
import './PolicyPages.css';

export default function PolicyLayout({ title, description, children }) {
  return (
    <main className="policy-page">
      <Seo title={title} description={description} />
      <div className="policy-page__inner">
        <h1 className="policy-page__title">{title}</h1>
        <p className="policy-page__meta">Last updated: 30 March 2026 · United Kingdom</p>
        <div className="policy-page__body">{children}</div>
      </div>
    </main>
  );
}
