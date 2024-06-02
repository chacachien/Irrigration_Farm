// this is the layout for the new farm page

import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Button, TouchableOpacity, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function FarmFormLayout() {
	const router = useRouter()
	return (
		<Stack
			screenOptions={{
				// custom button back on header
				headerLeft: () => (
					<TouchableOpacity onPress={() => router.back()}>
						<FontAwesome name="angle-left" size={30} color="#000" />
					</TouchableOpacity>
				),
				// headerShown: false,
				headerTitleAlign: 'center',
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Tạo nông trại' }} />
		</Stack>
	)
}
