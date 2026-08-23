'use client';

import { useRef, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.38,
  as: Tag = 'button',
  href,
  onClick,
  target,
  rel,
  type = 'button',
  id,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    },
    [strength],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 400);
  }, []);

  const props = {
    ref: ref as React.Ref<any>,
    className,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    id,
    ...(Tag === 'a' ? { href, target, rel } : { type }),
  };

  return <Tag {...props}>{children}</Tag>;
}
