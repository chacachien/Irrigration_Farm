import { useRouter, router, useLocalSearchParams } from 'expo-router'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import SecondaryButton from '@/Components/secondaryButton'
import ActivateButton from '@/Components/button/ActivateButton'
import PrimaryButton from '@/Components/primaryButton'
import TextInput from '@/Components/textInput'
import { useEffect, useState } from 'react'
import TextButton from '@/Components/textButton'
import { string } from 'yup'
const avatarPhoto = require('assets/images/avatar1.jpg')
// data
import { useSelector } from 'react-redux'
import { useGetMeQuery } from '@/Services'

const InfoDetail: React.FC = () => {
	//const userInfo = useLocalSearchParams<{userId: string, name: string, email: string, phoneNumber: string}>();
	const [isEditting, setIsEditting] = useState(false)
	const [userName, setUserName] = useState('')
	const [userNumber, setUserNumber] = useState('')

	const { data, error, isLoading } = useGetMeQuery()
	if (isLoading) {
		return <Text>Loading...</Text>
	}
	if (error) {
		return <Text>Error</Text>
	}
	if (!data) {
		return <Text>Empty</Text>
	}
	useEffect(() => {
		console.log('data: ', data)
		setUserName(data.username)
		setUserNumber(data.value)
	}, [data])

	return (
		<View style={{ padding: '5%', flex: 1 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image
					source={avatarPhoto}
					style={{ width: 64, height: 64, borderRadius: 32, marginRight: '5%' }}
				/>
				<Text style={styles.nameTextStyle}>{data?.username}</Text>
			</View>
			<View style={{ marginVertical: '5%' }}>
				<Text style={styles.titleTextStyle}>Tên</Text>
				{isEditting ? (
					<TextInput
						style={{ height: 48, backgroundColor: 'white' }}
						value={userName}
						mode="flat"
						onChangeText={(text) => {
							setUserName(text)
						}}
					/>
				) : (
					<Text style={styles.contentTextStyle}>{data?.username}</Text>
				)}
				{data?.type_res == 'email' ? (
					<Text style={styles.titleTextStyle}>Số điện thoại</Text>
				) : (
					<Text style={styles.titleTextStyle}>Số điện thoại</Text>
				)}

				{isEditting ? (
					<TextInput
						style={{ height: 48, backgroundColor: 'white' }}
						value={userNumber}
						mode="flat"
					/>
				) : (
					<Text style={styles.contentTextStyle}>{data?.value}</Text>
				)}
			</View>

			{isEditting ? (
				<View style={{ alignItems: 'center' }}>
					<SecondaryButton
						title="Lưu thông tin"
						onPress={() => {
							setIsEditting(false)
						}}
					/>
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
