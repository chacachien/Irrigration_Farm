import { API } from '../base'
import { Farm} from '@/Types/farm'
import { getToken } from '@/Helper/utils'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'


export const cultivarApi = API.injectEndpoints({
	endpoints: (build) => ({
		getCultivars: build.query({
			// add query params
			query: () => ({
				url: `/cultivars/`,
				method: 'GET',
			}),
		}),


	}),
	overrideExisting: true,
})

export const { useGetCultivarsQuery} = cultivarApi