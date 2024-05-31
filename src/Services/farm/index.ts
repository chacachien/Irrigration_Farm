import { API } from '../base'
import { Farm} from '@/Types/farm'
import { getToken } from '@/Helper/utils'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'


// export const farmerApi = API.injectEndpoints({
// 	endpoints: (build) => ({
// 		getFarm: build.query<Farm[], void>({
// 			query: () => ({
// 				url: `/farms`,
// 			}),
// 		}),
// 		createFarm: build.mutation({
// 			query: (body) => ({
// 				url: '/farms/',
// 				method: 'POST',
// 				body,
// 				headers: {
// 					Authorization: `Bearer ${getToken()}`,
// 				},
// 			}),
// 		}),
// 	}),
// 	overrideExisting: true,
// })


export const farmApi = API.injectEndpoints({
	endpoints: (build) => ({
		getFarms: build.query({
            // add query params
			query: () => ({
				url: `/farms/`,
                method: 'GET',
			}),
		}),
		createFarm: build.mutation({
			query: (body) => {
				return {
					url: '/farms/',
					method: 'POST',
					body
				}
			}, 
		}),
        getFarm: build.query({
            query: (id: any) => ({
                url: `/farms/?farm_id=${id.id}`,
                method: 'GET',
            }),
        }),
		// put method
		updateFarm: build.mutation({
			query: (body) => {
				return {
					url: '/farms/',
					method: 'PUT',
					body
				}
			}
		}),

	}),
	overrideExisting: true,
})


export const { useCreateFarmMutation, useGetFarmsQuery, useGetFarmQuery, useUpdateFarmMutation} = farmApi
