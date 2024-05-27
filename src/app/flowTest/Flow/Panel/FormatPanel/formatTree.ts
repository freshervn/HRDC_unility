import { stratify, tree } from "d3-hierarchy";
const g = tree();
const getLayoutedElements = (nodes: any, edges: any) => {
  if (nodes.length === 0) return { nodes, edges };
  // eslint-disable-next-line
  const node0 = document
    ?.querySelector(`[data-id="${nodes[0].id}"]`)
    ?.getBoundingClientRect();

  const hierarchy = stratify()
    .id((node: any) => node?.id)
    .parentId(
      (node: any) => edges.find((edge: any) => edge.target === node?.id)?.source
    );

  const width = node0?.width || 100,
    height = node0?.height || 100;
  const root = hierarchy(nodes);
  const layout = g.nodeSize([width * 2, height * 2])(root);

  return {
    nodes: layout.descendants().map((node: any) => ({
      ...node.data,
      position: { x: node.x, y: node.y },
    })),
    edges,
  };
};
export default getLayoutedElements;
