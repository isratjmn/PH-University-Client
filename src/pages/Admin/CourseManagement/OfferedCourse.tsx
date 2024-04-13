/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Typography, Row, message, Card } from "antd";
import PHForm from "../../../components/Form/PHForm";
import PHInput from "../../../components/Form/PHInput";
import {
	useGetAcademicDepartmentQuery,
	useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/Form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
	useCreateOfferedCourseMutation,
	useGetAllCoursesQuery,
	useGetAllSemesterRegistedQuery,
	useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import PHSelect from "../../../components/Form/PHSelect";
import PHTimePicker from "../../../components/Form/PHTimePicker";
import { weekDaysOptions } from "../../../constants/global";
const { Title } = Typography;

const OfferedCourse = () => {
	const [courseId, setCourseId] = useState("");
	const [addOfferedCourse] = useCreateOfferedCourseMutation();
	const { data: semesterRegistrationData } = useGetAllSemesterRegistedQuery([
		{ name: "sort", value: "year" },
		{ name: "status", value: "Upcoming" },
	]);
	console.log(semesterRegistrationData);

	const { data: academicDepartmentData } =
		useGetAcademicDepartmentQuery(undefined);

	const { data: academicFacultyData } =
		useGetAcademicFacultiesQuery(undefined);
	console.log(academicFacultyData);

	const { data: coursesData } = useGetAllCoursesQuery(undefined);
	console.log(coursesData);

	const { data: facultiesData, isFetching: fetchingFaculties } =
		useGetCourseFacultiesQuery(courseId, { skip: !courseId });
	console.log(facultiesData);

	const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
		(item: { _id: any; academicSemester: { name: any; year: any } }) => ({
			value: item._id,
			label: `${item.academicSemester?.name} ${item.academicSemester?.year}`,
		})
	);
	const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
		value: item._id,
		label: item.name,
	}));
	const academicDepartmentOptions = academicDepartmentData?.data?.map(
		(item) => ({
			value: item._id,
			label: item.name,
		})
	);
	const courseOptions = coursesData?.data?.map(
		(item: { _id: any; title: any }) => ({
			value: item._id,
			label: item.title,
		})
	);
	const facultiesOptions = facultiesData?.data?.faculties?.map(
		(item: { _id: any; fullName: any }) => ({
			value: item._id,
			label: item.fullName,
		})
	);
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const offeredCourseData = {
			...data,
			maxCapacity: Number(data.maxCapacity),
			section: Number(data.section),
			startTime: moment(new Date(data.startTime)).format("HH:mm"),
			endTime: moment(new Date(data.endTime)).format("HH:mm"),
		};
		try {
			const res = await addOfferedCourse(offeredCourseData);
			if (res) {
				message.success("Offered course created successfully");
			} else {
				message.error("Failed to create offered course");
			}
		} catch (error) {
			console.error("Error:", error);
			message.error("Failed to create offered course");
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
				Offered Course
			</Title>
			<Flex justify="center" align="center">
				<Col span={24} xs={24} sm={20} md={18} lg={18} xl={10}>
				
					<Card style={{ padding: "10px" }}>
						<PHForm
							onSubmit={onSubmit}
							// defaultValues={defaultValues}
						>
							<Row gutter={[16, 16]}>
								<Col span={12}>
									<PHSelect
										name="semesterRegistration"
										label="Semester Registrations"
										options={semesterRegistrationOptions}
										size={"small"}
									/>
								</Col>
								<Col span={12}>
									<PHSelect
										name="academicFaculty"
										label="Academic Faculty"
										options={academicFacultyOptions}
										size={"small"}
									/>
								</Col>
							</Row>
							<Row gutter={[16, 16]}>
								<Col span={12}>
									<PHSelect
										name="academicDepartment"
										label="Academic Department"
										options={academicDepartmentOptions}
										size={"small"}
									/>
								</Col>
								<Col span={12}>
									<PHSelectWithWatch
										onValueChange={setCourseId}
										options={courseOptions}
										name="course"
										label="Course"
										size={"small"}
									/>
								</Col>
							</Row>
							<Row gutter={[16, 16]}>
								<Col span={12}>
									<PHSelect
										disabled={
											!courseId || fetchingFaculties
										}
										name="faculty"
										label="Faculty"
										options={facultiesOptions}
										size={"small"}
									/>
								</Col>
								<Col span={12}>
									<PHInput
										type="text"
										name="section"
										label="Section"
									/>
								</Col>
							</Row>
							<Row gutter={[16, 16]}>
								<Col span={12}>
									<PHSelect
										mode="multiple"
										options={weekDaysOptions}
										name="days"
										label="Days"
										size={"small"}
									/>
								</Col>
								<Col span={12}>
									<PHTimePicker
										name="startTime"
										label="Start Time"
									/>
								</Col>
								<Row gutter={[16, 16]}></Row>
								<Col span={12}>
									<PHInput
										type="text"
										name="maxCapacity"
										label="Max Capacity"
									/>
								</Col>
								<Col span={12}>
									<PHTimePicker
										name="endTime"
										label="End Time"
									/>
								</Col>
							</Row>
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

export default OfferedCourse;
