import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppDispatch } from "..";


const slice = createSlice({
	name: 'auth',
	initialState: { user: null, token: null } as {
		user: null | any
		token: null | string
	},
	reducers: {
		setCredentials(state, action: PayloadAction<{ user: any; token: string }>) {
			// await AsyncStorage.setItem(
			// 	'user',
			// 	JSON.stringify({
			// 		name: action.payload.user,
			// 		token: action.payload.token,
			// 	}),
			// )
			state.user = action.payload.user
			state.token = action.payload.token
		},
		setLogout: (state) => {
			AsyncStorage.removeItem('user')
			state.user = null
			state.token = null
		},
	},
})
export const saveCredentials = (user: any, token: string) => async (dispatch: AppDispatch) => {
	await AsyncStorage.setItem(
		'user',
		JSON.stringify({
			name: user.username,
			token,
		}),
	)
	dispatch(setCredentials({ user, token }))
}

export const saveLogout = () => async (dispatch: AppDispatch) => {
	await AsyncStorage.removeItem('user')
	dispatch(setLogout())
}

export const { setCredentials, setLogout} = slice.actions
export const authReducer = slice.reducer
