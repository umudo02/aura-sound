import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Clock, TrendingUp } from "lucide-react";
import { SongCard } from "./SongCard";
import { PlaylistCard } from "./PlaylistCard";
import { recentlyPlayed, recommendedSongs, categories } from "@/data/mockData";
import { useMusic } from "@/context/MusicContext";

interface HomeViewProps {
  onPlaylistSelect: (playlistId: string) => void;
}

export const HomeView = ({ onPlaylistSelect }: HomeViewProps) => {
  const { playlists } = useMusic();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Günaydın";
    if (hour < 18) return "İyi Günler";
    return "İyi Akşamlar";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto scrollbar-hide p-6 pb-32"
    >
      {/* Hero Section */}
      <section className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12"
        >
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{getGreeting()}</h1>
            <p className="text-lg text-foreground/70">
              Bugün ne dinlemek istersin?
            </p>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* Quick Access - Recently Played */}
      <section className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {recentlyPlayed.slice(0, 6).map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 bg-card/60 hover:bg-card rounded-lg overflow-hidden cursor-pointer transition-all group"
            >
              <img
                src={song.cover}
                alt={song.title}
                className="w-16 h-16 object-cover"
              />
              <span className="font-medium truncate pr-3">{song.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Played Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Son Dinlenenler</h2>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Tümünü Gör <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentlyPlayed.map((song, index) => (
            <SongCard key={song.id} song={song} index={index} />
          ))}
        </div>
      </section>

      {/* Recommended for You */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">Senin İçin Önerilen</h2>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Tümünü Gör <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recommendedSongs.map((song, index) => (
            <SongCard key={song.id} song={song} index={index} />
          ))}
        </div>
      </section>

      {/* Your Playlists */}
      {playlists.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Playlistlerin</h2>
            <motion.button
              whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Tümünü Gör <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
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
        </section>
      )}

      {/* Browse Categories */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-bold">Kategoriler</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`relative overflow-hidden rounded-xl p-6 cursor-pointer bg-gradient-to-br ${category.color}`}
            >
              <span className="font-bold text-lg text-white">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
