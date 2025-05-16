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

// pages/watchlist.js
import { useAuth } from '../models/AuthContext';
import { useEffect, useState } from 'react'; 
import MovieCard from '../components/MovieCard';
import ConfirmationModal from '../components/ConfirmationModal';
import { useWatchlist } from '../context/WatchlistContext';

const Watchlist = () => {
  const { user } = useAuth();
  const { watchlist, fetchWatchlist } = useWatchlist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (user) {
      fetchWatchlist(user._id);
    }
  }, [user, fetchWatchlist]);

  const handleHeartClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (selectedMovie) {
      try {
        const response = await fetch('/api/watchlist/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user._id, movieId: selectedMovie.id }),
        });

        if (response.ok) {
          fetchWatchlist(user._id);
        }
      } catch (error) {
        console.error('Error removing movie from watchlist:', error);
      }

      setIsModalOpen(false);
      setSelectedMovie(null);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-yellow-500 font-bold text-2xl">
          Please log in to view your watchlist.
        </p>
      </div>
    );
  }  

  return (
    <div className="container mx-auto my-12 px-4">
      <h1 className="text-warning text-center text-4xl font-bold mb-8">Your Watchlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            item.movie ? (
              <div key={item.movie.id}>
                <MovieCard
                  movie={item.movie}
                  isWatchlisted={true}
                  onHeartClick={() => handleHeartClick(item.movie)}
                />
              </div>
            ) : null
          ))
        ) : (
          <p className="col-span-full text-center text-white">Your watchlist is empty.</p>
        )}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};

export default Watchlist;