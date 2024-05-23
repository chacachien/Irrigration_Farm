import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { iconMap } from './iconhandle'
interface FarmItemProps {
	name: string

	type: string

	icon: any
	onPress: any
	onWeatherPress: () => void
}


const FarmItem: React.FC<FarmItemProps> = ({
	name,
	type,
	icon,
	onPress,
	onWeatherPress,
}) => {

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<Image source={iconMap[icon]} style={styles.icon} />
				<View style={styles.infoContainer}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.details}>Phân loại: {type}</Text>
				</View>
				<View style={styles.waterContainer}>

					<TouchableOpacity style={styles.weatherButton} onPress={onWeatherPress}>
						<Text style={styles.weatherButtonText}>Thời tiết</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		marginVertical: 5,
		backgroundColor: '#fff',
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5,
	},
	icon: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	infoContainer: {
		flex: 1,
		marginHorizontal: 10,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	details: {
		color: '#555',
	},
	waterContainer: {
		alignItems: 'center',
	},
	waterLevel: {
		color: '#1E90FF',
		fontWeight: 'bold',
	},
	weatherButton: {
		marginTop: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		backgroundColor: '#BCC6C0',
		borderRadius: 5,
	},
	weatherButtonText: {
		color: '#fff',
	},
})

export default FarmItem
