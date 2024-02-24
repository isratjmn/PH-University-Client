import Title from "antd/es/typography/Title";
import {
	useEnrollCourseMutation,
	useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
const OfferedCourse = () => {
	const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
	console.log(offeredCourseData);
	const [enroll] = useEnrollCourseMutation();

	const singleObject = Array.isArray(offeredCourseData?.data)
		? offeredCourseData?.data?.reduce((acc, item) => {
				acc[key] = { courseTitle: key };
				return acc;
		}, {})
		: {};
	console.log(singleObject);
	console.log(Object.values(singleObject ? singleObject : {}));

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
				Student Offered Course
			</Title>
		</div>
	);
};

export default OfferedCourse;
