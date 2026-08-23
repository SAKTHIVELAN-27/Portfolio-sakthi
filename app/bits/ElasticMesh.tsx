'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ElasticMeshProps {
  color1?: string;
  color2?: string;
  image?: string;
  interaction?: 'hover' | 'drag';
  tilt?: number;
  shading?: number;
  className?: string;
}

interface Point {
  x: number;
  y: number;
  ox: number; // origin x
  oy: number; // origin y
  vx: number; // velocity x
  vy: number; // velocity y
}

// hex/rgb to [r,g,b] 0..1
function parseColor(color: string): [number, number, number] {
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0] / 255, d[1] / 255, d[2] / 255];
}

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): string {
  const r = Math.round((a[0] + (b[0] - a[0]) * t) * 255);
  const g = Math.round((a[1] + (b[1] - a[1]) * t) * 255);
  const bv = Math.round((a[2] + (b[2] - a[2]) * t) * 255);
  return `rgb(${r},${g},${bv})`;
}

export default function ElasticMesh({
  color1 = '#050505',
  color2 = '#A78BFA',
  image,
  interaction = 'hover',
  tilt = 8,
  shading = 0.5,
  className = '',
}: ElasticMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, down: false });
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number>(0);
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  const COLS = 18;
  const ROWS = 12;
  const SPRING = 0.08;
  const DAMPING = 0.72;
  const MOUSE_RADIUS = 90;
  const MOUSE_FORCE = 0.18;

  const initPoints = useCallback((w: number, h: number) => {
    const pts: Point[] = [];
    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        const ox = (c / COLS) * w;
        const oy = (r / ROWS) * h;
        pts.push({ x: ox, y: oy, ox, oy, vx: 0, vy: 0 });
      }
    }
    pointsRef.current = pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let c1: [number, number, number] = [0.02, 0.02, 0.02];
    let c2: [number, number, number] = [0.655, 0.545, 0.98];

    try {
      c1 = parseColor(color1);
      c2 = parseColor(color2);
    } catch {}

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initPoints(canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // Load background image if provided
    if (image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = image;
      img.onload = () => { bgImageRef.current = img; };
    }

    const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
    };

    const onMove = (e: MouseEvent) => {
      const p = getPos(e, canvas);
      mouseRef.current.x = p.x;
      mouseRef.current.y = p.y;
    };
    const onDown = (e: MouseEvent) => { mouseRef.current.down = true; onMove(e); };
    const onUp = () => { mouseRef.current.down = false; };
    const onLeave = () => { mouseRef.current.x = -9999; mouseRef.current.y = -9999; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onLeave);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const pts = pointsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isDragging = interaction === 'drag' ? mouseRef.current.down : true;

      ctx.clearRect(0, 0, W, H);

      // Background
      if (bgImageRef.current) {
        ctx.save();
        ctx.drawImage(bgImageRef.current, 0, 0, W, H);
        ctx.restore();
      } else {
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, W, H);
      }

      // Update physics
      for (const pt of pts) {
        const dx = pt.ox - pt.x;
        const dy = pt.oy - pt.y;
        pt.vx += dx * SPRING;
        pt.vy += dy * SPRING;
        pt.vx *= DAMPING;
        pt.vy *= DAMPING;

        // Mouse influence
        if (isDragging) {
          const mdx = mx - pt.x;
          const mdy = my - pt.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            pt.vx -= mdx * force;
            pt.vy -= mdy * force;
          }
        }

        pt.x += pt.vx;
        pt.y += pt.vy;
      }

      // Draw mesh quads
      const stride = COLS + 1;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tl = pts[r * stride + c];
          const tr = pts[r * stride + c + 1];
          const bl = pts[(r + 1) * stride + c];
          const br = pts[(r + 1) * stride + c + 1];

          // Displacement for color lerp
          const disp =
            Math.sqrt(
              (tl.x - tl.ox) ** 2 + (tl.y - tl.oy) ** 2 +
              (tr.x - tr.ox) ** 2 + (tr.y - tr.oy) ** 2,
            ) / (MOUSE_RADIUS * 0.5);
          const t = Math.min(disp * shading, 1);
          const fillCol = lerpColor(c1, c2, t);

          ctx.beginPath();
          ctx.moveTo(tl.x, tl.y);
          ctx.lineTo(tr.x, tr.y);
          ctx.lineTo(br.x, br.y);
          ctx.lineTo(bl.x, bl.y);
          ctx.closePath();
          ctx.fillStyle = fillCol;
          ctx.fill();

          // Grid lines
          ctx.strokeStyle = `rgba(255,255,255,0.06)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseleave', onLeave);
      ro.disconnect();
    };
  }, [color1, color2, image, interaction, shading, initPoints]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', cursor: interaction === 'drag' ? 'grab' : 'crosshair' }}
    />
  );
}
