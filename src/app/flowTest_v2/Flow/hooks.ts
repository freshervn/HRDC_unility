import { useCallback, useState } from "react";
import {
  Node,
  addEdge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useViewport,
} from "reactflow";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

const useFlow = () => {
  const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    setNodes: state.setNodes,
    setEdges: state.setEdges,
  });
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
  }: any = useStore<any>(useShallow(selector));
  const getId = () => "" + Date.now() + Math.random();

  const onNodesDelete = useCallback(
    (deleted: any) => {
      setEdges(
        deleted.reduce((acc: any, node: any) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge: any) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges, setEdges]
  );

  const generateNewNode = useCallback(
    (node: Node) => {
      setNodes((prev: any) => [
        ...prev,
        {
          ...node,
        },
      ]);
    },
    [setNodes]
  );
  const clearNode = () => {
    setNodes([]);
  };
  const updateNodeData = (id: string, data: any) => {
    setNodes((node: any) => {
      return node.map((item: any) => {
        if (item.id === id) {
          // Return a new object with the updated name
          return { ...item, data: data };
        }
        return item; // Return the unchanged item
      });
    });
  };

  const [selectedNode, setSelectedNode] = useState<Node>();
  const onNodeDragStart = (_: any, node: Node) => {
    setSelectedNode(node);
  };

  const GenNodeAtEndEdge = useCallback(
    (event: any) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      if (targetIsPane && selectedNode) {
        const id = getId();
        const newNode = {
          ...selectedNode,
          id,
          position: {
            x: event.clientX,
            y: event.clientY,
          },
          data: { label: `Node ${id}` },
        };
        generateNewNode(newNode);
        // console.log(x, y);
        setEdges((eds: any) =>
          eds.concat({ id, source: selectedNode.id, target: id })
        );
      }
    },
    [selectedNode, generateNewNode, setEdges]
  );

  return {
    getId,
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
    onNodeDragStart,
    GenNodeAtEndEdge,
  };
};
export default useFlow;
