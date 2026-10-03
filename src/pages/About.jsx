import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../api/client';
import Seo from '../components/Seo';

export default function About() {
  const { settings } = useOutletContext();
  const [technologies, setTechnologies] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    api.get('/technologies').then(setTechnologies).catch(() => {});
    api.get('/experience').then(setExperience).catch(() => {});
  }, []);

  const grouped = technologies.reduce((acc, t) => {
    const key = t.category || 'Technologies';
    acc[key] = acc[key] || [];
    acc[key].push(t);
    return acc;
  }, {});

  return (
    <div className="container section">
      <Seo title="About" description={settings?.bio || ''} />
      <p className="eyebrow">About</p>
      <h1>{settings?.name || 'About me'}</h1>
      {settings?.bio ? (
        <p style={{ fontSize: '1.1rem', maxWidth: 680 }}>{settings.bio}</p>
      ) : (
        <p className="muted">Add a professional summary from the admin settings page.</p>
      )}

      {Object.keys(grouped).length > 0 && (
        <section style={{ marginTop: 56 }}>
          <h2>Technologies</h2>
          <div className="grid grid-3" style={{ marginTop: 20 }}>
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 style={{ fontSize: '1rem' }}>{category}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {items.map((t) => <span key={t.id} className="badge">{t.name}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginTop: 56 }}>
          <h2>Experience</h2>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 28 }}>
            {experience.map((e) => (
              <div key={e.id} style={{ borderLeft: '2px solid var(--line)', paddingLeft: 20 }}>
                <p className="muted" style={{ margin: 0 }}>{e.start_date}{e.end_date ? ` — ${e.end_date}` : ' — Present'}</p>
                <h3 style={{ margin: '4px 0' }}>{e.role} · {e.organization}</h3>
                {e.description && <p>{e.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
