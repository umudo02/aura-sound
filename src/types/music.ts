export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  playCount: number;
  youtubeId?: string; // YouTube video ID for playback
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: Song[];
  createdAt: Date;
}

export interface MusicCategory {
  id: string;
  name: string;
  color: string;
}
