/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/Form/PHForm";
import { Button, Card, Col, Flex, Typography } from "antd";
import PHSelect from "../../../components/Form/PHSelect";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/Form/PHDateOicker";
import PHInput from "../../../components/Form/PHInput";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { semesterStatusOptions } from "../../../constants/semester";
import { useAddSemesterRegisteredMutation } from "../../../redux/features/admin/courseManagement.api";
const { Title } = Typography;

const SemesterRegistration = () => {
	const [AddSemesterRegistered] = useAddSemesterRegisteredMutation();
	const { data: academicSemester } = useGetAllSemesterQuery([
		{ name: "sort", value: "year" },
	]);
	const academicSemesterOptions = academicSemester?.data?.map(
		(item: { _id: any; name: any; year: any }) => ({
			value: item._id,
			label: `${item.name} ${item.year}`,
		})
	);
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating.........");
		const semesterData = {
			...data,
			minCredit: parseInt(data?.minCredit),
			maxCredit: parseInt(data?.maxCredit),
		};
		console.log(semesterData, "Semester data");
		try {
			const res = (await AddSemesterRegistered(
				semesterData
			)) as TResponse<any>;
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
	/* 
	Autumn --- 01 
	Summer ---  02
	Spring --- 03 
	*/
	return (
		<div>
			<Title
				level={2}
				style={{
					textAlign: "center",
					fontWeight: 800,
					fontSize: "22px",
					paddingBottom: "30px",
					color: "#1890ff",
					textTransform: "uppercase",
				}}
			>
				Create Semester Registration
			</Title>
			<Flex justify="center">
				<Col xs={24} sm={20} md={18} lg={14} xl={8}>
					<Card style={{ padding: "10px" }}>
						<PHForm onSubmit={onSubmit} defaultValues={{}}>
							<PHSelect
								label="Academic Semester"
								name="academicSemester"
								options={academicSemesterOptions}
								size="large"
							/>
							<PHSelect
								name="status"
								label="Status"
								options={semesterStatusOptions}
								size="large"
							/>
							<PHDatePicker name="startDate" label="startDate" />
							<PHDatePicker name="endDate" label="endDate" />
							<PHInput
								type="text"
								name="minCredit"
								label="MinCredit"
							/>
							<PHInput
								type="text"
								name="maxCredit"
								label="MaxCredit"
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

export default SemesterRegistration;
