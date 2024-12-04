import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";
const AuthContext = createContext();

const COOKIE_NAME = "SessionID";

const AuthProvider = ({ children }) => {
	const { showSuccessToast } = useToast();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userID, setUserID] = useState(null);
	useEffect(() => {
		// Check if the token exists in cookies
		const token = Cookies.get(COOKIE_NAME);
		if (token) {
			setIsAuthenticated(true); // User is authenticated
		}
	}, []);

	const login = (token) => {
		Cookies.set(COOKIE_NAME, token, { expires: 7 });
		const { email, userID } = jwtDecode(token);
		setIsAuthenticated(true);
		setUserID(userID);
	};

	const logout = () => {
		Cookies.remove(COOKIE_NAME);
		setIsAuthenticated(false);
		showSuccessToast("Successfully Logged out!");
	};
	return (
		<AuthContext.Provider value={{ isAuthenticated, userID, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	return useContext(AuthContext);
};
