import { useRouter, router, useLocalSearchParams } from 'expo-router'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
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



const InfoDetail: React.FC = () => {
	//const userInfo = useLocalSearchParams<{userId: string, name: string, email: string, phoneNumber: string}>();
	
	const { data, error, isLoading, isFetching, refetch } = useGetMeQuery()
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
			username: values.username,
			value: values.userNumber,
		}).unwrap()

		console.log('Result after update: ', result)

		setIsEditting(false)
		
	}
		const validationSchema = Yup.object().shape({
			username: Yup.string().required('Tên là bắt buộc'),
			userNumber: Yup.string().required(
				data?.type_res == 'email' ? 'Email là bắt buộc' : 'Số điện thoại là bắt buộc',
			),
		})
		  const initialValues = {
				username: data?.username || '',
				userNumber: data?.value || '',
			}
	return (
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
				handleEdit(values)
			}}
			validateOnBlur
			validateOnChange
			validateOnMount
		>
			{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
				<View style={{ padding: '5%', flex: 1 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image
							source={avatarPhoto}
							style={{ width: 64, height: 64, borderRadius: 32, marginRight: '5%' }}
						/>
						<Text style={styles.nameTextStyle}>{values.username}</Text>
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

						{data?.type_res == 'email' ? (
							<Text style={styles.titleTextStyle}>Email</Text>
						) : (
							<Text style={styles.titleTextStyle}>Số điện thoại</Text>
						)}

						{isEditting ? (
							<>
								<TextInput
									style={{ height: 48, backgroundColor: 'white' }}
									value={values.userNumber}
									onChangeText={handleChange('userNumber')}
									onBlur={handleBlur('userNumber')}
								/>
								{touched.userNumber && errors.userNumber && (
									<Text style={{ color: 'red' }}>{errors.userNumber as string}</Text>
								)}
							</>
						) : (
							<Text style={styles.contentTextStyle}>{values.userNumber}</Text>
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
				</View>
			)}
		</Formik>
	</>
	)
}

const styles = StyleSheet.create({
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
