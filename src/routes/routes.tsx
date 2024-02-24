import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import { routesgenerator } from "../utilities/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoutes from "../components/Layouts/ProtectedRoutes";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "about",
				// element: <about />,
			},
			
		],
	},
	{
		path: "/admin",
		element: (
			<ProtectedRoutes role="admin">
				<App />
			</ProtectedRoutes>
		),

		children: routesgenerator(adminPaths),
	},
	{
		path: "/faculty",
		element: (
			<ProtectedRoutes role="faculty">
				<App />
			</ProtectedRoutes>
		),
		children: routesgenerator(facultyPaths),
	},
	{
		path: "/student",
		element: (
			<ProtectedRoutes role="student">
				<App />
			</ProtectedRoutes>
		),
		children: routesgenerator(studentPaths),
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/change-password",
		element: <ChangePassword />,
	},
	{
		path: "/signup",
		element: <Register />,
	},
]);
export default router;
