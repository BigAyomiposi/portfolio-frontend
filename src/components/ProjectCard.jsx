import { Link } from 'react-router-dom';
import { uploadUrl } from '../api/client';

export default function ProjectCard({ project }) {
  const cover = project.images?.find((i) => i.is_cover) || project.images?.[0];
  return (
    <article className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Link to={`/projects/${project.slug}`} aria-label={`View project: ${project.title}`}>
        {cover ? (
          <img
            src={uploadUrl(cover.filename)}
            alt={cover.alt_text || `${project.title} screenshot`}
            style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderBottom: '1px solid var(--line)' }}
            loading="lazy"
          />
        ) : (
          <div style={{ width: '100%', aspectRatio: '16/10', background: '#efeee9', borderBottom: '1px solid var(--line)' }} />
        )}
      </Link>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {project.category?.name && <span className="eyebrow">{project.category.name}</span>}
        <h3 style={{ margin: 0 }}>
          <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
            {project.title}
          </Link>
        </h3>
        {project.short_description && <p style={{ margin: 0 }}>{project.short_description}</p>}
        {project.technologies?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 8 }}>
            {project.technologies.slice(0, 5).map((t) => (
              <span key={t.id} className="badge">{t.name}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
