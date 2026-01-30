import { motion } from "framer-motion";
import { Play, Pause, MoreHorizontal, Plus } from "lucide-react";
import { Song } from "@/types/music";
import { useMusic } from "@/context/MusicContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SongCardProps {
  song: Song;
  index?: number;
  variant?: "grid" | "list";
}

export const SongCard = ({ song, index = 0, variant = "grid" }: SongCardProps) => {
  const { currentSong, isPlaying, playSong, pauseSong, playlists, addSongToPlaylist } =
    useMusic();
  const [isHovered, setIsHovered] = useState(false);

  const isCurrentSong = currentSong?.id === song.id;
  const isCurrentlyPlaying = isCurrentSong && isPlaying;

  const handlePlayPause = () => {
    if (isCurrentlyPlaying) {
      pauseSong();
    } else {
      playSong(song);
    }
  };

  if (variant === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
          isCurrentSong ? "bg-primary/10" : "hover:bg-muted/50"
        }`}
      >
        <div className="w-8 text-center">
          {isHovered || isCurrentSong ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayPause}
              className="text-primary"
            >
              {isCurrentlyPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </motion.button>
          ) : (
            <span className="text-sm text-muted-foreground">{index + 1}</span>
          )}
        </div>

        <img
          src={song.cover}
          alt={song.title}
          className="w-10 h-10 rounded object-cover"
        />

        <div className="flex-1 min-w-0">
          <h4
            className={`font-medium truncate ${
              isCurrentSong ? "text-primary" : ""
            }`}
          >
            {song.title}
          </h4>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        </div>

        <span className="text-sm text-muted-foreground">{song.album}</span>

        <span className="w-12 text-sm text-muted-foreground text-right">
          {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all"
            >
              <MoreHorizontal className="w-5 h-5" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass border-border">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Plus className="w-4 h-4 mr-2" />
                Playlist'e Ekle
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="glass border-border">
                {playlists.map((playlist) => (
                  <DropdownMenuItem
                    key={playlist.id}
                    onClick={() => addSongToPlaylist(playlist.id, song)}
                  >
                    {playlist.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-card/50 hover:bg-card rounded-xl p-4 transition-all duration-300"
    >
      <div className="relative mb-4">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full aspect-square rounded-lg object-cover"
        />
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered || isCurrentlyPlaying ? 1 : 0,
            scale: isHovered || isCurrentlyPlaying ? 1 : 0.8,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlayPause}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full gradient-primary flex items-center justify-center glow-primary shadow-lg"
        >
          {isCurrentlyPlaying ? (
            <Pause className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
          )}
        </motion.button>
      </div>

      <h4 className={`font-semibold truncate ${isCurrentSong ? "text-primary" : ""}`}>
        {song.title}
      </h4>
      <p className="text-sm text-muted-foreground truncate mt-1">{song.artist}</p>
    </motion.div>
  );
};
