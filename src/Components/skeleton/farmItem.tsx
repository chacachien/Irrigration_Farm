import { StyleSheet, View, Animated } from 'react-native'
import React from 'react'
import { LinearGradient } from 'react-native-linear-gradient' // Import the LinearGradient component

const Skeleton = ({ width, height, borderRadius = 4 }: any) => {
	const translateX = new Animated.Value(-width)

	React.useEffect(() => {
		Animated.loop(
			Animated.timing(translateX, {
				toValue: width,
				duration: 1500,
				useNativeDriver: true,
			}),
		).start()
	}, [translateX, width])

	return (
		<View style={[styles.skeleton, { width, height, borderRadius }]}>
			<Animated.View
				style={[
					styles.gradientWrapper,
					{
						transform: [{ translateX }],
						width: width * 2,
					},
				]}
			>
				<LinearGradient
					colors={['#E1E9EE', '#F2F8FC', '#E1E9EE']}
					start={{ x: 0, y: 1 }}
					end={{ x: 1, y: 1 }}
					style={[styles.gradient, { width: width * 2, height }]}
				/>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: '#E1E9EE',
		overflow: 'hidden',
	},
	gradientWrapper: {
		flex: 1,
	},
	gradient: {
		flex: 1,
	},
})

export default Skeleton