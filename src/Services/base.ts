import { Config } from '@/Config'
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '@/Helper/utils'
// ad prepare header

// const baseQuery = fetchBaseQuery({ baseUrl: Config.API_URL })
console.log('API_URL: ', Config.API_URL)
const baseQuery = fetchBaseQuery({
	baseUrl: Config.API_URL,
	prepareHeaders: async (headers, { getState }) => {
		const token = await getToken()
		headers.set('authorization', `Bearer ${token}`)
		return headers
	},
})

const baseQueryWithInterceptor = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {},
) => {
	const result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		// here you can deal with 401 error
	}
	return result
}

export const API = createApi({
	baseQuery: baseQueryWithInterceptor,
	endpoints: () => ({}),
})

// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
// import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { Config } from '@/Config'

// const baseQuery = fetchBaseQuery({ baseUrl: Config.API_URL })

// const baseQueryWithInterceptor = async (
// 	args: string | FetchArgs,
// 	api: BaseQueryApi,
// 	extraOptions: {},

// ) => {
// 	// Check if the request is for the farm API
// 	if (args === '/farms') {
// 		const token = await AsyncStorage.getItem('user')
// 		const headers = token ? { Authorization: `Bearer ${token}` } : {}

// 		const result = await baseQuery(args, api, { ...extraOptions, headers })

// 		if (result.error && result.error.status === 401) {
// 			// Handle 401 error
// 		}

// 		return result
// 	}

// 	// For other APIs, proceed without modifying the request
// 	return baseQuery(args, api, extraOptions)
// }

// export const API = createApi({
// 	baseQuery: baseQueryWithInterceptor,
// 	endpoints: () => ({}),
// })
