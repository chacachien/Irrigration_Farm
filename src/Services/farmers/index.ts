import { API } from '../base'
import { RegisterForm, Farmer } from '@/Types/registerForm'
import { LoginForm } from '@/Types/loginType'

export const farmerApi = API.injectEndpoints({
	endpoints: (build) => ({
		getFarmer: build.query<RegisterForm[], void>({
			query: () => `/farmers`,
		}),
		postFarmer: build.mutation<Farmer, Farmer>({
			query: (body) => ({
				url: `/farmers/register`,
				method: 'POST',
				body,
			}),
		}),
		login: build.mutation<any, LoginForm>({
			query: (body) => ({
				url: `/auth/login`,
				method: 'POST',
				body,
			}),
		}),
		getMe: build.query<any, void>({
			query: (id) => `/users/${id}`,
		}),
		updateMe: build.mutation<any, any>({
			query: (data) => ({
				url: `/users/${data.id}`,
				method: 'PATCH',
				body: data,
			}),
		}),
		resetPassword: build.mutation<any, any>({
			query: (data) => ({
				url: `/auth/password/reset`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
	overrideExisting: true,
})

export const {
	useGetFarmerQuery,
	useLazyGetFarmerQuery,
	usePostFarmerMutation,
	useLoginMutation,
	useGetMeQuery,
	useUpdateMeMutation,
	useResetPasswordMutation,
} = farmerApi
