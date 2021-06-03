import React from "react";
import { createUseStyles } from "react-jss";

const firstElement = "& > *:first-child";

const useStyles = createUseStyles({
  root: {
    display: "grid",
    gridGap: 30,
    gridTemplateColumns: "repeat(2, minmax(375px, 1fr))",
    padding: 30,
    paddingTop: 60,
    width: 840,
    boxSizing: "border-box",
    [firstElement]: {
      gridArea: "1 / 1 / span 1 / -1",
    },
  },
});

const HostsTemplate: React.FC = function ({ children }) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default HostsTemplate;
