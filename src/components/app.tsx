import React from "react";
import useHosts from "../hooks/use-hosts";
import HostsTemplate from "./hosts/hosts-template";
import Checkbox from "./checkbox";
import Typography from "./typography";
import Header from "./header/header";

import HostList from "./hosts/host-list";

export default function App() {
  const [showAsList, setShowAsList] = React.useState(false);
  const { hosts } = useHosts();

  function switchShowAsList() {
    setShowAsList((current) => !current);
  }

  return (
    <HostsTemplate showAsList={showAsList}>
      <Header
        showAsListElement={
          <Checkbox value={showAsList} onChange={switchShowAsList}>
            <Typography>Show as list</Typography>
          </Checkbox>
        }
      />
      <HostList hosts={hosts} />
    </HostsTemplate>
  );
}
