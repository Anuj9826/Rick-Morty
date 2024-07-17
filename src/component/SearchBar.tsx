import React, { useState } from 'react';
import './styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string; // Add a placeholder prop
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input type="text" value={query} onChange={handleInputChange} placeholder={placeholder}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
