import * as React from "react";
import * as ReactDOM from "react-dom";
import { createApolloClient } from "./lib/apollo";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";

const apolloClient = createApolloClient();

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ApolloProvider client={apolloClient}>
				<App />
			</ApolloProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root"),
);
