import { Alert, Button, Col, Divider, Row, Spin } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { TResponse, TStudent } from "../../../types";
import {
	useGetAllAcademicDepartmentQuery,
	useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { bloodGroupOptions, gerderOptions } from "../../../constants/global";
import {
	useGetStudentDetailsQuery,
	useUpdateStudentDetailsMutation,
} from "../../../redux/features/admin/userManagement.api";
import PHDatePicker from "../../../components/Form/PHDateOicker";
import PHSelect from "../../../components/Form/PHSelect";
import PHInput from "../../../components/Form/PHInput";
import PHForm from "../../../components/Form/PHForm";

const StudentUpdate = () => {
	const [updateStudent] = useUpdateStudentDetailsMutation();
	const navigate = useNavigate();
	const { studentId } = useParams();
	const { data: studentDetails, isLoading: studentIsLoading } =
		useGetStudentDetailsQuery(studentId);
	const { data: sData, isLoading: sIsLoading } =
		useGetAllSemesterQuery(undefined);

	const { data: dData, isLoading: dIsLoading } =
		useGetAllAcademicDepartmentQuery(undefined);

	const semesterOptions = sData?.data?.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}));
	const departmentOptions = dData?.data?.map((item) => ({
		value: item._id,
		label: item.name,
	}));
	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Updating student...");
		const admissionSemester = data.admissionSemester._id;
		const academicDepartment = data.academicDepartment._id;
		const dateOfBirth = data.birthday;
		const studentFields = {
			...data,
			academicDepartment,
			admissionSemester,
			dateOfBirth,
		};
		const studentData = {
			student: studentFields,
		};
		try {
			const res = (await updateStudent({
				studentData,
				studentId,
			})) as TResponse<TStudent>;
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Student updated", { id: toastId });
				navigate(`/admin/student-data/${studentId}`);
			}
		} catch (error) {
			toast.error("Something went wrong...", { id: toastId });
		}
	};

	if (studentIsLoading) {
		return (
			<Spin tip="Loading...">
				<Alert
					message="Wait......"
					description="Please wait for loading student details."
					type="success"
				/>
			</Spin>
		);
	}

	return (
		<Row justify="center">
			<Col sm={24} md={20} xl={12} span={18}>
				<PHForm
					onSubmit={onSubmit}
					defaultValues={studentDetails?.data}
				>
					<Divider style={{ fontWeight: "bold", fontSize: "18px" }}>
						Personal Information
					</Divider>
					<Row gutter={8}>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="name.firstName"
								label="First Name"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="name.middleName"
								label="Middle Name"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="name.lastName"
								label="Last Name"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHSelect
								options={gerderOptions}
								name="gender"
								label="Gender"
								size={"small"}
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHDatePicker
								name="birthday"
								label="Date of birth"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHSelect
								options={bloodGroupOptions}
								name="bloodGroup"
								label="Blood group"
								size={"small"}
							/>
						</Col>
					</Row>
					<Divider
						style={{
							fontWeight: "bold",
							fontSize: "18px",
						}}
					>
						Contact Information
					</Divider>
					<Row gutter={8}>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" name="email" label="Email" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="contactNo"
								label="Contact"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="emergencyContactNo"
								label="Emergency Contact"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="presentAddress"
								label="Present Address"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="permanentAddress"
								label="Permanent Address"
							/>
						</Col>
					</Row>
					<Divider
						style={{
							fontWeight: "bold",
							fontSize: "18px",
						}}
					>
						Guardian Information
					</Divider>
					<Row gutter={8}>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="guardian.fatherName"
								label="Father Name"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="guardian.fatherOccupation"
								label="Father Occupation"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="guardian.fatherContactNo"
								label="Father ContactNo"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="guardian.motherName"
								label="Mother Name"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="guardian.motherOccupation"
								label="Mother Occupation"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="guardian.motherContactNo"
								label="Mother ContactNo"
							/>
						</Col>
					</Row>
					<Divider
						style={{
							fontWeight: "bold",
							fontSize: "18px",
						}}
					>
						Local Guardian Information
					</Divider>
					<Row gutter={8}>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="localGuardian.name"
								label="Name"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="localGuardian.occupation"
								label="Occupation"
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="localGuardian.contactNo"
								label="Contact No."
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput
								type="text"
								name="localGuardian.address"
								label="Address"
							/>
						</Col>
					</Row>
					<Divider
						style={{
							fontWeight: "bold",
							fontSize: "18px",
						}}
					>
						Academic Information
					</Divider>
					<Row gutter={8}>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHSelect
								options={semesterOptions}
								disabled={sIsLoading}
								name="admissionSemester._id"
								label="Admission Semester"
								size={"small"}
							/>
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHSelect
								options={departmentOptions}
								disabled={dIsLoading}
								name="academicDepartment._id"
								label="Admission Department"
								size={"small"}
							/>
						</Col>
					</Row>
					<Button type="primary" htmlType="submit" block>
						Submit
					</Button>
				</PHForm>
			</Col>
		</Row>
	);
};

export default StudentUpdate;
