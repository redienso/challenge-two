import Host from "./host";
import Application from "./application";

export default class HostsList {
  private _hosts: Map<string, Host> = new Map();

  get hosts() {
    return Array.from(this._hosts.values());
  }

  getTopAppsByHost(hostName: string): Application[] {
    return this._hosts.get(hostName).first25TopApps;
  }

  addAppToHosts(newApp: Application, ...hostsNames: string[]) {
    for (const hostName of hostsNames) {
      if (!this._hosts.has(hostName))
        this._hosts.set(hostName, new Host(hostName));
      this._hosts.get(hostName).addApp(newApp);
    }
  }

  removeAppFromHosts(app: Application, ...hostsNames: string[]) {
    for (const hostName of hostsNames)
      if (this._hosts.has(hostName)) {
        return this._hosts.get(hostName).removeApp(app);
      }
  }
}
