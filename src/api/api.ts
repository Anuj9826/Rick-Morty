import axios, { AxiosResponse } from 'axios';

interface Character {
  id: number;
  name: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: {
    name: string;
    url: string;
  };
  location?: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface ApiResponse {
  id: number;
  name: string;
  episode: string;
}

const API_URL = 'https://rickandmortyapi.com/api/';

export const getCharacters = async (page: number, searchQuery: string, filters: { [key: string]: any }) => {
  let url = `${API_URL}character?page=${page}`;
  if (searchQuery) url += `&name=${searchQuery}`;
  if (filters.status) url += `&status=${filters.status}`;
  if (filters.gender) url += `&gender=${filters.gender}`;
  if (filters.species) url += `&species=${filters.species}`;
  if (filters.type) url += `&type=${filters.type}`;
  if (filters.location) {
    const result = await getFilterByQuery(filters.location, 'location');
    return { data: { results: result } };
  }
  if (filters.episode) {
    const result = await getFilterByQuery(filters.episode, 'company');
    return { data: { results: result } };
  }
  const data = await axios.get(url);
  return data;
};

export const getFilterByQuery = async (data: string[], Endpoint: String) => {
  const url = Endpoint === 'location' ? `${API_URL}location?name=${data}` : `${API_URL}episode?name=${data}`;
  const apiForLocation = await axios.get(url);
  if (apiForLocation.data.results.length > 0) {
    const residents = Endpoint === 'location' ? apiForLocation.data.results[0].residents : apiForLocation.data.results[0].characters;
    const residentPromises = residents.map(async (residentUrl: string) => {
      const residentData = await axios.get(residentUrl);
      return residentData.data;
    });
    const data = await Promise.all(residentPromises);
    return data;
  } else {
    return [];
  }
}

export const getCharacterById = async (id: number) => {
  return await axios.get(`${API_URL}character/${id}`);
};

export const getLocations = async (page: number, searchQuery: string) => {
  let url = `${API_URL}location/?page=${page}`;
  if (searchQuery) url += `&name=${searchQuery}`;
  return await axios.get(url);
};

export const getLocationById = async (id: number) => {
  return await axios.get(`${API_URL}location/${id}`);
};

export const getLocationByUrl = async (url: string) => {
  return await axios.get(url);
}

export const getDataByUrl = async (apiUrl: string[]): Promise<ApiResponse[]> => {
  try {
    const episodePromises = apiUrl.map(url => axios.get<ApiResponse>(url));
    const responses: AxiosResponse<ApiResponse>[] = await Promise.all(episodePromises);
    return responses.map(response => response.data);
  } catch (error) {
    return [];
  }
};

export const getEpisodes = async (page: number, searchQuery: string) => {
  let url = `${API_URL}episode/?page=${page}`;
  if (searchQuery) url += `&name=${searchQuery}`;
  return await axios.get(url);
};

// Define the processUniqueEpisodes function
export const processUniqueEpisodes = (characters: Character[]) => {
  let allEpisodes: string[] = [];
  characters.forEach(character => {
    character.episode.forEach(url => {
      if (!allEpisodes.includes(url)) {
        allEpisodes.push(url);
      }
    });
  });

  const uniqueEpisodes = [...new Set(allEpisodes)];
  return uniqueEpisodes;
}