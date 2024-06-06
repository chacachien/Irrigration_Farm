import { API } from '../base'
import { Farm } from '@/Types/farm'
import { getToken } from '@/Helper/utils'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'


export const scenarioApi = API.injectEndpoints({
	endpoints: (build) => ({
        getScenarios: build.query({
            // add query params
            query: () => ({
                url: `/scenarios/`,
                method: 'GET',
            }),
        }),

	}),
	overrideExisting: true,
})

export const { useGetScenariosQuery } = scenarioApi


