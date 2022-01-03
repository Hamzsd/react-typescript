import { useAppPageQuery } from "./App.gql";

function App() {
	const { data, loading } = useAppPageQuery();

	if (loading) {
		return <div>Loading</div>;
	}

	return <div>{data?.user?.id}</div>;
}

export default App;
