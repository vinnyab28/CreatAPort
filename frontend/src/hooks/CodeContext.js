// CodeContext.js
import axios from "axios";
import { createContext, useContext } from "react";
import { useToast } from "./ToastContext";

const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
	const { showErrorToast, showSuccessToast } = useToast();
	const generateCode = (data) => {
		return axios
			.post(
				"https://7ky1rrzsv2.execute-api.us-east-1.amazonaws.com/dev/generate",
				data,
			)
			.then((res) => {
				showSuccessToast(res.body?.message);
				const objectUrl = res.body?.url;
				if (objectUrl) {
					window.open(objectUrl, "_blank");
				}
			})
			.catch((err) => {
				showErrorToast(err.body?.message);
			});
	};

	const saveCode = (data) => {
		return axios
			.post("http://localhost:5005/save", data)
			.then((res) => {
				showSuccessToast(res.data.message);
			})
			.catch((err) => {
				showErrorToast(err.message);
			});
	};

	return (
		<CodeContext.Provider value={{ saveCode, generateCode }}>
			{children}
		</CodeContext.Provider>
	);
};

export default CodeProvider;

export const useCode = () => {
	return useContext(CodeContext);
};
