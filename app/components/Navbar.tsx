'use client';

import { useEffect, useRef, useState } from 'react';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['work', 'about', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          background: scrolled ? 'rgba(5,5,5,0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.4s ease, backdrop-filter 0.4s, border-color 0.4s',
        }}
      >
        {/* Logo / Name */}
        <a
          href="/"
          style={{
            fontWeight: 700,
            fontSize: '0.9375rem',
            letterSpacing: '-0.01em',
            color: 'var(--fg)',
            textDecoration: 'none',
            marginRight: 'auto',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--fg)')}
        >
          SAKTHI
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  color: isActive ? 'var(--accent)' : 'var(--fg-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = 'var(--fg-secondary)';
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--accent)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </a>
            );
          })}

          <MagneticButton
            as="a"
            href="mailto:sakthivelanm12@gmail.com"
            className="btn-primary"
            style={{ padding: '0.5rem 1.125rem', fontSize: '0.75rem' } as React.CSSProperties}
          >
            Hire me ↗
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--fg)',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="show-mobile"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: 'var(--fg)',
                transition: 'transform 0.3s, opacity 0.3s',
                transformOrigin: 'center',
                ...(menuOpen
                  ? i === 0
                    ? { transform: 'translateY(6.5px) rotate(45deg)' }
                    : i === 1
                    ? { opacity: 0 }
                    : { transform: 'translateY(-6.5px) rotate(-45deg)' }
                  : {}),
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
            background: 'rgba(5,5,5,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            backdropFilter: 'blur(12px)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                fontWeight: 800,
                color: 'var(--fg)',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--fg)')}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
