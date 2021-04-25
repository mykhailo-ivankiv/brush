export const radiansToDegrees = (radians) => radians * (180/Math.PI)
export const getDistance = ([x1, y1], [x2, y2]) => {
  const a = Math.abs(x1 - x2)
  const b = Math.abs(y1 - y2)

  return Math.sqrt(a * a + b * b);
}
