import { Box, Skeleton, Stack, Typography } from '@mui/material';

import { VideoCard, ChannelCard } from './';
import { colors } from '../utils/theme';

const gridSx = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '28px 20px',
};

const LoadingGrid = ({ compact }) => (
  <Box sx={compact ? { display: 'flex', flexDirection: 'column', gap: 1.5 } : gridSx} aria-busy="true" aria-label="Loading videos">
    {Array.from({ length: compact ? 8 : 12 }).map((_, idx) =>
      compact ? (
        <Stack key={idx} direction="row" gap={1.5}>
          <Skeleton variant="rounded" sx={{ width: 168, height: 94, flexShrink: 0, borderRadius: '10px' }} />
          <Stack sx={{ flex: 1 }} gap={0.5}>
            <Skeleton width="90%" />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </Stack>
        </Stack>
      ) : (
        <Stack key={idx} gap={1.5}>
          <Skeleton variant="rounded" sx={{ width: '100%', height: 'auto', aspectRatio: '16 / 9', borderRadius: '12px' }} />
          <Stack direction="row" gap={1.5}>
            <Skeleton variant="circular" width={36} height={36} />
            <Stack sx={{ flex: 1 }}>
              <Skeleton width="90%" />
              <Skeleton width="55%" />
            </Stack>
          </Stack>
        </Stack>
      )
    )}
  </Box>
);

const Videos = ({ videos, direction }) => {
  const compact = direction === 'column';

  if (!Array.isArray(videos)) return <LoadingGrid compact={compact} />;

  // The search API also returns playlists, which have no card: keep only what can be shown.
  const items = videos.filter((item) => item?.id?.videoId || (!compact && item?.id?.channelId));

  if (!items.length) {
    return (
      <Box sx={{ py: 8, textAlign: 'center', color: colors.textMuted }}>
        <Typography sx={{ fontWeight: 600, color: colors.text }}>No videos found</Typography>
        <Typography sx={{ fontSize: 14, mt: 0.5 }}>Try another category or search term.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={compact ? { display: 'flex', flexDirection: 'column', gap: 0.5 } : gridSx}>
      {items.map((item, idx) => (
        <Box key={item?.id?.videoId || item?.id?.channelId || idx} sx={{ minWidth: 0 }}>
          {item.id.videoId && <VideoCard video={item} compact={compact} />}
          {item.id.channelId && !compact && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Box>
  );
};

export default Videos;
