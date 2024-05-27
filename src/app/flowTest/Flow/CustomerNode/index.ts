import CircleNode from "./Circle";
import { DiamondNode } from "./Diamond";
import Group from "./Group";
import { SquareNode } from "./Square";

const nodeTypes = {
  circle: CircleNode,
  square: SquareNode,
  diamond: DiamondNode,
  custom_group: Group,
};
export default nodeTypes;
