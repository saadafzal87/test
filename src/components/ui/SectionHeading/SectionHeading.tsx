import React from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

/**
 * Consistent section heading with optional eyebrow label and subtitle.
 * Controlled entirely by props — no hard-coded strings.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) => (
  <div
    className={[
      styles.heading,
      styles[`heading--${align}`],
      light ? styles['heading--light'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
    <h2 className={styles.title}>{title}</h2>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

export default SectionHeading;
