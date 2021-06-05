import React from "react";
import useHosts from "../hooks/use-hosts";
import Header from "./header";
import HostCard from "./host-card";
import HostsTemplate from "./hosts-template";
import Checkbox from "./checkbox";
import Typography from "./typography";
import HeaderRightSide from "./header-right-side";
import ApplicationList from "./application-list";

export default function App() {
  const [showAsList, setShowAsList] = React.useState(false);
  const { hosts } = useHosts();

  return (
    <HostsTemplate showAsList={showAsList}>
      <Header
        leftSide={
          <Typography bold size={35}>
            Apps by Host
          </Typography>
        }
        rightSide={
          <HeaderRightSide
            showAsListElement={
              <Checkbox
                value={showAsList}
                onChange={() => setShowAsList((current) => !current)}
              >
                <Typography>Show as list</Typography>
              </Checkbox>
            }
          />
        }
      />
      {hosts.map((host) => (
        <HostCard key={host.name}>
          <Typography bold>{host.name}</Typography>
          <ApplicationList itemList={host.first25TopApps.slice(0, 5)} />
        </HostCard>
      ))}
    </HostsTemplate>
  );
}
