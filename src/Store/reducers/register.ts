import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RegisterForm } from '@/Helper/types/registerForm'

// Create initial state of form
const initialState: RegisterForm = {
	type_res: 'phone',
	value: '000',
	username: 'Nguyen A',
    gender: 'Nam',
	password: '',
	confirmPassword: '',
	loading: false,
	error: '',
	step: 0,
}


const slice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		// Handle input change 
		setInput: (state, action: PayloadAction<Object>) => {
			const values = action.payload
            console.log('PRINT IN REDUX: ', values)
			return {
				...state,
				...values, // Update the field dynamically based on the name in the payload
			}
		},
        clearInput: (state) => {
            //set into initial form
            return {
                ...state,
                ...initialState
            }
        },
		// Handle form submission start
		submitRegister: (state) => {
			state.loading = true
			state.error = ''
		},
		// Handle form submission success
		submitRegisterSuccess: (state) => {
			state.loading = false
            
		},

		submitRegisterFailure: (state, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		increaseStep: (state) => {
            const {step} = {step: state.step}
			if (state.step < 3) return {...state, step: step + 1}
		},
		decreaseStep: (state) => {
			if (state.step > 0) state.step -= 1
		},
	},
})

export const {
	setInput,
	increaseStep,
	decreaseStep,
	submitRegister,
	submitRegisterSuccess,
	submitRegisterFailure,
    clearInput
} = slice.actions
export const registerReducers = slice.reducer
