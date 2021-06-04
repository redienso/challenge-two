import Comparable from "./comparable";

export default interface Guest<T> extends Comparable<T> {
  isEquals(t: T): boolean;
}
