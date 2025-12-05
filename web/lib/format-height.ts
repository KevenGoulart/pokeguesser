export default function formatHeight(value: number) {
  const meters = value / 10;

  return meters.toFixed(1);
}
