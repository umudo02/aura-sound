import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Music } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

interface CreatePlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePlaylistDialog = ({ open, onOpenChange }: CreatePlaylistDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { createPlaylist } = useMusic();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createPlaylist(name, description);
      setName("");
      setDescription("");
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md glass rounded-2xl p-6 z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Yeni Playlist Oluştur</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onOpenChange(false)}
                className="w-8 h-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl bg-muted/50 flex items-center justify-center">
                  <Music className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    placeholder="Playlist adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    autoFocus
                  />
                  <textarea
                    placeholder="Açıklama ekle (isteğe bağlı)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenChange(false)}
                  className="px-5 py-2.5 rounded-full font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  İptal
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 rounded-full font-medium gradient-primary text-primary-foreground glow-primary"
                >
                  Oluştur
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
