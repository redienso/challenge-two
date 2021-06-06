import Findable from "./findable";

export default interface IAVLTreeNode<T extends Findable<T>> {
  left: IAVLTreeNode<T>;
  right: IAVLTreeNode<T>;
  height: number;
  balance: number;
  value: Map<string, T>;
  valueRepresentation: T;
  updateHeight: () => void;
  rotateToRight: () => IAVLTreeNode<T>;
  rotateToLeft: () => IAVLTreeNode<T>;
}
