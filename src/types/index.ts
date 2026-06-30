
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  platform: 'facebook' | 'youtube' | 'linkedin' | 'twitter' | 'instagram';
  href: string;
  label: string;
}


export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  logoText: string;
}

export interface HeroConfig {
  headlineNormal: string;
  headLineMiddle:string;
  headlineAccent: string;
  headlineSuffix: string;
  subtitle: string;
  primaryCta: CtaButton;
  stats: HeroStat[];
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface FeaturesConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutConfig {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  primaryCta: CtaButton;
  bookTitle: string;
  bookSubtitle: string;
  bookImage?: string;
}

export interface FAQConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  email: string;
  phone?: string;
  socialLinks: SocialLink[];
}
