import AVLTree from "./avl-tree";
import App from "./app";

export default class Host {
	private _name: string;
	private appsAVLTree: AVLTree<App>;
	private _first25TopApps: App[];
	private reloadFrist25TopApps = true;

	constructor(name: string) {
		this._name = name;
	}

	get name() { return this._name }

	get first25TopApps() {
		if (this.reloadFrist25TopApps) {
			this._first25TopApps = this.searchFirst25TopApps();
			this.reloadFrist25TopApps = false;
		}
		return this._first25TopApps;
	}

	private searchFirst25TopApps(): App[] {
		return this.appsAVLTree.getBiggerNodeValues(25);
	}

	addApp(app: App) {
		this.validateF25taRealod(app);
		this.appsAVLTree.addNode(app);
	}

	private validateF25taRealod(app: App) {
		const f25taL = this.first25TopApps.length;
		if (f25taL && app.attrs.apdex > this.first25TopApps[f25taL].attrs.apdex)
			this.reloadFrist25TopApps = true;
	}

	removeApp(appName: string) {
		const isRemoveTarget = (app: App) => app.attrs.name == appName;
		const deletedApp = this.appsAVLTree.removeNode(isRemoveTarget)
		if (deletedApp) this.validateF25taRealod(deletedApp);
	}
}
