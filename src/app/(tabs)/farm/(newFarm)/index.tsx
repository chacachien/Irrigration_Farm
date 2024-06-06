// UI
import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from '@/Components/progress'
import NavigationBar from '@/Components/navigationBar'
import Popup from '@/Components/popup'

// DATA
import { useRouter } from 'expo-router'
import { Formik, FormikProps, FormikValues } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { genarateSteps, getStepSchema } from './steps/index'
import {
	setFarmInput,
	increaseFarmStep,
	decreaseFarmStep,
	restartFarmStep,
	clearFarmInput,
} from '@/Store/reducers'
import { useCreateFarmMutation, useUpdateFarmMutation } from '@/Services/farm'

const popupcontent = {
	success: {
		title: 'success',
		content: 'Tạo nông trại thành công',
		button: 'Tiếp tục',
	},
	updateSuccess: {
		title: 'success',
		content: 'Cập nhật nông trại thành công',
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
	const [updateFarm, updateFarmResult] = useUpdateFarmMutation()
	const [popupText, setPopupText] = useState(popupcontent.success)

	const handleSubmit = async (form: any) => {
		// const farmSubmit = {
		// 	name: farm.name,
		// 	address: farm.address,
		// 	area: farm.area,
		// 	type: farm.plantation,
		// 	script: JSON.stringify(farm.accepted_script),

		// }
		const farmSubmit = {
			name: farm.name,
			description: farm.des,
			address: farm.address,
			image: 'Farm Image URL',
			cultivarId: farm.plantation.id,
			modelId: farm.accepted_script.id,
		}
		try {
			if (farm.edit) {
				const edit_farm = {
					id: farm.id,
					name: farm.name,
					description: farm.des,
					address: farm.address,
					image: 'Farm Image URL',

				}
				console.log('edit_farm: ', edit_farm)
				console.log('form: ', form)

				const response = await updateFarm(edit_farm).unwrap()
				console.log('response: ', response)
				form.setSubmitting(false)
				if (response) {
					console.log('Cập nhật nông trại thành công: ', response)
					setPopupText(popupcontent.updateSuccess)
					setPopupVisible(true)
					router.replace({ pathname: `/(tabs)/farm/details/${response.id}` })
					dispatch(clearFarmInput())
				} else {
					console.log('Cập nhật nông trại thất bại: ', response.error)
					setPopupText(popupcontent.fail)
					setPopupVisible(true)
				}
			} else {
				const response = await postFarm(farmSubmit)
				console.log('response: ', response)
				form.setSubmitting(false)
				if (response.data) {
					console.log('Tạo nông trại thành công: ', response.data)
					setPopupText(popupcontent.success)
					setPopupVisible(true)
					dispatch(clearFarmInput())
					router.back()
				} else {
					console.log('Tạo nông trại thất bại: ', response.error)
					setPopupText(popupcontent.fail)
					setPopupVisible(true)
				}
			}
		} catch (err) {
			console.log('err: ', err)
			setPopupText(popupcontent.fail)
			setPopupVisible(true)
		}
	}
	const renderCurrentStep = (form: FormikProps<FormikValues>) => {
		const step = steps[currentIndex]
		const commonProps = {
			form,
			name: step.name,
		}
		const StepComponent = step.component
		return <StepComponent {...commonProps} />
	}

	const goNext = async (form: any) => {
		const values = form.values
		dispatch(setFarmInput(values))
		dispatch(increaseFarmStep())
		if (currentIndex === steps.length - 1) {
			form.setSubmitting(true)
			console.log('SUBMIT chua: ', form)
			dispatch(decreaseFarmStep())

			setTimeout(() => {
				handleSubmit(form)
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
			router.replace('(tabs)/farm')
		} else {
			dispatch(restartFarmStep())
		}

	}
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Formik
					initialValues={{}} // this is the initial values of the form
					validationSchema={getStepSchema(currentIndex, steps)}
					onSubmit={() => {
						console.log('submit')
					}}
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
									onClickNext={() => goNext(form)}
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
