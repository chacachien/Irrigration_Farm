import { useRouter, router, useLocalSearchParams } from 'expo-router'
import { View, Text, Button, Image, StyleSheet, ScrollViewBase } from 'react-native'
import SecondaryButton from '@/Components/button/secondaryButton'

import PrimaryButton from '@/Components/button/primaryButton'

import { useCallback, useEffect, useState } from 'react'
import TextButton from '@/Components/button/textButton'
import { string } from 'yup'
const avatarPhoto = require('assets/images/avatar1.jpg')
// data
import { useGetMeQuery, useUpdateMeMutation } from '@/Services'

import TextInput from '@/Components/textInput'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useFocusEffect } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { NativeBaseProvider, ScrollView } from 'native-base'

const InfoDetail: React.FC = () => {
	//const userInfo = useLocalSearchParams<{userId: string, name: string, email: string, phoneNumber: string}>();
	const user = useSelector((state: any) => state.auth.user)
	const { data, error, isLoading, isFetching, refetch } = useGetMeQuery(user?.id)
	const [isEditting, setIsEditting] = useState(false)
	const [updateMe] = useUpdateMeMutation()

	if (isFetching || isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}

	if (isLoading) {
		return <Text>Loading...</Text>
	}
	if (error) {
		return <Text>Error</Text>
	}
	if (!data) {
		return <Text>Empty</Text>
	}
	const handleEdit = async (values: any) => {
		console.log('Editting')
		console.log('Values: ', values)
		// cal api change here
		const result = await updateMe({
			id: user?.id,
			username: values.username,
			phone: values.userphone,
			email: values.useremail,
			address: values.useradress,
			city: values.usercity,
			province: values.userprovince,
			avatar: values.useravatar,
			firstName: values.userfirstname,
			lastName: values.userlastname,
		}).unwrap()

		console.log('Result after update: ', result)

		setIsEditting(false)
	}
	const validationSchema = Yup.object().shape({
		userphone: Yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
		useremail: Yup.string().email('Email không hợp lệ'),
	})
	const initialValues = {
		username: data?.username || '',
		userphone: data?.phone || '',
		useremail: data?.email || '',
		useradress: data?.address || '',
		usercity: data?.city || '',
		userprovince: data?.province || '',
		useravatar: data?.avatar || '',
		userfirstname: data?.firstName || '',
		userlastname: data?.lastName || '',
	}
	return (
		<>
			<Stack.Screen
				// Add the correct type definition for the headerLeft prop
				options={{
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.navigate('settings')}>
							<FontAwesome name="angle-left" size={30} color="#000" />
						</TouchableOpacity>
					),
				}}
			/>

    <NativeBaseProvider>
      <ScrollView contentContainerStyle={styles.container}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					handleEdit(values)
				}}
				validateOnBlur
				validateOnChange
				validateOnMount
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
					<ScrollView style={{ padding: '5%', flex: 1 }}>
						<View style={styles.name}>
							<Image
								source={avatarPhoto}
								style={{ width: 64, height: 64, borderRadius: 32, marginRight: '5%' }}
							/>
							{isEditting ? (
								<View style={{ flexDirection: 'row', flex: 1 }}>
									<TextInput
										style={{ backgroundColor: 'white', marginRight: 8 }}
										value={values.userfirstname}
										onChangeText={handleChange('userfirstname')}
										onBlur={handleBlur('userfirstname')}
										placeholder="Tên"
									/>
									<TextInput
										style={{ backgroundColor: 'white', marginLeft: 8 }}
										value={values.userlastname}
										onChangeText={handleChange('userlastname')}
										onBlur={handleBlur('userlastname')}
										placeholder="Họ"
									/>
								</View>
							) : (
								<Text style={styles.nameTextStyle}>
									{values.userfirstname + ' ' + values.userlastname}
								</Text>
							)}
						</View>

						<View style={{ marginVertical: '5%' }}>
							<Text style={styles.titleTextStyle}>Tên</Text>
							{isEditting ? (
								<>
									<TextInput
										style={{ height: 48, backgroundColor: 'white' }}
										value={values.username}
										onChangeText={handleChange('username')}
										onBlur={handleBlur('username')}
									/>
									{touched.username && errors.username && (
										<Text style={{ color: 'red' }}>{errors.username as string}</Text>
									)}
								</>
							) : (
								<Text style={styles.contentTextStyle}>{values.username}</Text>
							)}
							<Text style={styles.titleTextStyle}>Số điện thoại</Text>
							{isEditting ? (
								<>
									<TextInput
										style={{ height: 48, backgroundColor: 'white' }}
										value={values.userphone}
										onChangeText={handleChange('userphone')}
										onBlur={handleBlur('userNumber')}
									/>
									{touched.userphone && errors.userphone && (
										<Text style={{ color: 'red' }}>{errors.userphone as string}</Text>
									)}
								</>
							) : (
								<Text style={styles.contentTextStyle}>{values.userphone}</Text>
							)}

							<Text style={styles.titleTextStyle}>Email</Text>
							{isEditting ? (
								<>
									<TextInput
										style={{ height: 48, backgroundColor: 'white' }}
										value={values.useremail}
										onChangeText={handleChange('useremail')}
										onBlur={handleBlur('useremail')}
									/>
									{touched.useremail && errors.useremail && (
										<Text style={{ color: 'red' }}>{errors.useremail as string}</Text>
									)}
								</>
							) : (
								<Text style={styles.contentTextStyle}>{values.useremail}</Text>
							)}

							<Text style={styles.titleTextStyle}>Địa chỉ</Text>
							{isEditting ? (
								<>
									<TextInput
										style={{ height: 48, backgroundColor: 'white' }}
										value={values.useradress}
										onChangeText={handleChange('useradress')}
										onBlur={handleBlur('useradress')}
									/>
									{touched.useradress && errors.useradress && (
										<Text style={{ color: 'red' }}>{errors.useradress as string}</Text>
									)}
									<TextInput
										style={{ height: 48, backgroundColor: 'white' }}
										value={values.usercity}
										onChangeText={handleChange('usercity')}
										onBlur={handleBlur('usercity')}
									/>
									{touched.usercity && errors.usercity && (
										<Text style={{ color: 'red' }}>{errors.usercity as string}</Text>
									)}
									<TextInput
										style={{ height: 48, backgroundColor: 'white' }}
										value={values.userprovince}
										onChangeText={handleChange('userprovince')}
										onBlur={handleBlur('userprovince')}
									/>
								</>
							) : (
								<Text style={styles.contentTextStyle}>
									{values.useradress + ', ' + values.usercity + ', ' + values.userprovince}
								</Text>
							)}
						</View>

						{isEditting ? (
							<View style={{ alignItems: 'center' }}>
								<SecondaryButton title="Lưu thông tin" onPress={handleSubmit} />
								<View style={{ marginVertical: '2%' }}></View>
								<TextButton
									title="Hủy"
									onPress={() => {
										setIsEditting(false)
									}}
								/>
							</View>
						) : (
							<PrimaryButton
								title="Chỉnh sửa thông tin"
								onPress={() => {
									setIsEditting(true)
								}}
							/>
						)}
					</ScrollView>
				)}
			</Formik>
			</ScrollView>
			</NativeBaseProvider>
			
		</>
	)
}

const styles = StyleSheet.create({
	name: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: '1%',
		width: '50%',
		
	},
	container: {

	},
	nameTextStyle: {
		fontWeight: '500',
		fontSize: 25,
	},
	titleTextStyle: {
		fontWeight: '400',
		fontSize: 21,
	},
	contentTextStyle: {
		fontWeight: '400',
		fontSize: 21,
		marginVertical: '3%',
		color: 'grey',
	},
})

export default InfoDetail
