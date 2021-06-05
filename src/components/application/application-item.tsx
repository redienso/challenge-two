import React from "react";
import { createUseStyles } from "react-jss";
import { AppAttributes } from "../../models/application";
import Typography from "../typography";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "22px 1fr",
    gridColumnGap: 16,
    cursor: "pointer",
  },
});

const ApplicationItem: React.FC<
  Pick<AppAttributes, "apdex" | "name" | "version">
> = function ({ apdex, name, version }) {
  const classes = useStyles();

  function showReleaseVersion() {
    const message = `Version: ${version}\nApplication: ${name}`;
    alert(message);
  }

  return (
    <div className={classes.root} onClick={showReleaseVersion}>
      <Typography secondary bold size={13} opacity={62} lineHeight={1.5}>
        {apdex}
      </Typography>
      <Typography secondary>{name}</Typography>
    </div>
  );
};

export default ApplicationItem;
