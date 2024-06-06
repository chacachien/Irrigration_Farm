// UI
import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import theme from '@/Theme'
import ActivateButton from '@/Components/button/activateButton'
import DataTableIrrigation from '@/Components/dataTable'
import DetailRow from '@/Components/detailRow'
import DeleteButton from '@/Components/button/deleteButton'

// DATA
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { useGetFarmQuery } from '@/Services/farm'
import { formatDate } from '@/Helper/utils'
import { options } from '@/Types/plantation'
import { setFarmInput } from '@/Store/reducers'
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useGetScenariosQuery } from '@/Services/scenario'
import { useDeleteFarmMutation } from '@/Services/farm'
import { CommonActions } from '@react-navigation/native'

const FarmDetail: React.FC = () => {
	const { id } = useLocalSearchParams()
	const { data: farmData, isFetching, isLoading, refetch } = useGetFarmQuery(id?.toString())
	const {
		data: scenariosData,
		isFetching: scenarioFetching,
		isLoading: scenarioLoading,
	} = useGetScenariosQuery({})
	const [deleteFarm] = useDeleteFarmMutation()
	console.log('Scenarios: ', scenariosData)
	const dispatch = useDispatch()
	useFocusEffect(
		useCallback(() => {
			refetch()
		}, [refetch]),
	)
	const router = useRouter()

	if (isFetching || isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}

	if (!farmData) {
		return (
			<View>
				<Text>Not found</Text>
			</View>
		)
	}
	console.log('Farm detail: ', farmData)
	// const handleEdit = (id: string) => {
	// 	console.log('Edit farm with id: ', id)

	// 	dispatch(
	// 		setFarmInput({
	// 			name: farmDetail.name,
	// 			address: farmDetail.address,
	// 			area: farmDetail.area,
	// 			plantation: farmDetail.type,
	// 			accepted_script: script,
	// 			edit: true,
	// 			id: id,
	// 		}),
	// 	)
	// 	router.push({
	// 		pathname: './(newFarm)',
	// 	})
	// }
	const handleEdit = (id: string) => {

		console.log('Edit farm with id: ', id)

		dispatch(
			setFarmInput({
				name: farmData.name,
				des: farmData.description,
				address: farmData.address,
				plantation: farmData.cultivar,
				accepted_script: farmData.model,
				edit: true,
				id: id,
			}),
		)
		router.replace({
			pathname: '../(newFarm)',
		})
	}

	const handleDelete = async (id: string) => {
		console.log('Delete farm with id: ', id)

		//const result = await deleteFarm(id).unwrap()
		// console.log('Delete result: ', result)
		router.back()
	}
	const scriptOfFarm = scenariosData?.filter((script: any) => script.farm?.id == farmData.id)

	console.log('Script of farm: ', scriptOfFarm)
	return (
		<>
			<Stack.Screen
				// Add the correct type definition for the headerLeft prop
				options={{
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<FontAwesome name="angle-left" size={30} color="#000" />
						</TouchableOpacity>
					),
				}}
			/>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={require('~/assets/mango.png')} style={styles.image} />
				</View>
				<View style={styles.farmDetailContainer}>
					<View style={styles.infoTitle}>
						<Text style={styles.name}>{farmData.name}</Text>
					</View>
					<ScrollView
						style={styles.scroll}
						showsVerticalScrollIndicator={false} // Disable vertical scrollbar
					>
						<View style={styles.infoContainer}>
							{/* <Text style={styles.details}>Ngày trồng: {formatDate(farmDetail.created_at)}</Text>

						<Text style={styles.details}>
							Loại cây: {options.find((option) => option.value == farmDetail.type)?.label}
						</Text>
						<Text style={styles.details}>Diện tích: {farmDetail.area}</Text>
						<Text style={styles.details}>Địa chỉ: {farmDetail.address}</Text>
						<Text style={styles.details}>Kịch bản tưới: {script.script_source.model_name}</Text> */}
							<DetailRow label="Ngày trồng" value={formatDate(farmData.createdAt)} />
							<DetailRow label="Loại cây" value={farmData?.cultivar.name} />
							<DetailRow label="Địa chỉ" value={farmData.address} />
							<DetailRow label="Mô tả" value={farmData.description} />
							<DetailRow label="Kịch bản tưới" value={farmData.model.name} />
						</View>
						<Text style={styles.footer}>Lịch tưới</Text>
						{scriptOfFarm && scriptOfFarm.length > 0 && (
							<DataTableIrrigation script={scriptOfFarm} />
						)}
						<View style={styles.buttonContainer}>
							<ActivateButton text="Chỉnh sửa" onPress={() => handleEdit(farmData.id)} />
						</View>
						<View style={styles.buttonContainer}>
							<DeleteButton text="Xoá nông trại" onPress={() => handleDelete(farmData.id)} />
						</View>
					</ScrollView>
				</View>
			</View>
		</>
	)
}
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
function dispatch(arg0: any) {
	throw new Error('Function not implemented.')
}
