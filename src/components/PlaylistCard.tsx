import { motion } from "framer-motion";
import { Play, Music } from "lucide-react";
import { Playlist } from "@/types/music";
import { useMusic } from "@/context/MusicContext";
import { useState } from "react";

interface PlaylistCardProps {
  playlist: Playlist;
  index?: number;
  onClick: () => void;
}

export const PlaylistCard = ({ playlist, index = 0, onClick }: PlaylistCardProps) => {
  const { playSong } = useMusic();
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative bg-card/50 hover:bg-card rounded-xl p-4 transition-all duration-300 cursor-pointer"
    >
      <div className="relative mb-4">
        {playlist.songs.length > 0 ? (
          <img
            src={playlist.cover}
            alt={playlist.name}
            className="w-full aspect-square rounded-lg object-cover"
          />
        ) : (
          <div className="w-full aspect-square rounded-lg bg-muted/50 flex items-center justify-center">
            <Music className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full gradient-primary flex items-center justify-center glow-primary shadow-lg"
        >
          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
        </motion.button>
      </div>

      <h4 className="font-semibold truncate">{playlist.name}</h4>
      <p className="text-sm text-muted-foreground truncate mt-1">
        {playlist.songs.length} şarkı
      </p>
    </motion.div>
  );
};
