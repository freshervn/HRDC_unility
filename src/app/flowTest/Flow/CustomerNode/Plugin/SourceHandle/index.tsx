import { useEffect, useRef } from "react";
import { Handle, Position, useNodeId } from "reactflow";

const SourceHandle = ({ selected }: { selected: boolean }) => {
  return (
    <>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "transparent",
          width: "24px",
          height: "24px",
          borderColor: "black",
          borderWidth: "2px",
          transform: "translateY(10px) translateX(-50%)",
        }}
        className={`${selected ? "opacity-1" : "opacity-0"}`}
      />
    </>
  );
};

export default SourceHandle;
