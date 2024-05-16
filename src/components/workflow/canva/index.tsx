import React, { useRef, useEffect, useState } from "react";
import drawShape, { linkShape } from "./services/mangager";
import { circleEvent } from "./services/circleEvent";
import { calcLocation, calcSize } from "./services/format";
const Canva = ({ data }: { data: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState({
    origin: 1,
    prev: 1,
  });
  const [isDragging, setDangging] = useState(false);
  const [map, setMap] = useState({
    mapX: 0,
    mapY: 0,
    lastX: 0,
    lastY: 0,
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const handleZoom = (event: any) => {
      if (event.wheelDeltaY > 0) {
        setScale((prev) => ({
          origin: prev.origin / 1.1,
          prev: 1.1,
        }));
      } else {
        setScale((prev) => ({
          origin: prev.origin * 1.1,
          prev: 1 / 1.1,
        }));
      }
      if (context) {
        context.scale(scale.prev, scale.prev);
      }
    };
    const handleDrag = (e: any) => {
      if (isDragging && canvas && context) {
        const deltaX = e.clientX - map.lastX;
        const deltaY = e.clientY - map.lastY;

        setMap({
          mapX: map.mapX + deltaX,
          mapY: map.mapY + deltaY,
          lastX: e.clientX,
          lastY: e.clientY,
        });
      }
    };

    if (canvas) {
      canvas.addEventListener("wheel", handleZoom);
      canvas.addEventListener("mousemove", handleDrag);
      //   if (data?.[0]?.shape) {
      //     circleEvent(canvas, data?.[0]?.shape, map);
      //   }
    }

    if (context && canvas && data) {
      context.clearRect(
        0,
        0,
        // 2 is just a number to certain clear entire screen
        scale.origin >= 1
          ? canvas.width * scale.origin * 2
          : (canvas.width / scale.origin) * 2,
        scale.origin >= 1
          ? canvas.height * scale.origin
          : canvas.height / scale.origin
      );
      const treeSize = calcSize(data);
      const TreeCode = calcLocation(treeSize, 50, 100);
      const treeToArray: (tree: any) => any[] = (tree: any) => {
        const arr = [];
        if (tree?.childs?.length) {
          for (let i = 0; i < tree?.childs.length; i++) {
            arr.push(...treeToArray(tree.childs[i]));
          }
        }
        arr.push(tree);
        return [...arr];
      };
      linkShape(context, TreeCode, map);
      drawShape(canvas, treeToArray(TreeCode), map);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("wheel", handleZoom);
        canvas.removeEventListener("mousemove", handleDrag);
      }
    };
  }, [data, scale.origin, isDragging, map, scale.prev]);
  return (
    <>
      <canvas
        id="myCanvas"
        width={1000}
        height={400}
        className="w-full"
        ref={canvasRef}
        onMouseDown={(e) => {
          setScale((prev) => ({
            ...prev,
            prev: 1,
          }));
          setDangging(true);
          setMap((prev) => ({ ...prev, lastX: e.clientX, lastY: e.clientY }));
        }}
        onMouseLeave={() => {
          setDangging(false);
        }}
        onMouseUp={() => {
          setDangging(false);
        }}
      ></canvas>
    </>
  );
};
export default Canva;
