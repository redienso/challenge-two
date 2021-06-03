import React from "react";
import Applitaction, { AppFromBack } from "../models/application";
import HostsList from "../models/hosts-list";

const hostsList = new HostsList();

export default function App() {
  React.useEffect(() => {
    fetch("https://kuupanda.free.beeceptor.com/apps", { method: "get" })
      .then((response) => response.json())
      .then((apps: AppFromBack[]) => {
        for (const { host: hosts, ...appAttrs } of apps) {
          hostsList.addAppToHosts(new Applitaction(appAttrs), ...hosts);
        }
        console.log(hostsList.getTopAppsByHost("7e6272f7-098e.dakota.biz"));
      });
  }, []);

  return <h1>Hello World</h1>;
}
