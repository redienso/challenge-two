import AVLTree from "./avl-tree";
import Application from "./application";

export default class Host {
  private _name: string;
  private appsAVLTree: AVLTree<Application>;
  private _first25TopApps: Application[];
  private reloadFrist25TopApps = true;

  constructor(name: string) {
    this._name = name;
    this.appsAVLTree = new AVLTree();
  }

  get name() {
    return this._name;
  }

  get first25TopApps() {
    if (this.reloadFrist25TopApps) {
      this._first25TopApps = this.searchFirst25TopApps();
      this.reloadFrist25TopApps = false;
    }
    return this._first25TopApps;
  }

  private searchFirst25TopApps(): Application[] {
    return this.appsAVLTree.getBiggerNodeValues(25);
  }

  addApp(app: Application) {
    if (this.wasAddedOnePotencialFirst25TopApp(app))
      this.reloadFrist25TopApps = true;
    this.appsAVLTree.addNode(app);
  }

  private wasAddedOnePotencialFirst25TopApp(app: Application) {
    const f25taL = this.first25TopApps.length;
    return (
      !f25taL || app.attrs.apdex > this.first25TopApps[f25taL - 1].attrs.apdex
    );
  }

  removeApp(app: Application) {
    const removedApp = this.appsAVLTree.removeNode(app);
    if (removedApp && this.wasRemovedOnePotencialFirst25TopApp(removedApp))
      this.reloadFrist25TopApps = true;
  }

  private wasRemovedOnePotencialFirst25TopApp(app: Application) {
    const f25taL = this.first25TopApps.length;
    return (
      f25taL && app.attrs.apdex >= this.first25TopApps[f25taL - 1].attrs.apdex
    );
  }
}
