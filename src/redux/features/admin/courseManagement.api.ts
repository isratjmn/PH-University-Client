/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParams, TResponseRedux, TSemester } from "../../../types";
import { baseAPI } from "../../api/baseAPI";

const courseMangementApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		GetAllSemesterRegisted: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: TQueryParams) => {
						params.append(item.name, item.value as string);
					});
				}
				return {
					url: "/semester-registrations",
					method: "GET",
					params: params,
				};
			},
			providesTags: ["semester"],
			transformResponse: (response: TResponseRedux<TSemester[]>) => {
				return {
					data: response.data || [], // Ensure data is not undefined
					meta: response.meta || {
						limit: 0,
						page: 0,
						total: 0,
						totalPage: 0,
					}, 
				};
			},
		}),

		AddSemesterRegistered: builder.mutation({
			query: (data) => ({
				url: "/semester-registrations/create-semester-registration",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["semester"],
		}),

		UpdateSemesterRegistered: builder.mutation({
			query: (args) => ({
				url: `/semester-registrations/${args.id}`,
				method: "PATCH",
				body: args.data,
			}),
			invalidatesTags: ["semester"],
		}),

		GetAllCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: TQueryParams) => {
						params.append(item.name, item.value as string);
					});
				}
				return {
					url: "/courses",
					method: "GET",
					params: params,
				};
			},
			providesTags: ["courses"],
			transformResponse: (response: TResponseRedux<any>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),

		AddCourse: builder.mutation({
			query: (data) => ({
				url: "/courses/create-course",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["courses"],
		}),

		AddFaculties: builder.mutation({
			query: (args) => ({
				url: `/courses/${args.courseId}/assign-faculties`,
				method: "PUT",
				body: args.data,
			}),
			invalidatesTags: ["courses"],
		}),

		GetCourseFaculties: builder.query({
			query: (id) => {
				return {
					url: `/courses/${id}/get-faculties`,
					method: "GET",
				};
			},
			transformResponse: (response: TResponseRedux<any>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),

		CreateOfferedCourse: builder.mutation({
			query: (data) => ({
				url: `/offered-courses/create-offered-course`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["courses"],
		}),
	}),
});

export const {
	useGetAllSemesterRegistedQuery,
	useAddSemesterRegisteredMutation,
	useUpdateSemesterRegisteredMutation,
	useGetAllCoursesQuery,
	useAddCourseMutation,
	useAddFacultiesMutation,
	useGetCourseFacultiesQuery,
	useCreateOfferedCourseMutation,
} = courseMangementApi;
