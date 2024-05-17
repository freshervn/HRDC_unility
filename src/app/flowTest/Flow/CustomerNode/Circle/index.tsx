import { useState } from "react";
import { Handle, NodeResizer, Position } from "reactflow";

function CircleNode({ data, ...rest }: { data: any }) {
  const [visible, setVisible] = useState(false);
  console.log(data);
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
      <div className="m-auto">
        {data?.fields?.map((field: any, i: number) => (
          <h1 key={i}>{field.value}</h1>
        ))}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className={`${!visible && "opacity-0"}`}
      />
    </div>
  );
}
export { CircleNode };
