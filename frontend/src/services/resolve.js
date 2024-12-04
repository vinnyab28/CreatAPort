import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://api.example.com";

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const _get = (url, config = {}) => {
	return apiClient.get(url, config).catch((err) => {});
};

const _put = (url, data = {}, config = {}) => {
	return apiClient.put(url, data, config);
};

const _post = (url, data = {}, config = {}) => {
	return apiClient.post(url, data, config);
};

export { _get, _post, _put };
