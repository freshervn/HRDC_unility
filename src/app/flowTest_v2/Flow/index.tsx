import React from "react";
import { useShallow } from "zustand/react/shallow";
import ReactFlow, { Controls, MarkerType, MiniMap, Panel } from "reactflow";
import "reactflow/dist/style.css";
import useFlow from "@/hook/flow";
import CreatorPanel from "./Panel/CreatorPanel";
import SearchPanel from "./Panel/SearchPanel";
import FormatPanel from "./Panel/FormatPanel";
import edgeTypes from "./CustomEdges";
import nodeTypes from "./CustomerNode";

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});
function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlow(
    useShallow(selector)
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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
