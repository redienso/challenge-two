import React from "react";
import Application from "../../models/application";
import ApplicationItem from "./application-item";

type PropTypes = {
  apps: Application[];
};

const ApplicationList: React.FC<PropTypes> = function ({ apps }) {
  return (
    <React.Fragment>
      {apps.map((app) => (
        <ApplicationItem
          key={app.get("name")}
          apdex={app.get("apdex")}
          name={app.get("name")}
          version={app.get("version")}
        />
      ))}
    </React.Fragment>
  );
};

export default ApplicationList;
