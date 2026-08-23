'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollExpandProps {
  src: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  useWindowScroll?: boolean;
  mediaZoom?: number;
  children?: React.ReactNode;
  className?: string;
}

export default function ScrollExpand({
  src,
  alt = '',
  title,
  scrollHint = 'Scroll',
  useWindowScroll = true,
  mediaZoom = 1.2,
  children,
  className = '',
}: ScrollExpandProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const img = imageRef.current;
    const text = textRef.current;
    const hint = hintRef.current;
    if (!section || !frame || !img) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        pin: useWindowScroll,
        anticipatePin: 1,
      },
    });

    // Frame expands from small to full
    tl.fromTo(
      frame,
      { width: '55%', height: '55%', borderRadius: '4px' },
      { width: '100%', height: '100%', borderRadius: '0px', ease: 'none' },
      0,
    );

    // Image zooms slightly
    tl.fromTo(
      img,
      { scale: mediaZoom },
      { scale: 1, ease: 'none' },
      0,
    );

    // Hint fades out
    if (hint) {
      tl.to(hint, { opacity: 0, y: -12, ease: 'none' }, 0);
    }

    // Text fades in
    if (text) {
      tl.fromTo(text, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'none' }, 0.4);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.trigger === section) st.kill();
      });
    };
  }, [src, useWindowScroll, mediaZoom]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: useWindowScroll ? '200vh' : '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: useWindowScroll ? 'sticky' : 'relative',
          top: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--bg)',
        }}
      >
        {/* Expanding frame */}
        <div
          ref={frameRef}
          style={{
            position: 'relative',
            width: '55%',
            height: '55%',
            overflow: 'hidden',
            borderRadius: '4px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              scale: String(mediaZoom),
              transformOrigin: 'center center',
            }}
            draggable={false}
          />
        </div>

        {/* Title overlay */}
        {title && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-geist-mono, monospace)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textAlign: 'center',
                marginBottom: '0.5rem',
              }}
            >
              {title}
            </p>
          </div>
        )}

        {/* Children content (fades in) */}
        {children && (
          <div
            ref={textRef}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: 0,
              zIndex: 3,
              maxWidth: '600px',
              padding: '0 2rem',
            }}
          >
            {children}
          </div>
        )}

        {/* Scroll hint */}
        {scrollHint && (
          <div
            ref={hintRef}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              zIndex: 4,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-mono, monospace)',
                fontSize: '0.625rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {scrollHint}
            </span>
            <div
              style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, var(--muted), transparent)',
                animation: 'fadeUp 1.5s ease-in-out infinite',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
