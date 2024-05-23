//get the dynamic id of farm

import { useLocalSearchParams } from 'expo-router'
// FarmDetail.tsx
import React from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import  theme from '@/Theme'
import ActivateButton from '@/Components/button/ActivateButton'
import { useGetFarmQuery } from '@/Services/farm'
import { formatDate } from '@/Helper/utils'
import {options } from '@/Types/plantation'
import DataTableIrrigation from '@/Components/dataTable'


type RootStackParamList = {
	FarmDetail: {
		name: string
		plantingDate: string
		type: string
		area: string
		address: string
		irrigationPlan: string
	}
}

type FarmDetailRouteProp = RouteProp<RootStackParamList, 'FarmDetail'>

const FarmDetail: React.FC = () => {
	const { id } = useLocalSearchParams()

	const { data, isFetching, isLoading, refetch } = useGetFarmQuery({ id: id?.toString() })

	if (isFetching || isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}
	const farmDetail = data?.farms[0]

	console.log('farmDetail: ', farmDetail)
	// convert script from string to json
const script = JSON.parse(farmDetail?.script, (key, value) => {
	// Check if the current key is 'irrigation_instructions'
	if (key === 'irrigation_instructions') {
		// Parse each instruction object
		console.log('value: ', value)
	}
	return value
})
	console.log('new script: ', script.irrigation_schedule.irrigation_instructions)
	const irrigationSchedule = script.irrigation_schedule.irrigation_instructions
	// const farmDetail = {
	// 	name: 'Nông trại 1',
	// 	plantingDate: '01/01/2021',
	// 	type: 'Mango',
	// 	area: '1000 m2',
	// 	address: '123 Đường ABC, Quận XYZ, TP HCM',
	// 	irrigationPlan: 'Kịch bản tưới 1',
	// }
	if (!farmDetail) {
		return (
			<View>
				<Text>Not found</Text>
			</View>
		)
	}
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				{/* Replace with actual image component */}
				<Image source={require('~/assets/mango.png')} style={styles.image} />
			</View>
			<View style={styles.farmDetailContainer}>
				<View style={styles.infoTitle}>
					<Text style={styles.name}>{farmDetail.name}</Text>
				</View>
				<ScrollView
					style={styles.scroll}
					showsVerticalScrollIndicator={false} // Disable vertical scrollbar
				>
					<View style={styles.infoContainer}>
						<Text style={styles.details}>Ngày trồng: {formatDate(farmDetail.created_at)}</Text>

						<Text style={styles.details}>
							Loại cây: {options.find((option) => option.value == farmDetail.type)?.label}
						</Text>
						<Text style={styles.details}>Diện tích: {farmDetail.area}</Text>
						<Text style={styles.details}>Địa chỉ: {farmDetail.address}</Text>
						<Text style={styles.details}>Kịch bản tưới: {script.script_source.model_name}</Text>
					</View>
					<View style={styles.buttonContainer}>
						<ActivateButton
							text="Tìm kiếm kịch bản tưới mới"
							onPress={() => {
								/* Handle search irrigation plan */
							}}
						/>
					</View>
					<Text style={styles.footer}>Lịch tưới</Text>
					<DataTableIrrigation script={script.irrigation_schedule.irrigation_instructions} />
				</ScrollView>
			</View>
		</View>
	)
}


// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 	},
// 	imageContainer: {
// 		// Adjust as needed to match the UI
// 		backgroundColor: 'green', // Example color
// 	},
// 	image: {
// 		width: '100%',
// 		height: '60%', // Adjust as needed
// 	},
// 	farmDetailContainer: {
// 		borderRadius: 20,
// 		position: 'absolute',
// 		top: '32%',
// 		backgroundColor: '#ffffff',
// 		width: '100%',
// 	},
// 	infoTitle: {
// 		padding: 10,
// 		margin: 10,
//         paddingBottom: 0,
//         marginBottom: 0,
// 	},
// 	name: {
// 		fontSize: theme.FontSize.LARGE,
// 		fontWeight: 'bold',
// 	},
// 	infoContainer: {
// 		backgroundColor: theme.Colors.BACKGROUND_TEXT,
//         borderRadius: 20,
//         padding: 20,
//         margin: 15
// 	},

// 	details: {
// 		fontSize: theme.FontSize.SMALL,
//         marginBottom: 8,
// 	},
// 	buttonContainer: {
// 		padding: 10,
// 	},
// 	footer: {
// 		textAlign: 'center',
// 		fontSize: 18,
// 		fontWeight: 'bold',
// 		color: 'green', // Example color
// 		padding: 10,
// 	},
// })
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	imageContainer: {
		backgroundColor: 'green', // Example color
		height: '27%',
	},
	image: {
		width: '100%',

	},
	scroll: {
		// diable the scroll bar
		overflow: 'hidden',
	},
	farmDetailContainer: {
		flex: 1,
		borderRadius: 20,
		backgroundColor: theme.Colors.WHITE,
		marginTop: 20, // Adjust as needed
		padding: 20,
	},
	infoTitle: {
		padding: 10,
		marginBottom: 10,
	},
	name: {
		fontSize: theme.FontSize.LARGE,
		fontWeight: 'bold',
	},
	infoContainer: {
		backgroundColor: theme.Colors.BACKGROUND_TEXT,
		borderRadius: 20,
		padding: 20,
		marginBottom: 15,
	},
	details: {
		fontSize: theme.FontSize.SMALL,
		marginBottom: 8,
	},
	buttonContainer: {
		padding: 10,
	},
	footer: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		color: 'green', // Example color
		padding: 10,
	},
})


export default FarmDetail
