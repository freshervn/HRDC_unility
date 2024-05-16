import drawArrow from "./drawArrow";
import drawCircle from "./drawCircle";
import drawSquare from "./drawSquare";
export default function drawShape(
  canvas: any,
  struc: any,
  map: {
    mapX: number;
    mapY: number;
    lastX: number;
    lastY: number;
  }
) {
  const ctx = canvas?.getContext("2d");
  for (let index = 0; index < struc.length; index++) {
    switch (struc[index].shape.type) {
      case "circle":
        drawCircle(ctx, {
          ...struc[index],
          shape: {
            ...struc[index].shape,
            x: struc[index].shape.x + map.mapX,
            y: struc[index].shape.y + map.mapY,
          },
        });
        break;
      case "square":
        drawSquare(ctx, {
          ...struc[index],
          shape: {
            ...struc[index].shape,
            x: struc[index].shape.x + map.mapX,
            y: struc[index].shape.y + map.mapY,
          },
        });
        break;
    }
  }
}
function linkShape(
  canvas: any,
  struc: any,
  map: {
    mapX: number;
    mapY: number;
    lastX: number;
    lastY: number;
  }
) {
  if (struc?.childs?.length) {    
    for (let index = 0; index < struc.childs.length; index++) {
      drawArrow(
        canvas,
        {
          ...struc,
          shape: {
            ...struc.shape,
            x: struc.shape.x + map.mapX,
            y: struc.shape.y + map.mapY,
          },
        },
        {
          ...struc.childs[index],
          shape: {
            ...struc.childs[index].shape,
            x: struc.childs[index].shape.x + map.mapX,
            y: struc.childs[index].shape.y + map.mapY,
          },
        }
      );
      linkShape(canvas, struc.childs[index], map);
    }
  }
}
export { linkShape };
