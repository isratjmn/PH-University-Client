import Title from "antd/es/typography/Title";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { Controller, FieldValues } from "react-hook-form";
import { TAdmin, TResponse } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/Form/PHForm";
import PHInput from "../../../components/Form/PHInput";
import PHSelect from "../../../components/Form/PHSelect";
import PHDatePicker from "../../../components/Form/PHDateOicker";
import { bloodGroupOptions, gerderOptions } from "../../../constants/global";

const CreateAdmin = () => {
	const [addAdmin] = useAddAdminMutation();
	const navigate = useNavigate();

	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Creating Admin........!!");
		const adminData = {
			password: "admin123",
			admin: data,
		};
		const formData = new FormData();
		formData.append("data", JSON.stringify(adminData));
		formData.append("file", data.image);
		try {
			const res = (await addAdmin(formData)) as TResponse<TAdmin>;
			console.log(res);
			if (res.error) {
				toast.error(res.error.data.message, {
					id: toastId,
				});
			} else {
				toast.success("Admin created successfully", {
					id: toastId,
				});
				navigate(`/admin/admin-data`);
			}
		} catch (err) {
			toast.error("Something Went Wrong", {
				id: toastId,
			});
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
				Create Admin
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

export default CreateAdmin;
