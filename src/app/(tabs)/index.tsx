// import { View, Text, Button } from 'react-native'
// import React, { useEffect } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Redirect, useRouter } from 'expo-router'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { useDispatch } from 'react-redux'
// import { clearInput } from '@/Store/reducers'
// import { saveLogout } from '@/Store/reducers'
// import { AppDispatch } from '@/Store'

// // temp log out button here


// export default function Home() {
//   const user =  AsyncStorage.getItem('user')
//   const router = useRouter()
//   const dispatch = useDispatch<AppDispatch>()
//   useEffect(() => {
//     if (user) {
//       console.log('user', user)
//     } else{
//       router.push('login')
//     }
//   }, [user])
//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('user')
//     await AsyncStorage.clear()
//     await dispatch(saveLogout())
//     router.push('login')
//   }

  
//   return (
//     <SafeAreaView>
//       <View>
//         <Text>Home</Text>
//       </View>
//       <View>
//         <Button title = "Log out" onPress = {() => handleLogout()}/>
//       </View>
//     </SafeAreaView>

//   )
// }


import { useState, useEffect, useRef } from 'react'
import { Text, View, Button, Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'


Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

async function sendPushNotification(expoPushToken: string) {
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: 'Original Title',
		body: 'And here is the body!',
		data: { someData: 'goes here' },
	}

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	})
}

function handleRegistrationError(errorMessage: string) {
	alert(errorMessage)
	throw new Error(errorMessage)
}

async function registerForPushNotificationsAsync() {
	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
      
		})
	}
  let token 
	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync()
		let finalStatus = existingStatus
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync()
			finalStatus = status
		}
		if (finalStatus !== 'granted') {
			handleRegistrationError('Permission not granted to get push token for push notification!')
			return
		}
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId
    })

		const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
		if (!projectId) {
			handleRegistrationError('Project ID not found')
		}
		try {
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data
			console.log(pushTokenString)
			return pushTokenString
		} catch (e: unknown) {
			handleRegistrationError(`${e}`)
		}
	} else {
		handleRegistrationError('Must use physical device for push notifications')
	}
}

export default function App() {
	const [expoPushToken, setExpoPushToken] = useState('')
	const [notification, setNotification] = useState<Notifications.Notification | undefined>(
		undefined,
	)
	const notificationListener = useRef<Notifications.Subscription>()
	const responseListener = useRef<Notifications.Subscription>()


	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => setExpoPushToken(token ?? ''))
			.catch((error: any) => setExpoPushToken(`${error}`))

		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification)
		})

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response)
		})

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(notificationListener.current)
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [])

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
			<Text>Your Expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text>Title: {notification && notification.request.content.title} </Text>
				<Text>Body: {notification && notification.request.content.body}</Text>
				<Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
			</View>
			<Button
				title="Press to Send Notification"
				onPress={async () => {
					await sendPushNotification(expoPushToken)
				}}
			/>
		</View>
	)
}
