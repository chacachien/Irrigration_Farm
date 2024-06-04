import { API } from '../base'


export const scriptApis = API.injectEndpoints({
	endpoints: (build) => ({
		getScripts: build.query({
			// add query params
			query: () => ({
				url: `/models`,
				method: 'GET',
			}),
		}),
	}),
	overrideExisting: true,
})

export const { useGetScriptsQuery } = scriptApis
