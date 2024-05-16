"use client";
import React, { useCallback } from "react";
import ReactFlow, {  
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";
import nodeTypes from "./CustomerNode";
import CreatorPanel from "./CreatorPanel";
import FormatPanel from "./FormatPanel";
import getLayoutedElements from "./format_tree";
import Popup, { usePopup } from "./NodeEditor";
import useFlow from "./hooks";

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
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => {
            openPopup(node);
          }}
        >
          <Panel position="top-right">
            <CreatorPanel generateNewNode={generateNewNode} />
          </Panel>
          <Panel position="top-left">
            <FormatPanel clearNode={clearNode} onLayout={onLayout} nodes={nodes}/>
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
