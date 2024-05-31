import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '@/Components/logo'
import TextInput from '@/Components/textInput'
import PrimaryButton from '@/Components/button/primaryButton'
import TextButton from '@/Components/button/textButton'
import SecondaryButton from '@/Components/button/secondaryButton'
import { emailValidator, passwordValidator } from '@/Helper/utils'
import theme from '@/Theme'
import { useLoginMutation } from '@/Services'
import { setCredentials } from '@/Store/reducers'
import { useDispatch } from 'react-redux'
import Popup from '@/Components/popup'
import { saveCredentials } from '@/Store/reducers'
import { AppDispatch } from '@/Store'

export default function Login() {
	const router = useRouter()
	const [type_res, setType_res] = useState(true)
	const [email, setEmail] = useState({ value: '', error: '' })
	const [password, setPassword] = useState({ value: '', error: '' })
	const [login, { isLoading }] = useLoginMutation()
	const [popupVisible, setPopupVisible] = useState(false)
	const dispatch = useDispatch<AppDispatch>()

	const _onLoginPressed = async () => {
		const emailError = emailValidator(email.value)
		const passwordError = passwordValidator(password.value)

		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError })
			setPassword({ ...password, error: passwordError })
			return
		}
		try {
			const result: any = await login({
				value: email.value,
				password: password.value,
			}).unwrap()
			console.log('RESULT: ', result)

			if (result) {
				console.log('RESPONSE OF LOGIN: ', result)
				//dispatch(setCredentials(result))
				const { user, token } = result
				await dispatch(saveCredentials(user, token))
				router.push('(tabs)')
			} else {
				console.log('ERROR: ', result.error)
				setPopupVisible(true)
			}
		} catch (err) {
			console.log('ERR: ', err)
		}
	}

	const handlePopup = () => {
		setPopupVisible(false)
		// phata
	}
	const handleForgotPassword = () => {
		console.log('forgot?')
	}
	const handleChangeType = () => {
		console.log(type_res)
		setType_res(!type_res)
	}

	useEffect(() => {}, [])

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoContainer}>
				<Logo />
				<Text style={styles.title}>Đăng nhập</Text>
			</View>

			<View style={styles.inputContainer}>
				{type_res ? (
					<TextInput
						label="Email"
						returnKeyType="next"
						value={email.value}
						onChangeText={(text) => setEmail({ value: text, error: '' })}
						error={!!email.error}
						errorText={email.error}
						autoCapitalize="none"
						textContentType="emailAddress"
						keyboardType="email-address"
					/>
				) : (
					<TextInput
						label="Số điện thoại"
						returnKeyType="next"
						value={email.value}
						onChangeText={(text) => setEmail({ value: text, error: '' })}
						error={!!email.error}
						errorText={email.error}
						autoCapitalize="none"
						textContentType="emailAddress"
						keyboardType="phone-pad"
					/>
				)}

				<TextInput
					label="Password"
					returnKeyType="done"
					value={password.value}
					onChangeText={(text) => setPassword({ value: text, error: '' })}
					error={!!password.error}
					errorText={password.error}
					secureTextEntry
				/>
				<View style={styles.forgotPassword}>
					<TextButton title="Quên mật khẩu?" onPress={() => handleForgotPassword()} />
				</View>

				<PrimaryButton title="Đăng nhập" onPress={_onLoginPressed} />
				<View style={styles.continuePhone}>
					<TextButton title="Tiếp tục với số điện thoại" onPress={() => handleChangeType()} />
				</View>
			</View>

			<View style={styles.noAccount}>
				<Text style={styles.label}>Chưa có tài khoản? </Text>
				<SecondaryButton title="Đăng ký" onPress={() => router.push('register')} />
			</View>
			{popupVisible && (
				<View style={styles.popupContainer}>
					<Popup
						visible={popupVisible}
						type="success"
						text="Tài khoản hoặc mật khẩu không đúng"
						buttonText="Thử lại"
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
		flex: 0.4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 16,
	},
	inputContainer: {
		flex: 0.3,
		justifyContent: 'center',
	},
	forgotPassword: {
		marginVertical: 16,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	continuePhone: {
		marginTop: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},

	// this is end of the screen

	noAccount: {
		position: 'absolute',
		bottom: 40,
		left: '5%',
		right: '5%',
		width: '100%',

		alignItems: 'center',
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
