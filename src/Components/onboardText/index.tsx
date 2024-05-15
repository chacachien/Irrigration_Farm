import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from 'expo-router'


interface TextOnboardProps {
    title: string,
    description: string,
    position: number
}

export default function TextOnboard({ title, description, position}: TextOnboardProps) {
	return (
		<View style={styles.textContainer}>
			<View style={styles.paginationContainer}>
				<View style={[styles.circle, position === 0 && styles.activeCircle]} />
				<View style={[styles.circle, position === 1 && styles.activeCircle]} />
				<View style={[styles.circle, position === 2 && styles.activeCircle]} />
			</View>

			<View style={styles.textContent}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</View>
	)
}
const width = 300
const borderRadius = width / 2
const styles = StyleSheet.create({
	textContainer: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		padding: 10,
		marginBottom: 30, 
	},
	paginationContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	circle: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#ccc',
		marginHorizontal: 5,
	},
	activeCircle: {
		backgroundColor: '#808080',
	},
	textContent: {
		flex: 1,
		width: width,
		height: width, // Make it a square box
		borderRadius: 10, // Rounded corners for the text container
		alignItems: 'center',
	},
	title: {
        padding: 20,
		fontSize: 25, // Adjust the title font size as needed
		fontWeight: 'bold', // Make the title bold
		paddingBottom: 50,
	},
	description: {
		fontSize: 16, // Adjust the description font size as needed
		color: '#808080', // Gray color for the description text
		paddingLeft: 20,
		paddingRight: 20,
	},
	navigationContainer: {
		flex: 1,
		flexDirection: 'row', // Arrange buttons in a row
		alignItems: 'center', // Center buttons vertically
		marginTop: 20, // Add margin from the text box
		justifyContent: 'space-between',
	},
	skipLink: {
		color: '#ccc', // Light gray color for the skip link
		fontSize: 14, // Adjust the skip link font size as needed
	},
	nextButton: {
		backgroundColor: '#007bff', // Blue background for the next button
		borderRadius: 5, // Rounded corners for the button
		paddingHorizontal: 15, // Padding horizontally within the button
		paddingVertical: 10, // Padding vertically within the button
	},
	nextButtonText: {
		color: '#fff', // White text color for the next button
		fontSize: 16, // Adjust the next button text size as needed
	},
})
