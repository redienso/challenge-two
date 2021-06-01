import React from "react";

export default function App() {
	React.useEffect(() => {
		fetch("https://kuupanda.free.beeceptor.com/apps", { method: "get" })
			.then((response) => response.json())
			.then((json) => console.log(json));
	}, []);

	return <h1>Hello World</h1>;
}
