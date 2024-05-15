import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native'
import { Link } from 'expo-router'



export default function OnboardImage({ image_name }) {
    const translateX = new Animated.Value(40)
        Animated.timing(translateX, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.bounce,
        }).start()

	return (
		<View style={styles.imageContainer}>
			<Animated.Image
				source={image_name}
				style={[
					styles.image,
					{
						transform: [
							{
								translateY: translateX,
							},
						],
					},
				]}
			/>
		</View>
	)
}

const width = 300
const borderRadius = width / 2

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		backgroundColor: '#E9F3ED',
		width: 350,
		height: 300,
		borderRadius: borderRadius,
		borderWidth: 1,
        borderColor: '#E9F3ED',
		margin: 'auto',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
})
