'use client';

import RippleDistortion from '../bits/RippleDistortion';
import StrokeText from '../bits/StrokeText';
import MagneticButton from './MagneticButton';
import TextType from '../bits/TextType';

export default function Hero() {
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
        background: '#050505',
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
          /* pointer-events: none keeps the window-level ripple
             tracking active while not blocking content clicks */
          pointerEvents: 'none',
        }}
      >
        <RippleDistortion
          src="/hero.jpg"
          brushSize={150}
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

      {/* ── Layer 2: Dark gradient overlay ──────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: [
            /* heavy bottom vignette — keeps type legible */
            'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 35%, rgba(5,5,5,0.18) 65%, rgba(5,5,5,0.35) 100%)',
            /* left side — text area */
            'linear-gradient(to right, rgba(5,5,5,0.65) 0%, transparent 55%)',
            /* radial atmosphere — barely-visible violet breath */
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(167,139,250,0.06) 0%, transparent 60%)',
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
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)',
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
          padding: '0 2rem',
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
            marginBottom: '3.5rem',
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
        </div>

        {/* Role label — TextType animated typing */}
        <div
          style={{
            fontFamily: 'var(--font-geist-mono, monospace)',
            fontSize: '0.8rem',
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
          style={{
            overflow: 'visible',
            marginBottom: '2rem',
            animation: 'fadeIn 0.1s ease 0.6s both',
          }}
        >
          <StrokeText
            text="SAKTHI"
            strokeColor="#A78BFA"
            fillColor="#F5F5F5"
            strokeWidth={1.4}
            drawDuration={1.6}
            fillDelay={0.2}
            stagger={0.05}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={160}
            fontWeight={900}
            letterSpacing={-6}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'var(--fg-secondary)',
            maxWidth: '420px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            animation: 'fadeUp 1s ease 1.8s both',
          }}
        >
          Building at the intersection of intelligence and interface.
          <br />
          Crafting digital experiences that feel alive.
        </p>

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
