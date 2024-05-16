import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

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
      <Handle
        type="target"
        position={Position.Top}
        className={`${!visible && "opacity-0"}`}
      />
      <div className="w-[100px] h-[100px] rounded-10 border-yellow-600 p-3 flex justify-center align-middle border-2 bg-white">
        {/* <input
          id="text"
          name="text"
          onChange={onChange}
          className="w-full m-auto"
        /> */}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className={`${!visible && "opacity-0"}`}
      />
    </div>
  );
}
export { SquareNode };
