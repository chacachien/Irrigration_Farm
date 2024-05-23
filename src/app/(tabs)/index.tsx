import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { clearInput } from '@/Store/reducers'

// temp log out button here


export default function Home() {
  const user =  AsyncStorage.getItem('user')
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      console.log('user', user)
    } else{
      router.push('login')
    }
  }, [user])
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.clear()
    dispatch(clearInput())
    router.push('login')
  }

  
  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
      </View>
      <View>
        <Button title = "Log out" onPress = {() => handleLogout()}/>
      </View>
    </SafeAreaView>

  )
}