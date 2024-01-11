export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface YoutubeVideo {
  title: string;
  thumbnail: Thumbnail;
  url: string;
}

export interface YoutubeChannel {
  title: string;
  url: string;
  videos: YoutubeVideo[];
}
