import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      {/* ── Persistent overlays ────────────────────── */}
      <NoiseOverlay />

      {/* ── Navigation ─────────────────────────────── */}
      <Navbar />

      {/* ── Main content ───────────────────────────── */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
