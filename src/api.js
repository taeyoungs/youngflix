import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'e58a81dc501947f271b5a7d7fb46764f',
    language: 'en-US',
  },
});

export const movieApi = {
  nowPlaying: () => axios.get('movie/now_playing'),
  upcoming: () => axios.get('movie/upcoming'),
  popular: () => axios.get('movie/popular'),
  collection: id => axios.get(`collection/${id}`),
  search: term =>
    axios.get('search/movie', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  movieDetail: id =>
    axios.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
};

export const tvApi = {
  topRated: () => axios.get('tv/top_rated'),
  airingToday: () => axios.get('tv/airing_today'),
  popular: () => axios.get('tv/popular'),
  search: term =>
    axios.get('search/tv', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  tvDetail: id =>
    axios.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
};
