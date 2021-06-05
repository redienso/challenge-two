import React from "react";
import { createUseStyles } from "react-jss";

type PropTypes = {
  showAsList: boolean;
};

const headerElement = "& > *:first-child";

const useStyles = createUseStyles<string, PropTypes>({
  root: {
    display: "grid",
    gridGap: 30,
    gridTemplateColumns: ({ showAsList }) =>
      showAsList ? "1fr" : "repeat(2, minmax(375px, 1fr))",
    padding: 30,
    paddingTop: 60,
    width: 840,
    boxSizing: "border-box",
    margin: "auto",
    [headerElement]: {
      gridArea: "1 / 1 / span 1 / -1",
    },
  },
});

const HostsTemplate: React.FC<PropTypes> = function ({ showAsList, children }) {
  const classes = useStyles({ showAsList });
  return <div className={classes.root}>{children}</div>;
};

export default HostsTemplate;
