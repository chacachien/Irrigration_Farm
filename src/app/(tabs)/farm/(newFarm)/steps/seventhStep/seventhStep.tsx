// UI
import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DetailRow from '@/Components/detailRow'
import theme from '@/Theme'
import { DataTable } from 'react-native-paper'

// DATA
import { useSelector, useDispatch } from 'react-redux'
import { options } from '@/Types/plantation'
import { getInputProps } from '@/Helper/utils'

type Props = {
    form: any
    name: string
}
const SeventhStep = ({ form, name }: Props) => {
    const farm = useSelector((state: any) => state.farm)
    // const script = farm.accepted_script
	console.log('farm: ', farm)

    return (
			<View style={styles.container}>
				<DetailRow label="Tên nông trại" value={farm.name} />
				<DetailRow label="Địa chỉ" value={farm.address} />
				<DetailRow label="Mô tả" value={farm.des} />
				<DetailRow
					label="Loại cây trồng"
					//value={options.find((option) => option.value === farm.plantation)?.name as string}
					value = {farm.plantation.name}
				/>
				<DetailRow label="Mô hình tưới" value={farm.accepted_script.name} />
				{/* <DetailRow label="Kịch bản tưới" value={script.script_source.model_name} />
				<DetailRow label="Ngày tưới" value={script.irrigation_schedule.date} /> */}
				{/* <Text style={styles.label}>Hướng dẫn tưới:</Text>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Thời gian </DataTable.Title>
						<DataTable.Title>Thời lượng</DataTable.Title>
						<DataTable.Title>Lượng nước</DataTable.Title>
					</DataTable.Header>

					{script.irrigation_schedule.irrigation_instructions.map((instruction: any, index: any) => (
						<DataTable.Row key={index}>
							<DataTable.Cell {...getInputProps('time', form)}>{instruction.start_time}</DataTable.Cell>
							<DataTable.Cell {...getInputProps('duration', form)}>{instruction.duration_minutes}</DataTable.Cell>
							<DataTable.Cell {...getInputProps('water', form)}>{instruction.water_flow_rate}</DataTable.Cell>
						</DataTable.Row>
					))}
				</DataTable> */}
			</View>
		)
};



const styles = StyleSheet.create({
	container: {
		padding: 20,
        backgroundColor: theme.Colors.BACKGROUND_TEXT,

	},
	rowContainer: {
		flexDirection: 'row',
		marginBottom: 8,
	},
	label: {
		marginRight: 5,
		fontSize: theme.FontSize.SMALL,
	},
	value: {
		flex: 1,
		fontWeight: 'bold',
        color: theme.Colors.TEXT_BUTTON,
        fontSize: theme.FontSize.SMALL,
	},
    
})

export default memo(SeventhStep)