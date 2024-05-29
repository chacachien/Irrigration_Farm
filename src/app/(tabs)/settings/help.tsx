import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInput from '@/Components/textInput'
import PrimaryButton from '@/Components/primaryButton'
import { router } from 'expo-router'
import TextButton from '@/Components/textButton'


const Help: React.FC = () => {
    return (
        <View style={{ paddingHorizontal: '6%', paddingTop: '7%' }}>
            <Text>Help Screen</Text>
        </View>
      )
}

export default Help;

