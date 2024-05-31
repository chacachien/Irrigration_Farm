import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native'
import { Link } from 'expo-router'
import { Easing } from 'react-native-reanimated'

import OnboardImage from '@/Components/onboardImage'
import TextOnboard from '@/Components/onboardText'
import BlurButton from '@/Components/button/blurButton'
import ActivateButton from '@/Components/button/activateButton'
import onboard_1 from '~/assets/onboard/onboard_1.png'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('screen')
export default function One({ moveToNext }: { moveToNext: () => void }) {
	const title = 'Tưới tiêu thông minh'
	const description = 'Phân tích đưa ra các giải pháp tưới tiêu tối ưu.'

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<OnboardImage image_name={onboard_1} />
				<View style={styles.textContainer}>
					<TextOnboard title={title} description={description} position={0} />
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
