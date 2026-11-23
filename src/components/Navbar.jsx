import { Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';
import { colors, fonts } from '../utils/theme';
import SearchBar from './SearchBar';

const Navbar = () => (
  <Stack
    component="header"
    direction="row"
    alignItems="center"
    gap={2}
    sx={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      height: 68,
      px: { xs: 2, md: 3 },
      background: 'rgba(10, 10, 10, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${colors.border}`,
    }}
  >
    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }} aria-label="YuTubeWatch home">
      <img src={logo} alt="" height={28} width={40} />
      <Box
        component="span"
        sx={{ display: { xs: 'none', sm: 'inline' }, fontFamily: fonts.heading, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', color: colors.text }}
      >
        YuTube<span style={{ color: colors.accent }}>Watch</span>
      </Box>
    </Link>

    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
      <SearchBar />
    </Box>

    <Box sx={{ width: { xs: 0, md: 120 }, flexShrink: 0 }} />
  </Stack>
);

export default Navbar;
