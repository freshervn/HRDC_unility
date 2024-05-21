"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";
import nodeTypes from "./CustomerNode";
import CreatorPanel from "./CreatorPanel";
import FormatPanel from "./FormatPanel";
import getLayoutedElements from "./format_tree";
import Popup, { usePopup } from "./NodeEditor";
import useFlow from "./hooks";
import edgeTypes from "./CustomEdges";
import SearchPanel from "./SearchPanel";

export default function Flow() {
  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    generateNewNode,
    clearNode,
    updateNodeData,
    onNodesDelete,
  } = useFlow();

  const onLayout = useCallback(
    (direction: string) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, {
          direction,
        });

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setEdges, setNodes]
  );
  const {
    popupData = { id: 0 },
    isOpen = false,
    openPopup,
    closePopup,
  } = usePopup();

  return (
    <>
      <div className="w-screen h-screen">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesDelete={onNodesDelete}
          // onNodeClick={(_, node) => {
          //   openPopup(node);
          // }}
          defaultEdgeOptions={{
            // style: { strokeWidth: 3, stroke: "black" },
            type: "deletable",
            // "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "black",
            },
          }}
        >
          <Panel position="top-right">
            <CreatorPanel generateNewNode={generateNewNode} />
          </Panel>
          <Panel position="top-center">            
            <SearchPanel/>            
          </Panel>
          <Panel position="top-left">
            <FormatPanel
              clearNode={clearNode}
              onLayout={onLayout}
              nodes={nodes}
            />
          </Panel>
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
        </ReactFlow>
      </div>
      <Popup
        key={popupData.id}
        isOpen={isOpen}
        closePopup={closePopup}
        data={popupData}
        onSave={updateNodeData}
      />
    </>
  );
}
