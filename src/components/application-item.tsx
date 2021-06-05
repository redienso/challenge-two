import React from "react";
import { createUseStyles } from "react-jss";
import { AppAttributes } from "../models/application";
import Typography from "./typography";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "22px 1fr",
    gridColumnGap: 16,
  },
});

const AppItem: React.FC<Pick<AppAttributes, "apdex" | "name">> = function ({
  apdex,
  name,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography secondary bold size={13} opacity={62} lineHeight={1.5}>
        {apdex}
      </Typography>
      <Typography secondary>{name}</Typography>
    </div>
  );
};

export default AppItem;
