import type { FC, MouseEvent } from 'react';
import { navItems } from '../../../config/navigation.config';
import { contactConfig } from '../../../config/contact.config';
import { siteConfig } from '../../../config/site.config';
import styles from './Footer.module.css';
import logo from '../../../assets/logo.png';

type NavItem = (typeof navItems)[number];
type SocialLink = (typeof contactConfig.socialLinks)[number];

const socialIconMap = {
  facebook: 'f',
  youtube: '▶',
  linkedin: 'in',
  twitter: '𝕏',
  instagram: '◈',
} as const;

const getSocialIcon = (platform: SocialLink['platform']) =>
  socialIconMap[platform] ?? platform.charAt(0);

const scrollToSection = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

const handleAnchorClick =
  (href: string) =>
  (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(href);
  };

const renderNavItem = (item: NavItem) => (
  <li key={item.id}>
    <a href={item.href} className={styles.navLink} onClick={handleAnchorClick(item.href)}>
      {item.label}
    </a>
  </li>
);

const renderSocialLink = (link: SocialLink) => (
  <a
    key={link.platform}
    href={link.href}
    aria-label={link.label}
    className={styles.socialLink}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className={styles.socialIcon}>{getSocialIcon(link.platform)}</span>
  </a>
);

const currentYear = new Date().getFullYear();

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.brand}>
        <a href="#home" className={styles.logo} onClick={handleAnchorClick('#home')}>
          <img src={logo} alt="Logo" width={72} height={56} />
        </a>
        <p className={styles.tagline}>
          A work of Jesuit spirituality rooted in Scripture, the Ignatian Exercises, and a lifetime of priestly mission — for all who seek God with open hearts
        </p>
        <p className={styles.socialsLabel}>Socials</p>
        <div className={styles.socials}>{contactConfig.socialLinks.map(renderSocialLink)}</div>
      </div>

      <nav className={styles.nav} aria-label="Footer navigation">
        <p className={styles.navTitle}>Navigate</p>
        <ul className={styles.navList} role="list">
          {navItems.map(renderNavItem)}
        </ul>
      </nav>

      <div className={styles.contact}>
        <p className={styles.contactTitle}>Contact Us</p>
        {contactConfig.phone && (
          <a href={`tel:${contactConfig.phone}`} className={styles.contactLink}>
            {contactConfig.phone}
          </a>
        )}
        <a href={`mailto:${contactConfig.email}`} className={styles.contactLink}>
          {contactConfig.email}
        </a>
      </div>
    </div>

    <div className={styles.bottom}>
      <p>© {currentYear} {siteConfig.author}. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
