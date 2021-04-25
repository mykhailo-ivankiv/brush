export const rotate = (basePoint = [0, 0], targetPoint, angle) => {
  const [bx, by] = basePoint;
  const [tx, ty]= targetPoint;
  const [tmx, tmy] = [tx-bx, ty - by];

  const [rx, ry] = [
    tmx * Math.cos(angle) - tmy * Math.sin(angle),
    tmx * Math.sin(angle) + tmy * Math.cos(angle),
  ]

  return [
    rx + bx,
    ry + by
  ]
}
