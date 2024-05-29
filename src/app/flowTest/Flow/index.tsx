import React, { MouseEvent, useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  MarkerType,
  MiniMap,
  Node,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import CreatorPanel from "./Panel/CreatorPanel";
import SearchPanel from "./Panel/SearchPanel";
import FormatPanel from "./Panel/FormatPanel";
import edgeTypes from "./CustomEdges";
import nodeTypes from "./CustomerNode";
import genId from "@/utility/genId";

function Flow() {
  const { getNode, screenToFlowPosition, getIntersectingNodes } =
    useReactFlow();
  const connectingNodeId = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(
    JSON.parse(localStorage.getItem("myNodes") ?? "[]") || []
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    JSON.parse(localStorage.getItem("myEdges") ?? "[]") || []
  );

  // Connect node
  // and clear node source
  const onConnect = useCallback(
    (params: any) => {
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Save node source
  const onConnectStart = useCallback((event: any, params: any) => {
    connectingNodeId.current = params.nodeId;
  }, []);

  // Add node on edge drop
  const onConnectEnd = useCallback(
    (event: any) => {
      if (!connectingNodeId.current) return;
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      const nodedata = getNode(connectingNodeId.current);
      if (targetIsPane) {
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
  const onNodeDrag = useCallback((_: MouseEvent, node: Node) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id);

    setNodes((ns) =>
      ns.map((n) => ({
        ...n,
        className: intersections.includes(n.id) ? "highlight" : "",
      }))
    );
  }, []);

  // When Node drop on other Node
  const onNodeDragStop = (
    event: MouseEvent,
    selectedNode: Node,
    _nodes: Node[]
  ) => {
    if (selectedNode.type != "custom_group") {
      const groups = nodes.filter((node) => node.type === "custom_group");
      let j = groups.length - 1;
      while (j >= 0) {
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        if (
          groups[j].position.x < position.x &&
          position.x < groups[j].position.x + (groups[j].width || 0) &&
          groups[j].position.y < position.y &&
          position.y < groups[j].position.y + (groups[j].height || 0)
        ) {
          if (selectedNode.parentId === groups[j].id) {
            return;
          }
          setNodes((nodes) => [
            ...nodes.map((node) => ({
              ...node,
              ...(selectedNode.id === node.id && {
                parentId: groups[j].id,
                position: {
                  x: position.x - groups[j].position.x - (node.width || 0),
                  y: position.y - groups[j].position.y - (node.height || 0),
                },
              }),
            })),
          ]);
          return;
        } else {
          if (selectedNode.parentId === groups[j].id) {
            const index = j;
            setNodes((nodes) => [
              ...nodes.map((node) => {
                delete node.parentId;
                return {
                  ...node,
                  position: {
                    x: node.position.x + groups[index]?.position?.x,
                    y: node.position.y + groups[index]?.position?.y,
                  },
                };
              }),
            ]);
            console.log(j);
          }
        }
        j--;
      }
      setNodes((nodes) => [
        ...nodes.map((node) => {
          delete node.parentId;
          return {
            ...node,
          };
        }),
      ]);
    }
  };

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
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
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
