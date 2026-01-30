import { motion } from "framer-motion";
import { ArrowLeft, Play, Shuffle, Clock, Trash2, MoreHorizontal } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { SongCard } from "./SongCard";
import { mockSongs } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlaylistViewProps {
  playlistId: string;
  onBack: () => void;
}

export const PlaylistView = ({ playlistId, onBack }: PlaylistViewProps) => {
  const { playlists, playSong, deletePlaylist, addSongToPlaylist } = useMusic();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Playlist bulunamadı</p>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0]);
    }
  };

  const handleDelete = () => {
    deletePlaylist(playlistId);
    onBack();
  };

  const totalDuration = playlist.songs.reduce((acc, song) => acc + song.duration, 0);
  const formatTotalDuration = () => {
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    if (hours > 0) {
      return `${hours} sa ${minutes} dk`;
    }
    return `${minutes} dk`;
  };

  // Get songs not in the playlist for suggestions
  const suggestedSongs = mockSongs.filter(
    (song) => !playlist.songs.find((s) => s.id === song.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto scrollbar-hide pb-32"
    >
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="relative p-6 pt-8">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Geri
          </motion.button>

          <div className="flex items-end gap-6">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={playlist.cover}
              alt={playlist.name}
              className="w-48 h-48 rounded-xl object-cover shadow-2xl"
            />
            <div className="flex-1">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Playlist
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{playlist.name}</h1>
              {playlist.description && (
                <p className="text-muted-foreground mb-3">{playlist.description}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{playlist.songs.length} şarkı</span>
                <span>•</span>
                <span>{formatTotalDuration()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayAll}
              disabled={playlist.songs.length === 0}
              className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Shuffle className="w-6 h-6" />
            </motion.button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MoreHorizontal className="w-6 h-6" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass border-border">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Playlisti Sil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="p-6">
        {playlist.songs.length > 0 ? (
          <>
            {/* Table Header */}
            <div className="flex items-center gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border/50 mb-2">
              <div className="w-8 text-center">#</div>
              <div className="w-10" />
              <div className="flex-1">Başlık</div>
              <div className="hidden md:block w-48">Albüm</div>
              <Clock className="w-4 h-4" />
              <div className="w-10" />
            </div>

            {/* Song Rows */}
            <div className="space-y-1">
              {playlist.songs.map((song, index) => (
                <SongCard key={song.id} song={song} index={index} variant="list" />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">Bu playlist henüz boş</p>
            <p className="text-sm text-muted-foreground">
              Aşağıdaki önerilerden şarkı ekleyebilirsin
            </p>
          </div>
        )}

        {/* Suggested Songs */}
        {suggestedSongs.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Önerilen Şarkılar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {suggestedSongs.slice(0, 5).map((song, index) => (
                <div key={song.id} className="relative group">
                  <SongCard song={song} index={index} />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addSongToPlaylist(playlistId, song)}
                    className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Ekle
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
