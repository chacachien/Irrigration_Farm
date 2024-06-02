import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInput from '@/Components/textInput'
import PrimaryButton from '@/Components/button/primaryButton'
import { router } from 'expo-router'
import TextButton from '@/Components/button/textButton'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'



const Help: React.FC = () => {
    return (
        		<>
			<Stack.Screen
				// Add the correct type definition for the headerLeft prop
				options={{
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<FontAwesome name="angle-left" size={30} color="#000" />
						</TouchableOpacity>
					),
				}}
			/>
        <View style={{ paddingHorizontal: '6%', paddingTop: '7%' }}>
            <Text>Help Screen</Text>
        </View>
        </>
      )
}

export default Help;

