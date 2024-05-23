
import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Modal, ActivityIndicator } from 'react-native'
import { getInputProps } from '@/Helper/utils'
import { FormikProps, FormikValues } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

import theme from '@/Theme'
import TextInput from '@/Components/textInput'
import ActivateButton  from '@/Components/button/ActivateButton'


import { scripts } from './sample'
import { increaseFarmStep, setFarmInput } from '@/Store/reducers/farm'

type Props = {
	form: FormikProps<FormikValues>
	name: string
}


const FifthStep = ({ form, name }: Props) => {
	const farm = useSelector((state: any) => state.farm)
    const [modalVisible, setModalVisible] = useState(false)

	const logMovies = async () => {
		console.log('You can make an API call when the modal opens.')
	}
	const dispatch = useDispatch()

	useEffect(() => {
		form.values.name = farm.name
		console.log('form: ', form.values)
	}, [])
    
        const handlePress = () => {
            setModalVisible(true)

            console.log('You can make an API call when the modal opens.')
            // fake wait 2s and 
            setTimeout(() => {
                const script ={
                    scripts: scripts
                }
                dispatch(setFarmInput(script))
                console.log('form: ', form.values)
                setModalVisible(false)
                dispatch(increaseFarmStep())
            }, 2000)
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
