import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../types";
import { Button } from "antd";

export type TTableData = Pick<
	TAcademicSemester,
	"name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
	const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
	const {
		data: semesterData,
		isLoading,
		isFetching,
	} = useGetAllSemesterQuery(params);

	const tableData = semesterData?.data?.map(
		({ _id, name, year, startMonth, endMonth }) => ({
			key: _id,
			name,
			year,
			startMonth,
			endMonth,
		})
	);

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
			filters: [
				{
					text: "Autumn",
					value: "Autumn",
				},
				{
					text: "Spring",
					value: "Spring",
				},
				{
					text: "Summer",
					value: "Summer",
				},
			],
		},
		{
			title: "Year",
			key: "year",
			dataIndex: "year",
			filters: [
				{
					text: "2024",
					value: "2024",
				},
				{
					text: "2025",
					value: "2025",
				},
				{
					text: "2026",
					value: "2026",
				},
			],
		},
		{
			title: "Start Month",
			key: "startMonth",
			dataIndex: "startMonth",
		},
		{
			title: "End Month",
			key: "endMonth",
			dataIndex: "endMonth",
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
	const onChange: TableProps<TTableData>["onChange"] = (
		_pagination,
		filters,
		_sorter,
		extra
	) => {
		if (extra.action === "filter") {
			const queryParams: TQueryParams[] = [];
			filters.name?.forEach((item) =>
				queryParams.push({ name: "name", value: item })
			);
			filters.year?.forEach((item) =>
				queryParams.push({ name: "year", value: item })
			);
			setParams(queryParams);
		}
	};
	if (isLoading) {
		return <p>Loadding...........</p>;
	}

	return (
		<div>
			<h1
				style={{
					textAlign: "center",
					fontWeight: 800,
					paddingBottom: "50px",
					color: "#1890ff",
					textTransform: "uppercase",
				}}
			>
				Academic Semester
			</h1>
			<Table
				loading={isFetching}
				columns={columns}
				dataSource={tableData}
				onChange={onChange}
			/>
		</div>
	);
};

export default AcademicSemester;
