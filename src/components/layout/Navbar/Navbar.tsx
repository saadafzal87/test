import { type FC, type MouseEvent, useEffect, useState } from 'react';
import { navItems, navCta } from '../../../config/navigation.config';
import { useScrollSpy } from '../../../hooks/useScrollSpy';
import { Button } from '../../ui/Button/Button';
import styles from './Navbar.module.css';
import logo from '../../../assets/logo.png';

type NavItem = (typeof navItems)[number];

const sectionIds = navItems.map((item) => item.id);

const buildClassName = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ');

const scrollToSection = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

const createClickHandler =
  (href: string, setMenuOpen: (value: boolean) => void) =>
  (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(href);
    setMenuOpen(false);
  };

const renderNavItem = (
  item: NavItem,
  activeId: string | null,
  className: string,
  activeClass: string,
  tabIndex?: number,
  setMenuOpen?: (value: boolean) => void,
) => {
  const isActive = activeId === item.id;

  return (
    <li key={item.id}>
      <a
        href={item.href}
        className={buildClassName(className, isActive && activeClass)}
        onClick={setMenuOpen ? createClickHandler(item.href, setMenuOpen) : undefined}
        aria-current={isActive ? 'page' : undefined}
        tabIndex={tabIndex}
      >
        {item.label}
      </a>
    </li>
  );
};

export const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [activeId]);

  return (
    <header className={buildClassName(styles.header, scrolled && styles['header--scrolled'])}>
      <nav className={styles.nav} aria-label="Main navigation">
        <a
          href="#home"
          className={styles.logo}
          onClick={createClickHandler('#home', setMenuOpen)}
          aria-label="Go to home"
        >
          <img src={logo} alt="Logo" width={72} height={56} />
        </a>

        <ul className={styles.links} role="list">
          {navItems.map((item) => renderNavItem(item, activeId, styles.link, styles['link--active']))}
        </ul>

        <Button
          as="a"
          href={navCta.href}
          size="sm"
          className={styles.cta}
          onClick={createClickHandler(navCta.href, setMenuOpen)}
        >
          {navCta.label}
        </Button>

        <button
          type="button"
          className={buildClassName(styles.hamburger, menuOpen && styles['hamburger--open'])}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={buildClassName(styles.drawer, menuOpen && styles['drawer--open'])}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.drawerLinks} role="list">
          {navItems.map((item) =>
            renderNavItem(
              item,
              activeId,
              styles.drawerLink,
              styles['drawerLink--active'],
              menuOpen ? 0 : -1,
              setMenuOpen,
            ),
          )}
          <li>
            <Button
              as="a"
              href={navCta.href}
              size="md"
              className={styles.drawerCta}
              onClick={createClickHandler(navCta.href, setMenuOpen)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {navCta.label}
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
