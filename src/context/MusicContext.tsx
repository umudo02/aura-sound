import React, { createContext, useContext, useState, ReactNode } from "react";
import { Song, Playlist } from "@/types/music";
import { mockPlaylists, mockSongs } from "@/data/mockData";

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playlists: Playlist[];
  volume: number;
  progress: number;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  createPlaylist: (name: string, description: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  deletePlaylist: (playlistId: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [volume, setVolumeState] = useState(70);
  const [progress, setProgressState] = useState(0);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgressState(0);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
  };

  const setProgress = (prog: number) => {
    setProgressState(prog);
  };

  const createPlaylist = (name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      songs: [],
      createdAt: new Date(),
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const addSongToPlaylist = (playlistId: string, song: Song) => {
    setPlaylists(
      playlists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(
      playlists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: playlist.songs.filter((s) => s.id !== songId) }
          : playlist
      )
    );
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(playlists.filter((p) => p.id !== playlistId));
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playlists,
        volume,
        progress,
        playSong,
        pauseSong,
        togglePlay,
        setVolume,
        setProgress,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        deletePlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
