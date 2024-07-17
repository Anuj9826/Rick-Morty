import React, { useEffect, useState } from 'react';
import { getEpisodes } from '../api/api';
import EpisodeCard from './EpisodeCard';
import './styles/CharacterGrid.css';

interface EpisodeGridProps {
  searchQuery: string;
}

const EpisodeGrid: React.FC<EpisodeGridProps> = ({ searchQuery }) => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await getEpisodes(page, searchQuery);
        setEpisodes(response.data.results);
        setHasMore(response.data.results.length >= 20); // Check if there are 20 or more results
        setError(false);
      } catch(error) {
        setEpisodes([]);
        setHasMore(false);
        setError(true);
      };
    };
    fetchEpisodes();
  }, [page, searchQuery]);

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {error && <p style={{ textAlign: 'center', marginTop: '20px' }}>No Location Found</p>}
      {!error && (
        <>
          <div className='grid'>
            {episodes.map((episode: any) => (
              <EpisodeCard key={episode.id} episode={episode} />
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

export default EpisodeGrid;
