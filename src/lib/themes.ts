export const themes = {
  dawn: {
    name: 'Liquid Glass & Slate (Shiny Light Gray)',
    primary: '#1B4332', // Elegant Dark Forest Green Glass
    primaryLight: '#2D6A4F',
    secondary: '#40916C', // Sage
    accent: '#D4AF37', // Shiny Gold
    bg: '#ECEEF2', // Premium Modern Light Gray
    bgDark: '#0E1F18',
    card: 'rgba(255, 255, 255, 0.75)',
    text: '#0F172A', // High-contrast charcoal slate
    textMuted: '#475569', // Sophisticated slate gray
    border: 'rgba(255, 255, 255, 0.85)',
    badgeBg: '#1B4332',
    badgeText: '#FFFFFF',
    success: '#2D6A4F',
    ring1: '#1B4332',
    ring2: '#40916C',
    ring3: '#D4AF37',
  },
  cyber: {
    name: 'Midnight Pine (Refined Dark)',
    primary: '#40916C',
    primaryLight: '#52B788',
    secondary: '#74C69D',
    accent: '#D4AF37',
    bg: '#0D1E16', // Sophisticated deep evergreen, not harsh pitch black
    bgDark: '#08140E',
    card: '#162F24',
    text: '#F0FDF4',
    textMuted: '#A7C4B5',
    border: '#234435',
    badgeBg: '#1B4332',
    badgeText: '#D8F3DC',
    success: '#52B788',
    ring1: '#52B788',
    ring2: '#74C69D',
    ring3: '#D4AF37',
  },
  ayurvedic: {
    name: 'Ayurvedic Sandalwood',
    primary: '#244233', // Deep Herbal Olive Pine
    primaryLight: '#3B6B55',
    secondary: '#8C6239', // Warm Sandalwood
    accent: '#C59B27', // Turmeric Ochre
    bg: '#FAF8F3', // Warm Cream Linen
    bgDark: '#1C1A17',
    card: '#FFFFFF',
    text: '#1C1F1D',
    textMuted: '#5C5F5D',
    border: '#ECE6DC',
    badgeBg: '#244233',
    badgeText: '#FFFFFF',
    success: '#2E5E47',
    ring1: '#244233',
    ring2: '#8C6239',
    ring3: '#C59B27',
  },
} as const;

export type ThemeName = keyof typeof themes;
