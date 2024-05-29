import { memo, useState } from "react";
import {
  NodeResizer,
  NodeToolbar,
  useOnSelectionChange,
  useReactFlow,
  useStore,
} from "reactflow";
import TargetHandle from "../Plugin/TargetHandle";
import SourceHandle from "../Plugin/SourceHandle";
import ToolBar from "../Plugin/ToolBar";
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
  console.log(rest)
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const { getNodes } = useReactFlow();
  const nodes = getNodes();
  const nodeDraging = nodes.find((node) => node.dragging);
  const isParent = nodeDraging?.parentId === id;
  console.log(nodeDraging)
  const [color, setColor] = useState("#CA8A04");
  const { deleteElements } = useReactFlow();
  const padding = 10;
  return (
    <>
      <NodeToolbar
        isVisible={data.forceToolbarVisible || undefined}
        position={data.toolbarPosition}
        className=" flex gap-3"
      >
        <ToolBar
          defaul_color={color}
          onDelete={() => {
            deleteElements({ nodes: [{ id: id }] });
          }}
          onChangeColor={(color) => {
            setColor(color);
          }}
        />
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
      w-full h-full rounded-md bg-transparent      
      border-yellow-600
         flex justify-center align-middle border-2
      ${isTarget || isParent ? "border-dashed" : "border-solid"} 
      `}
        style={{
          ...(color && { borderColor: color }),
          padding: padding,
        }}
      ></div>
      <SourceHandle selected={selected} />
    </>
  );
}
export default memo(CircleNode);
