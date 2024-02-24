import Title from "antd/es/typography/Title";
import { useAddFacultiesMutation } from "../../../redux/features/admin/courseManagement.api";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";
import { TFaculty } from "../../../types/userManagement.type";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/Form/PHForm";
import PHInput from "../../../components/Form/PHInput";
import PHSelect from "../../../components/Form/PHSelect";
import PHDatePicker from "../../../components/Form/PHDateOicker";
import { bloodGroupOptions, gerderOptions } from "../../../constants/global";
import { Controller, FieldValues } from "react-hook-form";

const CreateFaculty = () => {
	const navigate = useNavigate();
	const [addFaculty] = useAddFacultiesMutation();
	const { data: dData, isLoading: dIsLoading } =
		useGetAcademicDepartmentQuery(null);
	const departmentOptions = dData?.data?.map((item) => ({
		value: item._id,
		label: item.name,
	}));

	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Creating faculty...");
		const facultyData = {
			password: "faculty123",
			faculty: data,
		};

		const formData = new FormData();
		formData.append("data", JSON.stringify(facultyData));
		formData.append("file", data.image);
		try {
			const res = (await addFaculty(formData)) as TResponse<TFaculty>;
			console.log(res);
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Faculty created", { id: toastId });
				navigate(`/admin/faculties-data`);
			}
		} catch (err) {
			toast.error("Something went wrong", { id: toastId });
		}
	};
	return (
		<div>
			<Title
				level={2}
				style={{
					textAlign: "center",
					fontWeight: 800,
					fontSize: "28px",
					color: "#1890ff",
					textTransform: "uppercase",
				}}
			>
				Create faculty
			</Title>
			<Row justify="center" align="middle">
				<Col sm={24} md={20} xl={12} span={24}>
					<Card style={{ padding: "5px" }}>
						<PHForm
							onSubmit={onSubmit}
							// defaultValues={}
						>
							<Divider
								style={{ fontWeight: "bold", fontSize: "18px" }}
							>
								Personal Info.
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
									<PHInput
										type="text"
										name="designation"
										label="Designation"
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
									Contact Info.
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
									md={{ span: 12 }}
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
									Academic Info.
								</Divider>

								<Col span={24}>
									<PHSelect
										label="Academic Department"
										name="academicDepartment"
										options={departmentOptions}
										size="small"
										disabled={dIsLoading}
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
		</div>
	);
};

export default CreateFaculty;
