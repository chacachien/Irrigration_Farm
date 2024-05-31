import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Redirect, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { clearInput } from '@/Store/reducers'
import { saveLogout } from '@/Store/reducers'
import { AppDispatch } from '@/Store'

// temp log out button here


export default function Home() {
  const user =  AsyncStorage.getItem('user')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
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
    await dispatch(saveLogout())
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