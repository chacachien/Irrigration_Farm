import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Image,
} from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DataTable } from 'react-native-paper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {options} from '@/Types/plantation'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
	created_at: Yup.date().required('Ngày trồng là bắt buộc'),
	type: Yup.string().required('Loại cây là bắt buộc'),
	area: Yup.string().required('Diện tích là bắt buộc'),
	address: Yup.string().required('Địa chỉ là bắt buộc'),
	script_source: Yup.object().shape({
		model_name: Yup.string().required('Kịch bản tưới là bắt buộc'),
	}),
	irrigation_instructions: Yup.array().of(
		Yup.object().shape({
			start_time: Yup.string().required('Thời gian bắt đầu là bắt buộc'),
			duration_minutes: Yup.number()
				.required('Thời lượng là bắt buộc')
				.positive('Thời lượng phải lớn hơn 0'),
			water_flow_rate: Yup.number()
				.required('Lượng nước là bắt buộc')
				.positive('Lượng nước phải lớn hơn 0'),
		}),
	),
})

const EditFarmDetailsScreen = () => {
	const router = useRouter()
    const farm = useSelector((state: any) => state.farm)

    console.log('farm: ', farm)
	const formik = useFormik({
		initialValues: {
			plantation: farm.plantation,
			area: farm.area,
			address: farm.address,
			script: farm.accepted_script,
			irrigation_instructions: farm.accepted_script.irrigation_schedule.irrigation_instructions,
		},
		validationSchema,
		onSubmit: (values) => {
			// Handle form submission
			// For example, save the changes and navigate back
			console.log(values)
			router.back()
		},
	})

	const handleInputChange = (value, index, field) => {
		const updatedInstructions = [...formik.values.irrigation_instructions]
		updatedInstructions[index][field] = value
		formik.setFieldValue('irrigation_instructions', updatedInstructions)
	}

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scroll}
				showsVerticalScrollIndicator={false} // Disable vertical scrollbar
			>
				<View style={styles.farmDetailContainer}>
					<TextInput
						style={styles.input}
						value={formik.values.plantation.toString()}
						onChangeText={formik.handleChange('plantation')}
						placeholder="Loại cây"
					/>
					{formik.touched.plantation && formik.errors.plantation ? (
						<Text style={styles.error}>{formik.errors.plantation as string}</Text>
					) : null}

					<TextInput
						style={styles.input}
						value={formik.values.area.toString()}
						onChangeText={formik.handleChange('area')}
						placeholder="Diện tích"
					/>
					{formik.touched.area && formik.errors.area ? (
						<Text style={styles.error}>{formik.errors.area as string}</Text>
					) : null}

					<TextInput
						style={styles.input}
						value={formik.values.address}
						onChangeText={formik.handleChange('address')}
						placeholder="Địa chỉ"
					/>
					{formik.touched.address && formik.errors.address ? (
						<Text style={styles.error}>{formik.errors.address as string}</Text>
					) : null}

					{/* <TextInput
						style={styles.input}
						value={formik.values.script_source.model_name}
						onChangeText={formik.handleChange('script_source.model_name')}
						placeholder="Kịch bản tưới"
					/>
					{formik.touched.script_source && formik.errors.script_source ? (
						<Text style={styles.error}>{formik.errors.script_source.model_name}</Text>
					) : null} */}

					<Text style={styles.footer}>Lịch tưới</Text>
					<DataTable style={styles.dataContainer}>
						<DataTable.Header style={styles.tableHeader}>
							<DataTable.Title>Thời gian</DataTable.Title>
							<DataTable.Title>Thời lượng</DataTable.Title>
							<DataTable.Title>Lượng nước</DataTable.Title>
						</DataTable.Header>
						{formik.values.irrigation_instructions.map((instruction, index) => (
							<DataTable.Row key={index}>
								<DataTable.Cell>
									<TextInput
										style={styles.input}
										value={instruction.start_time.toString()}
										onChangeText={(text) => handleInputChange(text, index, 'start_time')}
									/>
								</DataTable.Cell>
								<DataTable.Cell>
									<TextInput
										style={styles.input}
										value={instruction.duration_minutes.toString()}
										onChangeText={(text) => handleInputChange(text, index, 'duration_minutes')}
										keyboardType="numeric"
									/>
								</DataTable.Cell>
								<DataTable.Cell>
									<TextInput
										style={styles.input}
										value={instruction.water_flow_rate.toString()}
										onChangeText={(text) => handleInputChange(text, index, 'water_flow_rate')}
										keyboardType="numeric"
									/>
								</DataTable.Cell>
							</DataTable.Row>
						))}
					</DataTable>
				</View>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: formik.isValid ? 'green' : '#D3D3D3' }]}
					onPress={() => formik.handleSubmit()}
					disabled={!formik.isValid}
				>
					<Text style={[styles.buttonText, { color: formik.isValid ? '#FFF' : '#000' }]}>Lưu</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scroll: {
		width: '100%',
	},
	imageContainer: {
		backgroundColor: 'green',
	},
	image: {
		width: '100%',
		height: '60%',
	},
	farmDetailContainer: {
		borderRadius: 20,
		padding: 20,
		backgroundColor: '#fff',
	},
	input: {
		borderBottomWidth: 1,
		borderColor: '#ccc',
		marginVertical: 10,
		padding: 5,
	},
	error: {
		color: 'red',
		fontSize: 12,
	},
	dataContainer: {
		width: '100%',
	},
	tableHeader: {
		backgroundColor: '#f5f5f5',
	},
	footer: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		color: 'green',
		padding: 10,
	},
	button: {
		padding: 10,
		borderRadius: 5,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
})

export default EditFarmDetailsScreen
