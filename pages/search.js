/********************************************************************************************
* WEB422 – Project
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Vercel URL: https://cine-critique-swart.vercel.app/
* Group member Name: Saeed Bafana, Peace Gbadamosi, Kavya Shah
* Student IDs: 146178223
* Date: 13 August 2024
*********************************************************************************************/

// pages/search.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const ITEMS_PER_PAGE = 12;

const Search = () => {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setLoading(true);
        setError('');
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
          },
        };
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query}`,
            options
          );
          setResults(response.data.results || []);
        } catch (error) {
          setError('Error fetching search results. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [query]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto my-12 px-4">
      <h1 className="text-warning text-center text-4xl font-bold mb-8">
        Search Results for {query}
      </h1>
      {loading && <div className="text-center text-white">Loading...</div>}
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {currentResults.length > 0 ? (
          currentResults.map((result) => (
            <div key={result.id}>
              <MovieCard movie={result} type={result.media_type} />
            </div>
          ))
        ) : (
          !loading && <p className="col-span-full text-center text-white">No results found</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-warning text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;