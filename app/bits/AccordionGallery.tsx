'use client';

import { useState } from 'react';

interface AccordionItem {
  image: string;
  label: string;
  link?: string;
  description?: string;
}

interface AccordionGalleryProps {
  items: AccordionItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: 'hover' | 'click';
  className?: string;
}

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = 'hover',
  className = '',
}: AccordionGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number>(defaultIndex);

  const collapseRatio = (1 - expandRatio) / (items.length - 1);

  const handleInteraction = (idx: number) => setActiveIdx(idx);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        gap: '2px',
        background: 'var(--bg)',
      }}
    >
      {items.map((item, i) => {
        const isActive = i === activeIdx;
        const flexGrow = isActive ? expandRatio : collapseRatio;

        return (
          <div
            key={i}
            onMouseEnter={trigger === 'hover' ? () => handleInteraction(i) : undefined}
            onClick={trigger === 'click' ? () => handleInteraction(i) : undefined}
            style={{
              flex: `${flexGrow} 0 0`,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'flex 0.6s cubic-bezier(0.77, 0, 0.175, 1)',
              borderRadius: '2px',
            }}
          >
            {/* Background image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.label}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isActive ? 'saturate(1) brightness(0.85)' : 'saturate(0.15) brightness(0.6)',
                transition: 'filter 0.6s ease, transform 0.6s ease',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
              }}
              draggable={false}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 50%)',
                zIndex: 1,
              }}
            />

            {/* Violet active border */}
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid rgba(167,139,250,0.35)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Label */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1rem',
                right: '1rem',
                zIndex: 3,
                overflow: 'hidden',
              }}
            >
              {/* Index number */}
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  fontSize: '0.625rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--accent)' : 'var(--muted)',
                  marginBottom: '0.25rem',
                  transition: 'color 0.4s',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Label text */}
              <span
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: isActive ? '1.125rem' : '0.875rem',
                  color: isActive ? 'var(--fg)' : 'var(--fg-secondary)',
                  letterSpacing: '-0.01em',
                  transition: 'font-size 0.4s, color 0.4s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.label}
              </span>

              {/* Description */}
              {item.description && isActive && (
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    color: 'var(--fg-secondary)',
                    marginTop: '0.25rem',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.5s 0.15s',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.description}
                </span>
              )}
            </div>

            {/* Link arrow */}
            {item.link && isActive && (
              <a
                href={item.link}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'var(--fg)',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--fg)';
                }}
              >
                ↗
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
