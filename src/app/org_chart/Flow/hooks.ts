import { useCallback } from "react";
import { addEdge, useEdgesState, useNodesState } from "reactflow";

const useFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    // {
    //   id: "1",
    //   position: {
    //     x: 200,
    //     y: 200,
    //   },
    //   data: {
    //     label: "" + Date.now() + Math.random(),
    //     avatar:
    //       "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg",
    //   },
    //   type: "organization",
    // },
    // {
    //   id: "2",
    //   position: {
    //     x: 200,
    //     y: 200,
    //   },
    //   data: {
    //     label: "" + Date.now() + Math.random(),
    //     avatar:
    //       "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg",
    //   },
    //   type: "organization",
    // },
    // {
    //   id: "3",
    //   position: {
    //     x: 200,
    //     y: 200,
    //   },
    //   data: {
    //     label: "" + Date.now() + Math.random(),
    //     avatar:
    //       "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg",
    //   },
    //   type: "organization",
    // },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      source: "2",
      sourceHandle: null,
      target: "3",
      targetHandle: null,
      id: "reactflow__edge-2-3",
    },
    {
      source: "2",
      sourceHandle: null,
      target: "1",
      targetHandle: null,
      id: "reactflow__edge-2-1",
    },
  ]);

  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const generateNewNode = (type: string) => {
    setNodes((prev: any) => [
      ...prev,
      {
        id: "" + Date.now() + Math.random(),
        position: {
          x: (prev[prev.length - 1]?.position?.x + 20) | 200,
          y: (prev[prev.length - 1]?.position?.y + 20) | 200,
        },
        data: { label: "" + Date.now() + Math.random(), fields: [] },
        type: type,
      },
    ]);
  };
  const clearNode = () => {
    setNodes([]);
    setEdges([]);
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
  const collapseNode = (parentNode: any) => {
    setNodes((prev: any) => {
      const newNode = prev.map((node: any) => {
        if (parentNode.id === node.parentId) {
          collapseNode(node);
        }
        return {
          ...node,
          ...(parentNode.id === node.parentId && { hidden: true }),
        };
      });
      return newNode;
    });
  };
  const expandNode = (parentNode: any) => {
    setNodes((prev: any) => {
      const newNode = prev.map((node: any) => {
        if (parentNode.id === node.parentId) {
          expandNode(node);
        }
        return {
          ...node,
          ...(parentNode.id === node.parentId && { hidden: false }),
        };
      });
      return newNode;
    });
  };
  return {
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
    collapseNode,
    expandNode,
  };
};
export default useFlow;
