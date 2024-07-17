import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage';
import CharacterProfilePage from './pages/CharacterProfilePage';
import LocationsPage from './pages/LocationPage';
import EpisodesPage from './pages/EpisodesPage';
import LocationCharactersPage from './pages/LocationCharacterPage';
import EpisodeCharactersPage from './pages/EpisodeCharactersPage'
import Sidebar from './component/Sidebar';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/character" />} />
          <Route path="/character" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterProfilePage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/location/characters" element={<LocationCharactersPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/episode/characters" element={<EpisodeCharactersPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
