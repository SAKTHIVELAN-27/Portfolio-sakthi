'use client';

import { useState } from 'react';
import AccordionGallery from '../bits/AccordionGallery';
import SectionDivider from './SectionDivider';
import MagneticButton from './MagneticButton';

const PROJECTS = [
  {
    id: '01',
    title: 'CampusFlow',
    category: 'AI / EdTech',
    description:
      'An AI-powered campus management platform that unifies scheduling, analytics, and student communication in one intelligent interface.',
    tags: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80',
    link: '#',
    year: '2024',
  },
  {
    id: '02',
    title: 'NeuralCanvas',
    category: 'AI / Creative',
    description:
      'A generative art platform that uses diffusion models to co-create with artists — bridging machine intelligence and human expression.',
    tags: ['React', 'Python', 'Stable Diffusion', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    link: '#',
    year: '2024',
  },
  {
    id: '03',
    title: 'Synthetica',
    category: 'Creative / Audio',
    description:
      'Real-time music visualisation powered by WebGL. Audio frequencies drive an organic 3D mesh that responds to every beat and wave.',
    tags: ['Three.js', 'Web Audio API', 'GLSL', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&q=80',
    link: '#',
    year: '2023',
  },
  {
    id: '04',
    title: 'FluxUI',
    category: 'Open Source',
    description:
      'A minimal, performant React component library built for dark-mode-first design systems. Zero runtime CSS, full TypeScript support.',
    tags: ['React', 'TypeScript', 'CSS', 'Storybook'],
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=900&q=80',
    link: '#',
    year: '2023',
  },
];

const GALLERY_ITEMS = PROJECTS.map((p) => ({
  image: p.image,
  label: p.title,
  link: p.link,
  description: p.category,
}));

export default function Work() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="work"
      className="section-pad"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '8rem 0',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="section-container">
        <SectionDivider index="02" label="Work" />

        {/* AccordionGallery */}
        <div
          style={{
            height: 'clamp(220px, 45vw, 520px)',
            marginBottom: '4rem',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <AccordionGallery
            items={GALLERY_ITEMS}
            defaultIndex={0}
            expandRatio={0.52}
            trigger="hover"
          />
        </div>

        {/* Project list */}
        <div>
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className="cursor-target work-row"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '3rem 1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1.75rem 0',
                borderBottom: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: hovered === i ? 'var(--accent)' : 'var(--muted)',
                  transition: 'color 0.2s',
                }}
              >
                {project.id}
              </span>

              {/* Title + meta */}
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(1.125rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: hovered === i ? 'var(--fg)' : 'var(--fg-secondary)',
                    transition: 'color 0.25s',
                    marginBottom: '0.375rem',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-geist-mono, monospace)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  {project.category} · {project.year}
                </p>
              </div>

              {/* Preview image + CTA */}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
              >
                {/* Hover image preview — hidden on mobile via CSS */}
                <div
                  className="work-preview"
                  style={{
                    width: '80px',
                    height: '54px',
                    overflow: 'hidden',
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? 'scale(1)' : 'scale(0.9)',
                    transition: 'opacity 0.35s, transform 0.35s',
                    borderRadius: '2px',
                    border: hovered === i ? '1px solid rgba(167,139,250,0.3)' : '1px solid transparent',
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'saturate(0.1) brightness(0.8)',
                    }}
                    draggable={false}
                  />
                </div>

                <a
                  href={project.link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    flexShrink: 0,
                    border: `1px solid ${hovered === i ? 'var(--accent)' : 'var(--border)'}`,
                    color: hovered === i ? 'var(--accent)' : 'var(--muted)',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  aria-label={`View ${project.title}`}
                >
                  ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Mobile: collapse number column, hide preview image */
        @media (max-width: 640px) {
          .work-row {
            grid-template-columns: 2.5rem 1fr auto !important;
            gap: 0.875rem !important;
            padding: 1.25rem 0 !important;
          }
          .work-preview {
            display: none !important;
          }
        }
        @media (max-width: 400px) {
          .work-row {
            grid-template-columns: 1fr auto !important;
          }
          .work-row > span:first-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
