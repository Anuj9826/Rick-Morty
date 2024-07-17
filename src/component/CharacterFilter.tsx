import React, { useState, useEffect } from 'react';
import './styles/CharacterFilter.css';
import { getCharacters, getDataByUrl, processUniqueEpisodes } from '../api/api';

interface CharacterFilterProps {
  onFilterChange: (filters: { [key: string]: any }) => void;
}

const CharacterFilter: React.FC<CharacterFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    type: '',
    location: '',
    episode: '',
  });

  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [genderOptions, setGenderOptions] = useState<string[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<{ name: string; url: string }[]>([]);
  const [episodeOptions, setEpisodeOptions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchFilters() {
      try {
        // Fetch characters
        const response = await getCharacters(1, '', {});
        const characters = response.data.results;

        // Extract unique values for status, gender, species, and type
        const statuses = Array.from(new Set(characters.map((char: any) => char.status))).sort() as string[];
        const genders = Array.from(new Set(characters.map((char: any) => char.gender))).sort() as string[];
        const species = Array.from(new Set(characters.map((char: any) => char.species))).sort() as string[];
        const types = Array.from(new Set(characters.map((char: any) => char.type))).sort() as string[];

        // Update state with options
        setStatusOptions(['', ...statuses]);
        setGenderOptions(['', ...genders]);
        setSpeciesOptions(['', ...species]);
        setTypeOptions(['', ...types]);

        const locationNames = characters.map((character: { location: { name: string }; }) => character.location.name);
        const uniqueLocations = locationNames.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
        const sortedLocations = uniqueLocations.sort();
        const formattedLocations = sortedLocations.map((name: string) => ({ name }));
        setLocationOptions(formattedLocations);

        // Fetch episodes
        const filterEpisode = processUniqueEpisodes(characters);
        const episodes = await getDataByUrl(filterEpisode);
        setEpisodeOptions(episodes.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        throw new Error();
      }      
    }

    fetchFilters();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-bar">
      <select name="status" value={filters.status} onChange={handleInputChange}>
        <option value="">All Status</option>
        {statusOptions.map((option, index) =>
          option && option.trim() !== "" ? (
            <option key={index} value={option}>{option}</option>
          ) : null
        )}
      </select>
      <select name="gender" value={filters.gender} onChange={handleInputChange}>
        <option value="">All Genders</option>
        {genderOptions.map((option, index) =>
          option && option.trim() !== "" ? (
            <option key={index} value={option}>{option}</option>
          ) : null
        )}
      </select>

      <select name="species" value={filters.species} onChange={handleInputChange}>
        <option value="">All Species</option>
        {speciesOptions.map((option, index) =>
          option && option.trim() !== "" ? (
            <option key={index} value={option}>{option}</option>
          ) : null
        )}
      </select>

      <select name="type" value={filters.type} onChange={handleInputChange}>
        <option value="">All Types</option>
        {typeOptions.map((option, index) =>
          option && option.trim() !== "" ? (
            <option key={index} value={option}>{option}</option>
          ) : null
        )}
      </select>

      <select name="location" value={filters.location} onChange={handleInputChange}>
        <option value="">All Locations</option>
        {locationOptions.map((option, index) =>
          <option key={index} value={option.name}>{option.name}</option>
        )}
      </select>

      <select name="episode" value={filters.episode} onChange={handleInputChange}>
        <option value="">All Episodes</option>
        {episodeOptions.map((option, index) =>
          <option key={index} value={option.name}>{option.name}</option>
        )}
      </select>
    </div>
  );
};

export default CharacterFilter;
