import type { YoutubeChannel } from '../../domain/Youtube.domain';

export interface YoutubeAdapter {
  getChannel(channelId: string): Promise<YoutubeChannel>;
}

export class YoutubeService {
  private adapter: YoutubeAdapter;

  constructor(adapter: YoutubeAdapter) {
    this.adapter = adapter;
  }

  async getChannel(channelId: string): Promise<YoutubeChannel> {
    return this.adapter.getChannel(channelId);
  }
}

export default YoutubeService;
