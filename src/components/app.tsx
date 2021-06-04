import React from "react";
import useHosts from "../hooks/use-hosts";
import ApplicationItem from "./application-item";
import HostCard from "./host-card";
import HostsTemplate from "./hosts-template";

export default function App() {
  const { hosts } = useHosts();
  // {hostsList.hosts.map((host) => (
  //   <HostCard>
  //     <span>{host.name}</span>
  //     {host.first25TopApps.map(({ attrs: { apdex, name } }) => (
  //       <ApplicationItem apdex={apdex} name={name} />
  //     ))}
  //   </HostCard>
  // ))}

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
