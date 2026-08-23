'use client';

import { useEffect, useRef, useId } from 'react';
import gsap from 'gsap';

interface StrokeTextProps {
  text: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: 'mount' | 'scroll';
  fillMode?: 'wipe' | 'fade';
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  className?: string;
}

export default function StrokeText({
  text,
  strokeColor = '#A78BFA',
  fillColor = '#F5F5F5',
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = 'power2.out',
  trigger = 'mount',
  fillMode = 'wipe',
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  className = '',
}: StrokeTextProps) {
  const uniqueId = useId().replace(/:/g, '');
  const clipId = `wipe-clip-${uniqueId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const fillTextRef = useRef<SVGTextElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const strokeEl = strokeTextRef.current;
    const clipRect = clipRectRef.current;
    const svg = svgRef.current;
    if (!strokeEl || !clipRect || !svg) return;

    const runAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      // Measure exact path length
      const pathLen = strokeEl.getComputedTextLength?.() ?? fontSize * text.length * 0.6;

      // Set dasharray to exact length
      strokeEl.setAttribute('stroke-dasharray', String(pathLen + 10));
      strokeEl.setAttribute('stroke-dashoffset', String(pathLen + 10));

      // Reset clip
      gsap.set(clipRect, { attr: { width: 0 } });

      const tl = gsap.timeline({ delay: 0.1 });

      // Phase 1 ─ draw stroke
      tl.to(strokeEl, {
        attr: { 'stroke-dashoffset': 0 },
        duration: drawDuration,
        ease,
      });

      // Phase 2 ─ wipe / fade fill
      const fillStart = `>-=${drawDuration * (1 - stagger * 4)}`; // slight overlap

      if (fillMode === 'wipe') {
        const svgWidth = svg.getBoundingClientRect().width || 1600;
        tl.to(
          clipRect,
          {
            attr: { width: svgWidth + 200 },
            duration: drawDuration * 0.65,
            ease: 'power2.inOut',
            delay: fillDelay,
          },
          fillStart,
        );
      } else {
        tl.to(
          fillTextRef.current,
          { opacity: 1, duration: 0.9, ease: 'power2.out', delay: fillDelay },
          fillStart,
        );
      }
    };

    if (trigger === 'mount') {
      const raf = requestAnimationFrame(runAnimation);
      return () => cancelAnimationFrame(raf);
    } else {
      const observer = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) runAnimation(); },
        { threshold: 0.25 },
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [text, drawDuration, fillDelay, stagger, ease, trigger, fillMode, fontSize]);

  const svgHeight = fontSize * 1.25;

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', lineHeight: 1 }}>
      <svg
        ref={svgRef}
        width="100%"
        height={svgHeight}
        viewBox={`0 0 100% ${svgHeight}`}
        style={{ overflow: 'visible', display: 'block' }}
        aria-label={text}
      >
        <defs>
          <clipPath id={clipId}>
            <rect
              ref={clipRectRef}
              x={0}
              y={-fontSize * 0.2}
              width={0}
              height={fontSize * 1.5}
            />
          </clipPath>
        </defs>

        {/* ── Stroke layer ─────────────────────── */}
        <text
          ref={strokeTextRef}
          x={0}
          y={fontSize * 0.88}
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          paintOrder="stroke"
          style={{ fontFamily: 'var(--font-geist-sans, inherit)' }}
        >
          {text}
        </text>

        {/* ── Fill layer (clipped or faded) ─────── */}
        <text
          ref={fillTextRef}
          x={0}
          y={fontSize * 0.88}
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          fill={fillColor}
          stroke="none"
          clipPath={fillMode === 'wipe' ? `url(#${clipId})` : undefined}
          style={{
            fontFamily: 'var(--font-geist-sans, inherit)',
            opacity: fillMode === 'fade' ? 0 : 1,
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
