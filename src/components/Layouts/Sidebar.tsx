import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utilities/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/features/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utilities/verifyToken";
const { Sider } = Layout;

const UserRole = {
	ADMIN: "admin",
	FACULTY: "faculty",
	STUDENT: "student",
};

const Sidebar = () => {
	// const user = useAppSelector(selectCurrentUser);
	const token = useAppSelector(useCurrentToken);
	// const user = useAppSelector(selectCurrentUser);
	let user;
	if (token) {
		user = verifyToken(token);
	}
	let sidebarItems;
	switch ((user as TUser)!.role) {
		case UserRole.ADMIN:
			sidebarItems = sidebarItemsGenerator(adminPaths, UserRole.ADMIN);
			break;
		case UserRole.FACULTY:
			sidebarItems = sidebarItemsGenerator(
				facultyPaths,
				UserRole.FACULTY
			);
			break;
		case UserRole.STUDENT:
			sidebarItems = sidebarItemsGenerator(
				studentPaths,
				UserRole.STUDENT
			);
			break;
		default:
			break;
	}

	return (
		<Sider
			breakpoint="lg"
			collapsedWidth="0"
			style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
		>
			<div
				className="demo-logo-vertical"
				style={{
					color: "white",
					textAlign: "center",
					height: "4rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h2>PH - UNI</h2>
			</div>
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={["4"]}
				items={sidebarItems}
			/>
		</Sider>
	);
};

export default Sidebar;
