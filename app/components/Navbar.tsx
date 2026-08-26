'use client';

import StaggeredMenu, { StaggeredMenuItem, StaggeredMenuSocialItem } from '../bits/StaggeredMenu';
import ThemeToggle from './ThemeToggle';

const MENU_ITEMS: StaggeredMenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#hero' },
  { label: 'Work', ariaLabel: 'View work portfolio', link: '#work' },
  { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
  { label: 'Journey', ariaLabel: 'View my journey from school to present', link: '#journey' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const SOCIAL_ITEMS: StaggeredMenuSocialItem[] = [
  { label: 'GitHub', link: 'https://github.com/sakthivelan' },
  { label: 'LinkedIn', link: 'https://linkedin.com/in/sakthivelan' },
  { label: 'Twitter', link: 'https://twitter.com/sakthivelan' },
  { label: 'Dribbble', link: 'https://dribbble.com/sakthivelan' },
];

export default function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      items={MENU_ITEMS}
      socialItems={SOCIAL_ITEMS}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="var(--fg)"
      openMenuButtonColor="var(--fg)"
      changeMenuColorOnOpen={true}
      colors={['var(--surface)', 'var(--bg-secondary)']}
      accentColor="var(--accent)"
      isFixed
      logoText="SAKTHI"
      extraHeaderContent={<ThemeToggle />}
    />
  );
}
