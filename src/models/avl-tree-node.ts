import Comparable from "./comparable";

export interface IAVLTreeNode<T extends Comparable<T>> {
  height: number;
  updateHeight: () => number;
  balance: number;
  value: T;
}

export class AVLTreeNode<T extends Comparable<T>> implements IAVLTreeNode<T> {
  left: IAVLTreeNode<T> = nullAVLTreeNode;
  right: IAVLTreeNode<T> = nullAVLTreeNode;
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

export const nullAVLTreeNode: IAVLTreeNode<null> = Object.freeze({
  height: 0,
  balance: 0,
  value: null,
  updateHeight: () => 0,
});
