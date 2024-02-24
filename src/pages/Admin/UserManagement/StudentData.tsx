/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Button,
	Pagination,
	Space,
	Table,
	TableColumnsType,
	TableProps,
} from "antd";
import Swal from "sweetalert2";
import { useState } from "react";
import {
	useChangeUsersStatusMutation,
	useGetAllStudentsQuery,
} from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { TQueryParams, TStudent } from "../../../types";
export type TTableData = Pick<
	TStudent,
	"fullName" | "id" | "email" | "contactNo"
>;
const StudentData = () => {
	const [params, setParams] = useState<TQueryParams[]>([]);
	const [changeUsersStatus] = useChangeUsersStatusMutation();
	const [page, setPage] = useState(1);
	const { data: studentData, isFetching } = useGetAllStudentsQuery([
		{ name: "limit", value: 8 },
		{ name: "page", value: page },
		{ name: "sort", value: "id" },
		...params,
	]);

	const handleBlockeduser = async (userId: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, blocked it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const userStatus = {
					status: "blocked",
				};
				await changeUsersStatus({ userStatus, userId });
				console.log(userId);
			} else if (result.isDenied) {
				Swal.fire({
					title: "Blocked !!",
					text: "User has been blocked !!",
					icon: "success",
				});
			}
		});
	};
	const handleUnblockedUser = async (userId: string) => {
		Swal.fire({
			title: "Are you sure !!",
			text: "You won't be able to revert this !!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Unblocked it !!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const userStatus = {
					status: "in-progress",
				};
				await changeUsersStatus({ userStatus, userId });
				Swal.fire({
					title: "Unblocked !!",
					text: "User has been unblocked !!",
					icon: "success",
				});
			}
		});
	};

	const metaData = studentData?.data?.meta;
	const tableData = studentData?.data?.result?.map(
		({ _id, fullName, id, email, contactNo }: any) => ({
			key: _id,
			fullName,
			id,
			email,
			contactNo,
		})
	);
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "fullName",
		},
		{
			title: "Roll No.",
			key: "id",
			dataIndex: "id",
		},
		{
			title: "Email",
			key: "email",
			dataIndex: "email",
		},
		{
			title: "Contact No.",
			key: "contactNo",
			dataIndex: "contactNo",
		},
		{
			title: "Action",
			key: "x",
			render: (item) => {
				return (
					<Space>
						{item.status === "blocked" ? (
							<Button size="small" type="dashed" danger>
								Blocked
							</Button>
						) : (
							<Button size="small" type="dashed">
								In-progress
							</Button>
						)}
					</Space>
				);
			},
		},
		{
			title: "Action",
			key: "x",
			render: (item) => {
				return (
					<Space>
						<Link to={`/admin/student-data/${item.key}`}>
							<Button
								style={{
									borderColor: "#1890ff",
									fontSize: "12px",
								}}
							>
								Details
							</Button>
						</Link>
						<Link to={`/admin/update-data/${item.key}`}>
							<Button
								style={{
									borderColor: "#1890ff",
									fontSize: "12px",
								}}
							>
								Update
							</Button>
						</Link>
						{item.status === "blocked" ? (
							<Button
								onClick={() =>
									handleUnblockedUser(item?.userId)
								}
								style={{
									borderColor: "#1890ff",
									fontSize: "12px",
								}}
							>
								Unblock
							</Button>
						) : (
							<Button
								onClick={() => handleBlockeduser(item?.userId)}
								style={{
									borderColor: "#1890ff",
									fontSize: "12px",
								}}
							>
								Block
							</Button>
						)}
					</Space>
				);
			},
			width: "1%",
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

	return (
		<>
			<Table
				loading={isFetching}
				columns={columns}
				dataSource={tableData}
				onChange={onChange}
				pagination={false}
			/>
			<Pagination
				current={page}
				onChange={(value) => setPage(value)}
				pageSize={metaData?.limit}
				total={metaData?.total}
			/>
		</>
	);
};

export default StudentData;
