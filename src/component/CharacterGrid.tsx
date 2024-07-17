import React, { useEffect, useState } from 'react';
import { getCharacters } from '../api/api';
import CharacterCard from './CharacterCard';
import './styles/CharacterGrid.css';

interface CharacterGridProps {
  searchQuery: string;
  filters: { [key: string]: any };
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ searchQuery, filters }) => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await getCharacters(page, searchQuery, filters);
        const fetchedCharacters = response.data.results;
        setCharacters(fetchedCharacters);
        setHasMore(fetchedCharacters.length >= 20); // Check if there are 20 or more results
        setError(false);
      } catch (error) {
        setCharacters([]);
        setHasMore(false);
        setError(true);
      }
    };

    fetchCharacters(); // Initial fetch when page, searchQuery, or filters change
  }, [page, searchQuery, filters]);

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {error && <p style={{ textAlign: 'center', marginTop: '20px' }}>No Character Found</p>}
      {!error && (
        <>
          <div className='grid'>
            {characters.map((character: any) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={!hasMore}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterGrid;
