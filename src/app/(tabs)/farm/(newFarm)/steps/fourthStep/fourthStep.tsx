// create a select box component (between phone or email)
// use step schema to validate the form

import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getInputProps } from '@/Helper/utils'
import { FormikProps, FormikValues } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

import theme from '@/Theme'
import TextInput from '@/Components/textInput'
import { setFarmInput } from '@/Store/reducers'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}

const FourthStep = ({ form, name }: Props) => {
	// name = firstStep

	const farm = useSelector((state: any) => state.farm)

	const logMovies = async () => {
		console.log('You can make an API call when the modal opens.')
	}
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('register: ', farm)
		form.resetForm()
	}, [])

	return (
		<View style={styles.container}>
			<TextInput
				{...getInputProps('area', form)}
				label="Diện tích"
				placeholder="Nhập diện tích nông trại"
				value={form.values.value}
				keyboardType='number-pad'
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 12,
	},
})

export default memo(FourthStep)
