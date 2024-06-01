import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { Redirect, Tabs } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

export default function _layout() {
	// const user = useSelector((state: any) => state.auth.user)
	// if (!user) {
	// 	return <Redirect href="login" />
	// }
	
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: 'blue', 
			headerShown: false,
		}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Trang chủ',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color}
					 />,
					 headerShown: false,
					 headerTitleAlign: 'center'
				}}
			/>
            <Tabs.Screen
                name = "farm"
                options = {{
                    title: 'Nông trại',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="leaf" color={color} />,
                }}
            />
            <Tabs.Screen
                name = "notification"
                options = {{
                    title: 'Thông báo',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
					headerShown: true
                }}
            />

			<Tabs.Screen
				name="settings"
				options={{
					title: 'Cài đặt',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
				}}
			/>
			
			<Tabs.Screen
				name="news"
				options={{
					title: 'Tin tức',
					href: null
				}}
			/>
		</Tabs>
	)
}
