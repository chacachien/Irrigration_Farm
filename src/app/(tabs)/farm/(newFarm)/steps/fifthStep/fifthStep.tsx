// ui
import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Modal, ActivityIndicator } from 'react-native'
import ActivateButton from '@/Components/button/activateButton'
import theme from '@/Theme'

//data
import { FormikProps, FormikValues } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { increaseFarmStep, setFarmInput } from '@/Store/reducers/farm'
import { useGetScriptsQuery } from '@/Services/script'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}

const FifthStep = ({ form, name }: Props) => {
	const farm = useSelector((state: any) => state.farm)
	const [modalVisible, setModalVisible] = useState(false)
	const { data, isFetching, isLoading } = useGetScriptsQuery({})
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	form.values.scripts =
	// 	console.log('form: ', form.values)
	// }, [])
	useEffect(() => {
		if (farm?.edit) {
			console.log('editfarm: ', farm)
			form.values.scripts = [farm?.accepted_script]
		}
	}, [])
	const handlePress = () => {
		setModalVisible(true)
		// fake wait 2s and

		console.log('data: ', data)

		dispatch(setFarmInput(data))
		console.log('form: ', form.values)
		setModalVisible(false)
		dispatch(increaseFarmStep())
	}

	return (
		<View style={styles.container}>
			<ActivateButton text="Tìm mô hình tưới" onPress={() => handlePress()} />
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalView}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 12,
	},
	modalView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.Colors.TRANSPARENT,
	},
})

export default memo(FifthStep)
