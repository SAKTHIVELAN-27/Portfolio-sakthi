'use client';

import ScrollFloat from '../bits/ScrollFloat';
import SectionDivider from './SectionDivider';

const STATS = [
  { value: '3+', label: 'Years Building' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '10+', label: 'Technologies' },
  { value: '∞', label: 'Curiosity' },
];

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'Python',
  'Node.js', 'PostgreSQL', 'TensorFlow', 'Three.js',
  'GSAP', 'Docker', 'AWS', 'Figma',
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '8rem 0',
        background: 'var(--bg)',
      }}
    >
      <div className="section-container">
        <SectionDivider index="01" label="About" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left: Heading */}
          <div>
            <h2 className="display-lg" style={{ marginBottom: '2rem' }}>
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
                as="span"
                className="display-lg"
              >
                Building at the intersection of intelligence and interface.
              </ScrollFloat>
            </h2>

            {/* Stats grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginTop: '3rem',
              }}
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      color: 'var(--fg)',
                      lineHeight: 1,
                      marginBottom: '0.375rem',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-meta">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio + Skills */}
          <div>
            <div style={{ marginBottom: '3rem' }}>
              <p className="text-body-lg" style={{ marginBottom: '1.5rem' }}>
                I'm Sakthivelan — a creative developer who lives at the edge of
                engineering and design. I build things that are both technically
                sophisticated and visually compelling.
              </p>
              <p className="text-body" style={{ marginBottom: '1.5rem' }}>
                My work spans AI-powered applications, interactive web
                experiences, and creative tooling. I care deeply about
                performance, detail, and the tiny moments that make an
                interface feel remarkable.
              </p>
              <p className="text-body">
                When I'm not shipping code, I'm exploring generative art,
                audio-visual systems, and the ever-expanding frontier of
                machine intelligence.
              </p>
            </div>

            {/* Skills */}
            <div>
              <p className="text-meta" style={{ marginBottom: '1rem' }}>
                Technologies
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-target"
                    style={{
                      padding: '0.375rem 0.875rem',
                      border: '1px solid var(--border)',
                      fontSize: '0.8125rem',
                      color: 'var(--fg-secondary)',
                      letterSpacing: '0.01em',
                      transition: 'border-color 0.2s, color 0.2s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'var(--accent)';
                      el.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'var(--border)';
                      el.style.color = 'var(--fg-secondary)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
