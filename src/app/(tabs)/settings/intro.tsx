import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInput from '@/Components/textInput'
import PrimaryButton from '@/Components/button/primaryButton'
import { router } from 'expo-router'
import TextButton from '@/Components/button/textButton'


const Introduction: React.FC = () => {
    return (
        <View style={{ paddingHorizontal: '6%', paddingTop: '7%' }}>
            <Text>Intro Screen</Text>
        </View>
      )
}

export default Introduction;
