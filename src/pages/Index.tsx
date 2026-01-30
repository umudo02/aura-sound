import { useState } from "react";
import { MusicProvider } from "@/context/MusicContext";
import { Sidebar } from "@/components/Sidebar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { HomeView } from "@/components/HomeView";
import { SearchView } from "@/components/SearchView";
import { LibraryView } from "@/components/LibraryView";
import { PlaylistView } from "@/components/PlaylistView";

const MusicApp = () => {
  const [activeView, setActiveView] = useState("home");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedPlaylistId(null);
  };

  const handlePlaylistSelect = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    setActiveView("playlist");
  };

  const handleBackFromPlaylist = () => {
    setSelectedPlaylistId(null);
    setActiveView("library");
  };

  const renderMainContent = () => {
    if (activeView === "playlist" && selectedPlaylistId) {
      return (
        <PlaylistView
          playlistId={selectedPlaylistId}
          onBack={handleBackFromPlaylist}
        />
      );
    }

    switch (activeView) {
      case "home":
        return <HomeView onPlaylistSelect={handlePlaylistSelect} />;
      case "search":
        return <SearchView />;
      case "library":
        return <LibraryView onPlaylistSelect={handlePlaylistSelect} />;
      default:
        return <HomeView onPlaylistSelect={handlePlaylistSelect} />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeView={activeView}
          onViewChange={handleViewChange}
          onPlaylistSelect={handlePlaylistSelect}
        />
        {renderMainContent()}
      </div>
      <MusicPlayer />
    </div>
  );
};

const Index = () => {
  return (
    <MusicProvider>
      <MusicApp />
    </MusicProvider>
  );
};

export default Index;
