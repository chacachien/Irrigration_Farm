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
                url: `/farms/${id}`,
                method: 'GET',
            }),
        }),
		// put method
		updateFarm: build.mutation({
			query: (body) => {
				console.log('body', body)
				return {
					url: `/farms/${body.id}`,
					method: 'PATCH',
					body
				}
			}
		}),
		deleteFarm: build.mutation({
			query: (id) => {
				return {
					url: `/farms/${id}`,
					method: 'DELETE',
				}
			}
		})


	}),
	overrideExisting: true,
})


export const { useCreateFarmMutation, useGetFarmsQuery, useGetFarmQuery, useUpdateFarmMutation, useDeleteFarmMutation} = farmApi
