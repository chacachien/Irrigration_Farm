import { API } from '../base'
import { Farm } from '@/Types/farm'
import { getToken } from '@/Helper/utils'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

export const newApi = API.injectEndpoints({
	endpoints: (build) => ({
		getNews: build.query({
			// add query params
			query: () => ({
				url: `/news/`,
				method: 'GET',
			}),
		}),
	}),
	overrideExisting: true,
})

export const { useGetNewsQuery } = newApi
