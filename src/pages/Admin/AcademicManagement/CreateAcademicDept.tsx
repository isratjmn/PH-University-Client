/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "antd/es/typography/Title";
import {
	useAddAcademicDepartmentMutation,
	useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TAcademicDepartment, TResponse } from "../../../types";
import { Button, Card, Col, Flex } from "antd";
import PHForm from "../../../components/Form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import PHInput from "../../../components/Form/PHInput";
import PHSelect from "../../../components/Form/PHSelect";

const CreateAcademicDept = () => {
	const { data: facultyData, isLoading: FIsLoading } =
		useGetAcademicFacultiesQuery(undefined);
	const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

	const academicFacultyOptions = facultyData?.data?.map((faculty) => ({
		value: faculty._id,
		label: faculty.name,
	}));

	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Creating Department........!!");
		const departmentData = {
			name: data?.name,
			academicFaculty: data.academicFaculty,
		};
		try {
			const res = (await addAcademicDepartment(
				departmentData
			)) as TResponse<TAcademicDepartment>;
			if (res.error) {
				toast.error(res.error.data.message, {
					id: toastId,
				});
			} else {
				toast.success("Department Created", {
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
		<div>
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
				Create Academic Department
			</Title>
			<Flex align="center" justify="center">
				<Col sm={24} lg={16} xl={10} span={24}>
					<Card style={{ padding: "10px" }}>
						<PHForm
							onSubmit={onSubmit}
							resolver={zodResolver(academicDepartmentSchema)}
						>
							<PHInput type="text" name="name" label="Name" />
							<PHSelect
								label="Academic Faculty"
								name="academicFaculty"
								options={academicFacultyOptions}
								disabled={FIsLoading}
								size={"small"}
							/>
							<Button type="primary" htmlType="submit" block>
								Submit
							</Button>
						</PHForm>
					</Card>
				</Col>
			</Flex>
		</div>
	);
};

export default CreateAcademicDept;
