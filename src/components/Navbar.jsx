import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ name }) {
  return (
    <header
      style={{
        width: '100%',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 16px rgba(24, 24, 27, 0.06)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxSizing: 'border-box',
      }}
    >
      <nav
        style={{
          width: '100%',
          minHeight: 72,
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
        aria-label="Primary"
      >
        {/* Logo / Name */}
        <NavLink
          to="/"
          style={{
            color: 'var(--text)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.2rem',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            flexShrink: 1,
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name || 'Portfolio'}
        </NavLink>

        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                position: 'relative',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 650,
                color: isActive ? 'var(--primary)' : 'var(--text)',
                padding: '8px 0',
                transition: 'color 180ms ease',
                whiteSpace: 'nowrap',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

