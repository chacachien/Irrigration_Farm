// this is the layout for the new farm page

import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Button, View } from 'react-native'

export default function FarmFormLayout() {
	const router = useRouter()

	return (
		<Stack
			screenOptions={{
				// custom button back on header
				headerLeft: () => (
				    <Button
				        title="Quay lại"
				        onPress={() => router.back()}
				    />
				),
				// headerShown: false,
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Tạo nông trại' }} />
			{/* <Stack.Screen
				name="[id]"
				options={{
					title: 'Nông trại',
				}}
			/> */}
		</Stack>
	)
}
