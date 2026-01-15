import { useEffect, useState } from "react";
import { PokeAPI } from "./api";

type PokemonCardData = {
  id: number;
  name: string;
  image: string;
};

async function fetchCartData(): Promise<PokemonCardData[]> {
  const response = await PokeAPI.listPokemons(0, 21);

  const detailedPokemons = await Promise.all(
    response.results.map(async (item, idx) => {
      const details = await PokeAPI.getPokemonByName(item.name);

      return {
        id: idx,
        name: item.name,
        image:
          details.sprites.other?.["official-artwork"].front_default ?? "",
      };
    })
  );

  return detailedPokemons;
}

export const Card = ({
  image,
  title,
}: {
  image?: string;
  title?: string;
}) => {
  return (
    <div className="bg-white w-60 flex flex-col rounded-xl shadow-md overflow-hidden">
      {image && (
        <img
          src={image}
          alt={title || ""}
          className="w-full h-48 object-contain p-4"
        />
      )}
      {title && (
        <p className="p-4 text-center font-semibold capitalize">{title}</p>
      )}
    </div>
  );
};

export const Root = () => {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartData().then((data) => {
      setPokemons(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="p-10 text-xl">Loading Pokémon…</p>;
  }

  return (
    <div className="p-10 flex flex-wrap gap-6">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          title={pokemon.name}
          image={pokemon.image}
        />
      ))}
    </div>
  );
};
