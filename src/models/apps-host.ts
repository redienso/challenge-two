import AVLTree from "./avl-tree";
import Application from "./application";
import IHost from "./abstract/i-host";

export default class AppsHost implements IHost<Application> {
  private _name: string;
  private _guestsTree: AVLTree<Application>;
  private _first25TopApps: Application[];
  private _reloadFirst25TopApps = true;

  constructor(name: string) {
    this._name = name;
    this._guestsTree = new AVLTree();
  }

  get name() {
    return this._name;
  }

  get guestsTree() {
    return this._guestsTree;
  }

  get reloadFirst25TopApps() {
    return this._reloadFirst25TopApps;
  }

  // time complexity is O(1) -> in worst case it travels through 25 elements
  get first25TopApps() {
    if (this.reloadFirst25TopApps) {
      this._first25TopApps = this.searchFirst25TopApps();
      this._reloadFirst25TopApps = false;
    }
    return this._first25TopApps;
  }

  // time complexity is O(1) -> always travel through maximum 25 elements
  private searchFirst25TopApps(): Application[] {
    return this.searchGuests("desc", 25);
  }

  // time complexity is O(n) -> n = amount of elements to search
  searchGuests(order: "asc" | "desc", amount: number): Application[] {
    const parsedOrder = {
      asc: ["left", "root", "right"],
      desc: ["right", "root", "left"],
    };
    return this._guestsTree.travel(parsedOrder[order], amount);
  }

  // time complexity is O(log n) ->  log n = deep of avl guestTree, n = nodes count of avl guestTree
  addGuest(app: Application) {
    if (this.wasAddedOnePotentialFirst25TopApp(app))
      this._reloadFirst25TopApps = true;
    this._guestsTree.addValue(app);
  }

  // time complexity is O(1) -> always does the same comparative
  private wasAddedOnePotentialFirst25TopApp(app: Application) {
    const f25taL = this.first25TopApps.length;
    return (
      !f25taL || app.get("apdex") > this.first25TopApps[f25taL - 1].get("apdex")
    );
  }

  // time complexity is O(log n) ->  log n = deep of avl guestTree, n = nodes count of avl guestTree
  removeGuest(app: Application) {
    const removedApp = this._guestsTree.removeValue(app);
    if (removedApp && this.wasRemovedOnePotentialFirst25TopApp(removedApp))
      this._reloadFirst25TopApps = true;
    return removedApp;
  }

  // time complexity is O(1) -> always does the same comparative
  private wasRemovedOnePotentialFirst25TopApp(app: Application) {
    const f25taL = this.first25TopApps.length;
    return (
      f25taL && app.get("apdex") >= this.first25TopApps[f25taL - 1].get("apdex")
    );
  }
}
