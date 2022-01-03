import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";

import fragmentTypes from "../fragmentTypes.json";

export const createApolloClient = () => {
	const apolloClient = new ApolloClient({
		link: ApolloLink.from([
			new HttpLink({
				uri: import.meta.env.VITE_BACKEND_URL + "/graphql",
				credentials: "same-origin",
			}),
		]),
		cache: new InMemoryCache({
			possibleTypes: fragmentTypes.possibleTypes,
		}),
		defaultOptions: {
			query: {
				fetchPolicy: "network-only",
				errorPolicy: "all",
			},
			watchQuery: {
				fetchPolicy: "cache-and-network",
				nextFetchPolicy: "cache-first",
				errorPolicy: "all",
			},
		},
	});

	return apolloClient;
};
