import * as React from "react";
import * as ReactDOM from "react-dom";

import { createApolloClient } from "./lib/apollo";

import App from "./App";
import { ApolloProvider } from "@apollo/client";

const apolloClient = createApolloClient();

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
