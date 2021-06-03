import React from "react";
import Applitaction, { AppFromBack } from "../models/application";
import HostsList from "../models/hosts-list";
import ApplicationItem from "./application-item";
import HostCard from "./host-card";
import HostsTemplate from "./hosts-template";

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

  return (
    <HostsTemplate>
      <div>header</div>
      {Array(11)
        .fill(null)
        .map((_, idx) => (
          <HostCard>
            <span>title</span>
            <ApplicationItem apdex={idx} name="the name" />
          </HostCard>
        ))}
    </HostsTemplate>
  );
}
