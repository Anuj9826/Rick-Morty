import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataByUrl } from '../api/api';

interface EpisodeCardProps {
  episode: any;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const navigate = useNavigate();
  
  const handleViewCharacters = async () => {
    const characterUrls = episode.characters;
    const characters = await getDataByUrl(characterUrls);
    navigate('/episode/characters', { state: { characters } });
  };

  return (
    <div className = 'character-card'>
      <h3>{episode.name}</h3>
      <p>Air Date: {episode.air_date}</p>
      <p>Episode: {episode.episode}</p>
      <button className='character-grid' onClick={handleViewCharacters}>
        View Character By Episode
      </button>
    </div>
  );
};

export default EpisodeCard;
