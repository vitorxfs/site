import type { Contribution } from '../../domain/Github.domain';

export interface GithubAdapter {
  getContributions(user: string): Promise<Contribution[]>;
}

export class GithubService {
  private adapter: GithubAdapter;

  constructor(adapter: GithubAdapter) {
    this.adapter = adapter;
  }

  getContributions(user: string): Promise<Contribution[]> {
    return this.adapter.getContributions(user);
  }
}

export default GithubService;
