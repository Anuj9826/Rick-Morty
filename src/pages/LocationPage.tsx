import React, { useState } from 'react';
import SearchBar from '../component/SearchBar';
import LocationGrid from '../component/LocationGrid';

const LocationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="characters-page">
      <div className="main-content">
        <SearchBar onSearch={handleSearch} placeholder='Search Location By Name'/>
        <LocationGrid
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default LocationsPage;