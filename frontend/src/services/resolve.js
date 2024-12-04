import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://api.example.com";

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const GATEWAY_URL = process.env.REACT_APP_GATEWAY || "https://api.example.com";

const apiClientGateway = axios.create({
	baseURL: GATEWAY_URL,
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

const _getGateway = (url, config = {}) => {
	return apiClientGateway.get(url, config).catch((err) => {});
};

const _putGateway = (url, data = {}, config = {}) => {
	return apiClientGateway.put(url, data, config);
};

const _postGateway = (url, data = {}, config = {}) => {
	return apiClientGateway.post(url, data, config);
};

export { _get, _getGateway, _post, _postGateway, _put, _putGateway };
