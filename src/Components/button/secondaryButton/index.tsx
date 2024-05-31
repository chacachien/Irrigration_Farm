// create a secondary button with border is green, background is white, text color is green 

import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import theme from '@/Theme'

interface CustomButtonProps {
    title: string
    onPress: () => void
}

const SecondaryButton = ({ title, onPress }: CustomButtonProps) => (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    secondaryButton: {
        backgroundColor: theme.Colors.WHITE,
        borderColor: theme.Colors.PRIMARY_LIGHT,
        borderWidth: 1,
        marginTop: 12,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: theme.Colors.PRIMARY_LIGHT,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default SecondaryButton