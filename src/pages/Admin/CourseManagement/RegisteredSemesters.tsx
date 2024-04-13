/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useState } from "react";
import { Button } from "antd";
import { Dropdown, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
	useGetAllSemesterRegistedQuery,
	useUpdateSemesterRegisteredMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types";
import Title from "antd/es/typography/Title";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
	{
		label: "Upcoming",
		key: "upcoming",
	},
	{
		label: "Ongoing",
		key: "Ongoing",
	},
	{
		label: "Ended",
		key: "Ended",
	},
];
const RegisteredSemester = () => {
	const [semesterId, setSemesterId] = useState("");
	const {
		data: semesterData,
		isLoading,
		isFetching,
	} = useGetAllSemesterRegistedQuery(undefined);
	const [updateSemesterStatus] = useUpdateSemesterRegisteredMutation();
	const tableData = semesterData?.data?.map(
		({ _id, academicSemester, status, startDate, endDate }: any) => ({
			key: _id,
			name: `${academicSemester?.name}.${academicSemester?.year}`,
			status,
			startDate: moment(new Date(startDate)).format("MMM"),
			endDate: moment(new Date(endDate)).format("MMM"),
		})
	);
	const handleStatusUpdate = (data: { key: any }) => {
		const updateData = {
			id: semesterId,
			data: {
				status: data.key,
			},
		};
		updateSemesterStatus(updateData);
		console.log(data.key, "NewStatus");
		console.log(semesterId, "Semester");
	};
	const menuProps = {
		items,
		onClick: handleStatusUpdate,
	};
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			render: (item) => {
				let color;
				if (item === "Ongoing") {
					color = "blue";
				}
				if (item === "Upcoming") {
					color = "green";
				}
				if (item === "Ended") {
					color = "red";
				}
				return <Tag color={color}>{item}</Tag>;
			},
		},
		{
			title: "Start Date",
			key: "startDate",
			dataIndex: "startDate",
		},
		{
			title: "End Date",
			key: "endDate",
			dataIndex: "endDate",
		},
		{
			title: "Action",
			key: "x",
			render: (item) => {
				return (
					<Dropdown menu={menuProps} trigger={["click"]}>
						<Button onClick={() => setSemesterId(item.key)}>
							Update
						</Button>
					</Dropdown>
				);
			},
		},
	];

	if (isLoading) {
		return <p>Loadding...........</p>;
	}
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
				Semester Registration
			</Title>

			<Table
				loading={isFetching}
				columns={columns}
				dataSource={tableData}
			/>
		</div>
	);
};

export default RegisteredSemester;
