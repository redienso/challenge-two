import React from "react";
import { UIApp } from "../../hooks/use-hosts";
import ApplicationItem from "./application-item";

type PropTypes = {
  apps: UIApp[];
};

const ApplicationList: React.FC<PropTypes> = function ({ apps }) {
  return (
    <React.Fragment>
      {apps.map((app) => (
        <ApplicationItem key={app.id} app={app} />
      ))}
    </React.Fragment>
  );
};

export default React.memo(ApplicationList);
