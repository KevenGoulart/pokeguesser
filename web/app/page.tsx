"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { IoReloadCircle } from "react-icons/io5";
import { toast } from "sonner";
import Leaderboard from "../components/leaderboard";
import PokemonTypeBadge from "../components/pokemon-type-badge";
import { Input } from "../components/ui/input";
import formatHeight from "@/lib/format-height";
import formatWeight from "@/lib/format-weight";
import { addToLeaderboard } from "@/services/leaderboard";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();

  const [guess, setGuess] = useState("");
  const [points, setPoints] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  async function getRandomPokemon() {
    const id = Math.floor(Math.random() * 1025 + 1);

    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return data;
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["random-pokemon"],
    queryFn: getRandomPokemon,
  });

  async function handleSubmit() {
    if (!data) return;

    if (guess.toLowerCase().trim() === data.name.toLowerCase()) {
      toast.success("Acertou!");
      refetch();
      setGuess("");
      setPoints(points + 1);
    } else {
      toast.error(`Errou! Era ${data.name}`);

      if (points > bestScore) {
        setBestScore(points);

        await addToLeaderboard(playerName, points);

        queryClient.invalidateQueries({ queryKey: ["leaderboard"] });

        toast.success("Novo recorde enviado ao ranking!");
      }

      refetch();
      setGuess("");
      setPoints(0);
    }
  }

  function handleReload() {
    refetch();
    setGuess("");
    setPoints(0);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 relative">
      <h1 className="text-center mt-6 font-semibold text-6xl">PokeGuesser</h1>

      {isLoading && (
        <p className="text-2xl font-semibold my-6">Carregando...</p>
      )}

      {!gameStarted && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!playerName.trim()) {
              toast.error("Digite seu nome para começar!");
              return;
            }

            setGameStarted(true);
          }}
          className="flex flex-col gap-3 mt-10"
        >
          <h2 className="text-xl font-semibold text-center">
            Digite seu nome para começar
          </h2>

          <Input
            placeholder="Seu nome..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="text-center"
          />
        </form>
      )}

      {gameStarted && data && (
        <div className="mb-4">
          <Image
            src={data.sprites.front_default}
            alt={data.name}
            width={300}
            height={300}
            className="border border-white/20 rounded-[60px] mb-4 bg-white/15"
          />
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1 text-lg text-white/90">
              <strong>Altura: {formatHeight(data.height)} m</strong>
              <strong>Peso: {formatWeight(data.weight)} kg</strong>

              <div className="flex items-center gap-1">
                <strong>Tipos:</strong>
                {data.types.map((t: any) => (
                  <PokemonTypeBadge key={t.type.name} type={t.type.name} />
                ))}
              </div>
            </div>
            <div className="border border-white/50 rounded-full p-1 px-3">
              <p className="text-5xl font-bold">{points}</p>
            </div>
          </div>
        </div>
      )}

      {gameStarted && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex items-center gap-2">
            <Input
              placeholder="Quem é esse pokémon?"
              className="max-w-48 text-center"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <IoReloadCircle
              className="size-10 cursor-pointer"
              onClick={handleReload}
            />
          </div>
        </form>
      )}

      <div className="absolute top-8 right-32">
        <Leaderboard />
      </div>
    </div>
  );
}
