import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CharacterCard from '../component/CharacterCard';
import '../component/styles/CharacterGrid.css';

const LocationCharactersPage: React.FC = () => {
  const location = useLocation();
  const characters = location.state?.characters || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState(characters);
  const charactersPerPage = 20;

  const handleSearch = () => {
    const filtered = characters.filter((character: any) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
    setCurrentPage(1);
  };

  // Get current characters based on pagination
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}> Characters from Location </h2>
      <div className="search-bar">
        <input type="text" placeholder="Search Character By Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {currentCharacters.length > 0 ? (
        <div className='grid'>
          {currentCharacters.map((character: any) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No Character Found</p>
      )}
      <div className='pagination'>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} >
          Previous
        </button>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled = {currentPage === totalPages} >
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationCharactersPage;
