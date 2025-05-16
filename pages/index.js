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

// pages/index.js
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const useFetchMovies = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`
        }
      };
      try {
        const response = await axios.get(url, options);
        setData(response.data.results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

const Home = () => {
  const { data: topRatedMovies, loading: loadingTopRatedMovies, error: errorTopRatedMovies } = useFetchMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
  const { data: popularMovies, loading: loadingPopularMovies, error: errorPopularMovies } = useFetchMovies('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
  const { data: popularTVShows, loading: loadingPopularTVShows, error: errorPopularTVShows } = useFetchMovies('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1');
  const { data: topRatedTVShows, loading: loadingTopRatedTVShows, error: errorTopRatedTVShows } = useFetchMovies('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1');

  const settings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }), []);

  return (
    <div className="container mx-auto p-4">
      {errorTopRatedMovies || errorPopularMovies || errorPopularTVShows || errorTopRatedTVShows ? (
        <div className="text-red-500 text-center py-4">
          <p>Failed to load content. Please try again later.</p>
        </div>
      ) : (
        <>
          <div className="mt-3"> {}
            <h1 className="text-yellow-500 text-3xl font-bold mb-6 text-center">What to Watch</h1>

            <Section title="Popular Movies" loading={loadingPopularMovies} error={errorPopularMovies} data={popularMovies} settings={settings} />
            <Section title="Top Rated Movies" loading={loadingTopRatedMovies} error={errorTopRatedMovies} data={topRatedMovies} settings={settings} />
            <Section title="Popular TV Shows" loading={loadingPopularTVShows} error={errorPopularTVShows} data={popularTVShows} settings={settings} isTV />
            <Section title="Top Rated TV Shows" loading={loadingTopRatedTVShows} error={errorTopRatedTVShows} data={topRatedTVShows} settings={settings} isTV />
          </div>
        </>
      )}
    </div>
  );
};

const Section = ({ title, loading, error, data, settings, isTV }) => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold mb-2 text-yellow-400">{title}</h2>
    {loading ? (
      <p className="text-white text-center">Loading...</p>
    ) : error ? (
      <p className="text-red-500 text-center">Failed to load {title}. Please try again later.</p>
    ) : (
      <div className="carousel-container">
        <Slider {...settings}>
          {data.map((item) => (
            <div key={item.id} className="p-3">
              <MovieCard movie={item} type={isTV ? 'tv' : 'movie'} />
            </div>
          ))}
        </Slider>
      </div>
    )}
  </div>
);

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block', background: '#333', borderRadius: '50%' }}
      onClick={onClick}
      aria-label="Next slide"
    >
      <span style={{ color: '#fff' }}>&#8250;</span>
    </div>
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow`}
      style={{ ...style, display: 'block', background: '#333', borderRadius: '50%' }}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <span style={{ color: '#fff' }}>&#8249;</span>
    </div>
  );
}

export default Home;