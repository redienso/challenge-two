import React from "react";
import ReactDOM from "react-dom";

import jss from "jss";
import preset from "jss-preset-default";
import { JssProvider, SheetsRegistry, ThemeProvider } from "react-jss";

import HelveticaNeueBold from "./assets/fonts/helvetica-neue-bold.ttf";
import HelveticaNeue from "./assets/fonts/helvetica-neue-regular.ttf";

import App from "./components/app";
import { theme, AppTheme } from "./app-theme";

const setupJss = (theme: AppTheme) => {
  jss.setup(preset());

  const sheetsRegistry = new SheetsRegistry();

  const globalStyleSheet = jss
    .createStyleSheet({
      "@global": {
        "@font-face": [
          {
            fontFamily: "HelveticaNeueBold",
            src: `url(${HelveticaNeueBold})`,
          },
          {
            fontFamily: "HelveticaNeue",
            src: `url(${HelveticaNeue})`,
          },
        ],
        body: {
          margin: 0,
          background: theme.palette.background.default,
          fontFamily: theme.font.regular,
          lineHeight: 1.2,
          fontSize: 16,
        },
      },
    })
    .attach();

  sheetsRegistry.add(globalStyleSheet);

  return sheetsRegistry;
};

const sheets = setupJss(theme);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <JssProvider registry={sheets}>
      <App />
    </JssProvider>
  </ThemeProvider>,
  document.getElementById("apdex-board-app")
);
