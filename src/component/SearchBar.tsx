import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import './styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');
  const debouncedSearch = useRef(debounce((query) => onSearch(query), 300)).current;

  useEffect(() => {
    debouncedSearch(query);

    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" value={query} onChange={handleInputChange} placeholder={placeholder}/>
    </div>
  );
};

export default SearchBar;
