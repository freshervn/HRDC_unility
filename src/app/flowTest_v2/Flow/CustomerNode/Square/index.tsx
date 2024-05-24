import { useCallback, useState } from "react";
import { Handle, NodeResizer, Position } from "reactflow";

function SquareNode({ data, selected }: { data: any; selected: boolean }) {
  return (
    <>
      <NodeResizer
        lineClassName={`${
          selected ? "opacity-50" : "opacity-0"
        } !border-dashed border-yellow-600`}
        handleClassName={` ${
          selected ? "opacity-1" : "opacity-0"
        } !w-[10px] !h-[10px] transform bg-yellow-600`}
      />
      <Handle
        type="target"
        position={Position.Top}
        className={`${!selected && "opacity-0"}`}
      />
      <div className="m-auto">
        {data?.fields?.map((field: any, i: number) => (
          <h1 key={i}>{field.value}</h1>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className={`${!selected && "opacity-0"}`}
      />
    </>
  );
}
export { SquareNode };
