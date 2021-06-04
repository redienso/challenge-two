import React from "react";
import HostsList from "../models/hosts-list";
import Application, { AppAttributes, AppFromBack } from "../models/application";
// TODO remove this mock
import mockApps from "../apps";

const hostsList = new HostsList();

export default function useHosts() {
  /*
  React.useEffect(() => {
    fetch("https://kuupanda.free.beeceptor.com/apps", { method: "get" })
      .then((response) => response.json())
      .then(loadApps);
  }, []);
  */

  // TODO remove this mock code
  React.useEffect(() => {
    loadApps(mockApps);
    console.log(hostsList.getTopAppsByHost("7e6272f7-098e.dakota.biz"));
    // delete app with name = "Generic Concrete Car - Roberts - Brown, Inc"
    console.log(
      hostsList.removeAppFromHosts(
        new Application({ apdex: 76 } as AppAttributes),
        "7e6272f7-098e.dakota.biz"
      )
    );
    console.log(hostsList.getTopAppsByHost("7e6272f7-098e.dakota.biz"));
  }, []);

  function loadApps(apps: AppFromBack[]) {
    for (const { host: hosts, ...appAttrs } of apps) {
      hostsList.addAppToHosts(new Application(appAttrs), ...hosts);
    }
  }

  return { hosts: hostsList.hosts };
}
