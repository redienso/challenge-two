import React from "react";
import { createUseStyles } from "react-jss";
import Typography from "./typography";

type PropTypes = {
  showAsListElement: React.ReactElement;
};

const useStyles = createUseStyles({
  root: {
    display: "inline-grid",
    gridTemplateColumns: "auto auto",
    gridColumnGap: 30,
  },
});

export default function HeaderRightSide({ showAsListElement }: PropTypes) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography size={18}>
        for user averylongemailadress@companyname.com
      </Typography>
      {showAsListElement}
    </div>
  );
}
