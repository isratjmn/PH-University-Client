import { baseAPI } from "../../api/baseAPI";

const authAPI = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (userInfo) => ({
				url: "/auth/login",
				method: "POST",
				body: userInfo,
			}),
		}),
	}),
});

export const { useLoginMutation } = authAPI;
