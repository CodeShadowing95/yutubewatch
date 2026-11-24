import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { CheckCircle, ThumbUpOutlined, VisibilityOutlined } from '@mui/icons-material';

import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { colors } from '../utils/theme';
import { avatarColor, decodeHtml, formatCount, initials, timeAgo } from '../utils/format';

const StatPill = ({ icon, label }) => (
  <Stack
    direction="row"
    alignItems="center"
    gap={1}
    sx={{ height: 38, px: 1.75, borderRadius: 999, backgroundColor: colors.surfaceRaised, border: `1px solid ${colors.borderStrong}`, fontSize: 13, fontWeight: 600 }}
  >
    {icon}
    {label}
  </Stack>
);

const VideoDetail = () => {
  const [videos, setVideos] = useState(null);
  const [videoDetail, setVideoDetail] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setVideoDetail(null);
    setVideos(null);
    setExpanded(false);

    const notCurrent = (items = []) => items.filter((item) => item?.id?.videoId && item.id.videoId !== id);

    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then(async (data) => {
        const detail = data?.items?.[0] || null;
        setVideoDetail(detail);

        // YouTube no longer supports `relatedToVideoId`, so "Up next" shows
        // the latest videos of the same channel instead.
        if (!detail?.snippet?.channelId) return setVideos([]);
        const related = await fetchFromAPI(`search?part=snippet&channelId=${detail.snippet.channelId}&order=date&type=video`);
        return setVideos(notCurrent(related?.items));
      })
      .catch(() => {
        setVideoDetail(null);
        setVideos([]);
      });
  }, [id]);

  const snippet = videoDetail?.snippet;
  const statistics = videoDetail?.statistics || {};
  const title = decodeHtml(snippet?.title);
  const channelTitle = decodeHtml(snippet?.channelTitle);
  const description = snippet?.description || '';

  return (
    <Box sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={3.5}>
        <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: { xs: '12px', md: '16px' }, overflow: 'hidden', backgroundColor: '#000', border: `1px solid ${colors.border}` }}
          >
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" width="100%" height="100%" controls />
          </Box>

          {!snippet ? (
            <Stack gap={1} sx={{ mt: 2 }}>
              <Skeleton width="70%" height={36} />
              <Skeleton width="40%" />
            </Stack>
          ) : (
            <>
              <Typography variant="h5" component="h1" sx={{ mt: 2.5, fontSize: { xs: 20, md: 24 }, lineHeight: 1.3 }}>
                {title}
              </Typography>

              <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={2} sx={{ mt: 2 }}>
                <Link to={`/channel/${snippet.channelId}`}>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Box
                      sx={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: avatarColor(channelTitle), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
                    >
                      {initials(channelTitle)}
                    </Box>
                    <Stack>
                      <Typography sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 15 }}>
                        {channelTitle}
                        <CheckCircle sx={{ fontSize: 14, color: colors.textMuted, ml: '6px' }} />
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: colors.textMuted }}>View channel</Typography>
                    </Stack>
                  </Stack>
                </Link>

                <Stack direction="row" gap={1}>
                  {statistics.viewCount && (
                    <StatPill icon={<VisibilityOutlined sx={{ fontSize: 18 }} />} label={`${formatCount(statistics.viewCount)} views`} />
                  )}
                  {statistics.likeCount && (
                    <StatPill icon={<ThumbUpOutlined sx={{ fontSize: 17 }} />} label={formatCount(statistics.likeCount)} />
                  )}
                </Stack>
              </Stack>

              <Box component="section" sx={{ mt: 2, p: 2, borderRadius: '14px', backgroundColor: colors.surface, border: `1px solid ${colors.border}` }}>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {statistics.viewCount && `${Number(statistics.viewCount).toLocaleString('en')} views · `}
                  {timeAgo(snippet.publishedAt)}
                </Typography>
                {description && (
                  <>
                    <Typography
                      className={expanded ? '' : 'line-clamp-2'}
                      sx={{ mt: 1, fontSize: 14, lineHeight: 1.6, color: colors.textSecondary, whiteSpace: 'pre-line', wordBreak: 'break-word' }}
                    >
                      {description}
                    </Typography>
                    <Button
                      onClick={() => setExpanded((value) => !value)}
                      sx={{ mt: 0.5, p: 0, minWidth: 0, color: colors.text, fontSize: 13, '&:hover': { background: 'transparent', color: colors.accent } }}
                    >
                      {expanded ? 'Show less' : 'Show more'}
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>

        <Box component="aside" aria-label="Up next" sx={{ width: { xs: '100%', lg: 400 }, flexShrink: 0 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1.5, fontSize: 18 }}>
            Up <span style={{ color: colors.accent }}>next</span>
          </Typography>
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
