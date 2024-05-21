import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage'


const slice = createSlice({
	name: 'auth',
	initialState: { user: null, token: null } as {
		user: null | any
		token: null | string
	},
	reducers: {
		// setCredentials: (
		// 	state,
		// 	{ payload: { user, token } }: PayloadAction<{ user: any; token: string }>,
		// ) => {
        //     AsyncStorage.setItem(
		// 					'user',
		// 					JSON.stringify({
		// 						name: user,
		// 						token: token,
		// 					}),
		// 				)
		// 	state.user = user
		// 	state.token = token
		// },
		setCredentials: (state, action) => {
			AsyncStorage.setItem(
				'user',
				JSON.stringify({
					name: action.payload.user,
					token: action.payload.token,
				}),
			)
			state.user = action.payload.user
			state.token = action.payload.token
		},
		setLogout: (state) => {
			AsyncStorage.removeItem('user')
			state.user = null
			state.token = null
		}
	},

})

export const { setCredentials, setLogout} = slice.actions
export const authReducer = slice.reducer

