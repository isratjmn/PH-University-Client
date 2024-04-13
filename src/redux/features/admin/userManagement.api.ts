import { TQueryParams } from "./../../../types/global";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFaculty, TResponseRedux, TStudent } from "../../../types";
import { baseAPI } from "../../api/baseAPI";

const userManagementApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getAllStudents: builder.query({
			query: (args) => {
				console.log(args);
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: TQueryParams) => {
						params.append(item.name, item.value as string);
					});
				}
				return {
					url: "/students",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TStudent[]>) => {
				console.log(response);
				return {
					data: response?.data,
					meta: response?.meta,
				};
			},
		}),
		getAllFaculties: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: TQueryParams) => {
						params.append(item.name, item.value as string);
					});
				}
				return {
					url: "/faculties",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TFaculty[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		getAllAdmin: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: TQueryParams) => {
						params.append(item.name, item.value as string);
					});
				}
				return {
					url: "/admins",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TStudent[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		changeUsersStatus: builder.mutation({
			query: ({ userStatus, userId }) => {
				console.log(userId);
				return {
					url: `/users/change-status/${userId}`,
					method: "POST",
					body: userStatus,
				};
			},
		}),

		getStudentDetails: builder.query({
			query: (studentId) => ({
				url: `/students/${studentId}`,
				method: "GET",
			}),
		}),
		updateStudentDetails: builder.mutation({
			query: ({ studentData, studentId }) => {
				return {
					url: `/students/${studentId}`,
					method: "PATCH",
					body: studentData,
				};
			},
		}),
		AddStudents: builder.mutation({
			query: (data) => ({
				url: "/users/create-student",
				method: "POST",
				body: data,
			}),
		}),
		addAdmin: builder.mutation({
			query: (data) => {
				return {
					url: `/users/create-admin`,
					method: "POST",
					body: data,
				};
			},
		}),
		addFaculty: builder.mutation({
			query: (data) => {
				return {
					url: `/users/create-faculty`,
					method: "POST",
					body: data,
				};
			},
		}),
		ChangePasssword: builder.mutation({
			query: (data) => ({
				url: "/auth/change-password",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllStudentsQuery,
	useGetAllAdminQuery,
	useGetStudentDetailsQuery,
	useGetAllFacultiesQuery,
	useAddStudentsMutation,
	useAddAdminMutation,
	useAddFacultyMutation,
	useChangeUsersStatusMutation,
	useUpdateStudentDetailsMutation,
	useChangePassswordMutation,
} = userManagementApi;
