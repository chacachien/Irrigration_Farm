import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Button, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function FarmLayout() {
	const router = useRouter()

	return (
		<Stack
			screenOptions={{
				// custom button back on header
				// headerLeft: () => (
				// 	<TouchableOpacity onPress={() => router.back()}>
				// 		<FontAwesome name="angle-left" size={30} color="#000" />
				// 	</TouchableOpacity>
				// ),
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Nông trại', headerTitleAlign: 'center' }} />
			<Stack.Screen name="weather" options={{ title: 'Thời tiết', headerTitleAlign: 'center' }} />
			<Stack.Screen
				name="[id]"
				options={{
					title: 'Nông trại',
					headerTitleAlign: 'center',
				}}
			/>
			<Stack.Screen name="(newFarm)" options={{ title: 'Tạo nông trại', headerShown: false }} />
			<Stack.Screen
				name="edit"
				options={{ title: 'Chỉnh sửa nông trại', headerTitleAlign: 'center' }}
			/>
		</Stack>
	)
}
