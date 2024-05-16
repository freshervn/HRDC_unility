import { type } from "os";

function getEdges(tree) {
  const edgeArr = [];
  const { childs, ...newNode } = tree;
  for (let i = 0; i < childs.length; i++) {
    edgeArr.push({
      source: newNode.id,
      sourceHandle: null,
      target: childs[i].id,
      targetHandle: null,
      id: `edge-${newNode.id}-${childs[i].id}`,
    });
    edgeArr.push(...getEdges(childs[i]));
  }
  return edgeArr;
}
function getNodes(tree, parentId = "") {
  const nodes = [];
  const { childs, ...newNode } = tree;
  nodes.push({
    ...newNode,
    ...(parentId && { parentId: parentId }),
    position: {
      x: 200,
      y: 200,
    },
    type: "organization",
  });
  for (let i = 0; i < childs.length; i++) {
    nodes.push(...getNodes(childs[i], newNode.id));
  }
  return nodes;
}
export { getEdges, getNodes };
