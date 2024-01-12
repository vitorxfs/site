import * as cheerio from 'cheerio';
import type MediumPost from '../../domain/Medium.domain';
import type { MediumAdapter } from './medium.service';

// https://medium.com/feed/@vitorsnx

class MediumRSSAdapter implements MediumAdapter {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getPosts(blogName: string): Promise<MediumPost[]> {
    const feed = await this.fetchFeed(blogName);
    const posts = this.scrapePosts(feed);

    return posts;
  }

  private async fetchFeed(blogName: string): Promise<Buffer> {
    const url = [this.baseUrl, blogName].join('/@');

    const response = await fetch(url);

    return Buffer.from(await response.arrayBuffer());
  }

  private scrapePosts(feed: Buffer): MediumPost[] {
    const $ = cheerio.load(feed);
    const $posts = $('item').toArray();

    return $posts.map((postEl) => {
      const $post = cheerio.load(postEl);
      const content = this.extractCDATA($post('content\\:encoded').text());

      return {
        title: this.extractCDATA($post('title').text()),
        description: this.getDescription(content, 15),
        url: $post('link').next().text(),
      };
    });
  }

  private getDescription(content: string, noOfWords: number): string {
    return content.split(' ').slice(0, noOfWords).join(' ') + '...';
  }

  private extractCDATA(value: string): string {
    return value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
  }
}

export default MediumRSSAdapter;
