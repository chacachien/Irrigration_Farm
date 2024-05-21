import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Link } from 'expo-router'

import OnboardImage from '@/Components/onboardImage'
import TextOnboard from '@/Components/onboardText'
import BlurButton from '@/Components/button/BlurButton'
import ActivateButton from '@/Components/button/ActivateButton'
import onboard_2 from 'assets/onboard/onboard_2.png'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('screen')

export default function Two({moveToNext }: {moveToNext: () => void}){
	const title = 'Quản lý tưới tiêu'
	const description = 'Dễ dàng quản lý với chức năng lập lịch tưới tiêu.'

return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<OnboardImage image_name={onboard_2} />
				<View style={styles.textContainer}>
					<TextOnboard title={title} description={description} position={1} />
					<View style={styles.navigationContainer}>
						<BlurButton link_to="login" />
						<ActivateButton text="Tiếp theo" onPress={moveToNext} />
					</View>
				</View>
			</View>
		</SafeAreaView>
)
}

const borderRadius = width / 2
const styles = StyleSheet.create({
	container: {
        width,
        height,
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff', // changed to white background color
	},

	navigationContainer: {
		flex: 1,
		flexDirection: 'row', // Arrange buttons in a row
		alignItems: 'center', // Center buttons vertically
		marginTop: 20, // Add margin from the text box
		justifyContent: 'space-between',
		width: '80%',
	},
	textContainer: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		padding: 10,
		marginTop: 20,
		marginBottom: 30, // Add space between the text and the buttons
		backgroundColor: '#fff', // Optional: Add background color if needed
		// Shadow properties for iOS
		borderRadius: 40,
		shadowColor: '#000',
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.75,
		shadowRadius: 10,
		// Elevation for Android
		elevation: 5,
	},
})

