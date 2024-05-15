// import { View, Text, Button } from 'react-native'
// import React from 'react'
// import { Stack, useRouter } from 'expo-router'
// import { NativeBaseProvider } from 'native-base'
// import { Provider, useSelector } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from '@/Store'

// export default function _layout() {
// 	return <RootLayout />
// }

// function RootLayout() {
// 	const router = useRouter()
// 	const onboarding = useSelector((state: any) => state.onboard.completed)

// 	const [initialRoute, setInitialRoute] = React.useState('onboard')
// 	React.useEffect(() => {
// 		setInitialRoute(onboarding ? '(tabs)' : 'onboard')
// 	}, [onboarding])
// 	console.log(onboarding)
// 	return (
// 		<Providers>
// 			<Stack
// 				screenOptions={{
// 					headerStyle: {
// 						backgroundColor: '#f4511e',
// 					},
// 					headerTintColor: '#fff',
// 					headerTitleStyle: {
// 						fontWeight: 'bold',
// 					},
// 				}}
// 				initialRouteName={initialRoute}
// 			>
// 				{/* <Stack.Screen name="index" options={{ title: 'Home' }} /> */}
// 				<Stack.Screen
// 					name="register/index"
// 					options={{
// 						title: 'Register',
// 						headerRight: () => <Button title="Login" onPress={() => router.push('login')} />,
// 					}}
// 				/>
// 				<Stack.Screen name="login" options={{ title: 'Login', presentation: 'modal' }} />
// 				<Stack.Screen name="[missing]" options={{ title: '404' }} />
// 				<Stack.Screen
// 					name="(tabs)"
// 					options={{
// 						headerShown: false,
// 					}}
// 				/>
// 				<Stack.Screen name="onboard" options={{ headerShown: false }} />
// 			</Stack>
// 		</Providers>
// 	)
// }

// function Providers({ children }: { children: React.ReactNode }) {
// 	return (
// 		<Provider store={store}>
// 			<PersistGate loading={null} persistor={persistor}>
// 				<NativeBaseProvider>{children}</NativeBaseProvider>
// 			</PersistGate>
// 		</Provider>
// 	)
// }

import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/Store'

// Separate Providers component to ensure proper wrapping
function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	)
}

// RootLayout component that uses Redux state
function RootLayout() {
	const router = useRouter()

	const onboarding = useSelector((state: any) => state.onboard.completed)
	const initialRoute = onboarding ? '(tabs)' : 'onboard'

	React.useEffect(() => {
		// Navigate to the initial route after the component is mounted
		router.push(initialRoute)
	}, [initialRoute, router])

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: '#f4511e',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<Stack.Screen
				name="register/index"
				options={{
					title: 'Register',
					headerRight: () => <Button title="Login" onPress={() => router.push('login')} />,
				}}
			/>
			<Stack.Screen name="login/index" options={{ title: 'Login' }} />
			<Stack.Screen name="[missing]" options={{ title: '404' }} />
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="onboard" options={{ headerShown: false }} />
		</Stack>
	)
}

// Main entry point that ensures Providers wraps the RootLayout properly
export default function _layout() {
	return (
		<Providers>
			<RootLayout />
		</Providers>
	)
}
