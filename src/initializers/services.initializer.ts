import { GITHUB_KEY, MEDIUM_FEED_BASE_URL, YOUTUBE_FEED_BASE_URL } from '../env';
import { MediumService, type MediumAdapter } from '../services/medium/medium.service';
import GithubService, { type GithubAdapter } from '../services/github/github.service';
import GithubServiceOctokitAdapter from '../services/github/github-octokit.adapter';
import MediumRSSAdapter from '../services/medium/medium-rss.adapter';
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

// Github Service
export function getGithubAdapter(): GithubAdapter {
  return new GithubServiceOctokitAdapter(GITHUB_KEY);
}

export function getGithubService(): GithubService {
  const adapter = getGithubAdapter();

  return new GithubService(adapter);
}
