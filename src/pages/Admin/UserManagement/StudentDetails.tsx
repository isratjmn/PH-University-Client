import { useParams } from "react-router-dom";
import { useGetStudentDetailsQuery } from "../../../redux/features/admin/userManagement.api";
import { Alert, Card, Col, Divider, Image, Row, Spin } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";

const StudentDetails = () => {
	const { studentId } = useParams();
	console.log(studentId);
	const { data: studentDetails, isFetching } =
		useGetStudentDetailsQuery(studentId);
	const details = studentDetails?.data;
	console.log(details);

	if (isFetching) {
		return (
			<Spin tip="Loading.........">
				<Alert
					message="Wait......"
					description="Please wait for loading student details."
					type="success"
				/>
			</Spin>
		);
	}

	return (
		<>
			<Card style={{ width: "100%" }}>
				<Row gutter={[16, 16]}>
					<Col span={20} md={{ span: 12 }} lg={{ span: 4 }}>
						<Image
							width="100%"
							src={
								details.profileImg
									? details?.profileImg
									: "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o="
							}
						/>
					</Col>
					<Col span={24} md={{ span: 12 }} lg={{ span: 20 }}>
						<Title style={{ fontWeight: 800, fontSize: "28px" }}>
							{details?.fullName}
						</Title>
						<Title level={5}>
							Roll : {}
							<span style={{ color: "#736d6d" }}>
								{details?.id}
							</span>
						</Title>
						<Title level={5}>
							Gender: {}
							<span style={{ color: "#736d6d" }}>
								{details?.gender}
							</span>
						</Title>
						<Title level={5}>
							Blood Group: {}
							<span style={{ color: "#736d6d" }}>
								{details?.bloodGroup}
							</span>
						</Title>
						<Title level={5}>
							Date of Birth: {}
							<span style={{ color: "#736d6d" }}>
								{moment(details?.dateOfBirth).format(
									"MMMM Do , YYYY"
								)}
							</span>
						</Title>
					</Col>
				</Row>
				<Divider />
				<Row gutter={[16, 16]}>
					<Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
						<Divider
							style={{
								fontWeight: "bold",
								fontSize: "18px",
							}}
						>
							{" "}
							Contact Info.
						</Divider>
						<Title level={5}>
							Email : {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.email}
							</span>
						</Title>
						<Title level={5}>
							Contact No: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.contactNo}
							</span>
						</Title>
						<Title level={5}>
							Emergency Contact No: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.emergencyContactNo}
							</span>
						</Title>
						<Title level={5}>
							Present Address: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.presentAddress}
							</span>
						</Title>

						<Title level={5}>
							Present Address: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.permanentAddress}
							</span>
						</Title>
					</Col>

					<Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
						<Divider
							style={{
								fontWeight: "bold",
								fontSize: "18px",
							}}
						>
							{" "}
							Guardian{" "}
						</Divider>
						<Title level={5}>
							Father Name : {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.guardian?.fatherName}
							</span>
						</Title>
						<Title level={5}>
							Father Occupation : {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.guardian?.fathersOccupation}
							</span>
						</Title>
						<Title level={5}>
							Father ContactNo : {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.guardian?.fatherContact}
							</span>
						</Title>
						<Title level={5}>
							Mother Name: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.guardian?.motherName}
							</span>
						</Title>
						<Title level={5}>
							Mother Occupation: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.guardian?.mothersOccupation}
							</span>
						</Title>
						<Title level={5}>
							Mother Contact: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.guardian?.motherContact}
							</span>
						</Title>
					</Col>
				</Row>
				<Row gutter={20}>
					<Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
						<Divider
							style={{
								fontWeight: "bold",
								fontSize: "18px",
							}}
						>
							{" "}
							Academic Info.{" "}
						</Divider>
						<Title level={5}>
							Admission Semester : {}
							<span>
								{details?.admissionSemester?.name} --
								{details?.admissionSemester?.year}
							</span>
							<p style={{ color: "#968e8d", marginLeft: "40px" }}>
								Start - End:{" "}
								<span style={{ color: "#736d6d" }}>
									{details?.admissionSemester?.startMonth}{" "}
									{details?.admissionSemester?.year} -
								</span>
								<span style={{ color: "#736d6d" }}>
									{" "}
									{details?.admissionSemester?.endMonth}{" "}
									{details?.admissionSemester?.year}
								</span>
							</p>
						</Title>
						<Title level={5}>
							Admission Department : {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.academicDepartment?.name}
							</span>
						</Title>
						<Title level={5}>
							Admission Faculty : {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{
									details?.academicDepartment?.academicFaculty
										?.name
								}
							</span>
						</Title>
					</Col>
					<Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
						<Divider
							style={{
								fontWeight: "bold",
								fontSize: "18px",
							}}
						>
							{" "}
							Local Guardian{" "}
						</Divider>
						<Title level={5}>
							Name: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.localGuardian?.name}
							</span>
						</Title>
						<Title level={5}>
							Address: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.localGuardian?.address}
							</span>
						</Title>

						<Title level={5}>
							ContactNo: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.localGuardian?.contactNo}
							</span>
						</Title>
						<Title level={5}>
							Occupation: {}
							<span style={{ color: "#878584", fontWeight: 700 }}>
								{details?.localGuardian?.occupation}
							</span>
						</Title>
					</Col>
				</Row>
			</Card>
		</>
	);
};

export default StudentDetails;
