import { useCallback, useState } from "react";
import { Handle, NodeResizer, Position } from "reactflow";

function SquareNode({ data }: { data: any }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <NodeResizer />
      <Handle
        type="target"
        position={Position.Top}
        className={`${!visible && "opacity-0"}`}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className={`${!visible && "opacity-0"}`}
      />
    </div>
  );
}
export { SquareNode };
