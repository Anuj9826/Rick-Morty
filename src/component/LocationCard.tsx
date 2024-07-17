import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataByUrl } from '../api/api';

interface LocationCardProps {
  location: any;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const navigate = useNavigate();

  const handleViewCharacters = async () => {
    const characterUrls = location.residents;
    const characters = await getDataByUrl(characterUrls);
    navigate('/location/characters', { state: { characters } });
  };

  return (
    <div className= 'character-card'>
      <h3>{location.name}</h3>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      <button className='character-grid' onClick={handleViewCharacters}>
        View Characters By Location
      </button>
    </div>
  );
};

export default LocationCard;
