import React from "react";
import { UIHost } from "../../hooks/use-hosts";
import HostCard from "./host-card";

type PropTypes = {
  hosts: UIHost[];
};

const HostList: React.FC<PropTypes> = function ({ hosts }) {
  return (
    <React.Fragment>
      {hosts.map((host) => (
        <HostCard key={host.name} host={host} />
      ))}
    </React.Fragment>
  );
};

export default React.memo(HostList);
