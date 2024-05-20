import { useState } from "react";
import { Handle, NodeResizer, Position } from "reactflow";
import TargetHandle from "../TargetHandle";
import SourceHandle from "../SourceHandle";

function CircleNode({
  data,
  selected,
  ...rest
}: {
  data: any;
  selected: boolean;
}) {
  console.log(data, selected, rest);
  return (
    <>
      <NodeResizer
        lineClassName={`${
          selected ? "opacity-50" : "opacity-0"
        } !border-dashed`}
        handleClassName={` ${
          selected ? "opacity-1" : "opacity-0"
        } !w-[10px] !h-[10px] transform`}
      />
      <TargetHandle />
      <input
        type="text"
        className="border-none outline-none w-fit h-fit  max-w-full m-auto text-center"
      />
      <SourceHandle selected={selected} />
      {/* <Handle
        type="source"
        position={Position.Bottom}
        // ${!selected && "opacity-0"}
        className={`
         !w-[24px] !h-[24px]  translate-x-[12px] pt-[24px] !border-none`}
      >
        <svg
          className="rotate-180 mt-[-24px]"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M15,2 C15.5522847,2 16,2.44771525 16,3 L16,6 L17,6 C18.6568542,6 20,7.34314575 20,9 L20,12 C20,15.3137085 17.3137085,18 14,18 L13,18 L13,21 C13,21.5522847 12.5522847,22 12,22 C11.4477153,22 11,21.5522847 11,21 L11,18 L10,18 C6.6862915,18 4,15.3137085 4,12 L4,9 C4,7.34314575 5.34314575,6 7,6 L8,6 L8,3 C8,2.44771525 8.44771525,2 9,2 C9.55228475,2 10,2.44771525 10,3 L10,6 L14,6 L14,3 C14,2.44771525 14.4477153,2 15,2 Z M17,8 L7,8 C6.44771525,8 6,8.44771525 6,9 L6,12 C6,14.209139 7.790861,16 10,16 L14,16 C16.209139,16 18,14.209139 18,12 L18,9 C18,8.44771525 17.5522847,8 17,8 Z"
          />
        </svg>
      </Handle> */}
    </>
  );
}
export { CircleNode };
