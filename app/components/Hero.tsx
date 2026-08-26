'use client';

import { useEffect, useState } from 'react';
import RippleDistortion from '../bits/RippleDistortion';
import StrokeText from '../bits/StrokeText';
import MagneticButton from './MagneticButton';
import TextType from '../bits/TextType';
import FoldText from '../bits/FoldText';

/** Returns the current inner width after mount, null before. */
function useWindowWidth() {
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => {
    // Set immediately after mount so first client render matches server (null)
    setWidth(window.innerWidth);
    const update = () => setWidth(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return width;
}

/** Clamp a value between min and max. */
function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

export default function Hero() {
  const width = useWindowWidth();

  /**
   * Scale the StrokeText fontSize responsively.
   * Returns null until mounted (matches SSR output).
   *   ≤ 360px  → 52px
   *   360–768  → linear: 52 → 110
   *   768–1440 → linear: 110 → 160
   *   > 1440   → 160px
   */
  const strokeFontSize = width === null
    ? null          // pre-mount / SSR — no value yet
    : (() => {
        if (width <= 360) return 52;
        if (width <= 768) return clamp(52 + ((width - 360) / (768 - 360)) * (110 - 52), 52, 110);
        if (width <= 1440) return clamp(110 + ((width - 768) / (1440 - 768)) * (160 - 110), 110, 160);
        return 160;
      })();

  const isMobile = width !== null && width < 640;

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* ── Layer 1: RippleDistortion Background ───── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <RippleDistortion
          src="/hero.jpg"
          brushSize={isMobile ? 80 : 150}
          strength={0.2}
          swirl={1}
          rings={4}
          grayscale
          tint="#A78BFA"
          tintAmount={0.08}
          quality="medium"
          trigger="hover"
          fade={3}
          spread={5}
          spacing={15}
        />
      </div>

      {/* ── Layer 2: Gradient overlay ──────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: [
            'linear-gradient(to top, var(--bg) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 50% at 50% 100%, var(--accent-glow) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* ── Layer 3: Scanline texture (purely decorative) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.03,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--fg) 2px, var(--fg) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* ── Layer 4: Hero content ────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1180px',
          padding: isMobile ? '0 1.25rem' : '0 2rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top meta row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isMobile ? '2rem' : '3.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-geist-mono, monospace)',
              fontSize: '0.6875rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              animation: 'fadeIn 1.2s ease 0.2s both',
            }}
          >
            Creative Developer
          </span>

          {/* Hide the scroll indicator on tiny screens */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  animation: 'fadeIn 1.2s ease 0.3s both',
                }}
              >
                01
              </span>
              <div
                style={{
                  width: '1px',
                  height: '32px',
                  background: 'linear-gradient(to bottom, var(--accent), transparent)',
                  animation: 'fadeIn 1.2s ease 0.4s both',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  animation: 'fadeIn 1.2s ease 0.5s both',
                }}
              >
                Scroll
              </span>
            </div>
          )}
        </div>

        {/* Role label — TextType animated typing */}
        <div
          style={{
            fontFamily: 'var(--font-geist-mono, monospace)',
            fontSize: isMobile ? '0.6875rem' : '0.8rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--fg-secondary)',
            marginBottom: '0.875rem',
            animation: 'fadeUp 1s ease 0.4s both',
            minHeight: '1.4em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: 'var(--muted)', letterSpacing: '0.18em' }}>—</span>
          <TextType
            as="span"
            text={[
              'Full Stack Developer.',
              'AI / ML Enthusiast.',
              'Creative Technologist.',
              'Open Source Builder.',
              'WebGL + 3D Explorer.',
              'Problem Solver.',
            ]}
            typingSpeed={72}
            deletingSpeed={38}
            pauseDuration={1800}
            initialDelay={800}
            showCursor
            cursorCharacter="|"
            cursorClassName="hero-cursor"
            loop
            variableSpeed={{ min: 55, max: 110 }}
          />
        </div>
        <style>{`
          .hero-cursor {
            color: var(--accent);
            font-weight: 300;
            margin-left: 1px;
          }
        `}</style>

        {/* ── StrokeText hero name ─────────────────── */}
        <div
          suppressHydrationWarning
          style={{
            overflow: 'visible',
            marginBottom: isMobile ? '1.25rem' : '2rem',
            animation: 'fadeIn 0.1s ease 0.6s both',
          }}
        >
          <StrokeText
            text="SAKTHI"
            strokeColor="var(--accent)"
            fillColor="var(--fg)"
            strokeWidth={1.4}
            drawDuration={1.6}
            fillDelay={0.2}
            stagger={0.05}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={strokeFontSize !== null ? Math.round(strokeFontSize) : 144}
            fontWeight={900}
            letterSpacing={isMobile ? -2 : -6}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            maxWidth: isMobile ? '100%' : '460px',
            marginBottom: isMobile ? '2rem' : '2.5rem',
            animation: 'fadeUp 1s ease 1.8s both',
          }}
        >
          <FoldText
            text="Building at the intersection of intelligence and interface."
            splitBy="word"
            hinge="top"
            trigger="mount"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize={isMobile ? 'clamp(0.9rem, 4vw, 1rem)' : 'clamp(1rem, 1.8vw, 1.2rem)'}
            fontWeight={500}
            color="var(--fg-secondary)"
          />
        </div>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            animation: 'fadeUp 1s ease 2s both',
          }}
        >
          <MagneticButton as="a" href="#work" className="btn-primary">
            View Work ↗
          </MagneticButton>
          <MagneticButton as="a" href="#contact" className="btn-secondary">
            Contact ↗
          </MagneticButton>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 1s ease 2.5s both',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
            animation: 'fadeUp 2.2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
