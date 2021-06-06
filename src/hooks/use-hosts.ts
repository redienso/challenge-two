import React from "react";
import AppsHostList from "../models/hosts-list";
import Application, { AppAttributes, AppFromBack } from "../models/application";
// TODO remove this mock
import mockApps from "../apps";
import AppsHost from "../models/apps-host";

const appsHostList = new AppsHostList();

export type UIApp = Pick<AppAttributes, "name" | "apdex" | "version"> & {
  id: string;
};

export type UIHost = Pick<AppsHost, "name"> & {
  apps: UIApp[];
};

export default function useHosts() {
  const [hosts, setHosts] = React.useState<Record<string, UIHost>>({});
  const hostList = React.useMemo(() => Object.values(hosts), [hosts]);
  /*
  React.useEffect(() => {
    fetch("https://kuupanda.free.beeceptor.com/apps", { method: "get" })
      .then((response) => response.json())
      .then(loadApps);
  }, []);
  */

  // TODO remove this mock code
  React.useEffect(() => {
    loadAppsFromBack(mockApps);

    // delete app with name = "Generic Concrete Car - Roberts - Brown, Inc"
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
  }, []);

  function loadAppsFromBack(apps: AppFromBack[]) {
    for (const { host: hosts, ...appAttrs } of apps) {
      addAppToHosts(appAttrs, ...hosts);
    }
  }

  function updateStateHosts(hosts: AppsHost[]) {
    for (const host of hosts) {
      setHosts((current) => ({
        ...current,
        [host.name]: {
          name: host.name,
          apps: host.first25TopApps.slice(0, 5).map((app) => ({
            id: app.id,
            name: app.get("name"),
            version: app.get("version"),
            apdex: app.get("apdex"),
          })),
        },
      }));
    }
  }

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
    updateStateHosts(Object.values(deletedByHost).map(([host]) => host));
    return deletedByHost;
  }

  function addAppToHosts(appAttributes: AppAttributes, ...hostNames: string[]) {
    const hostsModified = appsHostList.addAppToHosts(
      new Application(appAttributes),
      ...hostNames
    );
    updateStateHosts(hostsModified);
  }

  return { hosts: hostList };
}
