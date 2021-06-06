import Findable from "./abstract/findable";
import IAVLTree from "./abstract/i-avl-tree";
import IAVLTreeNode from "./abstract/i-avl-tree-node";
import AVLTreeNode from "./avl-tree-node";

export default class AVLTree<T extends Findable<T>> implements IAVLTree<T> {
  root: IAVLTreeNode<T> = null;

  // time complexity is O(log n) ->  log n = deep of avl tree, n = nodes count of avl tree
  addValue(nodeValue: T) {
    this.root = this._addValue(nodeValue, this.root);
  }

  // time complexity is O(log n) ->  log n = deep of avl tree from parameter node until down, n = nodes count of alv tree from parameter node until down
  private _addValue(nodeValue: T, node: IAVLTreeNode<T>) {
    if (node === null) return new AVLTreeNode(nodeValue);

    const comparativeResult = node.valueRepresentation.compareTo(nodeValue);
    if (comparativeResult > 0) {
      node.left = this._addValue(nodeValue, node.left);
    } else if (comparativeResult < 0) {
      node.right = this._addValue(nodeValue, node.right);
    } else {
      node.value.set(nodeValue.id, nodeValue);
    }

    node.updateHeight();

    if (node.balance < -1) {
      const comparativeResultFromLeftNode =
        node.left.valueRepresentation.compareTo(nodeValue);
      if (comparativeResultFromLeftNode > 0) {
        return node.rotateToRight();
      } else if (comparativeResultFromLeftNode < 0) {
        node.left = node.left.rotateToLeft();
        return node.rotateToRight();
      }
    } else if (node.balance > 1) {
      const compareResultFromRightNode =
        node.right.valueRepresentation.compareTo(nodeValue);
      if (compareResultFromRightNode < 0) {
        return node.rotateToLeft();
      } else if (compareResultFromRightNode > 0) {
        node.right = node.right.rotateToRight();
        return node.rotateToLeft();
      }
    }

    return node;
  }

  // time complexity is O(log n) ->  log n = deep of avl tree, n = nodes count of avl tree
  removeValue(nodeValue: T): T {
    const [root, deleted] = this._removeValue(nodeValue, this.root);
    this.root = root;
    return deleted;
  }

  // time complexity is O(log n) ->  log n = deep of avl tree from parameter node until down, n = nodes count of alv tree from parameter node until down
  private _removeValue(
    nodeValue: T,
    node: IAVLTreeNode<T>,
    removeNode?: boolean
  ): [IAVLTreeNode<T>, T] {
    let deleted = null;
    if (!node) return [node, deleted];

    const comparativeResult = nodeValue.compareTo(node.valueRepresentation);
    if (comparativeResult < 0) {
      const [newNode, newDeleted] = this._removeValue(nodeValue, node.left);
      node.left = newNode;
      deleted = newDeleted;
    } else if (comparativeResult > 0) {
      const [newNode, newDeleted] = this._removeValue(nodeValue, node.right);
      node.right = newNode;
      deleted = newDeleted;
    } else {
      if (!removeNode) {
        deleted = node.value.get(nodeValue.id);
        node.value.delete(nodeValue.id);
      }
      if (node.value.size && !removeNode) return [node, deleted];
      if (!node.left && !node.right) {
        node = null;
      } else if (!node.left) {
        node = node.right;
      } else if (!node.right) {
        node = node.left;
      } else {
        const nodeWithSuccessorValue = this.getNodeWithMinValue(node.right);
        node.value = nodeWithSuccessorValue.value;
        const [newNode] = this._removeValue(
          node.valueRepresentation,
          node.right,
          true
        );
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

  // time complexity is O(log n) -> log n = deep of avl tree from parameter node until down, n = nodes count of alv tree from parameter node until down
  private getNodeWithMinValue(node: IAVLTreeNode<T>): IAVLTreeNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  // time complexity is O(n) -> n = amount of elements to travel through
  travel(order, amount): T[] {
    if (new Set(order).size != 3)
      throw Error(
        "Travel order should mention the 3 node names without repetitions."
      );

    const list = [];

    const stepByNode = {
      left: (node: IAVLTreeNode<T>) => _travel(node.left),
      right: (node: IAVLTreeNode<T>) => _travel(node.right),
      root: (node: IAVLTreeNode<T>) => {
        for (const value of node.value.values()) {
          if (list.length + 1 > amount) return;
          list.push(value);
        }
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
