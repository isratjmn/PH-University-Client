import Title from "antd/es/typography/Title";

const AdminDashboard = () => {
	return (
		<div>
			<Title
				level={2}
				style={{
					textAlign: "center",
					fontWeight: 800,
					fontSize: "26px",
					paddingBottom: "30px",
					color: "#1890ff",
					textTransform: "uppercase",
				}}
			>
				Admin Dashboard
			</Title>
		</div>
	);
};

export default AdminDashboard;
