import React from "react";
import { createUseStyles } from "react-jss";

type PropTypes = {
  leftSide: React.ReactElement;
  rightSide: React.ReactElement;
};

const useStyles = createUseStyles({
  root: {
    display: "inline-grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "baseline",
  },
  rightSide: {
    justifySelf: "self-end",
  },
});

const HeaderTemplate: React.FC<PropTypes> = function ({ leftSide, rightSide }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>{leftSide}</div>
      <div className={classes.rightSide}>{rightSide}</div>
    </div>
  );
};

export default HeaderTemplate;
