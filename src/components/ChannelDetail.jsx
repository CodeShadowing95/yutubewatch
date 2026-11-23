import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { demoProfilePicture } from '../utils/constants';
import { colors } from '../utils/theme';
import { decodeHtml, formatCount } from '../utils/format';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setChannelDetail(null);
    setVideos(null);

    fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
      .then((data) => setChannelDetail(data?.items?.[0] || null))
      .catch(() => setChannelDetail(null));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items || []))
      .catch(() => setVideos([]));
  }, [id]);

  const snippet = channelDetail?.snippet;
  const statistics = channelDetail?.statistics || {};
  const subscribers = formatCount(statistics.subscriberCount);
  const videoCount = formatCount(statistics.videoCount);
  const meta = [
    snippet?.customUrl,
    subscribers && `${subscribers} subscribers`,
    videoCount && `${videoCount} videos`,
  ].filter(Boolean).join(' · ');

  return (
    <Box sx={{ maxWidth: 1360, mx: 'auto', px: { xs: 2, md: 4 }, pt: { xs: 2, md: 2.5 }, pb: 6 }}>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 140, md: 220 },
          borderRadius: { xs: '14px', md: '20px' },
          overflow: 'hidden',
          background: 'linear-gradient(132deg, rgb(0, 103, 154) 0%, rgb(0, 173, 239) 100%)',
        }}
      >
        <Box sx={{ position: 'absolute', right: -60, top: -80, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)' }} />
        <Box sx={{ position: 'absolute', right: 60, top: 40, width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }} />
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="flex-start"
        gap={{ xs: 1.5, sm: 3 }}
        sx={{ position: 'relative', mt: { xs: '-48px', md: '-84px' }, px: { xs: 1, md: 3 } }}
      >
        {snippet ? (
          <Box
            component="img"
            src={snippet?.thumbnails?.high?.url || demoProfilePicture}
            alt=""
            sx={{ position: 'relative', width: { xs: 96, md: 148 }, height: { xs: 96, md: 148 }, borderRadius: '50%', objectFit: 'cover', border: `6px solid ${colors.background}`, backgroundColor: colors.surface }}
          />
        ) : (
          <Skeleton variant="circular" sx={{ position: 'relative', width: { xs: 96, md: 148 }, height: { xs: 96, md: 148 }, border: `6px solid ${colors.background}` }} />
        )}

        <Stack gap={0.75} sx={{ pt: { sm: '60px', md: '100px' }, minWidth: 0 }}>
          {snippet ? (
            <>
              <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', fontSize: { xs: 26, md: 34 } }}>
                {decodeHtml(snippet.title)}
                <CheckCircle sx={{ fontSize: 20, color: colors.textMuted, ml: 1.25 }} />
              </Typography>
              {meta && <Typography sx={{ fontSize: 14, color: colors.textMuted }}>{meta}</Typography>}
              {snippet.description && (
                <Typography className="line-clamp-2" sx={{ fontSize: 14, lineHeight: 1.55, color: colors.textSecondary, maxWidth: 640 }}>
                  {snippet.description}
                </Typography>
              )}
            </>
          ) : (
            <>
              <Skeleton width={260} height={44} />
              <Skeleton width={200} />
            </>
          )}
        </Stack>
      </Stack>

      <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${colors.border}` }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2.5, fontSize: 22 }}>
          Latest <span style={{ color: colors.accent }}>uploads</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
