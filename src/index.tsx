import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import jss from "jss";
import preset from "jss-preset-default";
import { SheetsRegistry } from "react-jss";
import { JssProvider } from "react-jss";

const setupJss = () => {
  jss.setup(preset());

  const sheetsRegistry = new SheetsRegistry();

  const globalStyleSheet = jss
    .createStyleSheet({
      "@global": {
        body: {
          margin: 0,
          background: "#f5f5f5",
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
