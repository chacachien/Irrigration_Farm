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

const ThirdStep = ({ form, name }: Props) => {
	const address = useSelector((state: any) => state.farm.address)
		const { setFieldValue, errors } = useFormikContext()

		useEffect(() => {
			// Set the initial value for 'name' to 'name_farm' if not already set
			if (form.values.address !== address) {
				setFieldValue('address', address)
			}
		}, [])

	return (
		<View style={styles.container}>
			<TextInput
				{...getInputProps('address', form)}
				label="Địa chỉ"
				placeholder="Nhập vị trí nông trại"
				value={form.values.address}
				errorText={form.errors.address as string}
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

export default memo(ThirdStep)
