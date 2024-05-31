import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '@/Theme'

interface FarmDetailRowProps {
  label: string;
  value: string;
}
export default function DetailRow({ label, value }: FarmDetailRowProps) {
    return (

    <View style={styles.rowContainer}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
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