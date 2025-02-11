import React, { useEffect, useState, useRef } from 'react';
import { PokemonCard } from '../components/Card';
import { Pokemon } from '..//types';
import axios from 'axios';

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=20');
  }, []);

  useEffect(() => {
    if (lastPokemonRef.current) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };
      observer.current = new IntersectionObserver(handleObserver, options);
      if (lastPokemonRef.current) {
        observer.current.observe(lastPokemonRef.current);
      }
    }
  }, [pokemons]);

  const fetchPokemons = async (url: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setPokemons((prev) => [...prev, ...data.results]);
      setNextUrl(data.next);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
    setLoading(false);
  };

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting && nextUrl) {
      fetchPokemons(nextUrl);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {pokemons.map((pokemon, index) => (
        <div key={index} ref={index === pokemons.length - 1 ? lastPokemonRef : null}>
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
