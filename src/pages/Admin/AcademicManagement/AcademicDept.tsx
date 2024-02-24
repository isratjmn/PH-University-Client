import Title from "antd/es/typography/Title";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType } from "antd";
import { TAcademicDepartment } from "../../../types";

export type TTableData = Pick<TAcademicDepartment, "name">;
const AcademicDept = () => {
	const { data: departmentData, isFetching } =
		useGetAllAcademicDepartmentQuery(undefined);
	console.log(departmentData);

	const tableData = departmentData?.data?.map(
		({ _id, name, academicFaculty }) => ({
			key: _id,
			name,
			academicFaculty: academicFaculty ? academicFaculty?.name : "N/A",
		})
	);

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Academic Department",
			key: "name",
			dataIndex: "name",
		},
		{
			title: "Academic Faculty",
			key: "academicFaculty",
			dataIndex: "academicFaculty",
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
				Academic Department
			</Title>
			<Table
				loading={isFetching}
				columns={columns}
				dataSource={tableData}
			/>
		</div>
	);
};

export default AcademicDept;
