import { createTheme } from '@mui/material/styles';

// Design tokens shared by the whole app.
// The brand stays the same: black background and the KmerTube red.
export const colors = {
  background: '#0A0A0A',
  surface: '#141414',
  surfaceRaised: '#1A1A1A',
  surfaceHover: '#1F1F1F',
  border: '#1F1F1F',
  borderStrong: '#262626',
  text: '#FAFAFA',
  textSecondary: '#D4D4D4',
  textMuted: '#A3A3A3',
  accent: '#FC1503',
  accentSoft: 'rgba(252, 21, 3, 0.15)',
};

export const fonts = {
  body: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  heading: "'Space Grotesk', 'Inter', system-ui, sans-serif",
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.accent },
    background: { default: colors.background, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.textMuted },
    divider: colors.border,
  },
  typography: {
    fontFamily: fonts.body,
    h1: { fontFamily: fonts.heading },
    h2: { fontFamily: fonts.heading },
    h3: { fontFamily: fonts.heading },
    h4: { fontFamily: fonts.heading, fontWeight: 700, letterSpacing: '-0.03em' },
    h5: { fontFamily: fonts.heading, fontWeight: 600, letterSpacing: '-0.02em' },
    h6: { fontFamily: fonts.heading, fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiSkeleton: {
      styleOverrides: { root: { backgroundColor: colors.surfaceHover } },
    },
  },
});

export default theme;
