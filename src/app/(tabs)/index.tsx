import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect } from 'expo-router'


export default function Home() {
  const user =  AsyncStorage.getItem('user')
  if (user) {
    console.log('user', user)
  } else{
    return <Redirect href = "login" />
  }

  return (
    <View>
      <Text>hihihi</Text>
      
    </View>
  )
}