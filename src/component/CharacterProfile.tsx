import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterById, getLocationByUrl, getDataByUrl } from '../api/api';
import './styles/CharacterProfile.css';

const CharacterProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const characterResponse = await getCharacterById(Number(id));
        const characterData = characterResponse.data;

        const locationDetails = characterData.location.url
          ? await getLocationByUrl(characterData.location.url)
          : null;

        const episodeUrls = characterData.episode;
        const episodeDetails = await getDataByUrl(episodeUrls);

        // Sort episodes alphabetically by name
        episodeDetails.sort((a: any, b: any) => a.name.localeCompare(b.name));

        setCharacter(characterData);
        setLocation(locationDetails?.data);
        setEpisodes(episodeDetails);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>No Data Found</div>;
  }

  return (
    <div className="character-profile">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Status: {character.status}</p>
      <h3>Origin</h3>
      <p>Name: {character.origin.name}</p>
      <h3>Location</h3>
      <p>Name: {character.location.name}</p>
      {location && (
        <>
          <h3>Dimension</h3>
          <p>Name: {location.dimension}</p>
          <h3>Amount of Residents</h3>
          <p>Count: {location.residents.length}</p>
        </>
      )}
      <h3>Episodes</h3>
      <ul>
        {episodes.map((episode: any) => (
          <li key={episode.id}>
            <strong>{episode.name}</strong> - <em>{episode.air_date}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterProfile;
