import AcademicSemester from "../pages/Admin/AcademicManagement/AcademicSemester";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/UserManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/UserManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/UserManagement/CreateStudent";
import CreateAcademicSemester from "../pages/Admin/AcademicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/Admin/AcademicManagement/CreateAcademicFaculty";
import AcademicFaculty from "../pages/Admin/AcademicManagement/AcademicFaculty";
import CreateAcademicDept from "../pages/Admin/AcademicManagement/CreateAcademicDept";
import AcademicDept from "../pages/Admin/AcademicManagement/AcademicDept";
import StudentData from "../pages/Admin/UserManagement/StudentData";
import StudentDetails from "../pages/Admin/UserManagement/StudentDetails";
import SemsterRegistration from "../pages/Admin/CourseManagement/SemsterRegistration";
import RegisteredSemesters from "../pages/Admin/CourseManagement/RegisteredSemesters";
import CreateCourse from "../pages/Admin/CourseManagement/CreateCourse";
import Courses from "../pages/Admin/CourseManagement/Courses";
import OfferedCourse from "../pages/Admin/CourseManagement/OfferedCourse";
import StudentUpdate from "../pages/Admin/UserManagement/StudentUpdate";
import AdminData from "../pages/Admin/UserManagement/AdminData";

export const adminPaths = [
	{
		name: "Dashboard",
		path: "dashboard",
		element: <AdminDashboard />,
	},
	{
		name: "Academic Management",
		children: [
			{
				name: "Create A. Semester",
				path: "create-academic-semester",
				element: <CreateAcademicSemester />,
			},
			{
				name: "Academic Semester",
				path: "academic-semester",
				element: <AcademicSemester />,
			},
			{
				name: "Create A. Faculty",
				path: "create-academic-faculty",
				element: <CreateAcademicFaculty />,
			},
			{
				name: "Academic Faculty",
				path: "academic-faculty",
				element: <AcademicFaculty />,
			},
			{
				name: "Create A. Department",
				path: "create-academic-department",
				element: <CreateAcademicDept />,
			},
			{
				name: "Academic Department",
				path: "academic-department",
				element: <AcademicDept />,
			},
		],
	},
	{
		name: "User Management",
		children: [
			{
				name: "Create Student",
				path: "create-student",
				element: <CreateStudent />,
			},
			{
				name: "Students",
				path: "student-data",
				element: <StudentData />,
			},
			{
				path: "student-data/:studentId",
				element: <StudentDetails />,
			},
			{
				path: "update-data/:studentId",
				element: <StudentUpdate />,
			},

			{
				name: "Create Admin",
				path: "create-admin",
				element: <CreateAdmin />,
			},
			{
				name: "Admins",
				path: "admin-data",
				element: <AdminData />,
			},
			{
				name: "Create Faculty",
				path: "create-faculty",
				element: <CreateFaculty />,
			},
		],
	},
	{
		name: "Course Management",
		children: [
			{
				name: "Semster Registration",
				path: "semster-registration",
				element: <SemsterRegistration />,
			},
			{
				name: "Registered Semesters",
				path: "registered-semesters",
				element: <RegisteredSemesters />,
			},
			{
				name: "Create Course",
				path: "create-course",
				element: <CreateCourse />,
			},
			{
				name: "Courses",
				path: "courses",
				element: <Courses />,
			},
			{
				name: "Offer Course",
				path: "offer-course",
				element: <OfferedCourse />,
			},
		],
	},
];

/* export const adminSidebarItems = adminPaths.reduce(
	(acc: TSideBarItems[], item) => {
		if (item.path && item.name) {
			acc.push({
				key: item.name,
				label: (
					<NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
				),
			});
		}
		if (item.children) {
			acc.push({
				key: item.name,
				label: item.name,
				children: item.children.map((child) => ({
					key: child.name,
					label: (
						<NavLink to={`/admin/${child.path}`}>
							{child.name}
						</NavLink>
					),
				})),
			});
		}
		return acc;
	},
	[]
);
 */
// ! Programmitical Way
/* export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
	if (item.path && item.element) {
		acc.push({
			path: item.path,
			element: item.element,
		});
	}
	if (item.children) {
		item.children.forEach((child) => {
			acc.push({
				path: child.path,
				element: child.element,
			});
		});
	}
	return acc;
}, []); */

// ! Hard Coded Way
/* export const adminPaths = [
	{
		path: "dashboard",
		element: <AdminDashboard />,
	},
	{
		path: "create-admin",
		element: <CreateAdmin />,
	},
	{
		path: "create-faculty",
		element: <CreateFaculty />,
	},
	{
		path: "create-student",
		element: <CreateStudent />,
	},
]; */
