/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row, Typography } from "antd";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { FieldValues } from "react-hook-form";
import { TAcademicFaculty, TResponse } from "../../../types";
import PHForm from "../../../components/Form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import PHInput from "../../../components/Form/PHInput";

const { Title } = Typography;
const CreateAcademicFaculty = () => {
	const [addAcademicFaculty] = useAddAcademicFacultyMutation();
	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Creating Faculty.......!!!");
		const facultyData = {
			name: data.name,
		};
		try {
			const res = (await addAcademicFaculty(
				facultyData
			)) as TResponse<TAcademicFaculty>;
			if (res.error) {
				toast.error(res.error.data.message, {
					id: toastId,
				});
			} else {
				toast.success("Faculty Created Successfully .......!!", {
					id: toastId,
				});
			}
		} catch (error: any) {
			toast.error("Something Went Wrong", {
				id: toastId,
			});
		}
	};
	return (
		<Row justify="center">
			<Col xs={24} sm={16} lg={10} xl={8}>
				<div style={{ textAlign: "center" }}>
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
						Academic Faculty
					</Title>
				</div>
				<Card style={{ padding: "10px" }}>
					<PHForm
						onSubmit={onSubmit}
						resolver={zodResolver(academicFacultySchema)}
					>
						<PHInput type="text" name="name" label="Name" />
						<Button type="primary" htmlType="submit" block>
							Submit
						</Button>
					</PHForm>
				</Card>
			</Col>
		</Row>
	);
};

export default CreateAcademicFaculty;
