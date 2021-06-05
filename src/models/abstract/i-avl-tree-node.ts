import Comparable from "./comparable";

export default interface IAVLTreeNode<T extends Comparable<T>> {
  left: IAVLTreeNode<T>;
  right: IAVLTreeNode<T>;
  height: number;
  balance: number;
  value: T;
  updateHeight: () => void;
  rotateToRight: () => IAVLTreeNode<T>;
  rotateToLeft: () => IAVLTreeNode<T>;
}
