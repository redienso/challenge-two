import Comparable from "./comparable";
import IAVLTreeNode from "./i-avl-tree-node";

type TravelOrder = ("left" | "root" | "right")[];

export default interface IAVLTree<T extends Comparable<T>> {
  root: IAVLTreeNode<T>;
  addNode(node: T): void;
  removeNode(node: T): T;
  travel(order: TravelOrder, amount: number): T[];
}
