import Comparable from "./comparable";

export abstract class AbsAVLTreeNode<T extends Comparable<T>> {
  left: AbsAVLTreeNode<T>;
  right: AbsAVLTreeNode<T>;
  height: number;
  updateHeight: () => number;
  balance: number;
  value: T;
  static init: <T extends Comparable<T>>(nodeValue: T) => AbsAVLTreeNode<T> = (
    nodeValue
  ) => new AVLTreeNode(nodeValue);
}

export class AVLTreeNode<T extends Comparable<T>> implements AbsAVLTreeNode<T> {
  left = nullAVLTreeNode;
  right = nullAVLTreeNode;
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
    return this.right.height - this.left.height;
  }

  updateHeight() {
    return (this._height = Math.max(this.left.height, this.right.height));
  }
}

export const nullAVLTreeNode: AbsAVLTreeNode<null> = Object.freeze({
  height: 0,
  balance: 0,
  value: null,
  updateHeight: () => 0,
});
