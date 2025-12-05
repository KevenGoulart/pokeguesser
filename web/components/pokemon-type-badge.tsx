type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dark"
  | "dragon"
  | "steel"
  | "fairy";

const typeStyles: Record<PokemonType, string> = {
  normal: "bg-neutral-400 text-white",
  fire: "bg-red-600 text-white",
  water: "bg-blue-600 text-white",
  electric: "bg-yellow-400 text-black",
  grass: "bg-green-600 text-white",
  ice: "bg-cyan-400 text-black",
  fighting: "bg-orange-800 text-white",
  poison: "bg-purple-600 text-white",
  ground: "bg-amber-800 text-white",
  flying: "bg-sky-400 text-black",
  psychic: "bg-pink-600 text-white",
  bug: "bg-lime-600 text-white",
  rock: "bg-stone-600 text-white",
  ghost: "bg-indigo-700 text-white",
  dark: "bg-amber-800 text-white",
  dragon: "bg-indigo-600 text-white",
  steel: "bg-slate-500 text-white",
  fairy: "bg-pink-300 text-black",
};

export default function PokemonTypeBadge({ type }: { type: PokemonType }) {
  const style = typeStyles[type] || "bg-gray-500 text-white";

  return (
    <span
      className={`px-1.5 py-0.5 rounded-full text-sm font-bold uppercase ${style}`}
    >
      {type}
    </span>
  );
}
