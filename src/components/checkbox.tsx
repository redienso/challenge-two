import React from "react";
import { createUseStyles } from "react-jss";

type PropTypes = {
  value: boolean;
  onChange: (value: boolean) => void;
} & React.HTMLAttributes<HTMLSpanElement>;

const useStyles = createUseStyles({
  root: {
    display: "inline-grid",
    gridTemplateColumns: "auto auto",
    alignItems: "center",
    gridColumnGap: 8,
    cursor: "pointer",
  },
  box: {
    display: "inline-block",
    position: "relative",
    boxSizing: "border-box",
    height: 16,
    width: 16,
    border: "solid 1px gray",
  },
  checkedBox: {
    position: "absolute",
    margin: "auto",
    width: 8,
    height: 8,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "black",
  },
});

const Checkbox: React.FC<PropTypes> = function ({
  value,
  onChange,
  children,
  className = "",
  ...otherProps
}) {
  const classes = useStyles();
  return (
    <span
      className={`${classes.root} ${className}`}
      {...otherProps}
      onClick={onChange}
    >
      <div className={classes.box}>
        {value ? <div className={classes.checkedBox}></div> : null}
      </div>
      {children}
    </span>
  );
};

export default Checkbox;
