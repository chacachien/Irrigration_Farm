import React from 'react'
import { Stack } from 'expo-router'

export default function FarmLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ title: 'Nông trại' }} />
			<Stack.Screen name="weather" options={{ title: 'Thời tiết' }} />
		</Stack>
	)
}
