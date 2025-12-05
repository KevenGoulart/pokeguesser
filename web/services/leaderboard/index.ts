import axios from "axios";

export async function getLeaderboard() {
  const { data } = await axios.get("http://localhost:3333/leaderboard");
  return data;
}

export async function addToLeaderboard(username: string, score: number) {
  await axios.post("http://localhost:3333/leaderboard", {
    username,
    score,
  });
}
