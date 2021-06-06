import React from "react";
import HostCardTemplate from "../hosts/host-card-template";
import ApplicationList from "../application/application-list";
import Typography from "../typography";
import { UIHost } from "../../hooks/use-hosts";

type PropTypes = {
  hosts: UIHost[];
};

const HostList: React.FC<PropTypes> = function ({ hosts }) {
  return (
    <React.Fragment>
      {hosts.map((host) => (
        <HostCardTemplate key={host.name}>
          <Typography bold>{host.name}</Typography>
          <ApplicationList apps={host.apps} />
        </HostCardTemplate>
      ))}
    </React.Fragment>
  );
};

export default HostList;
