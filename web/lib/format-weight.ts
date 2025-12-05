export default function formatWeight(value: number) {
  const kg = value / 10;

  return Math.floor(kg);
}
