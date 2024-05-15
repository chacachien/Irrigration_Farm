import { createSlice } from '@reduxjs/toolkit'

const onboardSlice = createSlice({
	name: 'onboard',
	initialState: {
		completed: false,
	},
	reducers: {
		setOnboarded: (state) => {
			state.completed = true
		},
	},
})

export const { setOnboarded } = onboardSlice.actions
export const onboardReducers =  onboardSlice.reducer