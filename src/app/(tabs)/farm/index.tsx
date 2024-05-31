import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { setLogout } from '@/Store/reducers/auth'
import FarmItem from '@/Components/farmItem'

const farms = [
	{
		id: '1',
		name: 'Trại bưởi Nha Trang',
		lastWatered: '2 tiếng trước',
		type: 'Tĩnh',
		waterLevel: '80%',
		icon: require('~/assets/strawberry.png'),
	},
	{
		id: '2',
		name: 'Trại dâu Đà Lạt',
		lastWatered: '2 tiếng trước',
		type: 'Tĩnh',
		waterLevel: '70%',
		icon: require('~/assets/coconut.png'),
	},
	{
		id: '3',
		name: 'Trại nhãn Kontum',
		lastWatered: '2 tiếng trước',
		type: 'Tĩnh',
		waterLevel: '50%',
		icon: require('~/assets/strawberry.png'),
	},
	{
		id: '4',
		name: 'Trại dừa Bến Tre',
		lastWatered: '2 tiếng trước',
		type: 'Động',
		waterLevel: '90%',
		icon: require('~/assets/coconut.png'),
	},
]

const Farm: React.FC = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(setLogout())
		router.push('login')
	}

	const handleWeatherPress = (farmId: string) => {
		// Handle weather button press
		router.push('./farm/weather')
		console.log(`Weather button pressed for farm id: ${farmId}`)
	}
	const handlePress = (id: string) => {
		console.log("Farm id: ", id)
		router.push(`./farm/${id}`)
	}


	return (
		<View style={styles.container}>
			<FlatList
				data={farms}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<FarmItem
						name={item.name}
						lastWatered={item.lastWatered}
						type={item.type}
						waterLevel={item.waterLevel}
						icon={item.icon}
						onPress={() => handlePress(item.id)} 
						onWeatherPress={() => handleWeatherPress(item.id)}
					/>
				)}

			/>
		</View>
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
})

export default Farm
