import { MEDIUM_FEED_BASE_URL, YOUTUBE_FEED_BASE_URL } from '../env';
import MediumRSSAdapter from '../services/medium/medium-rss.adapter';
import { MediumService, type MediumAdapter } from '../services/medium/medium.service';
import YoutubeRSSAdapter from '../services/youtube/youtube-rss.adapter';
import YoutubeService, { type YoutubeAdapter } from '../services/youtube/youtube.service';

// Youtube Service
export function getYoutubeAdapter(): YoutubeAdapter {
  return new YoutubeRSSAdapter(YOUTUBE_FEED_BASE_URL);
}

export function getYoutubeService(): YoutubeService {
  const adapter = getYoutubeAdapter();

  return new YoutubeService(adapter);
}

// Medium Service
export function getMediumAdapter(): MediumAdapter {
  return new MediumRSSAdapter(MEDIUM_FEED_BASE_URL);
}

export function getMediumService(): MediumService {
  const adapter = getMediumAdapter();

  return new MediumService(adapter);
}
