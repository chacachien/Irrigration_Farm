import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WeatherIcon from '@/Components/weatherIcon';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

interface weatherHourlyItemProps {
    time: string,
    weatherIconName: string,
    temp: number
}

const WeatherHourlyItem: React.FC<weatherHourlyItemProps> = ({
    time,
    weatherIconName,
    temp,
}) => {
    return (
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ fontSize: 16 }}>{time}</Text>
            { weatherIconName === 'cloudy' ? <WeatherIcon name={weatherIconName} type='small' width={49} height={55} /> : <WeatherIcon name={weatherIconName} type='small' width={40} height={55} />} 
            <Text style={{ fontSize: 16 }}>{temp}°C</Text>
            </View>
    )
}

export default WeatherHourlyItem;