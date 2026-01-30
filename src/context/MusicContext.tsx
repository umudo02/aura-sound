import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Song, Playlist } from "@/types/music";
import { mockPlaylists } from "@/data/mockData";

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playlists: Playlist[];
  volume: number;
  progress: number;
  duration: number;
  showPlayer: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  createPlaylist: (name: string, description: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  closePlayer: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [volume, setVolumeState] = useState(70);
  const [progress, setProgressState] = useState(0);
  const [duration, setDurationState] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);

  const playSong = useCallback((song: Song) => {
    if (song.youtubeId) {
      setCurrentSong(song);
      setIsPlaying(true);
      setProgressState(0);
      setShowPlayer(true);
    }
  }, []);

  const pauseSong = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (currentSong) {
      setIsPlaying(prev => !prev);
    }
  }, [currentSong]);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(vol);
  }, []);

  const setProgress = useCallback((prog: number) => {
    setProgressState(prog);
  }, []);

  const setDuration = useCallback((dur: number) => {
    setDurationState(dur);
  }, []);

  const closePlayer = useCallback(() => {
    setShowPlayer(false);
    setIsPlaying(false);
    setCurrentSong(null);
  }, []);

  const createPlaylist = useCallback((name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      songs: [],
      createdAt: new Date(),
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  }, []);

  const addSongToPlaylist = useCallback((playlistId: string, song: Song) => {
    setPlaylists(prev =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: playlist.songs.filter((s) => s.id !== songId) }
          : playlist
      )
    );
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists(prev => prev.filter((p) => p.id !== playlistId));
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playlists,
        volume,
        progress,
        duration,
        showPlayer,
        playSong,
        pauseSong,
        togglePlay,
        setVolume,
        setProgress,
        setDuration,
        createPlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        deletePlaylist,
        closePlayer,
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
