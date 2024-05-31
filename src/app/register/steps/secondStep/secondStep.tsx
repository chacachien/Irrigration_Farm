// create a name and gender of use

// create a select box component (between phone or email)
// use step schema to validate the form


import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getInputProps } from '@/Helper/utils'
import { FormikProps, FormikValues } from "formik";

import { TextInput as Input } from 'react-native-paper'




import theme from '@/Theme'
import DropdownSelect from 'react-native-input-select';
import { useSelector } from 'react-redux';

type Props = {
    form: FormikProps<FormikValues>
    name: string
}

const SecondStep = ({ form, name }: Props) => {

    const register = useSelector((state: any) => state.register)

		const [selectOption, setSelectOption] = useState(register.gender)

		const logMovies = async () => {
			console.log('You can make an API call when the modal opens.')
		}

		const handleValueChange = (itemValue: any) => {
			console.log('itemValue: ', itemValue)
			setSelectOption(itemValue)
		}

		useEffect(() => {
			console.log('selectOption: ', selectOption)
			form.setFieldValue('gender', selectOption)

		}, [selectOption])

		useEffect(() => {
			console.log('register: ', register)
			form.resetForm()
			form.setFieldValue('gender', register.gender)
			form.setFieldValue('username', register.username)
		}, [])

    return (
			<View style={styles.container}>
				<Input
					style={styles.input}
					{...getInputProps('username', form)}
					keyboardType="default"
					placeholder="Tên"
				/>

				<DropdownSelect
					{...getInputProps('gender', form)}
					label="Giới tính"
					placeholder="Select an option..."
					options={[
						{ name: 'Nam', id: 'male' },
						{ name: 'Nữ', id: 'female' },
						{ name: 'Khác', id: 'other' },
					]}
					optionLabel={'name'}
					optionValue={'id'}
					selectedValue={selectOption}
					onValueChange={handleValueChange}
					dropdownErrorStyle={{
						borderColor: 'red',
						borderWidth: 2,
						borderStyle: 'solid',
					}}
					dropdownErrorTextStyle={{ color: 'red', fontWeight: '500' }}
					primaryColor={'green'}
					modalControls={{
						modalProps: { onShow: () => logMovies() },
						modalOptionsContainerStyle: { backgroundColor: 'white' },
					}}
				/>
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