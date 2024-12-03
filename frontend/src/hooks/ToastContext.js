// ToastContext.js
import { Toast } from "primereact/toast";
import { createContext, useContext, useRef } from "react";

const ToastContext = createContext();

export const useToast = () => {
	return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
	const toast = useRef(null);

	const showInfoToast = (message) => {
		toast.current.show({ severity: "info", summary: "Info", detail: message });
	};
	const showErrorToast = (message) => {
		toast.current.show({
			severity: "error",
			summary: "Error",
			detail: message,
		});
	};
	const showSuccessToast = (message) => {
		toast.current.show({
			severity: "success",
			summary: "Success",
			detail: message,
		});
	};

	return (
		<ToastContext.Provider
			value={{ showErrorToast, showInfoToast, showSuccessToast }}
		>
			{children}
			<Toast ref={toast} />
		</ToastContext.Provider>
	);
};
