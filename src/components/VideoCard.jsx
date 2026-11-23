import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';
import { colors } from '../utils/theme';
import { avatarColor, decodeHtml, initials, timeAgo } from '../utils/format';

const LiveBadge = () => (
  <Box
    component="span"
    sx={{ position: 'absolute', left: 8, top: 8, px: 0.75, py: 0.25, borderRadius: '5px', backgroundColor: colors.accent, color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}
  >
    LIVE
  </Box>
);

const VideoCard = ({ video: { id: { videoId }, snippet }, compact = false }) => {
  const videoUrl = videoId ? `/video/${videoId}` : demoVideoUrl;
  const channelUrl = snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl;
  const title = decodeHtml(snippet?.title) || demoVideoTitle;
  const channelTitle = decodeHtml(snippet?.channelTitle) || demoChannelTitle;
  const published = timeAgo(snippet?.publishedAt);
  const thumbnail =
    (compact ? snippet?.thumbnails?.medium?.url : snippet?.thumbnails?.high?.url) ||
    snippet?.thumbnails?.high?.url ||
    demoThumbnailUrl;
  const isLive = snippet?.liveBroadcastContent === 'live';

  const thumb = (
    <Box
      className="video-thumb"
      sx={{
        position: 'relative',
        width: compact ? 168 : '100%',
        flexShrink: 0,
        aspectRatio: '16 / 9',
        borderRadius: compact ? '10px' : '12px',
        overflow: 'hidden',
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
      }}
    >
      <img src={thumbnail} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {isLive && <LiveBadge />}
    </Box>
  );

  if (compact) {
    return (
      <Link to={videoUrl} className="video-card">
        <Stack direction="row" gap={1.5} sx={{ p: 0.75, borderRadius: '12px', transition: 'background-color 0.2s ease', '&:hover': { backgroundColor: colors.surface } }}>
          {thumb}
          <Stack gap={0.5} sx={{ minWidth: 0 }}>
            <Typography className="line-clamp-2" sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35, color: colors.text }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: colors.textMuted }}>{channelTitle}</Typography>
            {published && <Typography sx={{ fontSize: 12, color: colors.textMuted }}>{published}</Typography>}
          </Stack>
        </Stack>
      </Link>
    );
  }

  return (
    <Stack gap={1.5} className="video-card">
      <Link to={videoUrl} aria-label={title}>
        {thumb}
      </Link>
      <Stack direction="row" gap={1.5}>
        <Link to={channelUrl} aria-label={channelTitle} style={{ flexShrink: 0 }}>
          <Box
            sx={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: avatarColor(channelTitle), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff' }}
          >
            {initials(channelTitle)}
          </Box>
        </Link>
        <Stack gap={0.5} sx={{ minWidth: 0 }}>
          <Link to={videoUrl}>
            <Typography className="video-title line-clamp-2" sx={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35, color: '#EDEDED' }}>
              {title}
            </Typography>
          </Link>
          <Link to={channelUrl}>
            <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 500, color: colors.textMuted, '&:hover': { color: colors.text } }}>
              {channelTitle}
              <CheckCircle sx={{ fontSize: 13, color: colors.textMuted, ml: '5px' }} />
            </Typography>
          </Link>
          {published && <Typography sx={{ fontSize: 13, color: colors.textMuted }}>{published}</Typography>}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default VideoCard;
