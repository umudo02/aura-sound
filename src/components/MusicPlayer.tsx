import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  ListMusic,
} from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay, volume, setVolume, progress, setProgress } =
    useMusic();
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  if (!currentSong) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="h-24 glass border-t border-border/50 flex items-center justify-center"
      >
        <p className="text-muted-foreground">Çalmak için bir şarkı seçin</p>
      </motion.div>
    );
  }

  const currentTime = (progress / 100) * currentSong.duration;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="h-24 glass border-t border-border/50 px-4 flex items-center justify-between gap-4"
    >
      {/* Song Info */}
      <div className="flex items-center gap-3 w-72">
        <motion.img
          layoutId={`cover-${currentSong.id}`}
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{currentSong.title}</h4>
          <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`p-2 rounded-full transition-colors ${
            isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-primary" : ""}`} />
        </motion.button>
      </div>

      {/* Player Controls */}
      <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Shuffle className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center glow-primary"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary-foreground" />
            ) : (
              <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Repeat className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[progress]}
            onValueChange={(value) => setProgress(value[0])}
            max={100}
            step={0.1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(currentSong.duration)}
          </span>
        </div>
      </div>

      {/* Volume & Extra Controls */}
      <div className="w-72 flex items-center justify-end gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ListMusic className="w-5 h-5" />
        </motion.button>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMute}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {volume === 0 || isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </motion.button>
          <Slider
            value={[volume]}
            onValueChange={(value) => {
              setVolume(value[0]);
              setIsMuted(false);
            }}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </motion.div>
  );
};
