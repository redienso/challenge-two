import React from "react";
import { UIHost } from "../../hooks/use-hosts";
import HostCardTemplate from "../hosts/host-card-template";
import ApplicationList from "../application/application-list";
import Typography from "../typography";

type PropTypes = {
  host: UIHost;
};

const HostCard: React.FC<PropTypes> = function ({ host: { name, apps } }) {
  return (
    <HostCardTemplate>
      <Typography bold>{name}</Typography>
      <ApplicationList apps={apps} />
    </HostCardTemplate>
  );
};

export default React.memo(HostCard);
