'use client';

import SectionDivider from './SectionDivider';
import MagneticButton from './MagneticButton';
import FoldText from '../bits/FoldText';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/sakthivelan', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sakthivelan', icon: '⌘' },
  { label: 'Twitter', href: 'https://twitter.com/sakthivelan', icon: '⌂' },
  { label: 'Dribbble', href: 'https://dribbble.com/sakthivelan', icon: '◉' },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '8rem 0 6rem',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow behind CTA */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background:
            'radial-gradient(ellipse at center, rgba(167,139,250,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionDivider index="04" label="Contact" />

        {/* Headline */}
        <div
          style={{
            maxWidth: '820px',
            marginBottom: '4rem',
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <FoldText
              text="Let's build something remarkable."
              splitBy="word"
              hinge="top"
              trigger="scroll"
              duration={0.65}
              stagger={0.045}
              ease="power3.out"
              perspective={700}
              creaseShading={0.55}
              fontSize="clamp(2.5rem, 6vw, 5.5rem)"
              fontWeight={800}
              color="var(--fg)"
            />
          </div>
          <p className="text-body-lg" style={{ maxWidth: '500px' }}>
            Open to full-time roles, freelance projects, and creative
            collaborations. If you have an idea worth building — let's talk.
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '6rem',
          }}
        >
          <MagneticButton
            as="a"
            href="mailto:sakthivelanm12@gmail.com"
            className="btn-primary"
            strength={0.5}
          >
            Send a Message ↗
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/resume.pdf"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV ↓
          </MagneticButton>
        </div>

        {/* Divider */}
        <div className="section-divider" style={{ marginBottom: '3rem' }} />

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          {/* Social links */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')
                }
              >
                <span style={{ fontSize: '0.9375rem' }}>{s.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono, monospace)',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  {s.label}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p
            style={{
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            © 2025 Sakthivelan. All rights reserved.
          </p>

          {/* Email */}
          <a
            href="mailto:sakthivelanm12@gmail.com"
            style={{
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              color: 'var(--fg-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'var(--fg-secondary)')
            }
          >
            sakthivelanm12@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
