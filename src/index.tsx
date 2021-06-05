import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import jss from "jss";
import preset from "jss-preset-default";
import { SheetsRegistry } from "react-jss";
import { JssProvider } from "react-jss";
import HelveticaNeueBold from "./assets/fonts/helvetica-neue-bold.ttf";
import HelveticaNeue from "./assets/fonts/helvetica-neue-regular.ttf";

const setupJss = () => {
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
          background: "#f5f5f5",
          fontFamily: "HelveticaNeue",
        },
      },
    })
    .attach();

  sheetsRegistry.add(globalStyleSheet);

  return sheetsRegistry;
};

const sheets = setupJss();

ReactDOM.render(
  <JssProvider registry={sheets}>
    <App />
  </JssProvider>,
  document.getElementById("apdex-board-app")
);
