import { getLeaderboard } from "@/services/leaderboard";
import { LeaderboardUser } from "@/services/leaderboard/type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Leaderboard() {
  const { data } = useQuery<LeaderboardUser[]>({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
  });

  return (
    <div>
      <Image src="/ranking.png" alt="ranking" width={150} height={100} />
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
