import Title from "antd/es/typography/Title";
import { TAcademicFaculty } from "../../../types";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType } from "antd";

export type TTableData = Pick<TAcademicFaculty, "name">;
const AcademicFaculty = () => {
	const { data: facultyData, isFetching } =
		useGetAcademicFacultiesQuery(undefined);
	const tableData = facultyData?.data?.map(({ _id, name }) => ({
		key: _id,
		name,
	}));
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Academic Faculty",
			key: "name",
			dataIndex: "name",
		},
		{
			title: "Action",
			key: "x",
			render: () => {
				return (
					<div>
						<Button style={{ borderColor: "#1890ff" }}>
							UPDATE
						</Button>
					</div>
				);
			},
		},
	];
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
				Academic Faculty
			</Title>
			<Table
				loading={isFetching}
				columns={columns}
				dataSource={tableData}
			/>
		</div>
	);
};

export default AcademicFaculty;
