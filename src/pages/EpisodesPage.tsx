import React, { useState } from 'react';
import SearchBar from '../component/SearchBar';
import EpisodeGrid from '../component/EpisodeGrid';

const EpisodesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="characters-page">
      <div className="main-content">
        <SearchBar onSearch={handleSearch} placeholder="Search Episode By Name"/>
        <EpisodeGrid
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default EpisodesPage;
