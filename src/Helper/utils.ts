import AsyncStorage from '@react-native-async-storage/async-storage'
import { getIn, FormikProps, FormikValues } from 'formik'

export const emailValidator = (email: string) => {


	if (!email || email.length <= 0) return 'Email cannot be empty.'
	return ''
}

export const passwordValidator = (password: string) => {
	if (!password || password.length <= 0) return 'Password cannot be empty.'

	return ''
}

export const nameValidator = (name: string) => {
	if (!name || name.length <= 0) return 'Name cannot be empty.'
	return ''
}

export const getInputProps = (name: string, formik: FormikProps<FormikValues>) => {
	const value = getIn(formik.values, name)
	const error = getIn(formik.errors, name) && getIn(formik.touched, name)
	console.log(`name: ${name}, value: ${value}, error: ${error}`)
	const props = {
		id: name,
		name: name,
		// onChangeText: formik.handleChange(name) ,
		// onBlur: formik.handleBlur(name),
		value,
		onChangeText: (text: string) => formik.setFieldValue(name, text), // Fix here
		onBlur: () => formik.setFieldTouched(name, true), // Fix here
		error,
	}
	return props
}


export const getToken = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem('user');
		if (jsonValue !== null) {
			const userData = JSON.parse(jsonValue);
			console.log('token:', userData.token); // Log the token to ensure it's correct
			return userData.token; // Return the token directly
		}
	} catch (error) {
		console.error('Failed to fetch user data from storage', error);
		return null;
	}
};

export const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		// hour: '2-digit',
		// minute: '2-digit',
		// second: '2-digit',
	}
	const date = new Date(dateString)
	return date.toLocaleString(undefined, options)
}

