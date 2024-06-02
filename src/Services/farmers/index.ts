import { API } from '../base'
import { RegisterForm, Farmer } from '@/Types/registerForm'
import { LoginForm, Credentials } from '@/Types/loginType'

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
		login: build.mutation<Credentials, LoginForm>({
			query: (body) => ({
				url: `/farmers/login`,
				method: 'POST',
				body,
			}),
		}),
		getMe: build.query<any, void>({
			query: () => `/farmers/me`,
		}),
		updateMe: build.mutation<any, any>({
			query: (body) => ({
				url: `/farmers/me`,
				method: 'PATCH',
				body,
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
} = farmerApi
