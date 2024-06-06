import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { Redirect, Tabs } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

import Image from 'react-native-remote-svg'

import SvgUri from 'react-native-svg-uri'

export default function _layout() {
	// const user = useSelector((state: any) => state.auth.user)
	// if (!user) {
	// 	return <Redirect href="login" />
	// }
	
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: '#35864C', headerShown: false }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Trang chủ',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
					headerShown: false,
					headerTitleAlign: 'center',
				}}
			/>
			<Tabs.Screen
				name="farm"
				options={{
					title: 'Nông trại',
					// tabBarIcon: ({ color }) => <FontAwesome size={28} name="leaf" color={color} />,
					tabBarIcon: ({ color }) => (
						<SvgUri
							width="28"
							height="28"
							source={require('~/assets/icons/plant.svg')}
							fill={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="notification"
				options={{
					title: 'Thông báo',

					headerShown: true,
					headerTitleAlign: 'center',

					tabBarIcon: ({ color }) => (
						<SvgUri
							width="28"
							height="28"
							source={require('~/assets/icons/notification.svg')}
							fill={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: 'Cài đặt',
					tabBarIcon: ({ color }) => (
						<SvgUri
							width="28"
							height="28"
							source={require('~/assets/icons/install.svg')}
							fill={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="news"
				options={{
					title: 'Tin tức',
					href: null,
				}}
			/>
		</Tabs>
	)
}
