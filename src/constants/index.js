export default {
	api: {
		base:
			process.env.REACT_APP_ENV === "production"
				? "https://code-analyzer-api.herokuapp.com/api"
				: "http://localhost:8000/api",
		endpoints: {
			file: "/v1/analyze/file",
			raw: "/v1/analyze/raw"
		}
	}
};
