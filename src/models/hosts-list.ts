import AppsHost from "./apps-host";
import Application from "./application";

export default class AppsHostList {
  private _hosts: Map<string, AppsHost> = new Map();

  get hosts() {
    return Array.from(this._hosts.values());
  }

  getTopAppsByHost(hostName: string): Application[] {
    return this._hosts.get(hostName).first25TopApps;
  }

  addAppToHosts(newApp: Application, ...hostsNames: string[]) {
    for (const hostName of hostsNames) {
      if (!this._hosts.has(hostName))
        this._hosts.set(hostName, new AppsHost(hostName));
      this._hosts.get(hostName).addGuest(newApp);
    }
  }

  removeAppFromHosts(app: Application, ...hostsNames: string[]) {
    for (const hostName of hostsNames)
      if (this._hosts.has(hostName)) {
        return this._hosts.get(hostName).removeGuest(app);
      }
  }
}
