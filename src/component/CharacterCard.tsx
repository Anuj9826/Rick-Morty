import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CharacterCard.css';

interface CharacterCardProps {
  character: any;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <Link to={`/character/${character.id}`}>View Profile</Link>
    </div>
  );
};

export default CharacterCard;
