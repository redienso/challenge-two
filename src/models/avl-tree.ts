import Comparable from "./comparable";
import AVLTreeNode, { IAVLTreeNode } from "./avl-tree-node";

export interface IAVLTree<T extends Comparable<T>> {
  root: IAVLTreeNode<T>;
  addNode(node: T): void;
  removeNode(node: T): T;
  travel(order: ("left" | "root" | "right")[], amount: number): T[];
}
export default class AVLTree<T extends Comparable<T>> implements IAVLTree<T> {
  root: IAVLTreeNode<T> = null;

  addNode(nodeValue: T) {
    this.root = this._addNode(nodeValue, this.root);
  }

  private _addNode(nodeValue: T, node: IAVLTreeNode<T>) {
    if (node === null) return new AVLTreeNode(nodeValue);

    const comparativeResult = node.value.compareTo(nodeValue);
    // if (comparativeResult == 0) -- add value to node.value array
    if (comparativeResult > 0) {
      node.left = this._addNode(nodeValue, node.left);
    } else if (comparativeResult < 0) {
      node.right = this._addNode(nodeValue, node.right);
    } // else console.log(nodeValue);

    node.updateHeight();

    if (node.balance < -1) {
      const comparativeResultFromLeftNode =
        node.left.value.compareTo(nodeValue);
      if (comparativeResultFromLeftNode > 0) {
        return node.rotateToRight();
      } else if (comparativeResultFromLeftNode < 0) {
        node.left = node.left.rotateToLeft();
        return node.rotateToRight();
      }
    } else if (node.balance > 1) {
      const compareResultFromRightNode = node.right.value.compareTo(nodeValue);
      if (compareResultFromRightNode < 0) {
        return node.rotateToLeft();
      } else if (compareResultFromRightNode > 0) {
        node.right = node.right.rotateToRight();
        return node.rotateToLeft();
      }
    }

    return node;
  }

  removeNode(nodeValue: T): T {
    const [root, deleted] = this._removeNode(nodeValue, this.root);
    this.root = root;
    return deleted;
  }

  private _removeNode(
    nodeValue: T,
    node: IAVLTreeNode<T>
  ): [IAVLTreeNode<T>, T] {
    let deleted = null;
    if (!node) return [node, deleted];

    const comparativeResult = nodeValue.compareTo(node.value);
    if (comparativeResult < 0) {
      const [newNode, newDeleted] = this._removeNode(nodeValue, node.left);
      node.left = newNode;
      deleted = newDeleted;
    } else if (comparativeResult > 0) {
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
        const [newNode] = this._removeNode(node.value, node.right);
        node.right = newNode;
      }
    }

    if (!node) return [node, deleted];

    node.updateHeight();
    if (node.balance < -1) {
      if (node.left.balance <= 0) return [node.rotateToRight(), deleted];
      else {
        node.left = node.left.rotateToLeft();
        return [node.rotateToRight(), deleted];
      }
    }
    if (node.balance > 1) {
      if (node.right.balance >= 0) return [node.rotateToLeft(), deleted];
      else {
        node.right = node.right.rotateToRight();
        return [node.rotateToLeft(), deleted];
      }
    }

    return [node, deleted];
  }

  private getNodeWithMinValue(node: IAVLTreeNode<T>): IAVLTreeNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  travel(order, amount): T[] {
    if (new Set(order).size != 3)
      throw Error(
        "Travel order should mention the 3 node names without repetitions."
      );

    const list = [];

    const stepByNode = {
      left: (node) => _travel(node.left),
      right: (node) => _travel(node.right),
      root: (node) => {
        if (list.length + 1 > amount) return;
        list.push(node.value);
      },
    };

    function _travel(node: IAVLTreeNode<T>) {
      if (node == null) return;
      for (const nodeName of order) {
        stepByNode[nodeName](node);
      }
    }
    _travel(this.root);

    return list;
  }
}
