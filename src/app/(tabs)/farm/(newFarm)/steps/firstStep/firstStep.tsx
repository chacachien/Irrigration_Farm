// UI
import React, { memo, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import TextInput from '@/Components/textInput'

// DATA
import { getInputProps } from '@/Helper/utils'
import { FormikProps, FormikValues, useFormikContext } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}

const FirstStep = ({ form, name }: Props) => {
	const name_farm = useSelector((state: any) => state.farm.name)
	const { setFieldValue, errors } = useFormikContext()

	useEffect(() => {
		// Set the initial value for 'name' to 'name_farm' if not already set
		if (form.values.name !== name_farm) {
			setFieldValue('name', name_farm)
		}
	}, [])
	return (
		<View style={styles.container}>
			<TextInput
				{...getInputProps('name', form)}
				label="Tên nông trại"
				placeholder="Nhập tên nông  trại"
				value={form.values.name}
				errorText={form.errors.value as string}
				onChangeText={(text) => {
					form.setFieldValue('name', text)
				}}
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

export default memo(FirstStep)
