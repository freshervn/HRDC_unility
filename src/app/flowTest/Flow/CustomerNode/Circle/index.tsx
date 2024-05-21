import { memo, useState } from "react";
import {
  NodeResizer,
  NodeToolbar,
  useNodes,
  useReactFlow,
  useStore,
} from "reactflow";
import TargetHandle from "../TargetHandle";
import SourceHandle from "../SourceHandle";
const connectionNodeIdSelector = (state: any) => state.connectionNodeId;
function CircleNode({
  id,
  data,
  selected,
  ...rest
}: {
  id: string;
  data: any;
  selected: boolean;
}) {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  // const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const [color, setColor] = useState("");
  const { deleteElements, setNodes } = useReactFlow();
  return (
    <>
      <NodeToolbar
        isVisible={data.forceToolbarVisible || undefined}
        position={data.toolbarPosition}
        className=" flex gap-3"
      >
        <label
          htmlFor="
        "
        >
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            name=""
            id=""
            className="w-[22px] h-[22px] opacity-0 absolute top-0 left-0"
          />
          <div
            className="w-[22px] h-[22px] border-2 box-border rounded-full bg-indigo-600"
            style={{ ...(color && { background: color }) }}
          ></div>
        </label>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
              stroke="#1C274C"
              strokeWidth="1.5"
            />
            <path
              opacity="0.5"
              d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
              stroke="#1C274C"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            deleteElements({ nodes: [{ id: id }] });
          }}
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
      </NodeToolbar>
      <NodeResizer
        lineClassName={`${
          selected ? "opacity-50" : "opacity-0"
        } !border-dashed`}
        handleClassName={` ${
          selected ? "opacity-1" : "opacity-0"
        } !w-[10px] !h-[10px] transform`}
      />
      <TargetHandle />
      <div
        className={`
      w-full h-full rounded-full bg-white
      border-indigo-600
        p-3 flex justify-center align-middle border-2
      ${isTarget ? "border-dashed" : "border-solid"} 
      `}
        style={{
          ...(color && { borderColor: color }),
        }}
      >
        <input
          type="text"
          className="border-none outline-none w-fit h-fit  max-w-full m-auto text-center"
          value={data.fields[0] || ""}
          onChange={(e) => {
            setNodes((prev) => {
              prev.map((node: any) => {
                if (node.id === id) {
                  node.data = {
                    ...node.data,
                    fields: [e.target.value],
                  };
                }
              });
              return prev;
            });
          }}
        />
      </div>
      <SourceHandle selected={selected} />
    </>
  );
}
export default memo(CircleNode);
