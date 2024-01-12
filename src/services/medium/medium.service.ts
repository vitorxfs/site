import type MediumPost from '../../domain/Medium.domain';

export interface MediumAdapter {
  getPosts(blogName: string): Promise<MediumPost[]>;
}

export class MediumService {
  private adapter: MediumAdapter;

  constructor(adapter: MediumAdapter) {
    this.adapter = adapter;
  }

  async getPosts(blogName: string): Promise<MediumPost[]> {
    return this.adapter.getPosts(blogName);
  }
}

export default MediumService;
