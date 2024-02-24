import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/Form/PHForm";
import PHInput from "../../../components/Form/PHInput";
import { Button, Card, Col, Divider, Form, Input, Row } from "antd";
import { bloodGroupOptions, gerderOptions } from "../../../constants/global";
import PHSelect from "../../../components/Form/PHSelect";
import PHDatePicker from "../../../components/Form/PHDateOicker";
import {
	useGetAcademicDepartmentQuery,
	useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentsMutation } from "../../../redux/features/admin/userManagement.api";
import Title from "antd/es/typography/Title";

const studentDeaultValues = {
	name: {
		firstName: "John",
		middleName: "Doe",
		lastName: "Smith",
	},
	gender: "male",
	bloodGroup: "A+",
	/* dateOfBirth: "1995-06-15",
	email: "john.doeMoonmoon@example.com", */
	contactNo: "+1234567890",
	emergencyContactNo: "+1987654321",
	presentAddress: "123 Main St, City",
	permanentAddress: "456 Elm St, Town",
	guardian: {
		fatherName: "David Smith",
		fathersOccupation: "Engineer",
		fatherContact: "+1122334455",
		motherName: "Jane Smith",
		mothersOccupation: "Doctor",
		motherContact: "+9988776655",
	},
	localGuardian: {
		name: "Alice Johnson",
		occupation: "Teacher",
		contactNo: "+5544332211",
		address: "789 Oak St, Village",
	},
	/* profileImg: "profile.jpg",
	admissionSemester: "academic-semester-id",
	academicDepartment: "academic-department-id",
	academicFaculty: "academic-faculty-id", */
};

const CreateStudent = () => {
	const [AddStudents, { data, error }] = useAddStudentsMutation();
	console.log({ data, error });
	const { data: sData, isLoading: sIsLoading } = useGetAllSemesterQuery(null);
	const { data: dData } = useGetAcademicDepartmentQuery(undefined, {
		skip: sIsLoading,
	});
	const semesterOptions = sData?.data?.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}));
	const departmentOptions = dData?.data?.map((item) => ({
		value: item._id,
		label: item.name,
	}));
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const studentData = {
			password: "student123",
			student: data,
		};
		console.log(data);
		const formData = new FormData();
		formData.append("data", JSON.stringify(studentData));
		formData.append("file", data.image);
		AddStudents(formData);
		//! This is for Development
		//! Just For Checking
		// console.log(Object.fromEntries(formData));
	};
	return (
		<>
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
				Create Student
			</Title>
			<Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
				<Col sm={24} md={20} xl={14} span={20}>
					<Card style={{ padding: "5px" }}>
						<PHForm
							onSubmit={onSubmit}
							defaultValues={studentDeaultValues}
						>
							<Divider
								style={{ fontWeight: "bold", fontSize: "18px" }}
							>
								Personal Information
							</Divider>
							<Row gutter={8}>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="name.firstName"
										label="First Name"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="name.middleName"
										label="Middle Name"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="name.lastName"
										label="Last Name"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHSelect
										options={gerderOptions}
										name="gender"
										label="Gender"
										size="small"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHDatePicker
										name="dateOfBirth"
										label="Date of Birth"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHSelect
										name="bloodGroup"
										options={bloodGroupOptions}
										label="Blood Group"
										size="small"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<Controller
										name="image"
										render={({
											field: {
												onChange,
												value,
												...field
											},
										}) => (
											<Form.Item label="Picture">
												<Input
													type="file"
													value={value?.fileName}
													{...field}
													onChange={(e) =>
														onChange(
															e.target.files?.[0]
														)
													}
													style={{ height: "40px" }}
												/>
											</Form.Item>
										)}
									/>
								</Col>
								<Divider
									style={{
										fontWeight: "bold",
										fontSize: "18px",
									}}
								>
									Contact Information
								</Divider>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="email"
										label="Email"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="contactNo"
										label="Contact"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="emergencyContactNo"
										label="Emergency Contact"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 8 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="presentAddress"
										label="Present Address"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="permanentAddress"
										label="Permanent Address"
									/>
								</Col>
								<Divider
									style={{
										fontWeight: "bold",
										fontSize: "18px",
									}}
								>
									Guardian Information
								</Divider>

								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="guardian.fatherName"
										label="Father Name"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="guardian.fathersOccupation"
										label="Fathers Occupation"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="guardian.fatherContact"
										label="Father Contact No"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="guardian.motherName"
										label="Mother Name"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="guardian.mothersOccupation"
										label="Mothers Occupation"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="guardian.motherContact"
										label="Mother Contact No"
									/>
								</Col>
								<Divider
									style={{
										fontWeight: "bold",
										fontSize: "18px",
									}}
								>
									Local Guardian Information
								</Divider>

								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="localGuardian.name"
										label="Name"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="localGuardian.occupation"
										label="Occupation"
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="localGuardian.contactNo"
										label="Contact No"
									/>
								</Col>

								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHInput
										type="text"
										name="localGuardian.address"
										label="Address"
									/>
								</Col>
								<Divider
									style={{
										fontWeight: "bold",
										fontSize: "18px",
									}}
								>
									Academic Information
								</Divider>

								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHSelect
										options={semesterOptions}
										disabled={sIsLoading}
										name="admissionSemester"
										label="Admission Semester"
										size={"small"}
									/>
								</Col>
								<Col
									span={24}
									md={{ span: 12 }}
									lg={{ span: 8 }}
								>
									<PHSelect
										options={departmentOptions}
										name="academicDepartment"
										label="Academic Department"
										size={"small"}
									/>
								</Col>
							</Row>
							<Button type="primary" htmlType="submit" block>
								Submit
							</Button>
						</PHForm>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default CreateStudent;
