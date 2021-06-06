import React from "react";
import { UIApp } from "../../hooks/use-hosts";
import ApplicationItem from "./application-item";

type PropTypes = {
  apps: UIApp[];
};

const ApplicationList: React.FC<PropTypes> = function ({ apps }) {
  return (
    <React.Fragment>
      {apps.map(({ id, name, apdex, version }) => (
        <ApplicationItem key={id} apdex={apdex} name={name} version={version} />
      ))}
    </React.Fragment>
  );
};

export default ApplicationList;
