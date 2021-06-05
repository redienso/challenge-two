import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { AppTheme } from "../app-theme";

type PropTypes = {
  secondary?: boolean;
  bold?: boolean;
  size?: number;
  lineHeight?: number;
  opacity?: number;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

const useStyles = createUseStyles<string, PropTypes & { theme: AppTheme }>({
  root: ({ theme, opacity, secondary, bold, size, lineHeight }) => ({
    fontSize: size,
    fontFamily: bold ? theme.font.bold : theme.font.regular,
    lineHeight: lineHeight,
    color: secondary ? theme.palette.secondary : theme.palette.primary,
    opacity: opacity / 100,
  }),
});

const Typography: React.FC<PropTypes> = function ({
  className = "",
  children = null,
  opacity = 100,
  secondary = false,
  bold = false,
  size = 16,
  lineHeight = 1.2,
  ...otherProps
}) {
  const theme = useTheme();
  const classes = useStyles({
    theme: theme as AppTheme,
    opacity,
    secondary,
    bold,
    size,
    lineHeight,
  });
  return (
    <span className={`${classes.root} ${className}`} {...otherProps}>
      {children}
    </span>
  );
};

export default Typography;
