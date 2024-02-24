/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParams, TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseAPI } from "../../api/baseAPI";

const studentCourseApi = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getAllOfferedCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: TQueryParams) => {
						params.append(item.name, item.value as string);
					});
				}
				return {
					url: "/offered-courses/my-offered-courses",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		enrollCourse: builder.mutation({
			query: (data) => ({
				url: "/enrolled-courses/create-enrolled-course",
				method: "POST",
				body: data,
			}),
			// invalidatesTags: ["offeredCourse"],
		}),
	}),
});
export const { useGetAllOfferedCoursesQuery, useEnrollCourseMutation } = studentCourseApi;
