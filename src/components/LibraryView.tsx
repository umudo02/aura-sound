import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Grid, List, Music } from "lucide-react";
import { PlaylistCard } from "./PlaylistCard";
import { useMusic } from "@/context/MusicContext";
import { CreatePlaylistDialog } from "./CreatePlaylistDialog";

interface LibraryViewProps {
  onPlaylistSelect: (playlistId: string) => void;
}

export const LibraryView = ({ onPlaylistSelect }: LibraryViewProps) => {
  const { playlists } = useMusic();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 overflow-y-auto scrollbar-hide p-6 pb-32"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Kütüphanen</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground font-medium glow-primary"
            >
              <Plus className="w-4 h-4" />
              Playlist Oluştur
            </motion.button>
          </div>
        </div>

        {/* Playlists */}
        {playlists.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {playlists.map((playlist, index) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  index={index}
                  onClick={() => onPlaylistSelect(playlist.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onPlaylistSelect(playlist.id)}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-all"
                >
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{playlist.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Playlist • {playlist.songs.length} şarkı
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Music className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Henüz playlist yok</h3>
            <p className="text-muted-foreground mb-6">
              İlk playlistini oluşturarak başla!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-primary-foreground font-medium glow-primary"
            >
              <Plus className="w-5 h-5" />
              Playlist Oluştur
            </motion.button>
          </div>
        )}
      </motion.div>

      <CreatePlaylistDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
};
