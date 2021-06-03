import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    padding: 30,
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: 30,
    background: "white",
  },
});

const HostCard: React.FC = function ({ children }) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default HostCard;
