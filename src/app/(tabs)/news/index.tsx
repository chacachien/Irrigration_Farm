import { View, Text, Button } from 'react-native';
import React from 'react';
import { StatusBar } from "react-native";
import { router } from 'expo-router';

export default function Home() {

  return (
      <View style={{ height: '100%', width: '100%' }}> 
        <Text>hihi</Text>
        <Button title='abc' onPress={() => router.back()}/>
      </View>
  )
}