import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WeatherIcon from '@/Components/weatherIcon';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

interface weatherDailyItemProps {
    time: string,
    weatherIconName: string,
    temp: number
}

const WeatherDailyItem: React.FC<weatherDailyItemProps> = ({
    time,
    weatherIconName,
    temp
}) => {
    return (
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '25%', marginBottom: '2%' }} >
            <Text style={{ fontSize: 18 }}>{time}</Text>
            { weatherIconName === 'cloudy' ? <WeatherIcon name={weatherIconName} type='small' width={59} height={50} /> : <WeatherIcon name={weatherIconName} type='small' width={45} height={50} />} 
            <Text style={{ fontSize: 18 }}>{temp}°C</Text>
            </View>
    )
}

export default WeatherDailyItem;