/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Modal, Table } from "antd";
import { useState } from "react";
import PHSelect from "../../../components/Form/PHSelect";
import PHForm from "../../../components/Form/PHForm";
import {
	useAddFacultiesMutation,
	useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const Courses = () => {
	const { data: courses, isFetching } = useGetAllCoursesQuery(null);
	const tableData = courses?.data?.map(
		({ _id, title, prefix, code }: any) => ({
			key: _id,
			title,
			code: `${prefix}${code}`,
		})
	);

	const columns = [
		{
			title: "Title",
			key: "title",
			dataIndex: "title",
		},
		{
			title: "Code",
			key: "code",
			dataIndex: "code",
		},
		{
			title: "Action",
			key: "x",
			render: (item: any) => {
				return <AddFacultyModal facultyInfo={item} />;
			},
		},
	];
	/* const onChange: TableProps<TTableData>["onChange"] = (
		_pagination,
		filters,
		_sorter,
		extra
	) => {
		if (extra.action === "filter") {
			const queryParams: TQueryParam[] = [];
			setParams(queryParams);
		}
	}; */
	return (
		<Table loading={isFetching} columns={columns} dataSource={tableData} />
	);
};

const AddFacultyModal = ({ facultyInfo }: any) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
	const [AddFaculties] = useAddFacultiesMutation();
	const facultiesOption = facultiesData?.data?.map((item) => ({
		value: item._id,
		label: item.fullName,
	}));
	const handleSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Assign Faculty........!!!");
		const facultyData = {
			courseId: facultyInfo.key,
			data,
		};
		try {
			const res = (await AddFaculties(facultyData)) as TResponse<any>;
			if (res.error) {
				toast.error(res.error.data.message, {
					id: toastId,
				});
			} else {
				toast.success("Faculty Assigned Successfully...", {
					id: toastId,
				});
			}
		} catch (err) {
			toast.error("Somthing Went Wrong", { id: toastId });
		}
		console.log(facultyData);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Button onClick={showModal}>Add Faculty</Button>
			<Modal
				title="Basic Modal"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				
				<Card style={{ padding: "10px" }}>
					<PHForm onSubmit={handleSubmit}>
						<PHSelect
							mode="multiple"
							name="faculties"
							label="Faculty"
							size={"small"}
							options={facultiesOption}
						/>
						<Button htmlType="submit" block>
							Submit
						</Button>
					</PHForm>
				</Card>
			</Modal>
		</>
	);
};

export default Courses;
