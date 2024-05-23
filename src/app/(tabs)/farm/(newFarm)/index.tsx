import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import ProgressBar from '@/Components/progress'
import NavigationBar from '@/Components/navigationBar'
import { Formik, FormikProps, FormikValues } from 'formik'

import { useSelector, useDispatch } from 'react-redux'
import { genarateSteps, getStepSchema } from './steps/index'

import Popup from '@/Components/popup'
import { setFarmInput, increaseFarmStep, decreaseFarmStep, restartFarmStep, clearFarmInput } from '@/Store/reducers'
import { useCreateFarmMutation } from '@/Services/farm'


const popupcontent = {
	success: {
		title: 'success',
		content: 'Tạo nông trại thành công',
		button: 'Tiếp tục',
	},
	fail: {
		title: 'fail',
		content: 'Đã có lỗi xảy ra, vui lòng thử lại',
		button: 'Thử lại',
	},
}

export default function NewFarmLayout() {
	const router = useRouter()
	const [popupVisible, setPopupVisible] = useState(false)
	const [steps] = useState(genarateSteps())
	const currentIndex = useSelector((state: any) => state.farm.step)
	const dispatch = useDispatch()
	const farm = useSelector((state: any) => state.farm)
	const [postFarm, postFarmResult] = useCreateFarmMutation()
	const [popupText, setPopupText] = useState(popupcontent.success)

	const handleSubmit = async () => {
		const farmSubmit = {
			name: farm.name,
			address: farm.address,
			area: farm.area,
			type: farm.plantation,
			script: JSON.stringify(farm.accepted_script),
		}

		const response = await postFarm(farmSubmit)
		if (response.data) {
			console.log('Tạo nông trại thành công: ', response.data)
			setPopupText(popupcontent.success)
			setPopupVisible(true)
			router.back()
		} else {
			console.log('Tạo nông trại thất bại: ', response.error)
			setPopupText(popupcontent.fail)
			setPopupVisible(true)
		}
	}
	const renderCurrentStep = (form: FormikProps<FormikValues>) => {
		const step = steps[currentIndex]

		// opportunity to extend commonProps here with other relevant information
		const commonProps = {
			form,
			name: step.name,
		}
		const StepComponent = step.component
		return <StepComponent {...commonProps} />
	}

	const goNext = async (values: any) => {
		dispatch(setFarmInput(values))
		dispatch(increaseFarmStep())
		if (currentIndex === steps.length - 1) {
			dispatch(decreaseFarmStep())
			console.log('SUBMIT: ', farm)
			setTimeout(() => {
				handleSubmit()
			}, 1000)
		}
	}

	const goBack = () => {
		dispatch(decreaseFarmStep())
	}
	const handlePopup = () => {
		setPopupVisible(false)
		if (popupText.title === 'success') {
			dispatch(clearFarmInput())
			router.push('./farm')
		} else {
			dispatch(restartFarmStep())
			router.back() 
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Formik
					initialValues={{}} // this is the initial values of the form
					validationSchema={getStepSchema(currentIndex, steps)}
					onSubmit={handleSubmit}
					validateOnBlur
					validateOnChange
					validateOnMount
				>
					{(form) => {
						return (
							<>
								{renderCurrentStep(form)}
								<NavigationBar
									maxSteps={steps.length}
									currentIndex={currentIndex}
									onClickNext={() => goNext(form.values)}
									onClickBack={goBack}
									values={form.values}
								/>
							</>
						)
					}}
				</Formik>
			</View>
			<View style={styles.processBar}>
				<ProgressBar progress={((currentIndex + 1) / steps.length) * 100} />
			</View>
			{popupVisible && (
				<View style={styles.popupContainer}>
					<Popup
						visible={popupVisible}
						type={popupText.title}
						text={popupText.content}
						buttonText={popupText.button}
						onPress={handlePopup}
					/>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	logoContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 16,
	},
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
	},

	noAccount: {
		flex: 0.5,
		marginBottom: 16,
		marginTop: 20,
		justifyContent: 'flex-end',
		alignItems: 'center',
		bottom: 0,
		width: '100%',
	},
	label: {
		fontSize: 16,
	},
	popupContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: adds a semi-transparent background
	},
	processBar: {
		marginTop: 20,
	},
})
