const distanceX = 50;
const distanceY = 50;
function calcSize(tree: any) {
  if (!tree?.childs?.length) {
    return {
      ...tree,
      shape: {
        ...tree.shape,
        coverWidth: Number(tree.shape.width),
        coverHeight: Number(tree.shape.height),
      },
    };
  } else {
    let width = 0,
      height = 0;
    for (let i = 0; i < tree?.childs.length; i++) {
      tree.childs[i] = calcSize(tree.childs[i]);
      width += Number(tree.childs[i].shape.coverWidth) + distanceX;
      height = Math.max(
        height,
        Number(tree.childs[i].shape.coverHeight) + distanceY
      );
    }
    height += Number(tree.shape.height) + distanceY;
    return {
      ...tree,
      shape: { ...tree.shape, coverWidth: width, coverHeight: height },
    };
  }
}
export { calcSize, calcLocation };
function calcLocation(tree: any, startX: any, startY: any) {
  let x = startX + distanceX / 2;
  if (tree?.childs?.length) {
    for (let i = 0; i < tree?.childs.length; i++) {
      tree.childs[i] = calcLocation(
        tree?.childs[i],
        x,
        startY + Number(tree?.childs[i].shape.height) + distanceY
      );
      x += tree.childs[i].shape.coverWidth + distanceX;
    }
  }
  return {
    ...tree,
    shape: {
      ...tree?.shape,
      x: tree?.shape.coverWidth / 2 + startX - Number(tree?.shape.width) / 2,
      y: startY,
    },
  };
}
