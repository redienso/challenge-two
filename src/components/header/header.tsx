import React from "react";
import HeaderTemplate from "./header-template";
import Typography from "../typography";
import { createUseStyles } from "react-jss";

type PropTypes = {
  showAsListElement: React.ReactElement;
};

const useStyles = createUseStyles({
  rightSide: {
    display: "inline-grid",
    gridTemplateColumns: "auto auto",
    gridColumnGap: 30,
  },
});

const Header: React.FC<PropTypes> = function ({
  showAsListElement,
}: PropTypes) {
  const classes = useStyles();
  return (
    <HeaderTemplate
      leftSide={
        <Typography bold size={35}>
          Apps by Host
        </Typography>
      }
      rightSide={
        <div className={classes.rightSide}>
          <Typography size={18}>
            for user averylongemailadress@companyname.com
          </Typography>
          {showAsListElement}
        </div>
      }
    />
  );
};

export default Header;
