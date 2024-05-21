import React, { useEffect } from 'react'
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { useFormikContext } from 'formik'
import theme from '@/Theme'

type NavigationProps = {
	maxSteps: number
	currentIndex: number
	onClickNext: any
	onClickBack: any
    values: any
}

/** Will need to be a child of a Formik component to have access to Formik context */
const Navigation = ({ maxSteps, currentIndex, onClickNext, onClickBack }: NavigationProps) => {
	
    const isFirstStep = currentIndex === 0
	const isLastStep = currentIndex === maxSteps - 1

	// Grab what we need from formik without prop-drilling
	const { validateForm, handleSubmit, isSubmitting, isValid } = useFormikContext<any>()

	// Will run form.validateForm() when the currentIndex prop is changed
	useEffect(() => {
		validateForm()
	}, [currentIndex, validateForm])

	return (
		// <View style={styles.buttonContainer}>
		// 	{!isFirstStep && <Button title="Quay về" onPress={() => onClickBack()} color="#007BFF" />}

		// 	{isLastStep ? (
		// 		isSubmitting ? (
		// 			<ActivityIndicator size="small" color="#007BFF" />
		// 		) : (
		// 			<Button
		// 				title="Submit"
		// 				onPress={() => handleSubmit()}
		// 				disabled={!isValid}
		// 				color={isValid ? '#007BFF' : '#D3D3D3'}
		// 			/>
		// 		)
		// 	) : (
		// 		<Button
		// 			title="Tiếp tục"
		// 			onPress={() => onClickNext()}
		// 			disabled={!isValid}
		// 			color={isValid ? '#007BFF' : '#D3D3D3'}
		// 		/>
		// 	)}
		// </View>
		<View style={styles.buttonContainer}>
			{!isFirstStep && (
				<View style={styles.buttonWrapper}>
					<TouchableOpacity style={styles.button} onPress={() => onClickBack()}>
						<Text style={styles.buttonText}>Quay về</Text>
					</TouchableOpacity>
				</View>
			)}

			{isLastStep ? (
				isSubmitting ? (
					<ActivityIndicator size="small" color="#007BFF" />
				) : (
					<View style={styles.buttonWrapper}>
						<TouchableOpacity
							style={[
								styles.button,
								{ backgroundColor: isValid ? theme.Colors.PRIMARY_LIGHT : '#D3D3D3' },
							]}
							onPress={() => onClickNext()}
							disabled={!isValid}
						>
							<Text style={[styles.buttonText, { color: isValid ? '#FFF' : '#000' }]}>Submit</Text>
						</TouchableOpacity>
					</View>
				)
			) : (
				<View style={styles.buttonWrapper}>
					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: isValid ? theme.Colors.PRIMARY_LIGHT : '#D3D3D3' },
						]}
						onPress={() => onClickNext()}
						disabled={!isValid}
					>
						<Text style={[styles.buttonText, { color: isValid ? '#FFF' : '#000' }]}>Tiếp tục</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}

// const styles = StyleSheet.create({
// 	buttonContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		alignSelf: 'center',
// 		marginTop: 20,
// 		width: '80%',
// 		marginHorizontal: 50,
// 	},
// })

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: 20,
		width: '80%',
	},
	buttonWrapper: {
		marginHorizontal: 10, // Add horizontal margin to space buttons
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
})


export default Navigation
