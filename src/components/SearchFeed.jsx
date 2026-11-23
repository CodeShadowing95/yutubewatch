import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { colors } from '../utils/theme';
import { Videos } from './';

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data?.items || []))
      .catch(() => setVideos([]));
  }, [searchTerm]);

  return (
    <Box component="main" sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, md: 4 }, pt: 3, pb: 6 }}>
      <Typography variant="h4" component="h1" sx={{ fontSize: { xs: 24, md: 32 } }}>
        Search results for: <span style={{ color: colors.accent }}>{searchTerm}</span> videos
      </Typography>
      <Typography sx={{ mt: 0.75, mb: 3, fontSize: 14, color: colors.textMuted }}>
        {Array.isArray(videos) ? `${videos.length} results` : 'Searching…'}
      </Typography>

      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
