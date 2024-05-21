import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import theme from '@/Theme'

interface CustomButtonProps {
	title: string
	onPress: () => void
}

export default function TextButton({title, onPress}: CustomButtonProps) {
  return (

    <TouchableOpacity onPress={onPress}>
        <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>


  )
}

const styles = StyleSheet.create({

	label: {
    //in đậm chữ 

    fontSize: theme.FontSize.REGULAR,
		color: theme.Colors.TEXT_BUTTON,
	},

})