import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { Tabs } from 'expo-router'
import Tab from './settings'

export default function _layout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Trang chủ',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
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
                }}
            />

			<Tabs.Screen
				name="settings"
				options={{
					title: 'Cài đặt',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
				}}
			/>
		</Tabs>
	)
}
