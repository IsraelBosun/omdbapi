import React, { useEffect, useState } from 'react';
import UseFetch from './UseFetch';
import Head from './Head';
import { ImSpinner2 } from 'react-icons/im';

const Home = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  // console.log(import.meta.env.VITE_OMDB_API_KEY);
  // console.log("Hello")



  const searchApi = `http://www.omdbapi.com/?s=${encodeURIComponent(search)}&apiKey=${import.meta.env.VITE_OMDB_API_KEY}`;
  const detailApi = `https://www.omdbapi.com/?i=`;

  const { loading, error, data } = UseFetch(searchApi);

  const movies = data;
  console.log(movies)

  useEffect(() => {
    const debounce = setTimeout(() => {
      const fetchMovieDetails = async () => {
        if (movies && movies.Search) {
          const filteredMovies = [];

          for (const movie of movies.Search) {
            const response = await fetch(detailApi + movie.imdbID + `&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);

            const data = await response.json();
            filteredMovies.push(data);
          }

          setFiltered(filteredMovies);
        }
      };

      fetchMovieDetails();
    }, 350);

    return () => {
      clearTimeout(debounce);
    };
  }, [movies, detailApi]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="px-9 text-white">
      <Head />

      <div className="flex my-9 pb-[3rem] items-center w-full justify-center">
        <input type="text" className="search_input  text-black max-w-[900px]" value={search} onChange={handleChange} />
      </div>

      {loading ? (
        <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[200px]" />
      ) : error ? (
        <div className="mx-auto  text-violet-700 text-3xl mt-[200px]">Movie Not Found</div>
      ) : (
        <div className="mt-9 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {filtered.map((movie) => (
            <div key={movie.imdbID} className="flex flex-col max-w-[300px]">
              <div className="">
                <img src={movie.Poster} alt="" className="rounded-xl" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 mt-3 items-center justify-between">
                  <p>{movie.Title}</p>
                  <p>{movie.Released}</p>
                </div>
                <button className="bg-blue-600 p-2 rounded-lg text-xl hover:bg-white hover:text-blue-600 " onClick={() => handleClick(movie)}>
                  view more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 transition duration-500">
          <div className="bg-white text-black p-6 max-w-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.Title}</h2>
            <p><span className='bold'>Director:</span> {selectedMovie.Director}</p>
            <p><span className='bold'>Genre:</span> {selectedMovie.Genre}</p>
            <p><span className='bold'>Plot:</span> {selectedMovie.Plot}</p>
            <p><span className='bold'>Rating:</span> {selectedMovie.imdbRating}/10</p>
            <button className="bg-blue-600 p-2 rounded-lg text-white mt-4" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;


