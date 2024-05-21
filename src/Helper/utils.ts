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
