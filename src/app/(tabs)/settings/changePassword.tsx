import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import TextInput from '@/Components/textInput'
import PrimaryButton from '@/Components/button/primaryButton'


import { Stack, router, useLocalSearchParams } from 'expo-router'
import TextButton from '@/Components/button/textButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useUpdateMeMutation } from '@/Services'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {useResetPasswordMutation} from '@/Services'

const changePassword = () => {
	const [resetPassword, result] = useResetPasswordMutation()
	const { username } = useLocalSearchParams()
	console.log('Username: ', username)

	const validationSchema = Yup.object().shape({
		oldPassword: Yup.string().required('Mật khẩu cũ là bắt buộc'),
		oldPasswordConfirm: Yup.string()
			.oneOf([Yup.ref('oldPassword'), ''], 'Mật khẩu cũ không khớp')
			.required('Lặp lại mật khẩu cũ là bắt buộc'),
		newPassword: Yup.string().required('Mật khẩu mới là bắt buộc'),
		newPasswordConfirm: Yup.string()
			.oneOf([Yup.ref('newPassword'), ''], 'Mật khẩu mới không khớp')
			.required('Xác nhận mật khẩu là bắt buộc'),
	})
	const initialValues = {
		oldPassword: '',
		oldPasswordConfirm: '',
		newPassword: '',
		newPasswordConfirm: '',
	}
	const handleSubmit = (values: any) => {
		console.log('Editting')
		console.log('Values: ', values)
		// cal api change password
		const result = resetPassword({
			username: username,
			password: values.newPassword,
		})

		console.log('Result after update: ', result)
		router.back()
	}

	return (
		// <View style={{ paddingHorizontal: '6%', paddingTop: '7%' }}>
		//     <Text style={{ fontSize: 20 }}>Mật khẩu cũ</Text>
		//     <TextInput style={{ height: 45, backgroundColor: 'white' }} mode='flat' value={ oldPassword } onChangeText={(text) => setOldPassword(text)} />
		//     <Text style={{ fontSize: 20 }}>Lặp lại mật khẩu cũ</Text>
		//     <TextInput style={{ height: 45, backgroundColor: 'white' }} mode='flat'value={ oldPasswordConfirm } onChangeText={(text) => setOldPasswordConfirm(text)} />
		//     <Text style={{ fontSize: 20 }}>Mật khẩu mới</Text>
		//     <TextInput style={{ height: 45, backgroundColor: 'white' }} mode='flat' value={ newPassword } onChangeText={(text) => setNewPassword(text)} />
		//     <Text style={{ fontSize: 20 }}>Xác nhận mật khẩu</Text>
		//     <TextInput style={{ height: 45, backgroundColor: 'white' }} mode='flat' value={ newPasswordConfirm } onChangeText={(text) => setNewPasswordConfirm(text)} />
		//     <View style={{ marginTop: '5%'}}>

		//     </View>
		//     <PrimaryButton title='Hoàn tất' onPress={() => {router.back()}} />
		//     <View style={{ alignItems: 'center', marginTop: '5%' }}>
		//         <TextButton title='Hủy' onPress={() => {router.back()}} />
		//     </View>
		// </View>
		<>
			<Stack.Screen
				// Add the correct type definition for the headerLeft prop
				options={{
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<FontAwesome name="angle-left" size={30} color="#000" />
						</TouchableOpacity>
					),
				}}
			/>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					handleSubmit(values)
				}}
				validateOnBlur
				validateOnChange
				validateOnMount
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
					<View style={{ paddingHorizontal: '6%', paddingTop: '7%' }}>
						<Text style={{ fontSize: 20 }}>Mật khẩu cũ</Text>
						<TextInput
							style={{ height: 45, backgroundColor: 'white' }}
							value={values.oldPassword}
							onChangeText={handleChange('oldPassword')}
							onBlur={handleBlur('oldPassword')}
							secureTextEntry
						/>
						{touched.oldPassword && errors.oldPassword && (
							<Text style={{ color: 'red' }}>{errors.oldPassword}</Text>
						)}

						<Text style={{ fontSize: 20 }}>Lặp lại mật khẩu cũ</Text>
						<TextInput
							style={{ height: 45, backgroundColor: 'white' }}
							value={values.oldPasswordConfirm}
							onChangeText={handleChange('oldPasswordConfirm')}
							onBlur={handleBlur('oldPasswordConfirm')}
							secureTextEntry
						/>
						{touched.oldPasswordConfirm && errors.oldPasswordConfirm && (
							<Text style={{ color: 'red' }}>{errors.oldPasswordConfirm}</Text>
						)}

						<Text style={{ fontSize: 20 }}>Mật khẩu mới</Text>
						<TextInput
							style={{ height: 45, backgroundColor: 'white' }}
							value={values.newPassword}
							onChangeText={handleChange('newPassword')}
							onBlur={handleBlur('newPassword')}
							secureTextEntry
						/>
						{touched.newPassword && errors.newPassword && (
							<Text style={{ color: 'red' }}>{errors.newPassword}</Text>
						)}

						<Text style={{ fontSize: 20 }}>Xác nhận mật khẩu</Text>
						<TextInput
							style={{ height: 45, backgroundColor: 'white' }}
							value={values.newPasswordConfirm}
							onChangeText={handleChange('newPasswordConfirm')}
							onBlur={handleBlur('newPasswordConfirm')}
							secureTextEntry
						/>
						{touched.newPasswordConfirm && errors.newPasswordConfirm && (
							<Text style={{ color: 'red' }}>{errors.newPasswordConfirm}</Text>
						)}

						<View style={{ marginTop: '5%' }}>
							<PrimaryButton title="Hoàn tất" onPress={handleSubmit} />
						</View>

						<View style={{ alignItems: 'center', marginTop: '5%' }}>
							<TextButton
								title="Hủy"
								onPress={() => {
									router.back()
								}}
							/>
						</View>
					</View>
				)}
			</Formik>
		</>
	)
}

export default changePassword
