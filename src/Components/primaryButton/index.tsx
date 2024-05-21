
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import theme from '@/Theme'

interface CustomButtonProps {
	title: string
	onPress: () => void
}

const PrimaryButton = ({ title, onPress }: CustomButtonProps) => (
	<TouchableOpacity style={styles.primaryButton} onPress={onPress}>
		<Text style={styles.buttonText}>{title}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	primaryButton: {
		backgroundColor: theme.Colors.PRIMARY_LIGHT, // Replace with your color variable
		alignContent:'center',
		justifyContent:'center',
		borderRadius: 5,
		height: 50,
	},
	buttonText: {
		color: 'white', // Replace with your color variable
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: theme.FontSize.SMALL,
	},
})

export default PrimaryButton
