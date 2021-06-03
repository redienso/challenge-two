import Comparable from "./comparable";

interface IAVLTreeNode<T extends Comparable<T>> {
  left: IAVLTreeNode<T>;
  right: IAVLTreeNode<T>;
  height: number;
  updateHeight: () => void;
  balance: number;
  value: T;
}

export default class AVLTreeNode<T extends Comparable<T>>
  implements IAVLTreeNode<T>
{
  left = null;
  right = null;
  private _value: T;
  private _height: number = 1;

  constructor(value: T) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  get height() {
    return this._height;
  }

  get balance() {
    return this.getHeight(this.right) - this.getHeight(this.left);
  }

  private getHeight(node: AVLTreeNode<T>) {
    return node ? node.height : 0;
  }

  updateHeight() {
    this._height =
      Math.max(this.getHeight(this.left), this.getHeight(this.right)) + 1;
  }
}
