import type { FC, MouseEvent } from 'react';
import { heroConfig } from '../../config/hero.config';
import { contactConfig } from '../../config/contact.config';
import mainCover from '../../assets/main.png';
import { Button } from '../../components/ui/Button/Button';
import styles from './Hero.module.css';

type SocialLink = (typeof contactConfig.socialLinks)[number];

const socialIconMap = {
  facebook: 'f',
  youtube: '▶',
  linkedin: 'in',
  twitter: '𝕏',
  instagram: '◈',
} as const;

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

const getSocialIcon = (platform: SocialLink['platform']) =>
  socialIconMap[platform] ?? platform.charAt(0);

const renderSocialLink = (link: SocialLink) => (
  <a
    key={link.platform}
    href={link.href}
    className={styles.socialLink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={link.label}
  >
    {getSocialIcon(link.platform)}
  </a>
);

export const Hero: FC = () => {
  const {
    headlineNormal,
    headlineAccent,
    headLineMiddle,
    headlineSuffix,
    subtitle,
    primaryCta,
  } = heroConfig;

  return (
    <section id="home" className={styles.hero} aria-label="Hero">
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            <span className={styles.headlineNormal}>
              {headlineNormal}
              <span className={styles.headlineAccent}>{headlineAccent}</span>
            </span>
            <span>{headLineMiddle}</span>
            {headlineSuffix && <span className={styles.headlineNormal}>{headlineSuffix}</span>}
          </h1>

          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.actions}>
            <Button
              as="a"
              href={primaryCta.href}
              size="lg"
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                scrollTo(primaryCta.href);
              }}
            >
              {primaryCta.label}
            </Button>
          </div>

          <div className={styles.socialLinks} aria-label="Follow on social media">
            {contactConfig.socialLinks.map(renderSocialLink)}
          </div>
        </div>

        <div className={styles.bookWrapper} aria-hidden="true">
              <img src={mainCover} alt="Book cover" className={styles.bookCoverImage} />
          </div>
        </div>

    </section>
  );
};

export default Hero;
