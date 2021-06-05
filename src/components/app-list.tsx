import React from "react";
import Application from "../models/application";
import AppItem from "./application-item";

type PropTypes = {
  itemList: Application[];
};

const AppList: React.FC<PropTypes> = function ({ itemList }) {
  return (
    <React.Fragment>
      {itemList.map((app) => (
        <AppItem
          key={app.get("name")}
          apdex={app.get("apdex")}
          name={app.get("name")}
        />
      ))}
    </React.Fragment>
  );
};

export default AppList;
