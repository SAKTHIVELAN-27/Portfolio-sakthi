'use client';

import React from 'react';

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
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = '',
  as: Tag = 'button',
  href,
  onClick,
  target,
  rel,
  type = 'button',
  id,
  style,
}: MagneticButtonProps) {
  const props = {
    className: `cursor-target ${className}`.trim(),
    onClick,
    id,
    style,
    ...(Tag === 'a' ? { href, target, rel } : { type }),
  };

  return <Tag {...props}>{children}</Tag>;
}
