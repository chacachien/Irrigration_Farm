// UI
import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getInputProps } from '@/Helper/utils'
import SelectPicker from 'react-native-form-select-picker'
import theme from '@/Theme'


// DATA
import { FormikProps, FormikValues } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { options } from '@/Types/plantation'
import { useGetCultivarsQuery } from '@/Services/cultivar'
import { setFarmInput } from '@/Store/reducers/farm'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}



const SecondStep = ({ form, name }: Props) => {
	const plantation = useSelector((state: any) => state.farm.plantation)
	const [selected, setSelected] = useState(plantation?.id || '')
	console.log('plantation: ', plantation)
	const { data, error, isLoading, refetch } = useGetCultivarsQuery({})
	console.log('data', data)
	const dispatch = useDispatch()

	return (
		<View style={styles.container}>
			<Text> Chọn loại cây trồng</Text>
			<SelectPicker 
				{...getInputProps('plantation', form)}
				placeholder="Ấn để chọn"
				onValueChange={(id) => {
					if (!id) {
						setSelected('')
						form.setFieldValue('plantation', {})
						return
					}
					// Do anything you want with the value.
					// For example, save in state.
					console.log('Selected value:', id)
					// const val = data.filter((item: any) => item.id === id)
					form.setFieldValue('plantation', data.filter((item: any) => item.id === id)[0])
					setSelected(id)
					dispatch(setFarmInput({
						plantation: data.filter((item: any) => item.id === id)[0]
					})
					)
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
