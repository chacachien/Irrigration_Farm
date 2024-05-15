import { View, Text, Button } from 'react-native'
import React from 'react'

import { Link } from 'expo-router'

export default function Login() {

  return (
		<View>
			<Text>Login</Text>
			<Link href="/register" asChild>
				<Button title="Register" />
			</Link>
      <View style={{ height: 20 }} />
			<Link href="/(tabs)" asChild>
				<Button title="Home" />
			</Link>
		</View>
	)
}