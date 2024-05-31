import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import theme from '@/Theme'


interface ActivateButtonProps {
	onPress: () => void
}

export default function AddButton({ onPress }: ActivateButtonProps) {
	return (
		<TouchableOpacity style={styles.nextButton} onPress={onPress}>
			<FontAwesome name="plus" size={30} color="#fff" />
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	nextButton: {
			position: 'absolute',
			bottom: 20,
			right: 20,
			width: 60,
			height: 60,
			borderRadius: 30,
			backgroundColor: theme.Colors.PRIMARY_LIGHT,
			justifyContent: 'center',
			alignItems: 'center',
			elevation: 8, // Add shadow for Android
			shadowColor: '#000', // Add shadow for iOS
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.8,
			shadowRadius: 2,
		},
})
