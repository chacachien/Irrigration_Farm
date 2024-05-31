import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Farm } from '@/Types/farm'
import { Script } from '@/Types/script'

// Create initial state of form
const initialState: Farm = {
    name: '',
    address: '',
    area: 0,
    plantation: '',
    scripts: [] as Script[],
    accepted_script: {} as Script,
    step: 0,
    edit: false,
    id: '',
}
const maxStep = 7

const slice = createSlice({
	name: 'farm',
	initialState,
	reducers: {
		// Handle input change
		setFarmInput: (state, action: PayloadAction<Object>) => {
			const values = action.payload
			console.log('PRINT IN REDUX: ', values)
			return {
				...state,
				...values, // Update the field dynamically based on the name in the payload
			}
		},
		clearFarmInput: (state) => {
			//set into initial form
			return {
				...state,
				...initialState,
			}
		},
		increaseFarmStep: (state) => {
			const { step } = { step: state.step }
			if (state.step < maxStep) return { ...state, step: step + 1 }
		},
		decreaseFarmStep: (state) => {
			if (state.step > 0) state.step -= 1
		},
		restartFarmStep: (state) => {
			state.step = 0
		},
		setAcceptedScript: (state, action: PayloadAction<Object>) => {
			const values: any = action.payload
			return {
				...state,
				accepted_script: values,
			}
		},
        setEdit: (state, action) => {
            state.edit = action.payload
        }
	},
})


export const {
    setFarmInput,
    increaseFarmStep,
    decreaseFarmStep,
    restartFarmStep,
    clearFarmInput,
    setAcceptedScript,
    setEdit
} = slice.actions
export const farmReducers = slice.reducer

