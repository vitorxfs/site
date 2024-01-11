import { YOUTUBE_FEED_BASE_URL } from '../env';
import YoutubeRSSAdapter from '../services/youtube/youtube-rss.adapter';
import YoutubeService, { type YoutubeAdapter } from '../services/youtube/youtube.service';

export function getYoutubeAdapter(): YoutubeAdapter {
  return new YoutubeRSSAdapter(YOUTUBE_FEED_BASE_URL);
}

export function getYoutubeService(): YoutubeService {
  const adapter = getYoutubeAdapter();

  return new YoutubeService(adapter)
}
