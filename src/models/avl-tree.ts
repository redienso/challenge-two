import Comparable from "./comparable";
import { IAVLTreeNode, nullAVLTreeNode } from "./avl-tree-node";

export default class AVLTree<T extends Comparable<T>> {
  root: IAVLTreeNode<T> = nullAVLTreeNode;

  addNode(nodeValue: T, node: IAVLTreeNode<T>) {}

  removeNode(isTarget: (nodeValue: T) => boolean): T {
    return null;
  }

  getBiggerNodeValues(amount: number): T[] {
    return [];
  }

  rotateSimpleRight() {}

  rotateSimpleLeft() {}

  rotateDoubleRight() {}

  rotateDoubleLeft() {}
}
