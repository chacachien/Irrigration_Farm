// UI
import React, { memo, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import TextInput from '@/Components/textInput'

// DATA
import { getInputProps } from '@/Helper/utils'
import { FormikProps, FormikValues, useFormikContext } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}

const FourthStep = ({ form, name }: Props) => {
	const area = useSelector((state: any) => state.farm.area)
	const { setFieldValue, errors } = useFormikContext()

	useEffect(() => {
		// Set the initial value for 'area' to 'area' if not already set
		if (form.values.area !== area) {
			setFieldValue('area', area)
		}
	}, [])

	return (
		<View style={styles.container}>
			<TextInput
				{...getInputProps('area', form)}
				label="Diện tích"
				placeholder="Nhập diện tích nông trại"
				value={form.values.area?.toString()}
				keyboardType="number-pad"
				errorText={form.errors.area as string}
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
