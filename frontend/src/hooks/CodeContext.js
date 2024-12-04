// CodeContext.js
import axios from "axios";
import { createContext, useContext } from "react";
import { useToast } from "./ToastContext";

const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
	const { showErrorToast, showSuccessToast } = useToast();
	const generateCode = ({ userID, portfolioJSON }) => {
		return axios
			.post(
				"https://32mxwewldj.execute-api.us-east-1.amazonaws.com/test/generate",
				{ userID, ...portfolioJSON },
			)
			.then((res) => {
				showSuccessToast(res.data.message);
			})
			.catch((err) => {
				showErrorToast(err.message);
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
