import React from "react";
import AppsHostList from "../models/hosts-list";
import Application, { AppAttributes, AppFromBack } from "../models/application";
// TODO remove this mock
import mockApps from "../apps";

const appsHostList = new AppsHostList();

export default function useHosts() {
  const [hosts, setHosts] = React.useState([]);
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
    setHosts(appsHostList.hosts);
    console.log(appsHostList.getTopAppsByHost("7e6272f7-098e.dakota.biz"));
    // delete app with name = "Generic Concrete Car - Roberts - Brown, Inc"
    console.log(
      appsHostList.removeAppFromHosts(
        new Application({
          apdex: 76,
          name: "Generic Concrete Car - Roberts - Brown, Inc",
        } as AppAttributes),
        "7e6272f7-098e.dakota.biz"
      )
    );
    console.log(appsHostList.getTopAppsByHost("7e6272f7-098e.dakota.biz"));
  }, []);

  function loadApps(apps: AppFromBack[]) {
    for (const { host: hosts, ...appAttrs } of apps) {
      appsHostList.addAppToHosts(new Application(appAttrs), ...hosts);
    }
  }

  return { hosts };
}
