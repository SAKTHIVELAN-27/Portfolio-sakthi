'use client';

export default function NoiseOverlay() {
  return (
    <>
      {/* Film grain */}
      <div className="noise-overlay" aria-hidden="true" />
      {/* Atmospheric violet glow */}
      <div className="atmosphere" aria-hidden="true" />
      {/* Subtle grid */}
      <div className="grid-bg" aria-hidden="true" />
    </>
  );
}
