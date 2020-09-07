export const calculateAngle = (
  originX: number,
  originY: number,
  x: number,
  y: number
) => {
  return (Math.atan2(y - originY, x - originX) * 180) / Math.PI + 90
}
