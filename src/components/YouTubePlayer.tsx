import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Maximize2, Minimize2 } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  volume: number;
  onReady?: () => void;
  onStateChange?: (state: number) => void;
  onProgress?: (progress: number, duration: number) => void;
  onEnded?: () => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubePlayer = ({
  videoId,
  isPlaying,
  volume,
  onReady,
  onStateChange,
  onProgress,
  onEnded,
  onClose,
}: YouTubePlayerProps) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAPIReady, setIsAPIReady] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };
  }, []);

  // Initialize player when API is ready
  useEffect(() => {
    if (!isAPIReady || !videoId) return;

    // Destroy previous player if exists
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player("youtube-player", {
      height: "100%",
      width: "100%",
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        playsinline: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(volume);
          if (isPlaying) {
            event.target.playVideo();
          }
          onReady?.();
          startProgressTracking();
        },
        onStateChange: (event: any) => {
          onStateChange?.(event.data);
          if (event.data === window.YT.PlayerState.ENDED) {
            onEnded?.();
          }
        },
      },
    });

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isAPIReady, videoId]);

  // Handle play/pause
  useEffect(() => {
    if (!playerRef.current?.playVideo) return;

    if (isPlaying) {
      playerRef.current.playVideo();
      startProgressTracking();
    } else {
      playerRef.current.pauseVideo();
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  }, [isPlaying]);

  // Handle volume
  useEffect(() => {
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const startProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (duration > 0) {
          onProgress?.(currentTime, duration);
        }
      }
    }, 1000);
  };

  const seekTo = (seconds: number) => {
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(seconds, true);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed z-50 rounded-xl overflow-hidden shadow-2xl border border-border/50 ${
        isExpanded
          ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh]"
          : "bottom-28 right-4 w-80 h-48"
      }`}
      style={{
        background: "hsl(var(--card))",
      }}
    >
      {/* Controls overlay */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
        >
          {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* YouTube Player */}
      <div id="youtube-player" className="w-full h-full" />
    </motion.div>
  );
};

export const useYouTubePlayer = () => {
  const seekTo = (seconds: number) => {
    const player = (window as any).ytPlayer;
    if (player?.seekTo) {
      player.seekTo(seconds, true);
    }
  };

  return { seekTo };
};
