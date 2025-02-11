import React, { useState, useEffect } from 'react';
import { PokemonCard } from '../components/Card';
import { Pokemon } from '../types';


const Favorites = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        favorites.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))
      )}
    </div>
  );
};

export default Favorites;
