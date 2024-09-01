"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { PokemonDetails } from '../../lib/types';

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const playSound = () => {
    const audio = new Audio(pokemon.cries.latest);
    audio.play();
  };

  const getRandomGradient = () => {
    const colors = [
      'from-red-500 to-yellow-500',
      'from-green-500 to-blue-500',
      'from-purple-500 to-pink-500',
      'from-yellow-500 to-green-500',
      'from-blue-500 to-indigo-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-red-500',
      'from-teal-500 to-cyan-500',
      'from-orange-500 to-red-500',
      'from-lime-500 to-yellow-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const gradientClass = getRandomGradient();

  return (
    <div className={`group relative w-full ${isExpanded ? 'h-80' : 'h-56'} transition-all duration-500 ease-in-out overflow-hidden rounded-2xl shadow-lg hover:shadow-xl bg-gradient-to-br ${gradientClass}`}>
      <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      <div className="relative z-10 p-3 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-white capitalize truncate">{pokemon.name}</h2>
          <span className="text-sm font-semibold text-white opacity-70">#{pokemon.id}</span>
        </div>
        
        <div className="relative w-24 h-24 mx-auto my-2 transform group-hover:scale-110 transition-transform duration-300">
          <Image
            src={pokemon.sprites.other.showdown.front_default}
            alt={pokemon.name}
            layout="fill"
            objectFit="contain"
            className="drop-shadow-lg"
          />
        </div>
        
        <div className="flex justify-center space-x-1 mb-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold text-white`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={playSound}
            className="flex-1 py-1 text-sm bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white font-bold transition-colors duration-200"
          >
            Sound
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-80 p-2 transform translate-y-0 transition-transform duration-300">
          <h3 className="text-sm font-semibold text-white mb-2">Stats</h3>
          {pokemon.stats.map((stat, index) => (
            <div key={stat.stat.name} className="mb-1">
              <div className="flex justify-between text-xs text-white">
                <span>{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className={`bg-gradient-to-r from-blue-400 to-blue-600 rounded-full h-1 transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${(stat.base_stat / 255) * 100}%`,
                    animation: `growWidth 1s ease-out ${index * 0.1}s`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;