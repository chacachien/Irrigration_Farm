
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper'

// export default function DataTableIrrigation(script: any) {
//     console.log('list script: ', script)
//   return (
// 		<View>
// 			<DataTable>
// 				<DataTable.Header>
// 					<DataTable.Title>Thời gian </DataTable.Title>
// 					<DataTable.Title>Thời lượng</DataTable.Title>
// 					<DataTable.Title>Lượng nước</DataTable.Title>
// 				</DataTable.Header>

// 				{script.script?.map((instruction: any, index: any) => (
// 					<DataTable.Row key={index}>
// 						<DataTable.Cell>{instruction.time}</DataTable.Cell>
// 						<DataTable.Cell>{instruction.duration}</DataTable.Cell>
// 						<DataTable.Cell>{instruction.amount}</DataTable.Cell>
// 					</DataTable.Row>
// 				))}
// 			</DataTable>
// 		</View>
// 	)
// }
export default function DataTableIrrigation({ script }: any) {
	console.log('list script: ', script)

	const formatDateTime = (datetime: string) => {
		const [date, time] = datetime.split('T')
		const formattedTime = time.split('.')[0] // Remove the milliseconds part
		console.log('formattedTime: ', formattedTime)
		return { date, time: formattedTime }
	}

	return (
		<View>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Thời gian</DataTable.Title>
					<DataTable.Title>Thời lượng</DataTable.Title>
					<DataTable.Title>Lượng nước</DataTable.Title>
				</DataTable.Header>

				{script.map((instruction: any, index: any) => {
					const { date, time } = formatDateTime(instruction.time)
					return (
						<DataTable.Row key={index}>
							<DataTable.Cell>
								<View>
									<Text>{date}</Text>
									<Text>{time}</Text>
								</View>
							</DataTable.Cell>
							<DataTable.Cell>{instruction.duration}</DataTable.Cell>
							<DataTable.Cell>{instruction.amount}</DataTable.Cell>
						</DataTable.Row>
					)
				})}
			</DataTable>
		</View>
	)
}

const styles = StyleSheet.create({})