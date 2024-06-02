import { useRouter, router, Link, useLocalSearchParams } from 'expo-router'
import { View, Text, Button, Image, StyleSheet } from 'react-native'

import SettingItem from '@/Components/settingItem'
const avatarPhoto = require('assets/images/avatar1.jpg')
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useDispatch } from 'react-redux'
import { saveLogout } from '@/Store/reducers'
import { AppDispatch } from '@/Store'
import { useGetMeQuery } from '@/Services'

import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const Settings: React.FC = () => {
	// const infoDetail = useLocalSearchParams<{
	// 	userId: string
	// 	name: string
	// 	email: string
	// 	phoneNumber: string
	// }>()
	const { data, error, isLoading, refetch } = useGetMeQuery()
	useFocusEffect(
		useCallback(() => {
			refetch()
		}, [refetch]),
	)
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()

	const handleLogout = async () => {
		await AsyncStorage.removeItem('user')
		await AsyncStorage.clear()
		await dispatch(saveLogout())
		router.push('login')
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

	return (
		<View style={{ padding: '5%', flex: 1 }}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Image
					source={avatarPhoto}
					style={{ width: 64, height: 64, borderRadius: 32, marginRight: '5%' }}
				/>
				<Text style={styles.nameTextStyle}>{data?.username}</Text>
			</View>
			<View>
				<Text style={styles.titleTextStyle}>Cá nhân</Text>
				<SettingItem
					title="Thông tin cá nhân"
					icon="user"
					underlined={true}
					onPress={() =>
						router.push({
							pathname: 'settings/infoDetails',
						})
					}
				/>
				<SettingItem
					title="Đổi mật khẩu"
					icon="key"
					onPress={() =>
						router.push({
							pathname: 'settings/changePassword',
						})
					}
				/>
			</View>
			<View>
				<Text style={styles.titleTextStyle}>Hệ thống</Text>
				<SettingItem title="Chế độ tối" icon="dark" onPress={() => {}} />
			</View>
			<View>
				<Text style={styles.titleTextStyle}>Hỗ trợ</Text>
				<SettingItem
					title="Trợ giúp"
					icon="question"
					underlined={true}
					onPress={() => {
						router.push('settings/help')
					}}
				/>
				<SettingItem title="Đăng xuất" icon="log-out" underlined={true} onPress={handleLogout} />
				<SettingItem
					title="Chính sách và quyền riêng tư"
					underlined={true}
					icon="lock"
					onPress={() => {
						router.push('settings/privacy')
					}}
				/>
				<SettingItem
					title="Giới thiệu ứng dụng"
					icon="info"
					onPress={() => {
						router.push('settings/intro')
					}}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	nameTextStyle: {
		fontWeight: '500',
		fontSize: 25,
	},
	titleTextStyle: {
		fontWeight: '500',
		fontSize: 21,
		marginVertical: '4%',
	},
})

export default Settings
