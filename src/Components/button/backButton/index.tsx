import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

interface BackButtonProps {
	goBack: () => void
}

export default function BackButton({ goBack }: BackButtonProps) {
	return (
		<TouchableOpacity onPress={goBack} style={styles.container}>
			<Image style={styles.image} source={require('assets/arrow_back.png')} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute' as const, // Explicitly set position for clarity
		top: 10 + getStatusBarHeight(),
		left: 4,
	},
	image: {
		width: 24,
		height: 24,
	},
})
