/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/Form/PHForm";
import { Button, Card, Col, Flex, Typography } from "antd";
import PHSelect from "../../../components/Form/PHSelect";
import PHInput from "../../../components/Form/PHInput";
import { toast } from "sonner";
import {
	useAddCourseMutation,
	useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";
const { Title } = Typography;

const CreateCourse = () => {
	const [AddCourse] = useAddCourseMutation();
	const { data: courses } = useGetAllCoursesQuery(undefined);
	console.log(courses);
	const PreRequisiteCoursesOptions = courses?.data?.map((item: any) => ({
		value: item._id,
		label: item.title,
	}));
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating.........😎😎");
		const courseData = {
			...data,
			code: Number(data.code),
			credits: Number(data.credits),
			isDeleted: false,
			preRequisiteCourses: data?.preRequisiteCourses
				? data?.preRequisiteCourses?.map((item: any) => ({
						course: item,
						isDeleted: false,
				}))
				: [],
		};
		console.log(courseData);

		try {
			const res = (await AddCourse(courseData)) as TResponse<any>;
			if (res?.error) {
				toast.error(res?.error.data?.message, { id: toastId });
			} else {
				toast.success("Semester Created Successfully !!", {
					id: toastId,
				});
			}
		} catch (error) {
			toast.error("Something Went Wrong", { id: toastId });
		}
	};
	return (
		<div>
			<Title
				level={2}
				style={{
					textAlign: "center",
					fontWeight: "bolder",
					paddingBottom: "15px",
					color: "#1890ff",
				}}
			>
				Create Course
			</Title>
			<Flex justify="center">
				<Col xs={24} sm={20} md={16} lg={12} xl={8}>
					<Card style={{ padding: "10px" }}>
						<PHForm onSubmit={onSubmit}>
							<PHInput type="text" name="title" label="Title" />
							<PHInput type="text" name="prefix" label="Prefix" />
							<PHSelect
								mode="multiple"
								label="PreRequisiteCourses"
								name="preRequisiteCourses"
								options={PreRequisiteCoursesOptions}
								size={"small"}
							></PHSelect>
							<PHInput type="text" name="code" label="Code" />
							<PHInput
								type="text"
								name="credits"
								label="Credits"
							/>
							<Button
								style={{
									width: "100%",
									height: "40px",
									borderRadius: "8px",
									backgroundColor: "#1890ff",
									color: "#ffffff",
									fontWeight: "bold",
									boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
									border: "none",
								}}
								htmlType="submit"
								block
							>
								Submit
							</Button>
						</PHForm>
					</Card>
				</Col>
			</Flex>
		</div>
	);
};

export default CreateCourse;
