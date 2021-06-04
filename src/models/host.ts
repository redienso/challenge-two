import AVLTree from "./avl-tree";
import Application from "./application";

export default class Host {
  private _name: string;
  private appsAVLTree: AVLTree<Application>;
  private _first25TopApps: Application[];
  private reloadFirst25TopApps = true;

  constructor(name: string) {
    this._name = name;
    this.appsAVLTree = new AVLTree();
  }

  get name() {
    return this._name;
  }

  get first25TopApps() {
    if (this.reloadFirst25TopApps) {
      this._first25TopApps = this.searchFirst25TopApps();
      this.reloadFirst25TopApps = false;
    }
    return this._first25TopApps;
  }

  private searchFirst25TopApps(): Application[] {
    return this.appsAVLTree.getBiggerNodeValues(25);
  }

  addApp(app: Application) {
    if (this.wasAddedOnePotentialFirst25TopApp(app))
      this.reloadFirst25TopApps = true;
    this.appsAVLTree.addNode(app);
  }

  private wasAddedOnePotentialFirst25TopApp(app: Application) {
    const f25taL = this.first25TopApps.length;
    return (
      !f25taL || app.attrs.apdex > this.first25TopApps[f25taL - 1].attrs.apdex
    );
  }

  removeApp(app: Application) {
    const removedApp = this.appsAVLTree.removeNode(app);
    if (removedApp && this.wasRemovedOnePotentialFirst25TopApp(removedApp))
      this.reloadFirst25TopApps = true;
    return removedApp;
  }

  private wasRemovedOnePotentialFirst25TopApp(app: Application) {
    const f25taL = this.first25TopApps.length;
    return (
      f25taL && app.attrs.apdex >= this.first25TopApps[f25taL - 1].attrs.apdex
    );
  }
}
