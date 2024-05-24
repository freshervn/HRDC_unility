import { useCallback, useState } from "react";
import { Handle, NodeResizer, Position } from "reactflow";

function DiamondNode({ data }: { data: any }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
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
        <div className="w-[100px] h-[100px] rounded-10 p-[3px] flex justify-center align-middle  bg-red-600 clip-diamond">
          <div className="w-full h-full rounded-10  border-2 bg-white clip-diamond"></div>
          <div className="m-auto">
            {data?.fields?.map((field: any, i: number) => (
              <h1 key={i}>{field.value}</h1>
            ))}
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          className={`${!visible && "opacity-0"}`}
        />
      </div>
    </>
  );
}
export { DiamondNode };
