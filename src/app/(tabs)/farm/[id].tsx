//get the dynamic id of farm

import { useLocalSearchParams } from 'expo-router'


// FarmDetail.tsx
import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import  theme from '@/Theme'
import ActivateButton from '@/Components/button/ActivateButton'
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

	const route = useRoute<FarmDetailRouteProp>()

	const { name, plantingDate, type, area, address, irrigationPlan } = route.params

	const farmDetail = {
		name: 'Nông trại 1',
		plantingDate: '01/01/2021',
		type: 'Mango',
		area: '1000 m2',
		address: '123 Đường ABC, Quận XYZ, TP HCM',
		irrigationPlan: 'Kịch bản tưới 1',
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
			    <View style={styles.infoContainer}>
                    <Text style={styles.details}>Ngày trồng: {farmDetail['plantingDate']}</Text>
                    <Text style={styles.details}>Loại cây: {farmDetail.type}</Text>
                    <Text style={styles.details}>Diện tích: {farmDetail.area}</Text>
                    <Text style={styles.details}>Địa chỉ: {farmDetail.address}</Text>
                    <Text style={styles.details}>Kịch bản tưới: {farmDetail.irrigationPlan}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <ActivateButton text="Tìm kiếm kịch bản tưới" onPress={() => {
                        /* Handle search irrigation plan */
                    }} />
                </View>
                <Text style={styles.footer}>Lịch tưới</Text>
            </View>
		</View>
	)
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#F5F5F5',
// 	},
// 	header: {
// 		fontSize: 18,
// 		fontWeight: 'bold',
// 		textAlign: 'center',
// 		marginVertical: 10,
// 	},
// 	imageContainer: {

// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	image: {
// 		width: '100%',

// 		resizeMode: 'contain',
// 	},
// 	infoContainer: {
// 		backgroundColor: '#f0f4f3',
// 		padding: 20,
// 		borderRadius: 10,
// 		margin: 20,
// 	},
// 	name: {
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		marginBottom: 10,
// 		textAlign: 'center',
// 	},
// 	details: {
// 		fontSize: 16,
// 		marginBottom: 5,
// 	},
// 	buttonContainer: {
// 		backgroundColor: '#3B7D3B',
// 		borderRadius: 5,
// 		marginHorizontal: 20,
// 		marginVertical: 10,
// 	},
// 	buttonText: {
// 		color: '#fff',
// 		fontSize: 16,
// 		textAlign: 'center',
// 		paddingVertical: 10,
// 	},
// 	footer: {
// 		fontSize: 16,
// 		textAlign: 'center',
// 		marginVertical: 10,
// 	},
// })
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	imageContainer: {
		// Adjust as needed to match the UI
		backgroundColor: 'green', // Example color
	},
	image: {
		width: '100%',
		height: '60%', // Adjust as needed
	},
	farmDetailContainer: {
		borderRadius: 20,
		position: 'absolute',
		top: '32%',
		backgroundColor: '#ffffff',
		width: '100%',
	},
	infoTitle: {
		padding: 10,
		margin: 10,
        paddingBottom: 0,
        marginBottom: 0,
	},
	name: {
		fontSize: theme.FontSize.LARGE,
		fontWeight: 'bold',
	},
	infoContainer: {
		backgroundColor: theme.Colors.BACKGROUND_TEXT,
        borderRadius: 20,
        padding: 20,
        margin: 15
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
