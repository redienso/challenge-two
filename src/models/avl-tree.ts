import Comparable from "./comparable";
import AVLTreeNode from "./avl-tree-node";

export default class AVLTree<T extends Comparable<T>> {
  root: AVLTreeNode<T> = null;

  addNode(nodeValue: T) {
    this.root = this._addNode(nodeValue, this.root);
  }

  private _addNode(nodeValue: T, node: AVLTreeNode<T>) {
    if (node === null) return new AVLTreeNode(nodeValue);

    const compareResult = node.value.compareTo(nodeValue);
    // if (comparationResult == 0) -- add value to node.value array
    if (compareResult > 0) {
      node.left = this._addNode(nodeValue, node.left);
    } else if (compareResult < 0) {
      node.right = this._addNode(nodeValue, node.right);
    } else console.log(nodeValue);

    node.updateHeight();

    if (node.balance < -1) {
      const compareResultFromLeftNode = node.left.value.compareTo(nodeValue);
      if (compareResultFromLeftNode > 0) {
        return this.rotateToRight(node);
      } else if (compareResultFromLeftNode < 0) {
        node.left = this.rotateToLeft(node.left);
        return this.rotateToRight(node);
      }
    } else if (node.balance > 1) {
      const compareResultFromRighNode = node.right.value.compareTo(nodeValue);
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
    const list = [];
    function travelInDescOrder(node: AVLTreeNode<T>) {
      if (node == null) return;
      travelInDescOrder(node.right);
      if (list.length + 1 >= amount) return;
      list.push(node.value);
      travelInDescOrder(node.left);
    }
    travelInDescOrder(this.root);
    return list;
  }

  rotateToRight(node: AVLTreeNode<T>) {
    const leftNode = node.left;
    const rightNodeOfLeftNode = leftNode.right;
    leftNode.right = node;
    node.left = rightNodeOfLeftNode;
    node.updateHeight();
    leftNode.updateHeight();
    return leftNode;
  }

  rotateToLeft(node: AVLTreeNode<T>) {
    const rightNode = node.right;
    const leftNodeOfRightNode = rightNode.left;
    rightNode.left = node;
    node.right = leftNodeOfRightNode;
    node.updateHeight();
    rightNode.updateHeight();
    return rightNode;
  }
}
