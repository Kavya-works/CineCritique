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

// pages/about.js
const About = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white py-8 px-4">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">About Us</h1>

      {/* Group Info Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Group Info</h2>
        <p className="text-lg mb-2">
          <span className="font-bold">Group no:</span> Group 13
        </p>
        <p className="text-lg">
          <span className="font-bold">Group members:</span> Saeed Bafana, Peace Gbadamosi, Kavya Shah
        </p>
      </div>

      {/* About Us Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-lg mb-4">
          Welcome to our CineCritique! Our platform provides detailed information about movies and TV shows, including:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li className="text-lg">
            <span className="font-bold">Movie Details:</span> Comprehensive information on movies, including plot summaries, cast details, release dates, and more.
          </li>
          <li className="text-lg">
            <span className="font-bold">Popular Movies:</span> A list of currently trending and popular movies.
          </li>
          <li className="text-lg">
            <span className="font-bold">Top Rated Movies:</span> An overview of the highest-rated movies based on user and critic reviews.
          </li>
          <li className="text-lg">
            <span className="font-bold">Popular TV Shows:</span> A collection of trending and popular TV shows.
          </li>
          <li className="text-lg">
            <span className="font-bold">Top Rated TV Shows:</span> Information on the top-rated TV shows according to reviews.
          </li>
        </ul>
        <p className="text-lg">
          We utilize TMDB&apos;s API to fetch the latest and most accurate data about movies and TV shows. Additionally, our platform allows you to search for any movie or TV show to find detailed information.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
        <div className="space-y-6">
          {/* Team Member 1 */}
          <div className="border border-gray-700 p-4 rounded-md">
            <h3 className="text-xl font-bold mb-2">Saeed Bafana</h3>
            <p className="text-lg mb-2">
              <span className="font-bold">Skills:</span> JavaScript, React, Node.js
            </p>
            <p className="text-lg">
              <span className="font-bold">Hobbies:</span> Hiking, Photography, Gaming
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="border border-gray-700 p-4 rounded-md">
            <h3 className="text-xl font-bold mb-2">Peace Gbadamosi</h3>
            <p className="text-lg mb-2">
              <span className="font-bold">Skills:</span> Python, Django, Data Analysis
            </p>
            <p className="text-lg">
              <span className="font-bold">Hobbies:</span> Reading, Traveling, Painting
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="border border-gray-700 p-4 rounded-md">
            <h3 className="text-xl font-bold mb-2">Kavya Shah</h3>
            <p className="text-lg mb-2">
              <span className="font-bold">Skills:</span> UI/UX Design, HTML, CSS
            </p>
            <p className="text-lg">
              <span className="font-bold">Hobbies:</span> Cooking, Yoga, Blogging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;