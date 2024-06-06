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
	const des = useSelector((state: any) => state.farm.des)
	const { setFieldValue, errors } = useFormikContext()

	useEffect(() => {
		// Set the initial value for 'area' to 'area' if not already set
		if (form.values.des !== des) {
			setFieldValue('des', des)
		}
	}, [])

	return (
		<View style={styles.container}>
			<TextInput
				{...getInputProps('des', form)}
				label="Mô tả"
				placeholder="Nhập mô tả nông trại"
				value={form.values.des?.toString()}
				keyboardType="number-pad"
				errorText={form.errors.des as string}
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
