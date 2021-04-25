import {rotate} from "./transformations.js";
import {getDistance} from "./geometry.js";

export const line = (p1, p2) => {
  const shape = new Path2D()

  shape.moveTo(...p1);
  shape.lineTo(...p2);

  return shape
}

export const rectangle = (leftTopCorner = [0, 0], width = 100, height = 100) => {
  const shape = new Path2D()
  shape.rect(...leftTopCorner, width, height);
  return shape
};

export const circle = (center = [0,0], radius) => {
  const shape = new Path2D()
  shape.arc(...center, radius, 0, 2 * Math.PI);
  return shape
}

export   const brush = (p1, r1, p2, r2) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;

  const isNormal = !Boolean((x2 - x1) < 0);
  const baseAngle = Math.atan( (y2 - y1)  / (x2 - x1 ));
  const l = getDistance(p1, p2);
  const angle = Math.asin((r1 - r2)/ l);

  const startPoint1 = rotate(p1, [p1[0], p1[1] + r1],
    isNormal
      ? (0 - angle + baseAngle)
      : (0 + angle + baseAngle)
  )
  const endPoint1 = rotate(p1, [p1[0], p1[1] + r1],
    isNormal
      ? Math.PI   + angle + baseAngle
      : Math.PI   - angle + baseAngle
  )
  const startPoint2 = rotate(p2, [p2[0], p2[1] + r2],
    isNormal
      ? Math.PI   + angle + baseAngle
      : Math.PI   - angle + baseAngle
  )
  const endPoint2 = rotate(p2, [p2[0], p2[1] + r2],
    isNormal ? 0 - angle + baseAngle
      : 0 + angle + baseAngle
  )

  const d = `
      M ${startPoint1[0]},${startPoint1[1]}
      A ${r1} ${r1} 0 ${angle > 0 ? 1 : 0} ${ isNormal ? 1: 0} ${endPoint1[0]},${endPoint1[1]}
      L ${startPoint2[0]},${startPoint2[1]}
      A ${r2} ${r2} 0 ${angle > 0 ? 0 : 1} ${isNormal ? 1: 0} ${endPoint2[0]},${endPoint2[1]}
      Z
    `
  return new Path2D(d)
}
