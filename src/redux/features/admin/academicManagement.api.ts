import { TResponseRedux } from "../../../types";
import {
	TAcademicDepartment,
	TAcademicFaculty,
	TAcademicSemester,
} from "../../../types/academicManagement.type";
import { baseAPI } from "../../api/baseAPI";
const academicManagementApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		//! Get All Semester
		getAllSemester: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: { name: string; value: string }) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/academic-semesters",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (
				response: TResponseRedux<TAcademicSemester[]>
			) => {
				return {
					data: response?.data,
					meta: response?.meta,
				};
			},
		}),

		//! Get Academic Department
		getAcademicDepartment: builder.query({
			query: () => {
				return {
					url: "/academic-department",
					method: "GET",
				};
			},
			transformResponse: (
				response: TResponseRedux<TAcademicDepartment[]>
			) => {
				return {
					data: response?.data,
					meta: response.meta,
				};
			},
		}),

		//! Add Academic Semester
		addAcademicSemester: builder.mutation({
			query: (data) => ({
				url: "/academic-semesters/create-academic-semester",
				method: "POST",
				body: data,
			}),
		}),

		//! Get Single Academic Department
		getSingleAcademicDepartment: builder.query({
			query: (departmentId) => {
				return {
					url: `/academic-department/${departmentId}`,
					method: "GET",
				};
			},
			// providesTags: ["academic-management"],
		}),

		//! Add Academic Department
		addAcademicDepartment: builder.mutation({
			query: (data) => ({
				url: "/academic-department/create-academic-department",
				method: "POST",
				body: data,
			}),
		}),

		//! Add Academic faculty
		addAcademicFaculty: builder.mutation({
			query: (data) => ({
				url: "/academic-faculties/create-academic-faculty",
				method: "POST",
				body: data,
			}),
		}),

		//! Get Academic Faculties
		getAcademicFaculties: builder.query({
			query: () => {
				return {
					url: "/academic-faculties",
					method: "GET",
				};
			},
			transformResponse: (
				response: TResponseRedux<TAcademicFaculty[]>
			) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),

		//! Get All Academic Department
		getAllAcademicDepartment: builder.query({
			query: () => {
				return {
					url: "/academic-faculties",
					method: "GET",
				};
			},
			transformResponse: (
				response: TResponseRedux<TAcademicDepartment[]>
			) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
	}),
});

export const {
	useGetAllSemesterQuery,
	useGetAcademicFacultiesQuery,
	useAddAcademicSemesterMutation,
	useGetAcademicDepartmentQuery,
	useGetSingleAcademicDepartmentQuery,
	useAddAcademicDepartmentMutation,
	useAddAcademicFacultyMutation,
	useGetAllAcademicDepartmentQuery
} = academicManagementApi;
