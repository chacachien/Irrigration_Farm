import React from 'react'
import { View, Text, Button } from 'react-native'
import { Link } from 'expo-router'

export default function Farm() {
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
			<Text>Tab farm</Text>
			<Link href="/farm/weather" asChild>
				<Button title="Weather" />
			</Link>
		</View>
	)
}
