import AppsHost from "./apps-host";
import Application from "./application";

export default class AppsHostList {
  private _hosts: Map<string, AppsHost> = new Map();

  get hosts() {
    return this._hosts;
  }

  getTopAppsByHost(hostName: string): Application[] {
    return this._hosts.get(hostName).first25TopApps;
  }

  addAppToHosts(newApp: Application, ...hostsNames: string[]) {
    const hostsModified = [];
    for (const hostName of hostsNames) {
      if (!this._hosts.has(hostName)) {
        this._hosts.set(hostName, new AppsHost(hostName));
      }
      const host = this._hosts.get(hostName);
      host.addGuest(newApp);
      hostsModified.push(host);
    }
    return hostsModified;
  }

  removeAppFromHosts(app: Application, ...hostsNames: string[]) {
    const deletedByHost: Record<string, [AppsHost, Application]> = {};
    for (const hostName of hostsNames) {
      if (this._hosts.has(hostName)) {
        const deleted = this._hosts.get(hostName).removeGuest(app);
        if (deleted) {
          deletedByHost[hostName] = [this.hosts.get(hostName), deleted];
        }
      }
    }
    return deletedByHost;
  }
}
