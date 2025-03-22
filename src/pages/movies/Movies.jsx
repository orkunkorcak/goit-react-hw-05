import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovies } from "../../MovieList";

function Movies() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === "") return;
    try {
      const data = await fetchMovies(
        `/search/movie?query=${query}&language=en-US`
      );
      setSearchResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Movies;
