// create a select box component (between phone or email)
// use step schema to validate the form

import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { getInputProps } from '@/Helper/utils'
import { FormikProps, FormikValues } from "formik";
import DropdownSelect from 'react-native-input-select'
import { TextInput as Input } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'



import theme from '@/Theme'
import { setInput } from '@/Store/reducers/register';

type Props = {
    form: FormikProps<FormikValues>
    name: string
}


const FirstStep = ({ form, name }: Props) => {
    // name = firstStep
    
    const register  = useSelector((state: any) => state.register)

    const [selectOption, setSelectOption] = useState(register.type_res)

    const logMovies = async () => {
	    console.log('You can make an API call when the modal opens.')
	}

    const handleValueChange = (itemValue: any) => {
        console.log('itemValue: ', itemValue)
        setSelectOption(itemValue)
	}

    useEffect(() => {
        console.log('selectOption: ', selectOption)
        form.setFieldValue('type_res', selectOption)
        form.setFieldValue('value', '')
    }, [selectOption])
        
    useEffect(() => {

			console.log('register: ', register)
            form.resetForm()
			form.setFieldValue('type_res', register.type_res)
			form.setFieldValue('value', register.value)
		}, [])

    return (
			<View style = {styles.container}>
				<DropdownSelect
					{...getInputProps('type_res', form)}
					label="Sử dụng"
					placeholder="Select an option..."
					options={[
						{ name: 'Số điện thoại', id: 'phone' },
						{ name: 'Email', id: 'email' },
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
				{selectOption === 'phone' && (
					<Input
						{...getInputProps('value', form)}
						keyboardType="phone-pad"
						placeholder="Số điện thoại"
						value={form.values.value}
					/>
				)}
				{selectOption === 'email' && (
					<Input
						{...getInputProps('value', form)}
						keyboardType="email-address"
						placeholder="Email"
						value={form.values.value}
					/>
				)}
			</View>
		)  
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    // input: {
    //     backgroundColor: theme.Colors.SURFACE,
    // },
    // error: {
    //     fontSize: 14,
    //     color: theme.Colors.ERROR,
    //     paddingHorizontal: 4,
    //     paddingTop: 4,
    // },
})

export default memo(FirstStep)