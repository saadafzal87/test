import React from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './AnimatedSection.module.css';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: 'up' | 'left' | 'right' | 'none';
}

/**
 * Wraps any content in a fade/slide-in animation triggered on scroll.
 * Uses IntersectionObserver — zero layout shift before animation fires.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={[
        styles.wrapper,
        styles[`wrapper--${direction}`],
        isVisible ? styles['wrapper--visible'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
