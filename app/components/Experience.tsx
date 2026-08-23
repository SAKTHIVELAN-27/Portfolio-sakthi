'use client';

import SectionDivider from './SectionDivider';
import Waves from '../bits/Waves';

const EXPERIENCES = [
  {
    role: 'Full Stack Developer Intern',
    company: 'TechCorp AI',
    period: '2024 — Present',
    description:
      'Building production AI features across the stack — from model fine-tuning pipelines to React-based dashboards serving 10k+ daily users. Drove a 40% latency reduction through query optimisation and edge caching.',
    tags: ['React', 'Python', 'LLMs', 'PostgreSQL'],
  },
  {
    role: 'Creative Technologist',
    company: 'Freelance',
    period: '2023 — 2024',
    description:
      'Delivered interactive web experiences and creative tools for brands, startups, and digital agencies. Specialised in WebGL animations, design system architecture, and performance engineering.',
    tags: ['Next.js', 'Three.js', 'GSAP', 'Framer'],
  },
  {
    role: 'Open Source Contributor',
    company: 'Various Projects',
    period: '2022 — Present',
    description:
      'Contributed UI components, performance improvements, and documentation to several open source React and Python projects. Maintainer of FluxUI component library.',
    tags: ['React', 'TypeScript', 'CSS', 'Open Source'],
  },
];

const EDUCATION = [
  {
    degree: 'B.E. Computer Science & Engineering',
    institution: 'Anna University',
    period: '2021 — 2025',
    description: 'Focused on AI/ML, data structures, and systems programming. CGPA 8.4/10.',
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '8rem 0',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* ── Waves background (z:0) ────────────────── */}
      <Waves
        lineColor="#fff"
        backgroundColor="rgba(255, 255, 255, 0.02)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
        style={{ opacity: 0.07, zIndex: 0 }}
      />

      {/* ── Dark gradient so content stays readable ─ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.75) 100%)',
        }}
      />

      {/* ── Content (z:2) ─────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-container">
        <SectionDivider index="03" label="Experience" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
          }}
          className="exp-grid"
        >
          {/* Left: Work */}
          <div>
            <p className="text-meta" style={{ marginBottom: '2.5rem' }}>
              Work History
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {EXPERIENCES.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    paddingBottom: '3rem',
                    borderLeft: '1px solid var(--border-subtle)',
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-4px',
                      top: 0,
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      boxShadow: '0 0 8px var(--accent)',
                    }}
                  />

                  {/* Period */}
                  <p
                    style={{
                      fontFamily: 'var(--font-geist-mono, monospace)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {exp.period}
                  </p>

                  {/* Role */}
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--fg)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {exp.role}
                  </h3>

                  {/* Company */}
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--accent)',
                      marginBottom: '0.875rem',
                    }}
                  >
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p
                    className="text-body"
                    style={{ fontSize: '0.9375rem', marginBottom: '1rem' }}
                  >
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.2rem 0.6rem',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.6875rem',
                          letterSpacing: '0.06em',
                          color: 'var(--muted)',
                          fontFamily: 'var(--font-geist-mono, monospace)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education + Achievements */}
          <div>
            <p className="text-meta" style={{ marginBottom: '2.5rem' }}>
              Education
            </p>

            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1.75rem',
                  marginBottom: '3rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-geist-mono, monospace)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {edu.period}
                </p>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--fg)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {edu.degree}
                </h3>
                <p style={{ color: 'var(--accent)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  {edu.institution}
                </p>
                <p className="text-body" style={{ fontSize: '0.9375rem' }}>
                  {edu.description}
                </p>
              </div>
            ))}

            {/* Philosophy block */}
            <div
              style={{
                padding: '2rem',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '3px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, var(--accent), transparent)',
                }}
              />
              <p className="text-meta" style={{ marginBottom: '1rem' }}>
                Philosophy
              </p>
              <p
                style={{
                  fontSize: '1.0625rem',
                  color: 'var(--fg)',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  letterSpacing: '-0.01em',
                }}
              >
                "Great engineering is invisible. Great design is unforgettable.
                The best work lives at the intersection of both."
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>{/* end z:2 content wrapper */}

      <style>{`
        @media (max-width: 900px) {
          .exp-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
