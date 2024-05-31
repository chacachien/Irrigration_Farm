// create a name and gender of use

// create a select box component (between phone or email)
// use step schema to validate the form

import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { getInputProps } from '@/Helper/utils'
import { FormikProps, FormikValues } from 'formik'

import { TextInput as Input } from 'react-native-paper'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import theme from '@/Theme'
import { useSelector } from 'react-redux'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}

const ThirdStep = ({ form, name }: Props) => {

	const register = useSelector((state: any) => state.register)
  const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}
      const handlePressOut = () => {
				setShowPassword(false)
			}

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}
    const handleConfirmPressOut = () => {
                setShowConfirmPassword(false)
            }
	const logMovies = async () => {
		console.log('You can make an API call when the modal opens.')
	}


	useEffect(() => {
		console.log('register: ', register)

		form.setFieldValue('gender', register.password)
		form.setFieldValue('username', register.confirmPassword)
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Input
					{...getInputProps('password', form)}
					style={styles.input}
					placeholder="Mật khẩu"
					secureTextEntry={!showPassword}
					underlineColor="transparent"
					underlineStyle={{ borderWidth: 0 }}
					right={
						<Input.Icon
							style={styles.icon}
							icon={showPassword ? 'eye' : 'eye-off'}
							onPressIn={() => togglePasswordVisibility()}
							onPressOut={() => handlePressOut()}
						/>
					}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Input
					{...getInputProps('confirmPassword', form)}
					style={styles.input}
					placeholder="Nhập lại mật khẩu"
					secureTextEntry={!showConfirmPassword}
					underlineColor="transparent"
					underlineStyle={{ borderWidth: 0 }}
					right={
						<Input.Icon
							style={styles.icon}
							icon={showConfirmPassword ? 'eye' : 'eye-off'}
							onPressIn={() => toggleConfirmPasswordVisibility()}
                            onPressOut={() => handleConfirmPressOut()}
						/>
					}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 12,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
		width: '100%',
		backgroundColor: theme.Colors.WHITE,
		borderRadius: 5,
		borderWidth: 0,
	},
	input: {
		flex: 1,
		backgroundColor: theme.Colors.WHITE,
		borderBottomWidth: 0,
		borderWidth: 0, // This removes the border
	},
	icon: {
		height: 40,
		padding: 8,
		alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.Colors.WHITE,
	},

	error: {
		fontSize: 14,
		color: theme.Colors.ERROR,
		paddingHorizontal: 4,
		paddingTop: 4,
	},
})

export default memo(ThirdStep)
