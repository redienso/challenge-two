import Host from "./host";
import Application from "./application";

export default class HostsList {
  private hosts: Map<string, Host> = new Map();

  getTopAppsByHost(hostName: string): Application[] {
    return this.hosts.get(hostName).first25TopApps;
  }

  addAppToHosts(newApp: Application, ...hostsNames: string[]) {
    for (const hostName of hostsNames) {
      if (!this.hosts.has(hostName))
        this.hosts.set(hostName, new Host(hostName));
      this.hosts.get(hostName).addApp(newApp);
    }
  }

  removeAppFromHosts(appName: string, ...hostsNames: string[]) {
    for (const hostName of hostsNames)
      if (this.hosts.has(hostName)) this.hosts.get(hostName).removeApp(appName);
  }
}
