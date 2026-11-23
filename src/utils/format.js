// Small helpers to display API data nicely.

// The API returns titles with HTML entities (&#39;, &amp;, ...).
export const decodeHtml = (text = '') => {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const UNITS = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
];

export const timeAgo = (isoDate) => {
  if (!isoDate) return '';
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (Number.isNaN(seconds)) return '';
  for (const [unit, size] of UNITS) {
    const value = Math.floor(seconds / size);
    if (value >= 1) return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
  }
  return 'just now';
};

export const formatCount = (value) => {
  const number = Number(value);
  if (!value || Number.isNaN(number)) return '';
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(number);
};

const AVATAR_COLORS = ['#B91C1C', '#1D4ED8', '#7C3AED', '#0F766E', '#C2410C', '#BE185D', '#A16207', '#525252'];

// A stable color per channel, used when the API gives no channel picture.
export const avatarColor = (name = '') => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) % 997;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
