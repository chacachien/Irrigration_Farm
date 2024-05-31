// UI
import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import theme from '@/Theme'
import ActivateButton from '@/Components/button/activateButton'
import DataTableIrrigation from '@/Components/dataTable'
import DetailRow from '@/Components/detailRow'


// DATA
import { router, useLocalSearchParams } from 'expo-router'
import { useGetFarmQuery } from '@/Services/farm'
import { formatDate } from '@/Helper/utils'
import { options } from '@/Types/plantation'
import { setFarmInput } from '@/Store/reducers'
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'




const FarmDetail: React.FC = () => {
	const { id } = useLocalSearchParams()
	const { data, isFetching, isLoading, refetch } = useGetFarmQuery({ id: id?.toString() })
	const dispatch = useDispatch()
	useFocusEffect(
			useCallback(() => {
				refetch()
			}, [refetch]),
		)


	if (isFetching || isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}
	const farmDetail = data?.farms[0]

	const script = JSON.parse(farmDetail?.script, (key, value) => {
		return value
	})

	if (!farmDetail) {
		return (
			<View>
				<Text>Not found</Text>
			</View>
		)
	}
	console.log('Farm detail: ', farmDetail)
	const handleEdit = (id: string) => {
		console.log('Edit farm with id: ', id)
		
		dispatch(
			setFarmInput({
				name: farmDetail.name,
				address: farmDetail.address,
				area: farmDetail.area,
				plantation: farmDetail.type,
				accepted_script: script,
				edit: true,
				id: id,
			}),
		)
		router.push({
			pathname: './(newFarm)',
		})
	}

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
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
						{/* <Text style={styles.details}>Ngày trồng: {formatDate(farmDetail.created_at)}</Text>

						<Text style={styles.details}>
							Loại cây: {options.find((option) => option.value == farmDetail.type)?.label}
						</Text>
						<Text style={styles.details}>Diện tích: {farmDetail.area}</Text>
						<Text style={styles.details}>Địa chỉ: {farmDetail.address}</Text>
						<Text style={styles.details}>Kịch bản tưới: {script.script_source.model_name}</Text> */}
						<DetailRow label="Ngày trồng" value={formatDate(farmDetail.created_at)} />
						<DetailRow
							label="Loại cây"
							value={options.find((option) => option.value == farmDetail.type)?.label as string}
						/>
						<DetailRow label="Diện tích" value={farmDetail.area} />
						<DetailRow label="Địa chỉ" value={farmDetail.address} />
						<DetailRow label="Kịch bản tưới" value={script.script_source.model_name} />

					</View>
					<Text style={styles.footer}>Lịch tưới</Text>
					<DataTableIrrigation script={script.irrigation_schedule.irrigation_instructions} />
					<View style={styles.buttonContainer}>
						<ActivateButton
							text="Chỉnh sửa"
							onPress={() => handleEdit(farmDetail.id)}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
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

