// render the whole infomation of 7 step use infor from redux

import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import theme from '@/Theme'
import { options } from '@/Types/plantation'
import { DataTable } from 'react-native-paper'

type Props = {
    form: any
    name: string
}


// export type ScriptSource = {
// 	source_category: string
// 	source_type: string
// 	model_name: string
// 	training_data: string
// 	created_by: string
// }

// export type IrrigationInstruction = {
// 	start_time: string
// 	end_time: string
// 	duration_minutes: number
// 	water_flow_rate: number
// }

// export type IrrigationSchedule = {
// 	date: string
// 	crop_type: string
// 	irrigation_instructions: IrrigationInstruction[]
// }

// export type Script = {
// 	script_source: ScriptSource
// 	irrigation_schedule: IrrigationSchedule
// }


// farm information like this, render the whole infomation of 7 step use infor from redux
// export interface Farm {
// 	name: string
// 	address: string
// 	area: number
// 	plantation: string
// 	scripts: Script[]
// 	accepted_script: Script
// 	step: number
// }


const SeventhStep = ({ form, name }: Props) => {
    const farm = useSelector((state: any) => state.farm)
    const dispatch = useDispatch()
    const script = farm.accepted_script

    useEffect(() => {
        console.log('farm: ', farm)
        form.resetForm()
    }, [])
    return (
			<View style={styles.container}>
				<FarmDetailRow label="Tên nông trại" value={farm.name} />
				<FarmDetailRow label="Địa chỉ" value={farm.address} />
				<FarmDetailRow label="Diện tích" value={farm.area.toString()} />
				<FarmDetailRow
					label="Loại cây trồng"
					value={options.find((option) => option.value === farm.plantation)?.label as string}
				/>
				<FarmDetailRow label="Kịch bản tưới" value={script.script_source.model_name} />
				<FarmDetailRow label="Ngày tưới" value={script.irrigation_schedule.date} />
				<FarmDetailRow label="Loại cây" value={script.irrigation_schedule.crop_type} />
				<Text style={styles.label}>Hướng dẫn tưới:</Text>
				<DataTable>
					<DataTable.Header>
						<DataTable.Title>Thời gian </DataTable.Title>

						<DataTable.Title>Thời lượng</DataTable.Title>
						<DataTable.Title>Lượng nước</DataTable.Title>
					</DataTable.Header>

					{script.irrigation_schedule.irrigation_instructions.map((instruction, index) => (
						<DataTable.Row key={index}>
							<DataTable.Cell>{instruction.start_time}</DataTable.Cell>
							<DataTable.Cell>{instruction.duration_minutes}</DataTable.Cell>
							<DataTable.Cell>{instruction.water_flow_rate}</DataTable.Cell>
						</DataTable.Row>
					))}
				</DataTable>
			</View>
		)
};

interface FarmDetailRowProps {
  label: string;
  value: string;
}

const FarmDetailRow: React.FC<FarmDetailRowProps> = ({ label, value }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
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