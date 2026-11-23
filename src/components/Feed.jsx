import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { colors } from '../utils/theme';
import { Sidebar, Videos } from './';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data?.items || []))
      .catch(() => setVideos([]));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Box
        component="aside"
        sx={{
          flexShrink: 0,
          width: { xs: '100%', md: 248 },
          boxSizing: 'border-box',
          position: { md: 'sticky' },
          top: { md: 68 },
          height: { xs: 'auto', md: 'calc(100vh - 68px)' },
          overflowY: { md: 'auto' },
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 2, md: 1.5 },
          py: 2,
          borderRight: { md: `1px solid ${colors.border}` },
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <Typography
          variant="body2"
          sx={{ display: { xs: 'none', md: 'block' }, mt: 'auto', pt: 3, px: 1.5, fontSize: 12, lineHeight: 1.6, color: '#8A8A8A' }}
        >
          © {new Date().getFullYear()} WeTube
          <br />
          Built by Frank Patrick Namegni
        </Typography>
      </Box>

      <Box component="main" sx={{ flex: 1, minWidth: 0, px: { xs: 2, md: 4 }, pt: 3, pb: 6 }}>
        <Typography variant="h4" component="h1" sx={{ fontSize: { xs: 26, md: 34 } }}>
          {selectedCategory} <span style={{ color: colors.accent }}>Videos</span>
        </Typography>
        <Typography sx={{ mt: 0.75, mb: 3, fontSize: 14, color: colors.textMuted }}>
          Fresh uploads picked for the “{selectedCategory}” category
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
