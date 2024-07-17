import React, { useEffect, useState } from 'react';
import { getLocations } from '../api/api';
import LocationCard from './LocationCard';
import './styles/CharacterGrid.css';

interface LocationGridProps {
  searchQuery: string;
}

const LocationGrid: React.FC<LocationGridProps> = ({ searchQuery }) => {
  const [locations, setLocations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocations(page, searchQuery);
        setLocations(response.data.results);
        setHasMore(response.data.results.length >= 20); // Check if there are 20 or more results
        setError(false);
      } catch (error) {
        setLocations([]);
        setHasMore(false);
        setError(true);
      }
    }
    fetchLocations();
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
            {locations.map((location: any) => (
              <LocationCard key={location.id} location={location} />
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

export default LocationGrid;
