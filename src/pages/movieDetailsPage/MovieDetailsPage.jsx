import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNhZjRmYjMwZTRhZGVkYTBjYjI1MTQ3NGFhYTdkYSIsIm5iZiI6MTczODM1NDIxMy4zNDgsInN1YiI6IjY3OWQyZTI1MTc2ZmRiMjI0NGNiMjkzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ug0aezZ5htnawKCPoADR0i-JxcDzj43sBX4NiKOKbvg",
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <button onClick={() => window.history.back()}>Go back</button>  
      </div> 
      <div>
        <div> 
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
          /> 
        </div>
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>
    </>
  );
}

export default MovieDetailsPage;
