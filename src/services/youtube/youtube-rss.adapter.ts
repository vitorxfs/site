import type { YoutubeChannel, YoutubeVideo } from '../../domain/Youtube.domain';
import type { YoutubeAdapter } from './youtube.service';

import * as cheerio from 'cheerio';

export class YoutubeRSSAdapter implements YoutubeAdapter {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getChannel(channelId: string): Promise<YoutubeChannel> {
    const feed = await this.fetchFeed(channelId);
    const youtubeChannel = this.scrapeChannelData(feed);

    return youtubeChannel
  }

  private async fetchFeed(channelId: string): Promise<Buffer> {
    const url = [this.baseUrl, channelId].join('');

    const response = await fetch(url);

    return Buffer.from(await response.arrayBuffer());
  }

  private scrapeChannelData(feed: Buffer): YoutubeChannel {
    const $ = cheerio.load(feed);

    console.log()

    const channelData: YoutubeChannel = {
      title: $('feed > title:first').text(),
      url: $('feed > link[rel="alternate"]:first').attr('href') || '',
      videos: $('feed > entry').toArray().map(($video) => this.scrapeVideoData(cheerio.load($video)))
    }

    return channelData;
  }

  private scrapeVideoData($: cheerio.CheerioAPI): YoutubeVideo {
    const $thumbnail = $('media\\:group').find('media\\:thumbnail');

    const videoData: YoutubeVideo = {
      thumbnail: {
        url: $thumbnail.attr('url') || '',
        height: Number($thumbnail.attr('height')),
        width: Number($thumbnail.attr('width'))
      },
      title: $('title:first').text(),
      url: $('link[rel="alternate"]:first').attr('href') || '',
    }

    return videoData;
  }

}

export default YoutubeRSSAdapter;
