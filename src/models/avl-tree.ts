import Comparable from "./comparable";
import { AbsAVLTreeNode, nullAVLTreeNode } from "./avl-tree-node";

export default class AVLTree<T extends Comparable<T>> {
  root: AbsAVLTreeNode<T> = nullAVLTreeNode;

  addNode(nodeValue: T) {
    this.root = this._addNode(nodeValue, this.root);
  }

  private _addNode(nodeValue: T, node: AbsAVLTreeNode<T>) {
    if (node === nullAVLTreeNode) return AbsAVLTreeNode.init(nodeValue);

    const compareResult = node.value.compareTo(nodeValue);
    // if (comparationResult == 0) -- add value to node.value array
    const nextNode = compareResult > 0 ? node.left : node.right;
    this._addNode(nodeValue, nextNode);
    node.updateHeight();

    if (node.balance < -1) {
      const compareResultFromLeftNode = node.left.value.compareTo(nodeValue);
      if (compareResultFromLeftNode < 0) {
        return this.rotateToRight(node);
      } else if (compareResultFromLeftNode > 0) {
        node.left = this.rotateToLeft(node.left);
        return this.rotateToRight(node);
      }
    } else if (node.balance > 1) {
      const compareResultFromRighNode = node.left.value.compareTo(nodeValue);
      if (compareResultFromRighNode < 0) {
        return this.rotateToLeft(node);
      } else if (compareResultFromRighNode > 0) {
        node.right = this.rotateToRight(node.right);
        return this.rotateToLeft(node);
      }
    }

    return node;
  }

  removeNode(isTarget: (nodeValue: T) => boolean): T {
    return null;
  }

  getBiggerNodeValues(amount: number): T[] {
    return [];
  }

  rotateToRight(node: AbsAVLTreeNode<T>) {
    const leftNode = node.left;
    const rightNodeOfLeftNode = leftNode.right;
    leftNode.right = node;
    node.left = rightNodeOfLeftNode;
    node.updateHeight();
    leftNode.updateHeight();
    return leftNode;
  }

  rotateToLeft(node: AbsAVLTreeNode<T>) {
    const rightNode = node.right;
    const leftNodeOfRightNode = rightNode.left;
    rightNode.left = node;
    node.right = leftNodeOfRightNode;
    node.updateHeight();
    rightNode.updateHeight();
    return rightNode;
  }
}
