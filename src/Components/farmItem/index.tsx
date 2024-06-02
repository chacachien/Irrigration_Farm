import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Image from 'react-native-remote-svg'
import Ionicons from '@expo/vector-icons/Ionicons'
import { iconMap } from './iconhandle'
interface FarmItemProps {
	name: string
	type: string
	icon: any
	onPress: any
	onWeatherPress: () => void
}

const FarmItem: React.FC<FarmItemProps> = ({ name, type, icon, onPress, onWeatherPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<View style={styles.iconWrap}>
					{/* <Image style={styles.icon} source={require('../../../assets/icons/coconut.svg')} /> */}
					<Image source={iconMap[icon]} style={styles.icon} />
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.details}>Phân loại: {type}</Text>
				</View>
				<View style={styles.waterContainer}>
					<Text style={{ color: 'grey', fontSize: 15, fontStyle: 'italic' }}>
						{' '}
						<Ionicons name="water-outline" size={16} color={'#2F90FF'} /> 
						{<Text style={{ color: 'black', fontSize: 18, fontStyle: 'normal' }}>39%</Text>}
					</Text>

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
	iconWrap: {
		width: '20%',
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F5F5',
		borderRadius: 10,
	},
	icon: {
		width: 40,
		height: 40

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
