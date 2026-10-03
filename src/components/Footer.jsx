import { Link } from 'react-router-dom';

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 80 }}>
      <div className="container" style={{ padding: '40px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20 }}>
        <div className="muted">
          &copy; {year} {settings?.name || ''}. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {settings?.github_url && (
            <a href={settings.github_url} target="_blank" rel="noreferrer noopener" className="muted">
              GitHub
            </a>
          )}
          {settings?.linkedin_url && (
            <a href={settings.linkedin_url} target="_blank" rel="noreferrer noopener" className="muted">
              LinkedIn
            </a>
          )}
          <Link to="/privacy" className="muted">Privacy</Link>
          <Link to="/terms" className="muted">Terms</Link>
          <Link to="/cookies" className="muted">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
