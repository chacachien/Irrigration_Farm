// this is a progress bar component with react native

import React from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '@/Theme'

interface ProgressBarProps {
    progress: number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
    )
}

const styles = StyleSheet.create({
	progressBar: {
		backgroundColor: theme.Colors.TRANSPARENT,
		height: 10,
		borderRadius: 5,
		overflow: 'hidden',
	},
	progress: {
		backgroundColor: theme.Colors.PRIMARY_LIGHT,
		height: '100%',
	},
})

export default ProgressBar