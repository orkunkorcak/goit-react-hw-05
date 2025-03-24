import { useEffect, useState } from "react";
import { NavLink, useParams, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../MovieList";
import BackLink from "../../components/backLink/BackLink";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <BackLink
          to={backLinkHref}
          state={{
            query: location.state?.query,
            searchResults: location.state?.searchResults,
          }}
        >
          Go back
        </BackLink>
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
      <nav>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default MovieDetailsPage;
