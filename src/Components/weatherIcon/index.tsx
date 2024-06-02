import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Image from 'react-native-remote-svg';

interface weatherIconProps {
    name: string,
    type: string,
    width?: any,
    height?: any
}

const WeatherIcon: React.FC<weatherIconProps> = ({
    name,
    type,
    width,
    height
}) => {

    if (type === 'big') {
        if (name === 'moon-cloud') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/moon-cloud.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'moon-less-cloud') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/moon-less-cloud.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'moon-rain') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/moon-rain.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'moon-rain-thunder') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/moon-rain-thunder.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'rain') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/rain.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'rain-thunder') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/rain-thunder.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'sun') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/sun.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'sun-cloud') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/sun-cloud.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'sun-less-cloud') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/sun-less-cloud.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'moon') {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/moon.svg')}
                style={{ width: width, height: height }} />
            );
        } else {
            return (
                <Image source={require('../../../assets/weather-icon/big-icon/moon.svg')}
                style={{ width: width, height: height }} />
            );
        }
    } else if (type === 'small') {
        if (name === 'cloudy') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/cloudy.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'mist') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/mist.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'rain-thunder-windy') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/rain-thunder-windy.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'rainy') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/rainy.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'rainy-thunder') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/rainy-thunder.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'rainy-wind') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/rainy-wind.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'small-rain') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/small-rain.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'snowy') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/snowy.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'sunny') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/sunny.svg')}
                style={{ width: width, height: height }} />
            );
        } else if (name === 'windy') {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/windy.svg')}
                style={{ width: width, height: height }} />
            );
        } else {
            return (
                <Image source={require('../../../assets/weather-icon/small-icon/snowy.svg')}
                style={{ width: width, height: height }} />
            );
        }
    }

}

export default WeatherIcon;