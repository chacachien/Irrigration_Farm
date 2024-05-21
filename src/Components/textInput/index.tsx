import React, { memo } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import  theme  from '@/Theme'

type Props = React.ComponentProps<typeof Input> & { errorText?: string }

const TextInput = ({ errorText, ...props }: Props) => (
	<View style={styles.container}>
		<Input
			style={styles.input}
			selectionColor={theme.Colors.PRIMARY}
			underlineColor="transparent"
			mode="outlined"
			{...props}
            
		/>
		{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
	</View>
)

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginVertical: 12,
	},
	input: {
		backgroundColor: theme.Colors.SURFACE,
	},
	error: {
		fontSize: 14,
		color: theme.Colors.ERROR,
		paddingHorizontal: 4,
		paddingTop: 4,
	},
})

export default memo(TextInput)
