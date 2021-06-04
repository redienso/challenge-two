import React from "react";
import useHosts from "../hooks/use-hosts";
import ApplicationItem from "./application-item";
import HostCard from "./host-card";
import HostsTemplate from "./hosts-template";

export default function App() {
  const { hosts } = useHosts();

  return (
    <HostsTemplate>
      <div>header</div>
      {hosts.map((host) => (
        <HostCard>
          <span>{host.name}</span>
          {host.first25TopApps.map((app) => (
            <ApplicationItem apdex={app.get("apdex")} name={app.get("name")} />
          ))}
        </HostCard>
      ))}
    </HostsTemplate>
  );
}
