import axios from "axios";

export async function getLeaderboard() {
  const { data } = await axios.get(
    "https://pokeguesser-kihb.onrender.com/leaderboard"
  );
  return data;
}

export async function addToLeaderboard(username: string, score: number) {
  await axios.post("https://pokeguesser-kihb.onrender.com/leaderboard", {
    username,
    score,
  });
}
