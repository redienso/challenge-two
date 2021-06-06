import Comparable from "./comparable";
import Equalize from "./equalize";

export default interface Findable<T> extends Comparable<T>, Equalize<T> {
  id: string;
}
