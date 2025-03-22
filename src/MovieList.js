import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNhZjRmYjMwZTRhZGVkYTBjYjI1MTQ3NGFhYTdkYSIsIm5iZiI6MTczODM1NDIxMy4zNDgsInN1YiI6IjY3OWQyZTI1MTc2ZmRiMjI0NGNiMjkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ug0aezZ5htnawKCPoADR0i-JxcDzj43sBX4NiKOKbvg";

export const fetchMovies = async (endpoint) => {
  const url = `${API_URL}${endpoint}`;
  const options = {
    headers: {
      Authorization: API_KEY,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTrendingMovies = () =>
  fetchMovies("/trending/movie/day?language=en-US");
export const fetchMovieDetails = (movieId) =>
  fetchMovies(`/movie/${movieId}?language=en-US`);
