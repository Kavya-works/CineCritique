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

// pages/tv/[id].js
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../models/AuthContext';
import ConfirmationModal from '../../components/ConfirmationModal';

const TVShow = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [tvShow, setTvShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTVShow = async () => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`
          }
        };
        try {
          const tvShowResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, options);
          setTvShow(tvShowResponse.data);

          const creditsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, options);
          setCredits(creditsResponse.data);

          if (user) {
            const response = await fetch(`/api/watchlist/${user._id}`);
            const data = await response.json();
            const isInList = data.watchlist.some(item => item.tvShow.id === id);
            setIsInWatchlist(isInList);
          }
        } catch (error) {
          console.error('Error fetching TV show data:', error);
        }
      };
      fetchTVShow();
    }
  }, [id, user]);

  const handleAddToWatchlist = async () => {
    if (!user) {
      setError('Please log in to add TV shows to your watchlist');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, tvShow }),
      });

      if (response.ok) {
        setIsInWatchlist(true);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add TV show to watchlist');
      }
    } catch (error) {
      console.error('Error adding TV show to watchlist:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (!user) {
      setError('Please log in to remove TV shows from your watchlist');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/watchlist/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id, tvShowId: id }),
      });

      if (response.ok) {
        setIsInWatchlist(false);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to remove TV show from watchlist');
      }
    } catch (error) {
      console.error('Error removing TV show from watchlist:', error);
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

  if (!tvShow || !credits) return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;

  const creator = tvShow.created_by.map(creator => creator.name).join(', ');
  const actors = credits.cast.slice(0, 5).map(actor => actor.name).join(', ');

  return (
    <>
      <Head>
        <style>{`
          .background {
            background: url(https://image.tmdb.org/t/p/w500${tvShow.poster_path}) no-repeat center center fixed;
            background-size: cover;
            filter: blur(10px);
            -webkit-filter: blur(10px);
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
          }
          .backgroundOverlay {
            background: rgba(0, 0, 0, 0.7);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }
        `}</style>
      </Head>
      <div className="background"></div>
      <div className="backgroundOverlay"></div>
      <div className="container mx-auto my-10 px-4">
        <div className="bg-[#1c1c1c] text-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row h-full">
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
              className="w-full h-auto max-w-sm rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3 md:pl-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-yellow-400">{tvShow.name}</h1>
              <button
                className="text-2xl hover:text-red-600 transition-colors"
                onClick={handleHeartClick}
              >
                {isInWatchlist ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="flex-grow">
              <p className="mb-2"><strong className="font-semibold">Genre:</strong> {tvShow.genres.map(genre => genre.name).join(', ')}</p>
              <p className="mb-2"><strong className="font-semibold">Plot:</strong> {tvShow.overview}</p>
              <p className="mb-2"><strong className="font-semibold">Year:</strong> {new Date(tvShow.first_air_date).getFullYear()}</p>
              <p className="mb-2"><strong className="font-semibold">Rating:</strong> {tvShow.vote_average.toFixed(1)}</p>
              <p className="mb-2"><strong className="font-semibold">Runtime:</strong> {tvShow.episode_run_time[0]} min</p>
              <p className="mb-2"><strong className="font-semibold">Creator(s):</strong> {creator}</p>
              <p className="mb-2"><strong className="font-semibold">Actors:</strong> {actors}</p>
              <p className="mb-2"><strong className="font-semibold">Language:</strong> {tvShow.original_language}</p>
              <p className="mb-2"><strong className="font-semibold">Country:</strong> {tvShow.production_countries.map(country => country.name).join(', ')}</p>
              <p className="mb-2"><strong className="font-semibold">Box Office:</strong> {tvShow.revenue ? `$${tvShow.revenue.toLocaleString()}` : 'N/A'}</p>
              <p className="mb-2"><strong className="font-semibold">IMDb Votes:</strong> {tvShow.vote_count ? tvShow.vote_count.toLocaleString() : 'N/A'}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="mt-auto px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmRemove}
      />
      {error && (
        <div className="bg-red-500 text-white text-sm p-2 mt-2 rounded-md">
          {error}
        </div>
      )}
    </>
  );
};

export default TVShow;