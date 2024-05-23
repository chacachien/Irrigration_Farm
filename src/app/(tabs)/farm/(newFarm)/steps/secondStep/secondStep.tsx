// create a name and gender of use

// create a select box component (between phone or email)
// use step schema to validate the form

import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getInputProps } from '@/Helper/utils'
import { FormikProps, FormikValues } from 'formik'

import { TextInput as Input } from 'react-native-paper'

import SelectPicker from 'react-native-form-select-picker'

import theme from '@/Theme'
import DropdownSelect from 'react-native-input-select'
import { useSelector } from 'react-redux'
import TextInput from '@/Components/textInput'
import { Plantation } from '@/Types/plantation'


type Props = {
	form: FormikProps<FormikValues>
	name: string
}

const SecondStep = ({ form, name }: Props) => {
	const farm = useSelector((state: any) => state.farm)
	const [selected, setSelected] = useState<Plantation | null>(null)

	useEffect(() => {
		form.setFieldValue('plantation', selected)
	}, [selected])

	const options = [
		{ value: 'DragonFruit', label: 'Thanh Long' },
		{ value: 'Durian', label: 'Sầu Riêng' },
		{ value: 'Fruit', label: 'Trái Cây' },
		{ value: 'Grapes', label: 'Nho' },
		{ value: 'Mango', label: 'Xoài' },
		{ value: 'Orange', label: 'Cam' },
		{ value: 'Strawberry', label: 'Dâu' },
		{ value: 'Vegetable', label: 'Rau' },
		{ value: 'Watermelon', label: 'Dưa Hấu' },
	]

	return (
		<View style={styles.container}>
			<Text> Chọn loại cây trồng</Text>
			<SelectPicker
				placeholder="Ấn để chọn"
				onValueChange={(val) => {
					// Do anything you want with the value.
					// For example, save in state.
					console.log('Selected value:', val)
					setSelected(val)
				}}
				selected={selected}
				{...getInputProps('plantation', form)}
				value={form.values.value}
			>
				{Object.values(options).map((val, index) => (
					<SelectPicker.Item label={val.label} value={val.value} key={index} />
				))}
			</SelectPicker>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 20,
	},
	input: {
		backgroundColor: theme.Colors.SURFACE,
		marginBottom: 12,
	},
	error: {
		fontSize: 14,
		color: theme.Colors.ERROR,
		paddingHorizontal: 4,
		paddingTop: 4,
	},
})

export default memo(SecondStep)
