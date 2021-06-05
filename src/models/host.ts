import AVLTree from "./avl-tree";
import Application from "./application";
import IHost from "./abstract/i-host";

export default class AppsHost implements IHost<Application> {
  private _name: string;
  private _guestsTree: AVLTree<Application>;
  private _first25TopApps: Application[];
  private reloadFirst25TopApps = true;

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

  get first25TopApps() {
    if (this.reloadFirst25TopApps) {
      this._first25TopApps = this.searchFirst25TopApps();
      this.reloadFirst25TopApps = false;
    }
    return this._first25TopApps;
  }

  private searchFirst25TopApps(): Application[] {
    return this.searchGuests("desc", 25);
  }

  searchGuests(order: "asc" | "desc", amount: number): Application[] {
    const parsedOrder = {
      asc: ["left", "root", "right"],
      desc: ["right", "root", "left"],
    };
    return this._guestsTree.travel(parsedOrder[order], amount);
  }

  addGuest(app: Application) {
    if (this.wasAddedOnePotentialFirst25TopApp(app))
      this.reloadFirst25TopApps = true;
    this._guestsTree.addNode(app);
  }

  private wasAddedOnePotentialFirst25TopApp(app: Application) {
    const f25taL = this.first25TopApps.length;
    return (
      !f25taL || app.get("apdex") > this.first25TopApps[f25taL - 1].get("apdex")
    );
  }

  removeGuest(app: Application) {
    const removedApp = this._guestsTree.removeNode(app);
    if (removedApp && this.wasRemovedOnePotentialFirst25TopApp(removedApp))
      this.reloadFirst25TopApps = true;
    return removedApp;
  }

  private wasRemovedOnePotentialFirst25TopApp(app: Application) {
    const f25taL = this.first25TopApps.length;
    return (
      f25taL && app.get("apdex") >= this.first25TopApps[f25taL - 1].get("apdex")
    );
  }
}
