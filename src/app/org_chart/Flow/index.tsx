import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";

import CreatorPanel from "./CreatorPanel";
import FormatPanel from "./FormatPanel";
import getLayoutedElements from "./format_tree";
import Popup, { usePopup } from "./NodeEditor";
import useFlow from "./hooks";
import nodeTypes from "./CustomerNode";

function Flow() {
  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    expandNode,
    // generateNewNode,
    collapseNode,
    clearNode,
    updateNodeData,
  } = useFlow();

  const onLayout = useCallback(
    (nodes: any, edges: any) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [setEdges, setNodes]
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
          minZoom={0}
          maxZoom={Number.MAX_SAFE_INTEGER}
        >
          {/* <Panel position="top-right">
            <CreatorPanel generateNewNode={generateNewNode} />
          </Panel> */}
          <Panel position="top-left">
            <FormatPanel
              clearNode={clearNode}
              onLayout={onLayout}
              setNodes={setNodes}
              setEdges={setEdges}
              openEdited={openPopup}
              nodes={nodes}
              edges={edges}
              onExpand={(node) => {
                expandNode(node);
              }}
              onCollapse={(node) => {
                collapseNode(node);
              }}
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

export default Flow;
