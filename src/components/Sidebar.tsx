import { motion } from "framer-motion";
import { Home, Search, Library, Plus, Heart } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { useState } from "react";
import { CreatePlaylistDialog } from "./CreatePlaylistDialog";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onPlaylistSelect: (playlistId: string) => void;
}

// NØTEMusic Logo Component
const NoteLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(260, 85%, 60%)" />
        <stop offset="100%" stopColor="hsl(220, 90%, 55%)" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
    <text x="20" y="27" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Plus Jakarta Sans, sans-serif">Ø</text>
  </svg>
);

export const Sidebar = ({ activeView, onViewChange, onPlaylistSelect }: SidebarProps) => {
  const { playlists } = useMusic();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const navItems = [
    { id: "home", icon: Home, label: "Ana Sayfa" },
    { id: "search", icon: Search, label: "Ara" },
    { id: "library", icon: Library, label: "Kütüphane" },
  ];

  return (
    <>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 h-full glass flex flex-col p-4 space-y-6"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 glow-primary">
            <NoteLogo className="w-10 h-10" />
          </div>
          <span className="text-xl font-bold text-gradient">NØTEMusic</span>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                activeView === item.id
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Playlists Section */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-2 mb-4">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Playlistler
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCreateDialogOpen(true)}
              className="w-7 h-7 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewChange("liked")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeView === "liked"
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <div className="w-8 h-8 rounded-md gradient-accent flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-sm truncate">Beğenilen Şarkılar</span>
            </motion.button>

            {playlists.map((playlist) => (
              <motion.button
                key={playlist.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPlaylistSelect(playlist.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="font-medium text-sm truncate">{playlist.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.aside>

      <CreatePlaylistDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
};
