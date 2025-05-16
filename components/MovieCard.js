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

// components/MovieCard.js
import Link from 'next/link';
import { useAuth } from '../models/AuthContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { useWatchlist } from '../context/WatchlistContext';

const MovieCard = ({ movie, type }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { watchlist, setWatchlist, fetchWatchlist } = useWatchlist();
  const [error, setError] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const linkPath = type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  const handleAddToWatchlist = async () => {
    if (!user) {
      setError('Please log in to add movies to your watchlist');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, movie }),
      });

      if (response.ok) {
        setIsInWatchlist(true);
        setError(null);
        fetchWatchlist(user._id); 
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add movie to watchlist');
      }
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (!user) {
      setError('Please log in to remove movies from your watchlist');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/watchlist/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, movieId: movie.id }),
      });

      if (response.ok) {
        setIsInWatchlist(false);
        setError(null);
        fetchWatchlist(user._id); 
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to remove movie from watchlist');
      }
    } catch (error) {
      console.error('Error removing movie from watchlist:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleHeartClick = () => {
    if (isInWatchlist) {
      setIsModalOpen(true);
    } else {
      handleAddToWatchlist();
    }
  };

  const confirmRemove = () => {
    handleRemoveFromWatchlist();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user && movie) {
      const isInList = watchlist.some(item => item.movie && item.movie.id === movie.id);
      setIsInWatchlist(isInList);
    }
  }, [user, movie.id, watchlist]);

  return (
    <div className="card bg-dark text-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
      <Link href={linkPath} passHref>
        <img
          src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}
          className="w-full h-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
          alt={movie?.title || movie?.name || 'Movie Poster'}
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h5 className="text-xl font-bold mb-2 truncate">{movie?.title || movie?.name || 'Untitled'}</h5>
        <div className="flex items-center justify-center mb-3">
          <img
            src="https://cdn2.iconfinder.com/data/icons/social-media-interface-2/24/social_media_user_interface_star_favorite_rating-64.png"
            alt="Star"
            width={16}
            height={16}
            className="mr-2"
          />
          <span className="text-yellow-400">Rating: {formatRating(movie?.vote_average)}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <Link href={linkPath} passHref>
            <button className="bg-yellow-500 text-gray-900 py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors">
              View Details
            </button>
          </Link>
          {user && (
            <div className="relative inline-block ml-2">
              <button
                className="text-2xl hover:text-red-600 transition-colors"
                onClick={handleHeartClick}
              >
                {isInWatchlist ? '❤️' : '🤍'}
              </button>
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="bg-red-500 text-white text-sm p-2 mt-2 rounded-md">
          {error}
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmRemove}
      />
    </div>
  );
};

export default MovieCard;