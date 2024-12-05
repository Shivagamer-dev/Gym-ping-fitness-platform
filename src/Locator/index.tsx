import React, { useState } from 'react';
import gymLoc from './../assets/gymLoc.json';
import "./../App.css";

type GymsType = typeof gymLoc.Gyms;

function Locator() {
  const gyms: GymsType = gymLoc.Gyms;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('alphabet');
  const [hoveredGym, setHoveredGym] = useState<string | null>(null);

  const sortGyms = (gymsArray: string[]) => {
    switch (sortOption) {
      case 'ratingHighToLow':
        return gymsArray.sort((a, b) => parseInt(gyms[b as keyof GymsType].rating) - parseInt(gyms[a as keyof GymsType].rating));
      case 'ratingLowToHigh':
        return gymsArray.sort((a, b) => parseInt(gyms[a as keyof GymsType].rating) - parseInt(gyms[b as keyof GymsType].rating));
      case 'priceHighToLow':
        return gymsArray.sort((a, b) => parseInt(gyms[b as keyof GymsType].price) - parseInt(gyms[a as keyof GymsType].price));
      case 'priceLowToHigh':
        return gymsArray.sort((a, b) => parseInt(gyms[a as keyof GymsType].price) - parseInt(gyms[b as keyof GymsType].price));
      case 'alphabet':
      default:
        return gymsArray.sort((a, b) => a.localeCompare(b));
    }
  };

  const filteredGyms = Object.keys(gyms).filter((gymName) => {
    const gym = gyms[gymName as keyof GymsType];
    return (
      gymName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.equipments.some((equipment) =>
        equipment.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const sortedGyms = sortGyms(filteredGyms);

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 pt-12">
        Locate Your <span className="highlight-text font-extrabold text-4xl">Muscle-Assistant</span>
      </h1>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Gym Name, Address, or Equipment"
          className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="alphabet" className='font-bold'>Alphabetic Order</option>
          <optgroup label="Sort by Rating">
            <option value="ratingHighToLow">Rating: High to Low</option>
            <option value="ratingLowToHigh">Rating: Low to High</option>
          </optgroup>
          <optgroup label="Sort by Price">
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
          </optgroup>
        </select>
      </div>

      {sortedGyms.map((gymName) => {
        const gym = gyms[gymName as keyof GymsType];

        return (
          <div
            key={gymName}
            className="bg-white shadow-md rounded-lg p-4 transition-all duration-500 ease-in-out w-full max-w-3xl"
            onMouseEnter={() => setHoveredGym(gymName)}
            onMouseLeave={() => setHoveredGym(null)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{gymName}</h2>
              <div className="text-yellow-500 text-lg">
                {'★'.repeat(parseInt(gym.rating))}{' '}
                {'☆'.repeat(5 - parseInt(gym.rating))}
              </div>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <p>Contact: {gym.number}</p>
              <p className="ml-4">Price: ₹{gym.price}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Address: {gym.address}</p>
              <a
                href={gym.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Location
              </a>
            </div>

            {/* Equipment List with Smooth Expand */}
            <div
              className={`equipment-list transition-all duration-500 ease-in-out ${hoveredGym === gymName ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              style={{ overflow: 'hidden' }}
            >
              <h3 className="font-semibold text-gray-700 mt-2">Equipment:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {gym.equipments.map((equipment, idx) => (
                  <li key={idx}>{equipment}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Locator;