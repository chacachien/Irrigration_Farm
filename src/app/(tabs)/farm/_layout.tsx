import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Button } from 'react-native'

export default function FarmLayout() {
	const router = useRouter()

	return (
		<Stack screenOptions={{ 


			// custom button back on header
			headerLeft: () => (
				<Button
					title="Quay lại"
					onPress={() => router.back()}
				/>
			),
			
			}}>

			<Stack.Screen name="index" options={{ title: 'Nông trại' }} />
			<Stack.Screen name="weather" options={{ title: 'Thời tiết' }} />
			<Stack.Screen name='farmDetail' options={{ title: 'Nông trại' }} />
			<Stack.Screen name="[id]" options={{
				title: 'Nông trại',
			}}
			/>
 		</Stack>
	)
}
