import React from "react";
import AppsHostList from "../models/hosts-list";
import Application, { AppAttributes, AppFromBack } from "../models/application";
import AppsHost from "../models/apps-host";

const appsHostList = new AppsHostList();

export type UIApp = Pick<AppAttributes, "name" | "apdex" | "version"> & {
  id: string;
};

export type UIHost = Pick<AppsHost, "name"> & {
  apps: UIApp[];
};

const appsCountForUIHost = 5;

export default function useHosts() {
  const [hosts, setHosts] = React.useState<Record<string, UIHost>>({});
  const hostList = React.useMemo(() => Object.values(hosts), [hosts]);

  React.useEffect(() => {
    fetch("https://kuupanda.free.beeceptor.com/apps", { method: "get" })
      .then((response) => response.json())
      .then(loadAppsFromBack)
      .then(() => test());
  }, []);

  function test() {
    setTimeout(() => {
      const hostNames = [
        "7e6272f7-098e.dakota.biz",
        "e7bf58af-f0be.dallas.biz",
      ];
      const {
        [hostNames[0]]: [, deletedApp],
      } = removeAppFromHosts(
        {
          apdex: 99,
          name: "Practical Fresh Chips - Weber - Lemke, Inc",
        },
        ...hostNames
      );

      setTimeout(() => {
        addAppToHosts(deletedApp.attrs, ...hostNames);
      }, 3000);
    }, 3000);
  }

  // time complexity is O(s * m * log n) -> s = apps.length, m = hosts count of specified app, log n = deep of avl guestTree of specified host, n = nodes count of avl guestTree of specified host
  function loadAppsFromBack(apps: AppFromBack[]) {
    for (const { host: hosts, ...appAttrs } of apps) {
      addAppToHosts(appAttrs, ...hosts);
    }
  }

  // time complexity is O(m) -> m = hosts.length
  function updateStateHosts(hosts: AppsHost[]) {
    for (const host of hosts) {
      setHosts((current) => ({
        ...current,
        [host.name]: {
          name: host.name,
          apps: host.first25TopApps.slice(0, appsCountForUIHost).map((app) => ({
            id: app.id,
            name: app.get("name"),
            version: app.get("version"),
            apdex: app.get("apdex"),
          })),
        },
      }));
    }
  }

  // time complexity is O(m * log n) -> m = hostsName.length, log n = deep of avl guestTree of specified host, n = nodes count of avl guestTree of specified host
  function removeAppFromHosts(
    { name, apdex }: Pick<UIApp, "name" | "apdex">,
    ...hostNames: string[]
  ) {
    const deletedByHost = appsHostList.removeAppFromHosts(
      new Application({
        apdex,
        name,
      } as AppAttributes),
      ...hostNames
    );
    const hostsToUpdate = Object.values(deletedByHost)
      .map(([host]) => host)
      .filter((host) => host.reloadFirst25TopApps);
    updateStateHosts(hostsToUpdate);
    return deletedByHost;
  }

  // time complexity is O(m * log n) -> m = hostsName.length, log n = deep of avl guestTree of specified host, n = nodes count of avl guestTree of specified host
  function addAppToHosts(appAttributes: AppAttributes, ...hostNames: string[]) {
    const hostsModified = appsHostList.addAppToHosts(
      new Application(appAttributes),
      ...hostNames
    );
    const hostsToUpdate = hostsModified.filter(
      (host) => host.reloadFirst25TopApps
    );
    updateStateHosts(hostsToUpdate);
  }

  return { hosts: hostList };
}
