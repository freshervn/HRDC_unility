import React from "react";
import { useShallow } from "zustand/react/shallow";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import useFlow from "@/hook/flow";

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
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
  );
}

export default Flow;
