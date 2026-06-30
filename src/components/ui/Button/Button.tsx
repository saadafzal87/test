import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

// Discriminated union to support rendering as <a> or <button>
type ButtonProps =
  | (BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never })
  | (BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string });

/**
 * Polymorphic Button component.
 * Use `as="a"` with an `href` to render an accessible anchor.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  as: Tag = 'button',
  ...rest
}) => {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag className={classes} {...(rest as any)}>{children}</Tag>;
};

export default Button;
