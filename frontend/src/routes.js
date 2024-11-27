import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Certifications from "./pages/Certifications";
import Code from "./pages/Code";
import Education from "./pages/Education";
import Experiences from "./pages/Experiences";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import Skills from "./pages/Skills";
import Templates from "./pages/Templates";
import VerificationPage from "./pages/VerificationPage";

const routes = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/verification",
		element: <VerificationPage />,
	},
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/skills",
				element: <Skills />,
			},
			{
				path: "/education",
				element: <Education />,
			},
			{
				path: "/experiences",
				element: <Experiences />,
			},
			{
				path: "/projects",
				element: <Projects />,
			},
			{
				path: "/certifications",
				element: <Certifications />,
			},
			{
				path: "/code",
				element: <Code />,
			},
			{
				path: "/templates",
				element: <Templates />,
			},
		],
	},
]);

export default routes;
