import type { HeroConfig } from '../types';

export const heroConfig: HeroConfig = {
  headlineNormal: "Lorem ipsum ",
  headlineAccent: 'dolor ',
  headLineMiddle:'amet, consectetur',
  headlineSuffix: 'adipiscing elit',
  subtitle:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  primaryCta: { label: 'Buy Now', href: '#about-book' },
  // secondaryCta: { label: 'Learn More', href: '#features' },
  stats: [
    { value: '500K+', label: 'Copies Sold' },
    { value: '#1', label: 'Bestseller List' },
    { value: '4.9 Stars', label: 'Average Rating' },
  ],
};
