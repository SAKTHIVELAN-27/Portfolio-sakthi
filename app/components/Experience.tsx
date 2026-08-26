'use client';

import SectionDivider from './SectionDivider';
import Waves from '../bits/Waves';
import FoldText from '../bits/FoldText';

const JOURNEY_STEPS = [
  {
    type: 'START — SCHOOLING',
    period: '2019 — 2021',
    role: 'Higher Secondary Education (Computer Science & Math)',
    institution: 'State Board Education',
    description:
      'Discovered the joy of coding and computational thinking. Built foundational skills in computer science, mathematics, and early interactive web scripts.',
    tags: ['Computer Science', 'Mathematics', 'C++', 'Logic'],
    isStart: true,
  },
  {
    type: 'COLLEGE DEGREE',
    period: '2021 — 2025',
    role: 'B.E. Computer Science & Engineering',
    institution: 'Anna University',
    description:
      'Deepened expertise in AI/ML, data structures, full-stack systems, and web architecture. Maintained strong academic standing with CGPA 8.4/10 while building real-world projects.',
    tags: ['AI / ML', 'Data Structures', 'Web Architecture', 'PostgreSQL'],
  },
  {
    type: 'COMMUNITY & OPEN SOURCE',
    period: '2022 — Present',
    role: 'Open Source Contributor & Library Builder',
    institution: 'Developer Ecosystem',
    description:
      'Active open-source author and contributor. Crafting UI components, WebGL tools, and performance extensions for modern developer communities.',
    tags: ['React', 'TypeScript', 'CSS Shaders', 'Open Source'],
  },
  {
    type: 'CREATIVE ENGINEERING',
    period: '2023 — 2024',
    role: 'Creative Technologist & Freelance Engineer',
    institution: 'Independent Projects',
    description:
      'Delivered interactive web experiences and creative technologies for startups and design agencies. Specialized in 3D WebGL, GSAP motion, and fluid design systems.',
    tags: ['Next.js', 'Three.js', 'GSAP', 'WebGL'],
  },
  {
    type: 'CURRENT — INDUSTRY',
    period: '2024 — Present',
    role: 'Full Stack Developer Intern',
    institution: 'TechCorp AI',
    description:
      'Building production AI pipelines and full-stack React dashboards serving 10k+ daily users. Optimizing query performance and edge caching for real-time applications.',
    tags: ['React', 'Python', 'LLMs', 'PostgreSQL', 'Docker'],
    isCurrent: true,
  },
];

export default function Journey() {
  return (
    <section
      id="journey"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '8rem 0',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* ── Waves background ────────────────── */}
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

      {/* ── Gradient overlay ───────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, var(--bg) 100%)',
        }}
      />

      {/* ── Content ─────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-container">
          <SectionDivider index="03" label="Journey" />

          {/* Headline */}
          <div style={{ marginBottom: '4rem', maxWidth: '720px' }}>
            <FoldText
              text="From School to Engineering & AI."
              splitBy="word"
              hinge="top"
              trigger="scroll"
              duration={0.65}
              stagger={0.045}
              ease="power3.out"
              perspective={700}
              creaseShading={0.55}
              fontSize="clamp(2rem, 5vw, 4rem)"
              fontWeight={800}
              color="var(--fg)"
            />
            <p className="text-body-lg" style={{ marginTop: '1rem' }}>
              A continuous path of learning, building, and engineering digital experiences.
            </p>
          </div>

          {/* Timeline continuous line path */}
          <div
            style={{
              position: 'relative',
              maxWidth: '860px',
              margin: '0 auto',
              paddingLeft: '2.5rem',
            }}
          >
            {/* The Connecting Vertical Line */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                bottom: '30px',
                left: '11px',
                width: '2px',
                background: 'linear-gradient(to bottom, var(--accent), var(--border-subtle) 90%, transparent)',
                boxShadow: '0 0 10px var(--accent-glow)',
              }}
            />

            {/* Journey steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              {JOURNEY_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="cursor-target"
                  style={{
                    position: 'relative',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '2rem',
                    transition: 'border-color 0.3s ease, transform 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  {/* Timeline Dot Node */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-2.5rem',
                      top: '2.2rem',
                      transform: 'translateX(-50%)',
                      width: step.isCurrent ? '16px' : step.isStart ? '14px' : '12px',
                      height: step.isCurrent ? '16px' : step.isStart ? '14px' : '12px',
                      borderRadius: '50%',
                      background: step.isCurrent || step.isStart ? 'var(--accent)' : 'var(--bg)',
                      border: '3px solid var(--accent)',
                      boxShadow: '0 0 12px var(--accent)',
                      zIndex: 3,
                    }}
                  />

                  {/* Header Row */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-geist-mono, monospace)',
                        fontSize: '0.6875rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        fontWeight: 600,
                      }}
                    >
                      {step.type}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-geist-mono, monospace)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em',
                        color: 'var(--muted)',
                      }}
                    >
                      {step.period}
                    </span>
                  </div>

                  {/* Role / Degree Title */}
                  <h3
                    style={{
                      fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--fg)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {step.role}
                  </h3>

                  {/* Institution */}
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--fg-secondary)',
                      fontWeight: 500,
                      marginBottom: '1rem',
                    }}
                  >
                    {step.institution}
                  </p>

                  {/* Description */}
                  <p
                    className="text-body"
                    style={{ fontSize: '0.9375rem', marginBottom: '1.25rem', lineHeight: 1.65 }}
                  >
                    {step.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.25rem 0.65rem',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '2px',
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

            {/* Philosophy quote */}
            <div
              style={{
                marginTop: '4rem',
                padding: '2.25rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, var(--accent), transparent)',
                }}
              />
              <p className="text-meta" style={{ marginBottom: '1rem' }}>
                Philosophy
              </p>
              <FoldText
                text="Great engineering is invisible. Great design is unforgettable. The best work lives at the intersection of both."
                splitBy="word"
                hinge="top"
                trigger="scroll"
                duration={0.65}
                stagger={0.035}
                ease="power3.out"
                perspective={700}
                creaseShading={0.55}
                fontSize="1.0625rem"
                fontWeight={500}
                color="var(--fg)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
