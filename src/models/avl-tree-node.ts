import Findable from "./abstract/findable";
import IAVLTreeNode from "./abstract/i-avl-tree-node";

export default class AVLTreeNode<T extends Findable<T>>
  implements IAVLTreeNode<T>
{
  left = null;
  right = null;
  value: Map<string, T> = new Map();
  private _valueRepresentation: T;
  private _height: number = 1;

  constructor(value: T) {
    this.value.set(value.id, value);
    this._valueRepresentation = value;
  }

  get valueRepresentation() {
    return this._valueRepresentation;
  }

  get height() {
    return this._height;
  }

  get balance() {
    return this.getHeight(this.right) - this.getHeight(this.left);
  }

  private getHeight(node: IAVLTreeNode<T>) {
    return node ? node.height : 0;
  }

  updateHeight() {
    this._height =
      Math.max(this.getHeight(this.left), this.getHeight(this.right)) + 1;
  }

  rotateToRight(): IAVLTreeNode<T> {
    const leftNode = this.left;
    const rightNodeOfLeftNode = leftNode.right;
    leftNode.right = this;
    this.left = rightNodeOfLeftNode;
    this.updateHeight();
    leftNode.updateHeight();
    return leftNode;
  }

  rotateToLeft(): IAVLTreeNode<T> {
    const rightNode = this.right;
    const leftNodeOfRightNode = rightNode.left;
    rightNode.left = this;
    this.right = leftNodeOfRightNode;
    this.updateHeight();
    rightNode.updateHeight();
    return rightNode;
  }
}
