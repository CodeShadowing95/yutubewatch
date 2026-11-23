import { Box, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { demoProfilePicture } from '../utils/constants';
import { colors } from '../utils/theme';
import { decodeHtml, formatCount } from '../utils/format';

// Channel result shown inside video grids (search results, feeds).
const ChannelCard = ({ channelDetail }) => {
  const channelId = channelDetail?.id?.channelId || channelDetail?.id;
  const title = decodeHtml(channelDetail?.snippet?.title);
  const subscribers = formatCount(channelDetail?.statistics?.subscriberCount);

  return (
    <Link to={`/channel/${channelId}`}>
      <Box
        sx={{
          height: '100%',
          minHeight: 260,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          p: 3,
          textAlign: 'center',
          borderRadius: '16px',
          backgroundColor: '#0F0F0F',
          border: `1px solid ${colors.border}`,
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
          '&:hover': { backgroundColor: colors.surface, borderColor: colors.borderStrong },
        }}
      >
        <Box
          component="img"
          src={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
          alt=""
          sx={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${colors.borderStrong}` }}
        />
        <Typography sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 16, color: colors.text }}>
          {title}
          <CheckCircle sx={{ fontSize: 14, color: colors.textMuted, ml: '6px' }} />
        </Typography>
        <Typography sx={{ fontSize: 13, color: colors.textMuted }}>
          {subscribers ? `${subscribers} subscribers` : 'Channel'}
        </Typography>
      </Box>
    </Link>
  );
};

export default ChannelCard;
