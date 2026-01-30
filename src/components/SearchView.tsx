import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { SongCard } from "./SongCard";
import { mockSongs, categories } from "@/data/mockData";

export const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto scrollbar-hide p-6 pb-32"
    >
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Şarkı, sanatçı veya albüm ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-full bg-card border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg"
            autoFocus
          />
        </div>
      </div>

      {searchQuery ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Arama Sonuçları</h2>
          {filteredSongs.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredSongs.map((song, index) => (
                <SongCard key={song.id} song={song} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                "{searchQuery}" için sonuç bulunamadı
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Tüm Kategoriler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className={`relative overflow-hidden rounded-xl p-8 cursor-pointer bg-gradient-to-br ${category.color} aspect-[4/3]`}
              >
                <span className="font-bold text-2xl text-white">{category.name}</span>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};
