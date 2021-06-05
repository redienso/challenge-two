import React from "react";
import { createUseStyles } from "react-jss";
import { AppTheme } from "../../app-theme";

const useStyles = createUseStyles((theme: AppTheme) => ({
  root: {
    padding: 30,
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: 30,
    background: theme.palette.background.light,
  },
}));

const HostCardTemplate: React.FC = function ({ children }) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default HostCardTemplate;
