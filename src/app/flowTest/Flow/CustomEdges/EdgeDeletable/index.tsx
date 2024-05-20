import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  // getBezierPath,
  getSmoothStepPath,
  useReactFlow,
} from "reactflow";

const EdgeDeletable = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button
            className={`${selected ? " block" : "hidden"}`}
            onClick={onEdgeClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                stroke="#1C274C"
                className=" stroke-red-500"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M20.5 6H3.49988"
                stroke="#1C274C"
                className=" stroke-red-500"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                stroke="#1C274C"
                className=" stroke-red-500"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.5 11L10 16"
                stroke="#1C274C"
                className=" stroke-red-500"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14.5 11L14 16"
                stroke="#1C274C"
                className=" stroke-red-500"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
export default EdgeDeletable;
