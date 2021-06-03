import React from "react";
import { AppAttributes } from "../models/application";

const ApplicationItem: React.FC<Pick<AppAttributes, "apdex" | "name">> =
  function ({ apdex, name }) {
    return (
      <div>
        <span>{apdex}</span>
        <span>{name}</span>
      </div>
    );
  };

export default ApplicationItem;
