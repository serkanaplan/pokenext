import React from 'react';
import { getPokemonList, getPokemonDetails } from '../../../lib/api';
import PokemonList from '../../components/PokemonList';
import Pagination from '../../components/Pagination';

interface PokemonPageProps {
  params: {
    page: string;
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const page = parseInt(params.page, 10);
  const limit = 20; // Her sayfada 20 Pokemon

  try {
    const { results, count } = await getPokemonList(page, limit);
    const totalPages = Math.ceil(count / limit);

    const pokemonDetails = await Promise.all(
      results.map((pokemon) => getPokemonDetails(pokemon.url))
    );

    console.log(pokemonDetails);
    return (
      <div className="min-h-screen animated-bg py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg">
            Pokémon World
          </h1>
          <PokemonList pokemons={pokemonDetails} />
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-red-400">Oops!</h1>
          <p className="text-xl text-gray-300">Pokemon verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
        </div>
      </div>
    );
  }
}