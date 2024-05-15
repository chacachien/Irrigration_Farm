import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Link, useRouter } from 'expo-router'

import OnboardImage from 'components/onboardImage'
import TextOnboard from 'components/onboardText'
import BlurButton from 'components/button/BlurButton'
import ActivateButton from 'components/button/ActivateButton'
import onboard_3 from 'assets/onboard/onboard_3.png'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('screen')

export default function Three() {
    const router = useRouter()

	const title = 'Tùy chọn mô hình'
	const description = 'Tùy chọn mô hình tưới tiêu phù hợp với khu vườn của bạn.'
    const moveToNext = () => {
        router.navigate('login')
    }
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<OnboardImage image_name={onboard_3} />
				<View style={styles.textContainer}>
					<TextOnboard title={title} description={description} position={2} />
					<View style={styles.navigationContainer}>

						<ActivateButton  text="Bắt đầu" onPress={moveToNext} />
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
        justifyContent: 'center',
		alignItems: 'center', // Center buttons vertically
		marginTop: 20, // Add margin from the text box

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
