import React, { useCallback, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import ReactFlow, {
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  OnConnectStartParams,
  Panel,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import useFlow from "@/hook/flow";
import CreatorPanel from "./Panel/CreatorPanel";
import SearchPanel from "./Panel/SearchPanel";
import FormatPanel from "./Panel/FormatPanel";
import edgeTypes from "./CustomEdges";
import nodeTypes from "./CustomerNode";
import genId from "@/utility/genId";

function Flow() {
  const { getNode, screenToFlowPosition } = useReactFlow();
  const connectingNodeId = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params: any) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );
  const onConnectStart = useCallback((event: any, params: any) => {
    connectingNodeId.current = params.nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      if (!connectingNodeId.current) return;
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      const nodedata = getNode(connectingNodeId.current);
      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = genId();
        const newNode = {
          ...nodedata,
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [setNodes, setEdges, screenToFlowPosition, getNode]
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnectEnd={onConnectEnd}
        fitView
        defaultEdgeOptions={{
          type: "deletable",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "black",
          },
        }}
      >
        <Panel position="top-right">
          <CreatorPanel />
        </Panel>
        <Panel position="top-center">
          <SearchPanel />
        </Panel>
        <Panel position="top-left">
          <FormatPanel />
        </Panel>
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default Flow;
