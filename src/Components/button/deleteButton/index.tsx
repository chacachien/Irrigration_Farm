import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

interface DeleteButtonProps {
	text: string
	onPress: () => void
}

export default function DeleteButton({ text, onPress }: DeleteButtonProps) {
	return (
		<TouchableOpacity style={styles.nextButton} onPress={onPress}>
			<Text style={styles.nextButtonText}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	nextButton: {
		backgroundColor: '#FF0000', // Red background for the next button
		borderRadius: 5, // Rounded corners for the button
		paddingHorizontal: 15, // Padding horizontally within the button
		paddingVertical: 10, // Padding vertically within the button
	},
	nextButtonText: {
		color: '#fff', // White text color for the next button
		fontSize: 16, // Adjust the next button text size as needed
	},
})
