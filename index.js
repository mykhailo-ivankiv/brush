import {rotate} from "./transformations.js";
import {circle, brush, line} from "./shapes.js";
import {getDistance} from "./geometry.js";


const drawShape = (ctx) => (shape, style = {}) => {
  const {
    strokeStyle = "#bf616a",
    lineWidth =  1,
    fillStyle = 'transparent'
  } = style

  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.fillStyle = fillStyle

  if (fillStyle !== 'transparent') {
    ctx.fill(shape);
  }

  ctx.stroke(shape);
};

const initCanvas = (canvasEl) => {
  const { width, height } = canvasEl.getBoundingClientRect();

  canvasEl.width = width //* window.devicePixelRatio;
  canvasEl.height = height //* window.devicePixelRatio;

  return {
    ctx: canvasEl.getContext("2d"),
    width: width, //* window.devicePixelRatio,
    height: height //* window.devicePixelRatio,
    };
};


const init = () => {
  const el = document.querySelector("#canvas")
  const { ctx, width, height } = initCanvas(el);

  const canvasCenter = [(width / 2), (height / 2)]


  // ctx.lineWidth = 3;
  // ctx.globalAlpha = 0.5;

  let prevPoint = null;
  el.addEventListener("mousemove", ({clientX, clientY}) => {
    const p = [clientX, clientY];
    const r = getDistance(p,canvasCenter) * 0.05

    ctx.clearRect(0, 0, width, height);

    if (prevPoint) {
      const [p0, r0] = prevPoint

      const brushShape = brush(p1, r1, p0, r0)

      drawShape(ctx)(brushShape, shapeStyle)

      // drawBrushGuideLines(p0, r0, p1, r1)
    }

    prevPoint= [p, r];
  })

  const helperStyle = {strokeStyle : "#bf616a", lineWidth: 1}
  const shapeStyle = {strokeStyle : "#5e81ac", lineWidth: 3}


  const brush = (p1, r1, p2, r2) => {

    const [x1, y1] = p1;
    const [x2, y2] = p2;

    const baseAngle = 0 //Math.atan(x1 - x2 / y1 -y2 );

    const l = getDistance(p1, p2);

    const angle = Math.asin( (r1 - r2)/ l);

    const startPoint1 = rotate(p1, [p1[0], p1[1] + r1], - angle + baseAngle)
    const endPoint1 = rotate(p1, [p1[0], p1[1] + r1], Math.PI + angle + baseAngle)

    drawShape(ctx)(circle(startPoint1, 3), helperStyle)
    drawShape(ctx)(circle(endPoint1, 3), helperStyle)

    const startPoint2 = rotate(p2, [p2[0], p2[1] + r2], Math.PI + angle + baseAngle)
    const endPoint2 = rotate(p2, [p2[0], p2[1] + r2], - angle + baseAngle)

    drawShape(ctx)(circle(startPoint2, 3), helperStyle)
    drawShape(ctx)(circle(endPoint2, 3), helperStyle)

    const d = `
      M ${startPoint1[0]},${startPoint1[1]}
      A ${r1} ${r1} 0 ${angle > 0 ? 1 : 0} 1 ${endPoint1[0]},${endPoint1[1]}
      L ${startPoint2[0]},${startPoint2[1]}
      A ${r2} ${r2} 0 ${angle > 0 ? 0 : 1} 1 ${endPoint2[0]},${endPoint2[1]}
      Z
    `

    return new Path2D(d)
  }



  const p1 = [400, 300];
  // const p2 = [590, 400];
  const r1 = 80;
  // const r2 = 20;
  //
  // drawShape(ctx)(brush( p1, r1, p2, r2), shapeStyle)
  //
  // // TODO: Create one shape;
  const drawBrushGuideLines = (p1, r1, p2, r2) => {
    // Centres of base circle
    drawShape(ctx)(circle(p1, 3), helperStyle)
    drawShape(ctx)(circle(p2, 3), helperStyle)
    // Base circles
    drawShape(ctx)(circle(p1, r1), helperStyle)
    drawShape(ctx)(circle(p2, r2), helperStyle)

    const [x1, y1] = p1;
    const [x2, y2] = p2;

    const baseAngle = Math.atan(x1 - x2 / y1 -y2  );

    const l = getDistance(p1, p2);

    const angle = Math.asin( (r1 - r2)/ l);

    const startPoint1 = rotate(p1, [p1[0], p1[1] + r1], - angle - baseAngle)
    const endPoint1 = rotate(p1, [p1[0], p1[1] + r1], Math.PI + angle - baseAngle)

    const startPoint2 = rotate(p2, [p2[0], p2[1] + r2], Math.PI + angle - baseAngle)
    const endPoint2 = rotate(p2, [p2[0], p2[1] + r2], - angle - baseAngle)

    // base points for first arc
    drawShape(ctx)(circle(startPoint1, 3), helperStyle)
    drawShape(ctx)(circle(endPoint1, 3), helperStyle)

    // base points for second arc
    drawShape(ctx)(circle(startPoint2, 3), helperStyle)
    drawShape(ctx)(circle(endPoint2, 3), helperStyle)

  }


};

init();

