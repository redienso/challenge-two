import React from "react";
import AppsHost from "../../models/host";
import HostCardTemplate from "../hosts/host-card-template";
import ApplicationList from "../application/application-list";
import Typography from "../typography";

type PropTypes = {
  hosts: AppsHost[];
};

const HostList: React.FC<PropTypes> = function ({ hosts }) {
  return (
    <React.Fragment>
      {hosts.map((host) => (
        <HostCardTemplate key={host.name}>
          <Typography bold>{host.name}</Typography>
          <ApplicationList apps={host.first25TopApps.slice(0, 5)} />
        </HostCardTemplate>
      ))}
    </React.Fragment>
  );
};

export default HostList;
