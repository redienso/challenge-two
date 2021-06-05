import Guest from "./guest";
import IAVLTree from "./i-avl-tree";

export default interface IHost<T extends Guest<T>> {
  name: string;
  guestsTree: IAVLTree<T>;
  addGuest(guest: Guest<T>): void;
  removeGuest(guest: Guest<T>): T;
  searchGuests(order: "asc" | "desc", amount: number): T[];
}
