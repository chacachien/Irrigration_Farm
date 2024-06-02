import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { setLogout } from '@/Store/reducers/auth'
import FarmItem from '@/Components/farmItem'
import AddButton from '@/Components/button/addButton'
import { useGetFarmsQuery } from '@/Services/farm'

import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'


// const farms = [
// 	{
// 		id: '1',
// 		name: 'Trại bưởi Nha Trang',
// 		lastWatered: '2 tiếng trước',
// 		type: 'Tĩnh',
// 		waterLevel: '80%',
// 		icon: require('~/assets/strawberry.png'),
// 	},
// 	{
// 		id: '2',
// 		name: 'Trại dâu Đà Lạt',
// 		lastWatered: '2 tiếng trước',
// 		type: 'Tĩnh',
// 		waterLevel: '70%',
// 		icon: require('~/assets/coconut.png'),
// 	},
// 	{
// 		id: '3',
// 		name: 'Trại nhãn Kontum',
// 		lastWatered: '2 tiếng trước',
// 		type: 'Tĩnh',
// 		waterLevel: '50%',
// 		icon: require('~/assets/strawberry.png'),
// 	},
// 	{
// 		id: '4',
// 		name: 'Trại dừa Bến Tre',
// 		lastWatered: '2 tiếng trước',
// 		type: 'Động',
// 		waterLevel: '90%',
// 		icon: require('~/assets/coconut.png'),
// 	},
// ]

const Farm: React.FC = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { data, isFetching, isLoading, refetch } = useGetFarmsQuery({})
	const [refreshing, setRefreshing] = React.useState(false)

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)
		try {
			await refetch() // Re-fetch the data
			console.log('REFRESHING....')
		} finally {
			setRefreshing(false)
		}
	}, [refetch])
	useFocusEffect(
		useCallback(() => {
			refetch()
		}, [refetch]),
	)

	const handleLogout = () => {
		dispatch(setLogout())
		router.push('login')
	}

	const handleWeatherPress = (farmId: string) => {
		// Handle weather button press
		console.log(`Weather button pressed for farm id: ${farmId}`)
	}
	const handlePress = (id: string) => {
		console.log('Farm id: ', id)
		router.push(`./farm/${id}`)
	}
	const handleAddFarm = () => {
		router.push('./farm/(newFarm)')
	}
	if (isLoading) {
		return <Text>Loading...</Text>
	}


	return (
		<ScrollView
			contentContainerStyle={styles.container}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			{data?.farms?.length === 0 && <Text>Hiện tại Bạn không có nông trại nào? Bấm nút thêm ở góc phải màn hình.</Text>}
			{isFetching ? (
				<Text>Loading...</Text>
			) : (
				// <FlatList
				// 	data={data}
				// 	keyExtractor={(item) => item.id}
				// 	renderItem={({ item }) => (
				// 		<FarmItem
				// 			name={item.name}
				// 			lastWatered={item.lastWatered}
				// 			type={item.type}
				// 			waterLevel={item.waterLevel}
				// 			icon={item.icon}
				// 			onPress={() => handlePress(item.id)}
				// 			onWeatherPress={() => handleWeatherPress(item.id)}
				// 		/>
				// 	)}
				// />
				<View>
					{data?.farms?.map((item: any) => (
						<FarmItem
							key={item.id}
							name={item.name}
							type={item.type}
							icon={item.type}
							onPress={() => handlePress(item.id)}
							onWeatherPress={() => handleWeatherPress(item.id)}
						/>
					))}
				</View>
			)}
			<View style={styles.addButton}>
				<AddButton onPress={() => handleAddFarm()} />
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	addButton: {
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
})

export default Farm
