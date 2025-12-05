import { getLeaderboard } from "@/services/leaderboard";
import { LeaderboardUser } from "@/services/leaderboard/type";
import { useQuery } from "@tanstack/react-query";

export default function Leaderboard() {
  const { data } = useQuery<LeaderboardUser[]>({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
  });

  return (
    <div>
      <h1 className="font-semibold text-3xl mb-4">Ranking Global</h1>
      <ul className="space-y-2">
        {data?.map((user, index) => (
          <li
            key={user.id}
            className="flex justify-between bg-slate-800 p-3 rounded-lg"
          >
            <span className="font-semibold">
              {index + 1} - {user.username}
            </span>
            <span className="font-bold">{user.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
