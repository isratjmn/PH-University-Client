import Title from "antd/es/typography/Title";

const AdminData = () => {
	return (
		<div>
			<Title
				level={2}
				style={{
					textAlign: "center",
					fontWeight: 800,
					fontSize: "28px",
					paddingBottom: "30px",
					color: "#1890ff",
					textTransform: "uppercase",
				}}
			>
				All Admins
			</Title>
		</div>
	);
};

export default AdminData;
