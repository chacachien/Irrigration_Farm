// UI
import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getInputProps } from '@/Helper/utils'
import SelectPicker from 'react-native-form-select-picker'
import theme from '@/Theme'


// DATA
import { FormikProps, FormikValues } from 'formik'
import { useSelector } from 'react-redux'
import { options } from '@/Types/plantation'
import { useGetCultivarsQuery } from '@/Services/cultivar'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}


const SecondStep = ({ form, name }: Props) => {
	const plantation = useSelector((state: any) => state.farm.plantation)
	const [selected, setSelected] = useState(plantation)
	console.log('plantation: ', plantation)
	const { data, error, isLoading, refetch } = useGetCultivarsQuery({})
	console.log('data', data)


	return (
		<View style={styles.container}>
			<Text> Chọn loại cây trồng</Text>
			<SelectPicker 
				{...getInputProps('plantation', form)}
				placeholder="Ấn để chọn"
				onValueChange={(val) => {
					// Do anything you want with the value.
					// For example, save in state.
					console.log('Selected value:', val)
					form.setFieldValue('plantation', val)
					setSelected(val)
				}}
				selected={selected}
				value={form.values.plantation}
			> 
				{data && Object.values(data).map((val: any, index) => (
					<SelectPicker.Item label={val.name} value={val.id} key={index} />
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
