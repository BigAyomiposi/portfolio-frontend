import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/projects/new', label: '+ Add Project' },
  { to: '/admin/messages', label: 'Messages' },
  { to: '/admin/taxonomy', label: 'Categories & Tech' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/experience', label: 'Experience' },
  { to: '/admin/settings', label: 'Profile Settings' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid var(--line)', padding: '24px 16px', background: '#fff' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: 24, padding: '0 8px' }}>
          Admin
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }} aria-label="Admin navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                padding: '8px 10px',
                borderRadius: 4,
                textDecoration: 'none',
                fontSize: '0.9rem',
                color: isActive ? 'var(--accent)' : 'var(--ink)',
                background: isActive ? '#f4ede6' : 'transparent',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ marginTop: 32, padding: '0 8px' }}>
          <p className="muted" style={{ marginBottom: 8, wordBreak: 'break-all' }}>{admin?.email}</p>
          <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>
      <div style={{ padding: '32px 40px' }}>
        <Outlet />
      </div>
    </div>
  );
}
