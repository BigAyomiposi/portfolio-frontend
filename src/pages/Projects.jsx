import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import ProjectCard from '../components/ProjectCard';
import Seo from '../components/Seo';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get('category') || '';

  useEffect(() => {
    api.get('/categories').then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const query = activeCategory ? `?category=${encodeURIComponent(activeCategory)}` : '';
    api
      .get(`/projects${query}`)
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="container section">
      <Seo title="Work" description="A selection of finished projects." />
      <p className="eyebrow">Work</p>
      <h1>Projects</h1>

      {categories.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '24px 0 40px' }}>
          <button
            className={activeCategory ? 'btn btn-secondary' : 'btn'}
            onClick={() => setParams({})}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={activeCategory === c.slug ? 'btn' : 'btn btn-secondary'}
              onClick={() => setParams({ category: c.slug })}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="muted">Loading projects…</p>
      ) : projects.length === 0 ? (
        <p className="muted">No published projects here yet. Check back soon.</p>
      ) : (
        <div className="grid grid-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
