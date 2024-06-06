// UI
import React, { memo, useEffect, useState } from 'react'
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import theme from '@/Theme'
import { DataTable } from 'react-native-paper'

// DATA
import { useSelector, useDispatch } from 'react-redux'
import { IrrigationSchedule, Script } from '@/Types/script'
import { FormikProps, FormikValues } from 'formik'
import { increaseFarmStep, setAcceptedScript } from '@/Store/reducers'
import { getInputProps } from '@/Helper/utils'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}

const SixthStep = ({ form, name }: Props) => {
	name = 'sixthStep'
	const scripts = useSelector((state: any) => state.farm.scripts)
	const [selectedScript, setSelectedScript] = useState<any | null>(null)
	const [isEditable, setIsEditable] = useState(false)
	const [editedData, setEditedData] = useState<any>(null)
	const dispatch = useDispatch()

	// const renderItem = ({ item }: any) => (
	// 	<TouchableOpacity
	// 		onPress={() => {
	// 			setSelectedScript(item)
	// 			//setEditedData(item.irrigation_schedule.irrigation_instructions)
	// 			dispatch(setAcceptedScript(item))
	// 			dispatch(increaseFarmStep())
	// 		}}
	// 	>
	// 		<View style={styles.itemContainer}>
	// 			<Text style={styles.itemText}>Model Name: {item.script_source.model_name}</Text>
	// 			<Text style={styles.itemText}>Crop Type: {item.irrigation_schedule.crop_type}</Text>
	// 			<Text style={styles.itemText}>Date: {item.irrigation_schedule.date}</Text>
	// 		</View>
	// 	</TouchableOpacity>
	// )
	console.log('scripts:', scripts)
	const renderItem = ({ item }: any) => (
		<TouchableOpacity
			onPress={() => {
				setSelectedScript(item)
				//setEditedData(item.irrigation_schedule.irrigation_instructions)
				dispatch(setAcceptedScript(item))
				dispatch(increaseFarmStep())
			}}
		>
			<View style={styles.itemContainer}>
				<Text style={styles.itemText}>Tên mô hình: {item.name}</Text>
				<Text style={styles.itemText}>Nhà cung cấp: {item.provider}</Text>
				<Text style={styles.itemText}>Ngày tạo: {item.updatedAt}</Text>
			</View>
		</TouchableOpacity>
	)


	// OLD VERSION
	// const handleEditToggle = () => {
	// 	setIsEditable(!isEditable)
	// }

	// const handleInputChange = (value: string, rowIndex: number, field: string) => {
	// 	console.log(`value: ${value}, rowIndex: ${rowIndex}, field: ${field}`)
	// 	let newData = [...editedData]
	// 	newData[rowIndex] = { ...newData[rowIndex], [field]: value }
	// 	setEditedData(newData)
	// 	form.setFieldValue('irrigation_instructions', newData)
	// }
	// const handleSubmit = () => {
	// 	const updateIrrigationSchedule = {
	// 		...selectedScript?.irrigation_schedule,
	// 		irrigation_instructions: editedData,
	// 	} as IrrigationSchedule
	// 	console.log('updateIrrigationSchedule:', updateIrrigationSchedule)

	// 	console.log('selectedScript:', selectedScript)
	// 	const updatedScript = {
	// 		script_source: selectedScript?.script_source || {
	// 			source_category: '',
	// 			source_type: '',
	// 			model_name: '',
	// 			training_data: '',
	// 			created_by: '',
	// 		},
	// 		irrigation_schedule: updateIrrigationSchedule,
	// 	}

	// 	// Update the selectedScript state with the new Script object
	// 	setSelectedScript(updatedScript)
	// 	dispatch(setAcceptedScript(updatedScript))
	// 	console.log('updatedScript:', selectedScript)
	// 	dispatch(increaseFarmStep())
	// }
	// useEffect(() => {
	// 	// set value for formik
	// 	form.setFieldValue(
	// 		'irrigation_instructions',
	// 		scripts[0].irrigation_schedule.irrigation_instructions,
	// 	)
	// 	console.log('form selected script:', form)
	// }, [selectedScript])


	// new version


	const { isValid, values, setFieldValue } = form
	return (
		<View style={styles.container}>
			<FlatList
				data={scripts}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
			/>
			{/* {selectedScript && (
				<Modal
					animationType="slide"
					transparent={true}
					visible={true}
					onRequestClose={() => setSelectedScript(null)}
				>
					<View style={styles.modalView}>
						<View style={styles.modalContent}>
							<Text style={styles.modalHeader}>Kịch bản tưới</Text>
							<Text style={styles.modalSubHeader}>{selectedScript.script_source.model_name}</Text>
							<DataTable style={styles.dataContainer}>
								<DataTable.Header style={styles.tableHeader}>
									<DataTable.Title>Thời gian</DataTable.Title>
									<DataTable.Title>Thời lượng</DataTable.Title>
									<DataTable.Title>Lượng nước</DataTable.Title>
								</DataTable.Header>
								{editedData.map((instruction: any, index: any) => (
									<DataTable.Row key={index}>
										<DataTable.Cell>
											{isEditable ? (
												<TextInput
													{...getInputProps('time', form)}
													style={styles.input}
													value={instruction.start_time.toString()}
													onChangeText={(text) => handleInputChange(text, index, 'start_time')}
												/>
											) : (
												<Text>{instruction.start_time}</Text>
											)}
										</DataTable.Cell>
										<DataTable.Cell>
											{isEditable ? (
												<TextInput
													{...getInputProps('duration', form)}
													style={styles.input}
													value={instruction.duration_minutes.toString()}
													onChangeText={(text) =>
														handleInputChange(text, index, 'duration_minutes')
													}
													keyboardType="numeric"
												/>
											) : (
												<Text>{instruction.duration_minutes}</Text>
											)}
										</DataTable.Cell>
										<DataTable.Cell>
											{isEditable ? (
												<TextInput
													{...getInputProps('water', form)}
													style={styles.input}
													value={instruction.water_flow_rate.toString()}
													onChangeText={(text) => handleInputChange(text, index, 'water_flow_rate')}
													keyboardType="numeric"
												/>
											) : (
												<Text>{instruction.water_flow_rate}</Text>
											)}
										</DataTable.Cell>
									</DataTable.Row>
								))}
							</DataTable>

							{/* <Button title={isEditable ? 'Xác nhận' : 'Chỉnh sửa'} onPress={handleEditToggle} /> */}

			{/* <TouchableOpacity
								style={[
									styles.button,
									{ backgroundColor: isValid ? theme.Colors.PRIMARY_LIGHT : '#D3D3D3' },
								]}
								onPress={() => handleEditToggle()}
								disabled={!isValid}
							>
								<Text style={[styles.buttonText, { color: isValid ? '#FFF' : '#000' }]}>
									{isEditable ? 'Xác nhận' : 'Chỉnh sửa'}
								</Text>
							</TouchableOpacity>
							<View style={styles.closeButton}>
								<TouchableOpacity
									onPress={() => setSelectedScript(null)}
									style={styles.closeButton}
								>
									<Text style={styles.closeButtonText}>Hủy bỏ</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => handleSubmit()} style={styles.closeButton}>
									<Text style={styles.closeButtonText}>Chọn</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>  */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#f5f5f5',
	},

	itemContainer: {
		backgroundColor: '#fff',
		padding: 16,
		marginVertical: 8,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
	},
	itemText: {
		fontSize: 16,
		color: '#333',
		marginBottom: 4,
	},
	modalView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 20,
	},
	modalContent: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
		alignItems: 'flex-start',
		width: '100%',
	},
	modalHeader: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	modalSubHeader: {
		fontSize: 18,
		marginBottom: 12,
	},
	dataContainer: {
		width: '100%',
	},

	tableHeader: {
		backgroundColor: '#DCDCDC',
		fontSize: theme.FontSize.SMALL,
	},
	input: {
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderColor: '#ddd',
		padding: 5,
	},
	closeButton: {
		marginTop: 20,
		alignSelf: 'center',
		flexDirection: 'row',
		marginHorizontal: 20,
	},
	closeButtonText: {
		fontSize: 18,
		color: '#007BFF',
		textDecorationLine: 'underline',
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

export default memo(SixthStep)
