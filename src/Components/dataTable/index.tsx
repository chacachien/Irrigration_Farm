
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper'

export default function DataTableIrrigation(script: any) {
    console.log('list script: ', script)
  return (
		<View>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Thời gian </DataTable.Title>
					<DataTable.Title>Thời lượng</DataTable.Title>
					<DataTable.Title>Lượng nước</DataTable.Title>
				</DataTable.Header>

				{script.script?.map((instruction: any, index: any) => (
					<DataTable.Row key={index}>
						<DataTable.Cell>{instruction.start_time}</DataTable.Cell>
						<DataTable.Cell>{instruction.duration_minutes}</DataTable.Cell>
						<DataTable.Cell>{instruction.water_flow_rate}</DataTable.Cell>
					</DataTable.Row>
				))}
			</DataTable>
		</View>
	)
}

const styles = StyleSheet.create({})