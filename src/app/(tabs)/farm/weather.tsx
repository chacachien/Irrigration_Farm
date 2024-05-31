import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import WeatherIcon from '@/Components/weatherIcon';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import WeatherHourlyItem from '@/Components/weatherHourlyItem';
import WeatherDailyItem from '@/Components/weatherDailyItem';

const hourlyForecast = [
  {
    time: '10:00',
    weatherName: 'small-rain',
    temp: 25
  },
  {
    time: '11:00',
    weatherName: 'sunny',
    temp: 26
  },
  {
    time: '12:00',
    weatherName: 'rainy',
    temp: 24
  },
  {
    time: '13:00',
    weatherName: 'windy',
    temp: 25
  },
  {
    time: '14:00',
    weatherName: 'cloudy',
    temp: 25
  }
]

const dailyForecast = [
  {
    time: 'Thứ hai',
    weatherName: 'small-rain',
    temp: 25
  },
  {
    time: 'Thứ ba',
    weatherName: 'sunny',
    temp: 26
  },
  {
    time: 'Thứ tư',
    weatherName: 'rainy',
    temp: 24
  },
  {
    time: 'Thứ năm',
    weatherName: 'windy',
    temp: 25
  },
  {
    time: 'Thứ sáu',
    weatherName: 'cloudy',
    temp: 25
  },
  {
    time: 'Thứ bảy',
    weatherName: 'mist',
    temp: 25
  },
  {
    time: 'Chủ nhật',
    weatherName: 'snowy',
    temp: 25
  },
  {
    time: 'Thứ hai',
    weatherName: 'windy',
    temp: 25
  }
]

export default function weather() {

  return (
    <View style={{ paddingHorizontal: '3%' }}>
      <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: '4%', marginTop: '2%' }}>Thời tiết hôm nay</Text>
      <View style={{ backgroundColor: '#E9F3ED', flexDirection: 'row', borderRadius: 10, elevation: 5 }}>
        <View style={{ width: '50%', marginLeft: '2%', justifyContent: 'center' }}>
          <Text style={{ fontStyle: 'italic', fontSize: 16, marginBottom: '6%' }}>Ngày 31 tháng 05, 2024</Text>
          <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold'}}>29°C</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, fontStyle: 'italic', marginBottom: '6%' }}>Có mây</Text>
          <Text style={{ color: 'grey', fontSize: 15, fontStyle: 'italic' }}> <Ionicons name='water-outline' size={16} color={'#2F90FF'} /> Độ ẩm: { <Text style={{ color: 'black', fontSize: 18, fontStyle:'normal' }}>39%</Text> }</Text>
          <Text style={{ color: 'grey', fontSize: 15, fontStyle: 'italic' }}> <Ionicons name='rainy-outline' size={16} color={'#2F90FF'} /> Khả năng có mưa: { <Text style={{ color: 'black', fontSize: 18, fontStyle:'normal' }}>65%</Text> }</Text>
        </View>
        <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', marginTop: '-7%' }}>
          <WeatherIcon name='sun-cloud' type='big' width={'100%'}/>
          <Text style={{ color: 'grey', fontSize: 15, fontStyle: 'italic', marginBottom: '3%', textAlign: 'right' }}> <Entypo name='location-pin' size={18} color={'grey'} /> Di An, Binh Duong,{'\n'}Viet Nam</Text>
        </View>
      </View>
      <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: '4%' }}>Thời tiết trong ngày</Text>
      <View style={{ backgroundColor: '#E9F3ED', flexDirection: 'row', borderRadius: 10, elevation: 5, justifyContent: 'space-around', paddingVertical: '2%'}}>
        {
          hourlyForecast.map((item, index) => {
            return (
              <WeatherHourlyItem time={item.time} weatherIconName={item.weatherName} temp={item.temp} key={index} />
            )
          })
        }
      </View>
      <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: '4%' }}>Thời tiết trong tuần</Text>
      <View style={{ backgroundColor: '#E9F3ED', flexDirection: 'row', borderRadius: 10, elevation: 5, justifyContent: 'space-around', paddingVertical: '2%', flexWrap: 'wrap', alignItems: 'center' }}>
        {
          dailyForecast.map((item, index) => {
            return (
              <WeatherDailyItem time={item.time} weatherIconName={item.weatherName} temp={item.temp} key={index} />
            )
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})