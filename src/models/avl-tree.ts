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
    } // else console.log(nodeValue);

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

  removeNode(nodeValue: T): T {
    const [root, deleted] = this._removeNode(nodeValue, this.root);
    this.root = root;
    return deleted;
  }

  private _removeNode(nodeValue: T, node: AVLTreeNode<T>): [AVLTreeNode<T>, T] {
    let deleted = null;
    if (!node) return [node, deleted];

    const compareRefult = nodeValue.compareTo(node.value);
    if (compareRefult < 0) {
      const [newNode, newDeleted] = this._removeNode(nodeValue, node.left);
      node.left = newNode;
      deleted = newDeleted;
    } else if (compareRefult > 0) {
      const [newNode, newDeleted] = this._removeNode(nodeValue, node.right);
      node.right = newNode;
      deleted = newDeleted;
    } else {
      deleted = node.value;
      if (!node.left && !node.right) {
        node = null;
      } else if (!node.left) {
        node = node.right;
      } else if (!node.right) {
        node = node.left;
      } else {
        const nodeWithSuccessorValue = this.getNodeWithMinValue(node.right);
        node.value = nodeWithSuccessorValue.value;
        node.right = this._removeNode(node.value, node.right);
      }
    }

    if (!node) return [node, deleted];

    node.updateHeight();
    if (node.balance < -1) {
      if (node.left.balance <= 0) return this.rotateToRight(node);
      else {
        node.left = this.rotateToLeft(node.left);
        return this.rotateToRight(node);
      }
    }
    if (node.balance > 1) {
      if (node.right.balance >= 0) return this.rotateToLeft(node);
      else {
        node.right = this.rotateToRight(node.right);
        return this.rotateToLeft(node);
      }
    }

    return [node, deleted];
  }

  private getNodeWithMinValue(node: AVLTreeNode<T>): AVLTreeNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
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
