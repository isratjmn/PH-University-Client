import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/Form/PHForm";
import { Button, Card, Col, Flex, Typography } from "antd";
import PHSelect from "../../../components/Form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/AcademicManagementSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TAcademicSemester } from "../../../types";
const { Title } = Typography;

const nameOptions = [
	{
		value: "01",
		label: "Autumn",
	},
	{
		value: "02",
		label: "Summer",
	},
	{
		value: "03",
		label: "Spring",
	},
];
const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
	value: String(currentYear + number),
	label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
	const [addAcademicSemester] = useAddAcademicSemesterMutation();
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating.........");
		const name = nameOptions[Number(data.name) - 1]?.label;
		const semesterData = {
			name,
			code: data.name,
			year: data.year,
			startMonth: data.startMonth,
			endMonth: data.endMonth,
		};
		try {
			const res = (await addAcademicSemester(
				semesterData
			)) as TResponse<TAcademicSemester>;
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

	/* Autumn --- 01 
	Summer ---  02
	Spring --- 03 */

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
				Create Academic Semester
			</Title>
			<Flex justify="center">
				<Col xs={24} sm={20} md={16} lg={12} xl={8}>
					<Card style={{ padding: "10px" }}>
						<PHForm
							onSubmit={onSubmit}
							resolver={zodResolver(academicSemesterSchema)}
							defaultValues={{}}
						>
							<PHSelect
								label="Name"
								name="name"
								options={nameOptions}
								size="large"
							/>
							<PHSelect
								label="Year"
								name="year"
								options={yearOptions}
								size="large"
							/>
							<PHSelect
								label="Start Month"
								name="startMonth"
								options={monthOptions}
								size="large"
							/>
							<PHSelect
								label="End Month"
								name="endMonth"
								options={monthOptions}
								size="large"
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

export default CreateAcademicSemester;
