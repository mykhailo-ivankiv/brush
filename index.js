import {rotate} from "./transformations.js";
import {circle, brush, line} from "./shapes.js";
import {getDistance, radiansToDegrees} from "./geometry.js";


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

  let prevPoint = null;
  el.addEventListener("mousemove", ({clientX, clientY}) => {
    const p = [clientX, clientY];
    const r = getDistance(p,canvasCenter) * 0.05

    if (prevPoint) {
      const [p0, r0] = prevPoint
      const brushShape = brush(p0, r0, p, r)

      drawShape(ctx)(brushShape, shapeStyle)
    }

    prevPoint= [p, r];
  })

  const helperStyle = {strokeStyle : "#bf616a", lineWidth: 1}
  const shapeStyle = {strokeStyle : "#5e81ac00", lineWidth: 3, fillStyle: "#5e81ac"}
};

init();

