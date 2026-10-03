import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { api, uploadUrl } from '../api/client';
import ProjectCard from '../components/ProjectCard';
import Seo from '../components/Seo';

export default function Home() {
  const { settings } = useOutletContext();
  const [featured, setFeatured] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/projects?featured=true').then((rows) => setFeatured(rows.slice(0, 3))).catch(() => {});
    api.get('/services').then(setServices).catch(() => {});
  }, []);

  const hasProfile = settings?.name || settings?.title;

  return (
    <>
      <Seo
        title={settings?.name ? `${settings.name} — ${settings.title || 'Software Developer'}` : 'Portfolio'}
        description={settings?.value_proposition || settings?.bio || ''}
      />

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 48, alignItems: 'center' }}>
          <div>
            {hasProfile ? (
              <>
                <p className="eyebrow">{settings.title}</p>
                <h1>{settings.name}</h1>
                {settings.value_proposition && <p style={{ fontSize: '1.15rem', maxWidth: 560 }}>{settings.value_proposition}</p>}
              </>
            ) : (
              <>
                <p className="eyebrow">Setup needed</p>
                <h1>Add your name and title in the admin settings</h1>
                <p style={{ maxWidth: 560 }}>
                  This hero section pulls directly from your profile settings. Log in to the admin
                  dashboard and fill in your name, title and value proposition to replace this notice.
                </p>
              </>
            )}
            <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
              <Link to="/projects" className="btn">View my work</Link>
              <Link to="/contact" className="btn btn-secondary">Let's work together</Link>
            </div>
          </div>
          {settings?.profile_image && (
  <img
    src={uploadUrl(settings.profile_image)}
    alt={settings?.name ? `Portrait of ${settings.name}` : 'Profile photo'}
    style={{
      width: '100%',
      aspectRatio: '4/5',
      objectFit: 'cover',
      borderRadius: '28px',
      border: '1px solid var(--border)',
      boxShadow: '0 12px 30px rgba(24, 24, 27, 0.12)',
      animation: 'imageShadow 3s ease-in-out infinite',
    }}
  />
)}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section section-tight" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
              <h2>Selected work</h2>
              <Link to="/projects" className="muted">View all projects &rarr;</Link>
            </div>
            <div className="grid grid-3">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section className="section section-tight" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <h2>What I do</h2>
            <div className="grid grid-3" style={{ marginTop: 24 }}>
              {services.map((s) => (
                <div key={s.id}>
                  <h3>{s.title}</h3>
                  {s.description && <p>{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
