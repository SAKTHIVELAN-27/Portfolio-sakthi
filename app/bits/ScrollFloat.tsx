'use client';

import React, { useEffect, useRef, Children, isValidElement, cloneElement } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFloatProps {
  children: React.ReactNode;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;

}

function splitIntoChars(text: string): string[] {
  return [...text];
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props.children);
  }
  return '';
}

export default function ScrollFloat({
  children,
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  className = '',
  as: Tag = 'span',
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);

  const text = extractText(children);
  const chars = splitIntoChars(text);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || charRefs.current.length === 0) return;

    const chars = charRefs.current.filter(Boolean);

    gsap.fromTo(
      chars,
      { y: 60, opacity: 0, rotateX: -35 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: animationDuration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          toggleActions: 'play none none none',
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.trigger === el) st.kill();
      });
    };
  }, [text, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    // @ts-ignore – dynamic tag
    <Tag
      ref={containerRef}
      className={className}
      aria-label={text}
      style={{ display: 'inline-block', perspective: 800 }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => { if (el) charRefs.current[i] = el; }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            transformStyle: 'preserve-3d',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}
