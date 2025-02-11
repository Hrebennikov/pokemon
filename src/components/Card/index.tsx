import React, { useState } from 'react';
import { Pokemon } from '..//../types';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favorites: Pokemon[] = JSON.parse(savedFavorites);
      return favorites.some((fav) => fav.name === pokemon.name);
    }
    return false;
  });

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('favorites');
    let favorites: Pokemon[] = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.name !== pokemon.name);
    } else {
      favorites.push(pokemon);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={pokemon.image} alt={pokemon.name} className="w-full h-48 object-cover" />
      <h3 className="text-center mt-2 text-xl">{pokemon.name}</h3>
      <button
        onClick={toggleFavorite}
        className={`mt-4 w-full p-2 text-white ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} rounded`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export { PokemonCard };
