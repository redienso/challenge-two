import Findable from "./findable";
import IAVLTreeNode from "./i-avl-tree-node";

type TravelOrder = ("left" | "root" | "right")[];

export default interface IAVLTree<T extends Findable<T>> {
  root: IAVLTreeNode<T>;
  addValue(node: T): void;
  removeValue(node: T): T;
  travel(order: TravelOrder, amount: number): T[];
}
