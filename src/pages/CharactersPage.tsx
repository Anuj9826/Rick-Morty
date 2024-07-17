import React, { useState } from 'react';
import SearchBar from '../component/SearchBar';
import CharacterFilter from '../component/CharacterFilter';
import CharacterGrid from '../component/CharacterGrid';

const CharactersPage: React.FC = () => {
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: { [key: string]: any }) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="characters-page">
      <div className="main-content">
        <SearchBar onSearch={handleSearch} placeholder="Search Character By Name"/>
        <CharacterFilter onFilterChange={handleFilterChange} />
        <CharacterGrid
          searchQuery={searchQuery}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default CharactersPage;
