import { Song, Playlist } from "@/types/music";

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Nova",
    album: "Stellar Journey",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    duration: 234,
    playCount: 15420,
  },
  {
    id: "2",
    title: "Electric Pulse",
    artist: "Neon Waves",
    album: "Synthwave Chronicles",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    duration: 198,
    playCount: 28930,
  },
  {
    id: "3",
    title: "Ocean Breeze",
    artist: "Coastal Drift",
    album: "Horizon",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    duration: 267,
    playCount: 9872,
  },
  {
    id: "4",
    title: "Urban Nights",
    artist: "City Lights",
    album: "Metropolitan",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    duration: 312,
    playCount: 42150,
  },
  {
    id: "5",
    title: "Crystal Rain",
    artist: "Aurora Skies",
    album: "Ethereal",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    duration: 245,
    playCount: 18600,
  },
  {
    id: "6",
    title: "Velvet Shadows",
    artist: "Mystic Echo",
    album: "Dark Matter",
    cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
    duration: 289,
    playCount: 33200,
  },
  {
    id: "7",
    title: "Starlight Serenade",
    artist: "Cosmic Dust",
    album: "Nebula",
    cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop",
    duration: 276,
    playCount: 12890,
  },
  {
    id: "8",
    title: "Neon Paradise",
    artist: "Digital Dreams",
    album: "Cyberspace",
    cover: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&h=300&fit=crop",
    duration: 223,
    playCount: 56780,
  },
];

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Chill Vibes",
    description: "Relax and unwind with these smooth tracks",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    songs: [mockSongs[0], mockSongs[2], mockSongs[4]],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Night Drive",
    description: "Perfect soundtrack for late night adventures",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    songs: [mockSongs[1], mockSongs[3], mockSongs[5]],
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Focus Mode",
    description: "Concentration-boosting ambient sounds",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    songs: [mockSongs[6], mockSongs[7], mockSongs[0]],
    createdAt: new Date("2024-03-10"),
  },
];

export const recentlyPlayed: Song[] = [
  mockSongs[7],
  mockSongs[3],
  mockSongs[1],
  mockSongs[5],
  mockSongs[0],
];

export const recommendedSongs: Song[] = [
  mockSongs[2],
  mockSongs[4],
  mockSongs[6],
  mockSongs[1],
  mockSongs[7],
];

export const categories = [
  { id: "1", name: "Pop", color: "from-pink-500 to-rose-500" },
  { id: "2", name: "Rock", color: "from-orange-500 to-red-500" },
  { id: "3", name: "Electronic", color: "from-cyan-500 to-blue-500" },
  { id: "4", name: "Jazz", color: "from-amber-500 to-yellow-500" },
  { id: "5", name: "Classical", color: "from-emerald-500 to-teal-500" },
  { id: "6", name: "Hip Hop", color: "from-purple-500 to-violet-500" },
];
