import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '@/Components/logo'
import ProgressBar from '@/Components/progress'
import NavigationBar from '@/Components/navigationBar'
import { Formik, FormikProps, FormikValues } from 'formik'

import { useSelector, useDispatch } from 'react-redux'
import { genarateSteps, getStepSchema } from './steps/index'

import { increaseStep, decreaseStep, clearInput } from '@/Store/reducers/register'
import { setInput } from '@/Store/reducers/register'

import Popup from '@/Components/popup'
import SecondaryButton from '@/Components/secondaryButton'
import { usePostFarmerMutation } from '@/Services'
import { Farmer } from '@/Types/registerForm'
import { setIsSubmitting } from '@/Store/reducers/register'

const popupcontent ={
	success: {
		title: "Đăng ký tài khoản thành công",
		content: "Chúc mừng bạn đã đăng ký tài khoản thành công",
		button: "Tiếp tục"
	},
	fail: {
		title: "Đăng ký tài khoản thất bại",
		content: "Đã có lỗi xảy ra, vui lòng thử lại",
		button: "Thử lại"
	}
}
export default function Register() {
	const [popupVisible, setPopupVisible] = useState(false)
	const [popupText, setPopupText] = useState(popupcontent.success)
	const [steps] = useState(genarateSteps())
	const register = useSelector((state: any) => state.register)
	const currentIndex = useSelector((state: any) => state.register.step)
	const dispatch = useDispatch()
	const [postFarmer, postFarmerResult] = usePostFarmerMutation()

	const goNext = async (values: any) => {
			dispatch(setInput(values))
			dispatch(increaseStep())
		if (currentIndex === steps.length - 1) {
			console.log("SUBMIT: ", register)
			dispatch(decreaseStep())
			dispatch(setIsSubmitting(true))
			handleSubmit(values)
		}
	}

	const goBack = () => {
		dispatch(decreaseStep())
	}

	const router = useRouter()

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

	const handleSubmit = async (values: any) => {
		// handle submit here: call api to register user
		//create pop up success message
		// redirect to login screen
		const farmer: Farmer = {
			type_res: register.type_res,
			value: register.value,
			username: register.username,
			gender: register.gender,
			password: values.password,
			password2: values.confirmPassword,
		}
		console.log('farmer: ', farmer)
		// try
		// 	const result = await postFarmer(farmer).unwrap()
		// //handle err
		// console.log('result: ', result)
		// if (result.status !==200) {
		// 	console.log('error: ', result.error)
		// 	setPopupText(popupcontent.fail)
		// }
		// setPopupVisible(true)
		// dispatch(setIsSubmitting(false))
		try {
			const response = await postFarmer(farmer).unwrap()

			console.log('response: ', postFarmerResult)
			if (response) {
				console.log('Tạo tài khoản thành công: ', response)
			}
		} catch (err) {
			console.log('error: ', err)
			setPopupText(popupcontent.fail)
		}
		setPopupVisible(true)
		dispatch(setIsSubmitting(false))
	}

	const handlePopup = () => {
		setPopupVisible(false)
		dispatch(clearInput())
		if (popupText.title === "Đăng ký tài khoản thành công"){
			router.push('login')
		} else{
			router.push('register')
		}
		

	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoContainer}>
				<Logo />
				<Text style={styles.title}>Đăng ký</Text>
			</View>

			<View style={styles.inputContainer}>
				<ProgressBar progress={((currentIndex + 1) / steps.length) * 100} />

				<Formik
					initialValues={{}} // this is the initial values of the form
					validationSchema={getStepSchema(currentIndex, steps)}
					onSubmit={() => console.log('submit')}
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
			<View style={styles.noAccount}>
				<Text style={styles.label}>Đã có tài khoản? </Text>
				<SecondaryButton title="Đăng nhập" onPress={() => router.push('login')} />
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

		</SafeAreaView>
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
	
})
