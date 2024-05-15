import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function () {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen name='one'  />
        <Stack.Screen name='three' />
        <Stack.Screen name='two' />
    </Stack>
  )
}

const styles = StyleSheet.create({})